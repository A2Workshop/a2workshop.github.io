// Función para formatear la fecha y hora
function formatFechaHora(fechaHoraString) {
  var fechaHora = new Date(fechaHoraString);
  var opcionesFecha = { day: 'numeric', month: 'long' };
  var opcionesHora = { hour: 'numeric', minute: 'numeric' };

  var dia = fechaHora.toLocaleDateString('es-ES', opcionesFecha);
  var hora = fechaHora.toLocaleTimeString('es-ES', opcionesHora);

  return `${dia} a las ${hora}`;
}


async function displayComments(jsonData) {
  try {
    const commentsObj = JSON.parse(jsonData);
    var commentsContainer = document.getElementById('comments');

    const steamIconPath = '../assets/img/Steam/steam_icon.webp';

    commentsObj.comments.forEach(function (comment) {
      // Crear elementos HTML para cada comentario
      var commentElement = document.createElement('div');
      commentElement.classList.add('card-body', 'p-4');

      var dFlexElement = document.createElement('div');
      dFlexElement.classList.add('d-flex', 'flex-start');

      // Crear el contenedor para el avatar y el icono de Steam
      var avatarContainer = document.createElement('div');
      avatarContainer.classList.add('avatar-container');

      // Crear el elemento para el avatar del usuario
      var avatarElement = document.createElement('img');
      avatarElement.classList.add('rounded-circle', 'shadow-1-strong', 'me-3');
      avatarElement.src = comment.avatar;
      avatarElement.alt = 'avatar';
      avatarElement.width = 60;
      avatarElement.height = 60;

      // Crear el elemento para el icono de Steam
      var steamIconElement = document.createElement('img');
      steamIconElement.src = steamIconPath;
      steamIconElement.alt = 'Steam';
      steamIconElement.classList.add('steam-icon');

      // Agregar el avatar y el icono de Steam al contenedor
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

      // Construir la estructura del comentario
      timestampElement.appendChild(timestampTextElement);
      contentContainer.appendChild(authorElement);
      contentContainer.appendChild(timestampElement);
      contentContainer.appendChild(contentElement);
      dFlexElement.appendChild(avatarContainer);
      dFlexElement.appendChild(contentContainer);
      commentElement.appendChild(dFlexElement);
      commentsContainer.appendChild(commentElement);
    });
    console.log('Displayed comments.');
  } catch (error) {
    console.error('Error displaying comments:', error);
  }
}

async function fetchCommentsFromWeb() {
  try {
    const response = await fetch('https://artur16211.github.io/steamguide_comments/comments.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();

    // Muestra los comentarios directamente en la página
    displayComments(JSON.stringify(jsonData));

    // Almacenar los datos JSON en el almacenamiento local para que puedan ser reutilizados
    localStorage.setItem('cachedJsonData', JSON.stringify(jsonData));
  } catch (error) {
    console.error('Error fetching the JSON data:', error);
  }
}

fetchCommentsFromWeb();

// Limpiar cache cuando la página se recargue
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('cachedJsonData');
});
