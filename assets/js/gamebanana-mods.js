const gameBananaPageConfig = {
  memberId: 1753132,
  memberName: 'Artur16211',

  listEndpoints: [
    {
      type: 'Mod',
      url: 'https://gamebanana.com/apiv11/Mod/Index?_nPage=1&_nPerpage=50&_aFilters%5BGeneric_Submitter%5D=1753132'
    },
    {
      type: 'Wip',
      url: 'https://gamebanana.com/apiv11/Wip/Index?_nPage=1&_nPerpage=50&_aFilters%5BGeneric_Submitter%5D=1753132'
    }
  ],

  extraItems: [
    { type: 'Mod', id: 54473 }
  ]
};

const a2WorkshopParticipants = {
  artur16211: {
    name: 'Artur16211',
    avatar: 'assets/img/Profile/Artur16211.webp'
  },
  atuburapaler: {
    name: 'atuburapaler',
    avatar: 'assets/img/Profile/atuburapaler.jpg'
  }
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatGameBananaNumber(value) {
  return new Intl.NumberFormat('es-MX').format(value);
}

function getGameBananaPreviewUrl(record) {
  const image = record?._aPreviewMedia?._aImages?.[0];

  if (!image || !image._sBaseUrl || !image._sFile530) {
    return '';
  }

  return `${image._sBaseUrl}/${image._sFile530}`;
}

function getGameBananaFallbackUrl(type, id) {
  if (type === 'Wip') {
    return `https://gamebanana.com/wips/${id}`;
  }

  return `https://gamebanana.com/mods/${id}`;
}

function getGameBananaProgress(record, details) {
  const candidates = [
    details?._nCompletion,
    record?._nCompletion,
    details?._nPercentComplete,
    record?._nPercentComplete,
    details?._nProgress,
    record?._nProgress
  ];

  const progress = candidates.find((value) => Number.isFinite(value));

  return Number.isFinite(progress) ? progress : null;
}

function getA2WorkshopParticipants(details, isOwnSubmission) {
  const participants = [];
  const seenNames = new Set();

  const keyAuthors = details?._aCredits
    ?.find((group) => group?._sGroupName === 'Key Authors')
    ?._aAuthors ?? [];

  keyAuthors.forEach((author) => {
    const normalizedName = author?._sName?.toLowerCase?.() ?? '';
    const participant = a2WorkshopParticipants[normalizedName];

    if (participant && !seenNames.has(normalizedName)) {
      participants.push(participant);
      seenNames.add(normalizedName);
    }
  });

  if (isOwnSubmission && !seenNames.has('artur16211')) {
    participants.unshift(a2WorkshopParticipants.artur16211);
  }

  return participants;
}

async function fetchGameBananaItemDetails(type, itemId) {
  const detailResponse = await fetch(`https://gamebanana.com/apiv11/${type}/${itemId}/ProfilePage`);

  if (!detailResponse.ok) {
    throw new Error(`GameBanana ${type} detail request failed with status ${detailResponse.status}`);
  }

  return detailResponse.json();
}

function mapGameBananaSubmissionRecord(record, details, gameNameOverride = '', itemType = 'Mod') {
  const submitterId = record?._aSubmitter?._idRow ?? details?._aSubmitter?._idRow;
  const isOwnSubmission = submitterId === gameBananaPageConfig.memberId;

  return {
    id: `${itemType}-${record._idRow}`,
    rawId: record._idRow,
    itemType,

    name: record._sName || details?._sName || `${itemType} ${record._idRow}`,
    url:
      record._sProfileUrl ||
      details?._sProfileUrl ||
      getGameBananaFallbackUrl(itemType, record._idRow),

    imageUrl:
      getGameBananaPreviewUrl(record) ||
      getGameBananaPreviewUrl(details),

    gameName:
      gameNameOverride ||
      record?._aGame?._sName ||
      details?._aGame?._sName ||
      '',

    version:
      record._sVersion ||
      details?._sVersion ||
      '',

    createdAt:
      record._tsDateAdded ||
      details?._tsDateAdded ||
      0,

    downloads:
      itemType === 'Mod' && Number.isFinite(details?._nDownloadCount)
        ? details._nDownloadCount
        : 0,

    progress:
      itemType === 'Wip'
        ? getGameBananaProgress(record, details)
        : null,

    participants: getA2WorkshopParticipants(details, isOwnSubmission)
  };
}

function renderGameBananaCards(submissions) {
  const grid = document.getElementById('gamebanana-grid');

  if (!grid) {
    return;
  }

  grid.innerHTML = submissions.map((submission) => `
    <a href="${escapeHtml(submission.url)}" class="gamebanana-card" target="_blank" rel="noopener noreferrer">
      <div class="gamebanana-card-media">
        ${submission.imageUrl
          ? `<img src="${escapeHtml(submission.imageUrl)}" alt="${escapeHtml(submission.name)}" loading="lazy">`
          : '<div class="gamebanana-card-placeholder">GB</div>'}

        ${submission.participants?.length
          ? `<div class="gamebanana-participants">${submission.participants.map((participant) => `
              <img src="${escapeHtml(participant.avatar)}" alt="${escapeHtml(participant.name)}" title="${escapeHtml(participant.name)}" class="gamebanana-participant-avatar" loading="lazy">
            `).join('')}</div>`
          : ''}
      </div>

      <div class="gamebanana-card-body">
        <div class="gamebanana-card-title">${escapeHtml(submission.name)}</div>
        <div class="gamebanana-card-meta">${escapeHtml(submission.gameName)}</div>

        <div class="gamebanana-card-stats">
          ${submission.itemType === 'Wip'
            ? `<span>${submission.progress !== null ? `: ${escapeHtml(submission.progress)}%` : ''}</span>`
            : ''}

          ${submission.version
            ? `<span>Version: ${escapeHtml(submission.version)}</span>`
            : ''}
        </div>
      </div>
    </a>
  `).join('');
}

function orderGameBananaMods(submissions) {
  if (submissions.length <= 1) {
    return submissions;
  }

  const byNewest = [...submissions].sort((left, right) => {
    return (right.createdAt ?? 0) - (left.createdAt ?? 0);
  });

  const newestSubmission = byNewest[0];
  const remainingSubmissions = byNewest.slice(1);

  const topDownloadedMods = [...remainingSubmissions]
    .filter((submission) => submission.itemType === 'Mod')
    .sort((left, right) => (right.downloads ?? -1) - (left.downloads ?? -1))
    .slice(0, 3);

  const topDownloadedIds = new Set(topDownloadedMods.map((submission) => submission.id));

  const restByNewest = remainingSubmissions.filter((submission) => {
    return !topDownloadedIds.has(submission.id);
  });

  return [newestSubmission, ...topDownloadedMods, ...restByNewest];
}

async function fetchGameBananaSubmissionsForEndpoint(endpoint) {
  const listResponse = await fetch(endpoint.url);

  if (!listResponse.ok) {
    throw new Error(`GameBanana ${endpoint.type} list request failed with status ${listResponse.status}`);
  }

  const listPayload = await listResponse.json();
  const records = listPayload?._aRecords ?? [];

  return Promise.all(records.map(async (record) => {
    try {
      const details = await fetchGameBananaItemDetails(endpoint.type, record._idRow);

      return mapGameBananaSubmissionRecord(
        record,
        details,
        '',
        endpoint.type
      );
    } catch (error) {
      console.error(`Could not load GameBanana details for ${endpoint.type} ${record._idRow}:`, error);

      return {
        id: `${endpoint.type}-${record._idRow}`,
        rawId: record._idRow,
        itemType: endpoint.type,
        name: record._sName || `${endpoint.type} ${record._idRow}`,
        url: record._sProfileUrl || getGameBananaFallbackUrl(endpoint.type, record._idRow),
        imageUrl: getGameBananaPreviewUrl(record),
        gameName: record?._aGame?._sName ?? '',
        version: record._sVersion || '',
        createdAt: record._tsDateAdded || 0,
        downloads: 0,
        progress: endpoint.type === 'Wip' ? getGameBananaProgress(record, null) : null,
        participants: [a2WorkshopParticipants.artur16211]
      };
    }
  }));
}

async function fetchGameBananaExtraItems() {
  return Promise.all(gameBananaPageConfig.extraItems.map(async (item) => {
    try {
      const details = await fetchGameBananaItemDetails(item.type, item.id);

      const extraRecord = {
        _idRow: item.id,
        _sName: details?._sName ?? `${item.type} ${item.id}`,
        _sProfileUrl: details?._sProfileUrl ?? getGameBananaFallbackUrl(item.type, item.id),
        _aPreviewMedia: details?._aPreviewMedia ?? {},
        _aGame: details?._aGame ?? {},
        _sVersion: details?._sVersion ?? '',
        _tsDateAdded: details?._tsDateAdded ?? 0,
        _nCompletion: details?._nCompletion,
        _nPercentComplete: details?._nPercentComplete,
        _nProgress: details?._nProgress
      };

      return mapGameBananaSubmissionRecord(
        extraRecord,
        details,
        `${details?._aGame?._sName ?? ''}`,
        item.type
      );
    } catch (error) {
      console.error(`Could not load extra GameBanana ${item.type} ${item.id}:`, error);
      return null;
    }
  }));
}

async function fetchGameBananaModsForPage() {
  try {
    const endpointResults = await Promise.all(
      gameBananaPageConfig.listEndpoints.map(fetchGameBananaSubmissionsForEndpoint)
    );

    const detailedRecords = endpointResults.flat();
    const extraItems = await fetchGameBananaExtraItems();

    const mergedRecords = [...detailedRecords];

    extraItems.filter(Boolean).forEach((extraItem) => {
      if (!mergedRecords.some((record) => record.id === extraItem.id)) {
        mergedRecords.push(extraItem);
      }
    });

    const orderedRecords = orderGameBananaMods(mergedRecords);

    renderGameBananaCards(orderedRecords);
  } catch (error) {
    console.error('Could not load GameBanana submissions:', error);
  }
}

fetchGameBananaModsForPage();