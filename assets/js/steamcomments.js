// Configuración de paginación
const COMMENTS_PER_PAGE = 10;
let currentPage = 1;
let totalPages = 1;
let allComments = [];

// Obtener el nombre del proyecto actual (maneja con y sin .html)
function getCurrentProjectName() {
  const path = window.location.pathname;

  // Extraer el nombre del proyecto de la URL (ej: "blackopsiiilatino" o "blackopsiiilatino.html")
  const projectMatch = path.match(/\/proyectos\/([^\/]+?)(?:\.html)?$/);

  if (projectMatch) {
    // Remover .html si está presente y convertir a minúsculas para consistencia
    return projectMatch[1].toLowerCase().replace('.html', '');
  }

  return 'default';
}

// Mapeo de proyectos a archivos JSON (usa nombres sin .html)
function getJsonUrlsForProject(projectName) {
  const jsonMap = {
    'blackopsiiilatino': [
      'https://artur16211.github.io/steamguide_comments/comments_1.json',
      'https://a2workshop.github.io/assets/js/archive_steamcomments.json'
    ],
    'blackopslatino': 'https://artur16211.github.io/steamguide_comments/comments_4.json',
    'infinitewarfarelatino': 'https://artur16211.github.io/steamguide_comments/comments_2.json',
    'modernwarfarerlatino': 'https://artur16211.github.io/steamguide_comments/comments_3.json',
    'default': 'https://example.com/comments/general_comments.json'
  };

  // Buscar el nombre del proyecto (sin importar mayúsculas/minúsculas)
  const normalizedProjectName = projectName.toLowerCase();
  const urls = jsonMap[normalizedProjectName] || jsonMap['default'];

  // Asegurarse de devolver siempre un array
  return Array.isArray(urls) ? urls : [urls];
}

// Función para formatear la fecha y hora
function formatFechaHora(fechaHoraString) {
  var opcionesFecha = {
    timeZone: 'America/Mexico_City',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  var opcionesHora = {
    timeZone: 'America/Mexico_City',
    hour: 'numeric',
    minute: 'numeric'
  };

  var fechaHora = new Date(fechaHoraString);
  var dia = fechaHora.toLocaleDateString('es-MX', opcionesFecha);
  var hora = fechaHora.toLocaleTimeString('es-MX', opcionesHora);

  return `${dia} a las ${hora}`;
}

// Función para mostrar comentarios de la página actual
function displayCurrentPageComments() {
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = ''; // Limpiar contenedor

  // Calcular índices de los comentarios a mostrar
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, allComments.length);

  // Mostrar solo los comentarios de la página actual
  const commentsToShow = allComments.slice(startIndex, endIndex);

  const steamIconPath = '../assets/img/Steam/steam_icon.webp';

  commentsToShow.forEach(function (comment) {
    // Crear elementos HTML para cada comentario
    var commentElement = document.createElement('div');
    commentElement.classList.add('card-body', 'p-4');

    var dFlexElement = document.createElement('div');
    dFlexElement.classList.add('d-flex', 'flex-start');

    var avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar-container');

    var avatarElement = document.createElement('img');
    avatarElement.classList.add('rounded-circle', 'shadow-1-strong', 'me-3');
    avatarElement.src = comment.avatar;
    avatarElement.alt = 'avatar';
    avatarElement.width = 60;
    avatarElement.height = 60;

    var steamIconElement = document.createElement('img');
    steamIconElement.src = steamIconPath;
    steamIconElement.alt = 'Steam';
    steamIconElement.classList.add('steam-icon');

    avatarContainer.appendChild(avatarElement);
    avatarContainer.appendChild(steamIconElement);

    var contentContainer = document.createElement('div');

    var authorElement = document.createElement('h6');
    authorElement.classList.add('fw-bold', 'mb-1');
    authorElement.textContent = comment.author;

    var timestampElement = document.createElement('div');
    timestampElement.classList.add('d-flex', 'align-items-center', 'mb-3');

    var timestampTextElement = document.createElement('p');
    timestampTextElement.classList.add('mb-0');
    var formattedFechaHora = formatFechaHora(comment.timestamp);
    timestampTextElement.textContent = formattedFechaHora;

    var contentElement = document.createElement('p');
    contentElement.classList.add('div-content-comment');
    contentElement.classList.add('mb-0');
    contentElement.textContent = comment.comment;

    timestampElement.appendChild(timestampTextElement);
    contentContainer.appendChild(authorElement);
    contentContainer.appendChild(timestampElement);
    contentContainer.appendChild(contentElement);
    dFlexElement.appendChild(avatarContainer);
    dFlexElement.appendChild(contentContainer);
    commentElement.appendChild(dFlexElement);
    commentsContainer.appendChild(commentElement);
  });

  updatePaginationControls();
}

