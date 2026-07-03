// Detecta la raíz real del sitio aunque estés en /proyectos/, /traducciones/, GitHub Pages o local.
function getA2SiteRoot() {
  const currentScript =
    document.currentScript ||
    [...document.scripts].find((script) => script.src && script.src.includes('navbar'));

  if (currentScript?.src) {
    const scriptUrl = currentScript.src;

    const knownFolders = [
      '/assets/js/',
      '/assets/scripts/',
      '/js/',
      '/scripts/'
    ];

    for (const folder of knownFolders) {
      const index = scriptUrl.lastIndexOf(folder);

      if (index !== -1) {
        return scriptUrl.slice(0, index + 1);
      }
    }

    return new URL('.', scriptUrl).href;
  }

  const path = window.location.pathname;
  const cleanPath = path.replace(/\/$/, '');
  const parts = cleanPath.split('/').filter(Boolean);
  const lastPart = parts.at(-1) || '';

  let depth = 0;

  if (parts.length > 0) {
    depth = lastPart.includes('.') ? parts.length - 1 : parts.length;
  }

  return '../'.repeat(depth);
}

const A2_SITE_ROOT = getA2SiteRoot();

function sitePath(path) {
  return new URL(String(path).replace(/^\/+/, ''), A2_SITE_ROOT).href;
}

const navbarConfigs = {
  default: {
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp'
  },
  index: {
    extraContainerClass: 'p-2',
    showLogo: false
  },
  contacto: {
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp',
    boldContacto: true
  },
  gamebanana: {
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp',
    boldGameBanana: true
  },
  pq2install: {
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'pq2/img/a2logo/logo.webp',
    fullLogoPath: 'pq2/img/a2logo/full_logo.webp',
    boldProyecto: true
  },
  p4d: {
    extraContainerClass: '',
    showLogo: true,
    logoPath: 'assets/img/A2/logo.webp',
    fullLogoPath: 'assets/img/A2/full_logo.webp',
    boldProyecto: true,
    boldContacto: true
  }
};

const menuItems = [
  {
    href: 'proyectos/blackopsiiilatino.html',
    imgPath: 'assets/img/BO3/logo.webp',
    alt: 'bo3lalogo',
    text: '(PC) Call of Duty: Black Ops III Español Latino'
  },
  {
    href: 'proyectos/blackopslatino.html',
    imgPath: 'assets/img/BO1/logo.webp',
    alt: 'bolalogo',
    text: '(PC) Call of Duty: Black Ops Zombies Español Latino'
  },
  {
    href: 'proyectos/infinitewarfarelatino.html',
    imgPath: 'assets/img/IW/images.steamusercontent.jpeg',
    alt: 'iwlalogo',
    text: '(PC) Call of Duty: Infinite Warfare Español Latino'
  },
  {
    href: 'proyectos/modernwarfarerlatino.html',
    imgPath: 'assets/img/MWR/MWR.webp',
    alt: 'mwlalogo',
    text: '(PC) Call of Duty: Modern Warfare Remastered Español Latino'
  },
  {
    href: 'proyectos/legobatman2latino.html',
    imgPath: 'assets/img/LB2/icon.jpg',
    alt: 'legobatman2latino',
    text: '(PC) Lego Batman 2 en Español Latino'
  },
  {
    href: 'traducciones/pq2espanol.html',
    imgPath: 'pq2/img/es_logo/blackbg.webp',
    alt: 'pq2eslogo',
    text: '(3DS) Persona Q2 Traducción al Español'
  },
  {
    href: 'traducciones/p4despanol.html',
    imgPath: 'p4d/img/es_logo/blackbg.webp',
    alt: 'p4deslogo',
    text: '(PS4/PSV) Persona 4 Dancing Traducción al Español'
  }
];

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizePath(pathname) {
  let path = pathname.toLowerCase();

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path;
}

function getNavbarKey(pathname) {
  const ruta = normalizePath(pathname);

  if (
    ruta === '/' ||
    ruta.endsWith('/index') ||
    ruta.endsWith('/index.html')
  ) {
    return 'index';
  }

  if (
    ruta.endsWith('/contacto') ||
    ruta.endsWith('/contacto.html')
  ) {
    return 'contacto';
  }

  if (
    ruta.endsWith('/gamebanana') ||
    ruta.endsWith('/gamebanana.html')
  ) {
    return 'gamebanana';
  }

  if (
    ruta.endsWith('/traducciones/pq2espanol/descargar') ||
    ruta.endsWith('/traducciones/pq2espanol/descargar.html')
  ) {
    return 'pq2install';
  }

  if (
    ruta.endsWith('/traducciones/p4despanol') ||
    ruta.endsWith('/traducciones/p4despanol.html')
  ) {
    return 'p4d';
  }

  return 'default';
}

