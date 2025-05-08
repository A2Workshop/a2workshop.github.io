// Configuración de paginación
const COMMENTS_PER_PAGE = 10;
let currentPage = 1;
let totalPages = 1;
let allComments = [];

// Función para formatear la fecha y hora
function formatFechaHora(fechaHoraString) {
  var fechaHora = new Date(fechaHoraString);
  var opcionesFecha = { day: 'numeric', month: 'long' };
  var opcionesHora = { hour: 'numeric', minute: 'numeric' };

  var dia = fechaHora.toLocaleDateString('es-ES', opcionesFecha);
  var hora = fechaHora.toLocaleTimeString('es-ES', opcionesHora);

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

// Función para actualizar los controles de paginación
function updatePaginationControls() {
  const paginationContainer = document.getElementById('pagination-controls');
  paginationContainer.innerHTML = '';

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



  // Números de página
  const maxVisiblePages = 3; // Máximo de números de página a mostrar
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

  // Mostrar puntos suspensivos al principio si es necesario
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

  // Crear enlaces para cada página
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

  // Mostrar puntos suspensivos al final si es necesario
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



  // Botón "Siguiente"
  const nextLi = document.createElement('li');
  nextLi.classList.add('page-item');
  if (currentPage === totalPages) nextLi.classList.add('disabled');

  const nextLink = document.createElement('a');
  nextLink.classList.add('page-link');
  nextLink.href = '#comments';
  nextLink.textContent = '>';
  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayCurrentPageComments();
    }
  });

  nextLi.appendChild(nextLink);
  paginationContainer.appendChild(nextLi);

  // Último número de página
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

async function fetchCommentsFromWeb() {
  try {
    // const response = await fetch('https://artur16211.github.io/steamguide_comments/comments.json');
    const response = await fetch('https://a2workshop.github.io/assets/js/archive_steamcomments.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();

    // Almacenar todos los comentarios
    allComments = jsonData.comments;
    totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);

    // Mostrar la primera página de comentarios
    displayCurrentPageComments();

    // Almacenar los datos JSON en el almacenamiento local
    localStorage.setItem('cachedJsonData', JSON.stringify(jsonData));
  } catch (error) {
    console.error('Error fetching the JSON data:', error);

    // Intentar cargar desde caché si hay un error
    const cachedData = localStorage.getItem('cachedJsonData');
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
  localStorage.removeItem('cachedJsonData');
});