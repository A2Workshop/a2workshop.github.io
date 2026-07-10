const currentUrl = new URL(window.location.href);
const queryLang = currentUrl.searchParams.get('lang');
const activeLang = queryLang === 'en' || queryLang === 'es'
  ? queryLang
  : currentUrl.pathname === '/en' || currentUrl.pathname.startsWith('/en/')
    ? 'en'
    : null;

if (activeLang === 'en' || activeLang === 'es') {
  const withLang = (href) => {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return href;
    url.searchParams.set('lang', activeLang);
    return `${url.pathname}${url.search}${url.hash}`;
  };

  const syncLink = (link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    link.href = withLang(href);
  };

  const syncAllLinks = () => {
    document.querySelectorAll('a[href]').forEach(syncLink);
  };

  const translateSharedChrome = () => {
    if (activeLang !== 'en') return;

    document.querySelectorAll('[data-en-text]').forEach((element) => {
      const text = element.dataset.enText;
      if (text) element.textContent = text;
    });

    document.querySelectorAll('[data-en-href]').forEach((link) => {
      const href = link.dataset.enHref;
      if (href) link.href = withLang(href);
    });

    document.querySelectorAll('[data-en-html]').forEach((element) => {
      const html = element.dataset.enHtml;
      if (html) element.innerHTML = html;
    });

    const orderedParents = new Set();
    document.querySelectorAll('[data-en-order]').forEach((element) => {
      const parent = element.parentElement;
      if (!parent || orderedParents.has(parent)) return;
      orderedParents.add(parent);
      const ordered = Array.from(parent.children)
        .filter((child) => child instanceof HTMLElement && child.dataset.enOrder !== undefined)
        .sort((a, b) => Number(a.dataset.enOrder) - Number(b.dataset.enOrder));
      ordered.forEach((child) => parent.appendChild(child));
      if (ordered.some((child) => child.classList.contains('disable-padding-top'))) {
        ordered.forEach((child, index) => child.classList.toggle('disable-padding-top', index > 0));
      }
    });

    const closeBtn = document.querySelector('[data-close-menu-en]');
    closeBtn?.setAttribute('aria-label', closeBtn.dataset.closeMenuEn ?? 'Close menu');

    const pathname = window.location.pathname.toLowerCase();
    const isAtlusPage = pathname.includes('/pq2espanol') || pathname.includes('/p4despanol');
    const isLegoPage = pathname.includes('/legobatman2latino');
    const footerText = isLegoPage
      ? 'This project is not affiliated with LEGO Group, Warner Bros. or TT Games. All rights reserved by their respective owners.'
      : isAtlusPage
        ? 'This project is not affiliated with ATLUS or SEGA. All rights reserved by their respective owners.'
        : 'This project is not affiliated with the mentioned brands. All rights reserved by their respective owners.';

    document
      .querySelectorAll('.footer .copyright-text, .p4d-footer .copyright-text, .pq2-footer p')
      .forEach((element) => {
        element.textContent = footerText;
      });
  };

  syncAllLinks();
  translateSharedChrome();

  document.addEventListener('DOMContentLoaded', syncAllLinks);
  document.addEventListener('DOMContentLoaded', translateSharedChrome);
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (link) syncLink(link);
  }, true);
}