function isProjectRelatedPage(pathname, config) {
  const ruta = normalizePath(pathname);

  return Boolean(
    config.boldProyecto ||
    ruta.includes('/proyectos/') ||
    ruta.includes('/traducciones/')
  );
}

function generarNavbar() {
  const ruta = window.location.pathname;
  const key = getNavbarKey(ruta);
  const config = navbarConfigs[key] || navbarConfigs.default;

  const {
    extraContainerClass = '',
    showLogo = true,
    logoPath = 'assets/img/A2/logo.webp',
    fullLogoPath = 'assets/img/A2/full_logo.webp'
  } = config;

  const itemsHTML = menuItems.map((item, i) => `
    <a href="${escapeHtml(sitePath(item.href))}"${i > 0 ? ' class="disable-padding-top"' : ''}>
      <img src="${escapeHtml(sitePath(item.imgPath))}" alt="${escapeHtml(item.alt)}" style="width: 70px; height: 70px;">
      ${escapeHtml(item.text)}
    </a>
  `).join('');

  const proyectoTexto = isProjectRelatedPage(ruta, config) ? '<b>Proyectos</b>' : 'Proyectos';
  const contactoTexto = config.boldContacto ? '<b>Contacto</b>' : 'Contacto';
  const gameBananaTexto = config.boldGameBanana ? '<b>GameBanana</b>' : 'GameBanana';

  const contactoHTML = `
    <a href="${escapeHtml(sitePath('contacto.html'))}" class="contacto-hover nav-main-link">
      ${contactoTexto}
    </a>
  `;

  const gameBananaHTML = `
    <a href="${escapeHtml(sitePath('gamebanana.html'))}" class="gamebanana-hover nav-main-link">
      ${gameBananaTexto}
    </a>
  `;

  let logosHTML = '';

  if (showLogo) {
    logosHTML = `
      <div class="nav-brand">
        <a href="${escapeHtml(sitePath('index.html'))}" class="hide-desktop2">
          <img src="${escapeHtml(sitePath(logoPath))}" alt="A2W" class="logo_nav">
        </a>
        <a href="${escapeHtml(sitePath('index.html'))}" class="hide-mobile2">
          <img src="${escapeHtml(sitePath(fullLogoPath))}" alt="A2WORKSHOP" class="logo_nav">
        </a>
      </div>
    `;
  }

  const html = `
    <nav class="a2-navbar a2-navbar-${escapeHtml(key)}">
      <div class="nav-container ${escapeHtml(extraContainerClass)}">
        ${logosHTML}

        <div class="nav-links">
          <div class="megamenu">
            <a href="#" class="nav-main-link">${proyectoTexto}</a>

            <div class="megamenu-content">
              <button class="close-btn" type="button" aria-label="Cerrar menú">&times;</button>
              ${itemsHTML}
            </div>
          </div>

          ${contactoHTML}
          ${gameBananaHTML}
        </div>
      </div>
    </nav>
  `;

  const navbarContainer = document.getElementById('navbar-container');

  if (!navbarContainer) {
    return;
  }

  navbarContainer.classList.remove(
    'navbar-page-index',
    'navbar-page-contacto',
    'navbar-page-gamebanana',
    'navbar-page-default',
    'navbar-page-pq2install',
    'navbar-page-p4d'
  );

  navbarContainer.classList.add(`navbar-page-${key}`);
  navbarContainer.innerHTML = html;

  $('.megamenu > a').off('click').on('click', function (e) {
    e.preventDefault();
    $('.megamenu-content').fadeIn();
  });

  $('.close-btn').off('click').on('click', function () {
    $('.megamenu-content').fadeOut();
  });

  $(document).off('keydown.navbar').on('keydown.navbar', function (e) {
    if (e.key === 'Escape') {
      $('.megamenu-content').fadeOut();
    }
  });
}

generarNavbar();