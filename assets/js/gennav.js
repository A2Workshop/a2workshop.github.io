// prefix
const navbarConfigs = {
  default: {
    prefix: '../',
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp'
  },
  index: {
    prefix: '/',
    extraContainerClass: 'p-2',
    showLogo: false
  },
  contacto: {
    prefix: '',
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp'
  },
  pq2install: {
    prefix: '../../../',
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'pq2/img/a2logo/logo.webp',
    fullLogoPath: 'pq2/img/a2logo/full_logo.webp'
  },
  p4d: {
    prefix: '../../',
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp',
    boldProyecto: true,
    boldContacto: true
  }
};

// paths
const routesMap = {
  '/': 'index',
  '/index': 'index',
  '/index.html': 'index',
  '/contacto': 'contacto',
  '/contacto.html': 'contacto',
  '/traducciones/pq2espanol/descargar': 'pq2install',
  '/traducciones/pq2espanol/descargar.html': 'pq2install',
  '/traducciones/p4despanol': 'p4d',
  '/traducciones/p4despanol.html': 'p4d',
};

// items
const menuItems = [
  { href: '/proyectos/blackopsiiilatino.html', imgPath: 'assets/img/BO3/logo.webp', alt: 'bo3lalogo', text: '(PC) Call of Duty: Black Ops III Español Latino' },
  { href: '/proyectos/blackopslatino.html', imgPath: 'assets/img/BO1/logo.webp', alt: 'bolalogo', text: '(PC) Call of Duty: Black Ops Zombies Español Latino' },
  { href: '/proyectos/infinitewarfarelatino.html', imgPath: 'assets/img/IW/images.steamusercontent.jpeg', alt: 'iwlalogo', text: '(PC) Call of Duty: Infinite Warfare Español Latino' },
  { href: '/proyectos/modernwarfarerlatino.html', imgPath: 'assets/img/MWR/MWR.webp', alt: 'mwlalogo', text: '(PC) Call of Duty: Modern Warfare Remastered Español Latino' },
  { href: '/traducciones/pq2espanol.html', imgPath: 'pq2/img/es_logo/blackbg.webp', alt: 'pq2eslogo', text: '(3DS) Persona Q2 Traducción al Español' },
  { href: '/traducciones/p4despanol.html', imgPath: 'p4d/img/es_logo/blackbg.webp', alt: 'p4deslogo', text: '(PS4/PSV) Persona 4 Dancing Traducción al Español' }
];

function generarNavbar() {
  const ruta = window.location.pathname;
  const key = routesMap[ruta] || 'default';
  const config = navbarConfigs[key];
  const { prefix, extraContainerClass, showLogo, logoPath, fullLogoPath } = config;

  const itemsHTML = menuItems.map((item, i) => `
    <a href="${item.href}"${i > 0 ? ' class="disable-padding-top"' : ''}>
      <img src="${prefix}${item.imgPath}" alt="${item.alt}" style="width: 70px; height: 70px;"> ${item.text}
    </a>
  `).join('');

  const proyectoTexto = config.boldProyecto ? '<b>Proyectos</b>' : 'Proyectos';
  const contactoHTML = config.boldContacto
    ? '<a href="/contacto.html" class="contacto-hover"><b>Contacto</b></a>'
    : '<a href="/contacto.html" class="contacto-hover">Contacto</a>';

  let logosHTML = '';
  if (showLogo) {
    logosHTML = `
      <a href="/" class="hide-desktop2">
        <img src="${prefix}${logoPath}" alt="A2W" class="logo_nav">
      </a>
      <a href="/" class="hide-mobile2">
        <img src="${prefix}${fullLogoPath}" alt="A2WORKSHOP" class="logo_nav">
      </a>
    `;
  }

  const html = `
    <nav>
      <div class="nav-container ${extraContainerClass}">
        ${logosHTML}
        <div class="megamenu">
          <a href="#">${proyectoTexto}</a>
          <div class="megamenu-content">
            <button class="close-btn">&times;</button>
            ${itemsHTML}
          </div>
        </div>
        ${contactoHTML}
      </div>
    </nav>
  `;

  document.getElementById('navbar-container').innerHTML = html;

  $('.megamenu > a').off('click').on('click', function (e) {
    e.preventDefault();
    $('.megamenu-content').fadeIn();
  });
  $('.close-btn').off('click').on('click', function () {
    $('.megamenu-content').fadeOut();
  });
}

generarNavbar();