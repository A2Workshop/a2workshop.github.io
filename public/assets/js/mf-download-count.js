const mediaFireFolderCache = new Map();

async function fetchMediaFireFolderFiles(folderKey) {
  if (!folderKey) {
    return [];
  }

  if (mediaFireFolderCache.has(folderKey)) {
    return mediaFireFolderCache.get(folderKey);
  }

  const apiUrl = new URL('https://www.mediafire.com/api/1.5/folder/get_content.php');
  apiUrl.searchParams.set('folder_key', folderKey);
  apiUrl.searchParams.set('content_type', 'files');
  apiUrl.searchParams.set('response_format', 'json');

  const folderPromise = fetch(apiUrl.toString())
    .then((response) => {
      if (!response.ok) {
        throw new Error(`MediaFire API request failed with status ${response.status}`);
      }

      return response.json();
    })
    .then((payload) => payload?.response?.folder_content?.files ?? []);

  mediaFireFolderCache.set(folderKey, folderPromise);
  return folderPromise;
}

function getMediaFireSources(element) {
  const sourcesJson = element.dataset.mediafireSources;

  if (sourcesJson) {
    try {
      const parsedSources = JSON.parse(sourcesJson);
      if (Array.isArray(parsedSources)) {
        return parsedSources;
      }
    } catch (error) {
      console.error('Could not parse MediaFire sources JSON:', error);
      return [];
    }
  }

  const folderKey = element.dataset.mediafireFolderKey;
  const targetFilename = element.dataset.mediafireFilename;
  const sumAllFiles = element.dataset.mediafireSumAll === 'true';

  if (!folderKey || (!targetFilename && !sumAllFiles)) {
    return [];
  }

  return [
    {
      folderKey,
      filename: targetFilename,
      sumAll: sumAllFiles,
    },
  ];
}

function getStaticDownloadBonus(element) {
  const rawBonus = element.dataset.mediafireStaticDownloads ?? element.dataset.mediafireDownloadOffset ?? '0';
  const parsedBonus = Number.parseInt(rawBonus, 10);
  return Number.isFinite(parsedBonus) ? parsedBonus : 0;
}

async function getSourceDownloadCount(source) {
  const folderKey = source.folderKey;
  const targetFilename = source.filename;
  const sumAllFiles = source.sumAll === true;

  if (!folderKey || (!targetFilename && !sumAllFiles)) {
    return 0;
  }

  const files = await fetchMediaFireFolderFiles(folderKey);

  if (sumAllFiles) {
    return files.reduce((total, file) => {
      const fileDownloads = Number.parseInt(file.downloads ?? '0', 10);
      return total + (Number.isFinite(fileDownloads) ? fileDownloads : 0);
    }, 0);
  }

  const matchingFile = files.find((file) => file.filename === targetFilename);

  if (!matchingFile) {
    throw new Error(`Could not find "${targetFilename}" in MediaFire folder ${folderKey}`);
  }

  const downloadCount = Number.parseInt(matchingFile.downloads ?? '0', 10);
  return Number.isFinite(downloadCount) ? downloadCount : 0;
}

async function updateMediaFireDownloadCount(element) {
  const sources = getMediaFireSources(element);
  const staticDownloadBonus = getStaticDownloadBonus(element);

  if (sources.length === 0 && staticDownloadBonus === 0) {
    return;
  }

  try {
    const downloadCounts = await Promise.all(sources.map((source) => getSourceDownloadCount(source)));
    const totalDownloadCount = downloadCounts.reduce((total, count) => total + count, staticDownloadBonus);

    const formattedCount = Number.isFinite(totalDownloadCount)
      ? new Intl.NumberFormat('es-MX').format(totalDownloadCount)
      : '--';

    element.textContent = formattedCount;
  } catch (error) {
    console.error('Could not load MediaFire download count:', error);
    element.textContent = '--';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const downloadCountElements = document.querySelectorAll('[data-mediafire-download-count]');

  downloadCountElements.forEach((element) => {
    updateMediaFireDownloadCount(element);
  });
});