// Modificar la función updatePaginationControls para los proyectos específicos
function updatePaginationControls() {
  const paginationContainer = document.getElementById('pagination-controls');
  paginationContainer.innerHTML = '';

  const currentProject = getCurrentProjectName();
  const specialProjects = {
    'blackopslatino': 'https://steamcommunity.com/sharedfiles/filedetails/?id=3478642806#commentthread_PublishedFile_Public_76561198840412181_3478642806_form',
    'infinitewarfarelatino': 'https://steamcommunity.com/sharedfiles/filedetails/?id=3438530146#commentthread_PublishedFile_Public_76561199112392013_3438530146_form',
    'modernwarfarerlatino': 'https://steamcommunity.com/sharedfiles/filedetails/?id=3478574794#commentthread_PublishedFile_Public_76561199112392013_3478574794_form',
  };

  const isSpecialProject = Object.keys(specialProjects).includes(currentProject);
  const steamUrl = specialProjects[currentProject];

  // Primer número de página
  const firstLi = document.createElement('li');
  firstLi.classList.add('page-item');
  if (currentPage === 1) firstLi.classList.add('active');
  const firstLink = document.createElement('a');
  firstLink.classList.add('page-link');
  firstLink.href = '#comments';
  firstLink.textContent = "<<";
  firstLink.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = 1;
    displayCurrentPageComments();
  });
  firstLi.appendChild(firstLink);
  paginationContainer.appendChild(firstLi);

  // Botón "Anterior"
  const prevLi = document.createElement('li');
  prevLi.classList.add('page-item');
  if (currentPage === 1) prevLi.classList.add('disabled');

  const prevLink = document.createElement('a');
  prevLink.classList.add('page-link');
  prevLink.href = '#comments';
  prevLink.textContent = '<';
  prevLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayCurrentPageComments();
    }
  });

  prevLi.appendChild(prevLink);
  paginationContainer.appendChild(prevLi);

  // Números de página - solo mostrar si no es un proyecto especial
  if (!isSpecialProject) {
    const maxVisiblePages = 3;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    if (startPage > 1) {
      const dotsLi = document.createElement('li');
      dotsLi.classList.add('page-item', 'disabled');
      const dotsLink = document.createElement('a');
      dotsLink.classList.add('page-link');
      dotsLink.href = '#comments';
      dotsLink.textContent = '...';
      dotsLi.appendChild(dotsLink);
      paginationContainer.appendChild(dotsLi);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageLi = document.createElement('li');
      pageLi.classList.add('page-item');
      if (i === currentPage) pageLi.classList.add('active');

      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.href = '#comments';
      pageLink.textContent = i;
      pageLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        displayCurrentPageComments();
      });

      pageLi.appendChild(pageLink);
      paginationContainer.appendChild(pageLi);
    }

    if (endPage < totalPages) {
      const dotsLi = document.createElement('li');
      dotsLi.classList.add('page-item', 'disabled');
      const dotsLink = document.createElement('a');
      dotsLink.classList.add('page-link');
      dotsLink.href = '#comments';
      dotsLink.textContent = '...';
      dotsLi.appendChild(dotsLink);
      paginationContainer.appendChild(dotsLi);
    }
  }

  // Botón "Siguiente"
  if (!isSpecialProject && currentPage === totalPages) {
    nextLi.classList.add('disabled');
  }
  const nextLi = document.createElement('li');
  nextLi.classList.add('page-item');

  const nextLink = document.createElement('a');
  nextLink.classList.add('page-link');
  nextLink.href = isSpecialProject ? steamUrl : '#comments';
  nextLink.textContent = '>';

  if (!isSpecialProject) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        displayCurrentPageComments();
      }
    });
  } else {
    // Para proyectos especiales, no necesitamos el preventDefault
    // ya que queremos que navegue a Steam
    nextLink.target = '_blank'; // Abrir en nueva pestaña
  }

  nextLi.appendChild(nextLink);
  paginationContainer.appendChild(nextLi);

  // Último número de página - solo mostrar si no es un proyecto especial
  if (!isSpecialProject) {
    const lastLi = document.createElement('li');
    lastLi.classList.add('page-item');
    if (currentPage === totalPages) lastLi.classList.add('active');
    const lastLink = document.createElement('a');
    lastLink.classList.add('page-link');
    lastLink.href = '#comments';
    lastLink.textContent = ">>";
    lastLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = totalPages;
      displayCurrentPageComments();
    });
    lastLi.appendChild(lastLink);
    paginationContainer.appendChild(lastLi);
  }
}

async function fetchCommentsFromWeb() {
  try {
    const currentProject = getCurrentProjectName();
    const jsonUrls = getJsonUrlsForProject(currentProject);

    // Array para almacenar todos los comentarios combinados
    let combinedComments = [];

    // Fetch todos los archivos JSON en paralelo
    const responses = await Promise.all(jsonUrls.map(url => fetch(url)));

    // Verificar todas las respuestas
    for (const response of responses) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    }

    // Procesar todos los JSON
    const jsonDataArray = await Promise.all(responses.map(r => r.json()));

    // Combinar todos los comentarios
    for (const jsonData of jsonDataArray) {
      if (jsonData.comments && Array.isArray(jsonData.comments)) {
        combinedComments = combinedComments.concat(jsonData.comments);
      }
    }

    // Almacenar todos los comentarios combinados
    allComments = combinedComments;
    totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);

    // Mostrar la primera página de comentarios
    displayCurrentPageComments();

    // Almacenar en caché con clave específica del proyecto
    localStorage.setItem(`cachedJsonData_${currentProject}`, JSON.stringify({
      comments: combinedComments
    }));
  } catch (error) {
    console.error('Error fetching the JSON data:', error);

    // Intentar cargar desde caché
    const currentProject = getCurrentProjectName();
    const cachedData = localStorage.getItem(`cachedJsonData_${currentProject}`);
    if (cachedData) {
      const jsonData = JSON.parse(cachedData);
      allComments = jsonData.comments;
      totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);
      displayCurrentPageComments();
    }
  }
}

// Inicializar
fetchCommentsFromWeb();

// Limpiar cache cuando la página se recargue
window.addEventListener('beforeunload', () => {
  const currentProject = getCurrentProjectName();
  localStorage.removeItem(`cachedJsonData_${currentProject}`);
});