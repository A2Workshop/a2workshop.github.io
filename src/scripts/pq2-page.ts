const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  const video = document.querySelector<HTMLElement>('.video-overlay video');
  const fallback = document.querySelector<HTMLElement>('.fallback-image');
  if (video) video.style.display = 'none';
  if (fallback) fallback.style.display = 'block';
}

const initCarousel = (carousel: HTMLElement) => {
  const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.carousel-item'));
  if (!slides.length) return;

  let active = slides.findIndex((slide) => slide.classList.contains('active'));
  if (active < 0) {
    active = 0;
    slides[0].classList.add('active');
  }

  const setActive = (next: number) => {
    slides[active]?.classList.remove('active');
    active = (next + slides.length) % slides.length;
    slides[active]?.classList.add('active');
  };

  carousel.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-carousel-prev]')) setActive(active - 1);
    if (target?.closest('[data-carousel-next]')) setActive(active + 1);
  });
};

const initImageModal = () => {
  const dialog = document.getElementById('imageModal') as HTMLDialogElement | null;
  const modalImg = document.getElementById('modalImage') as HTMLImageElement | null;
  const items = Array.from(document.querySelectorAll<HTMLImageElement>('.pq2-modal-trigger'));
  const sources = items.map((el) => el.currentSrc || el.src);
  let current = 0;

  const show = (index: number) => {
    if (!sources.length) return;
    current = (index + sources.length) % sources.length;
    if (modalImg) modalImg.src = sources[current];
  };

  items.forEach((el, index) => {
    el.addEventListener('click', () => {
      show(index);
      dialog?.showModal();
    });
  });

  document.getElementById('prevImage')?.addEventListener('click', () => show(current - 1));
  document.getElementById('nextImage')?.addEventListener('click', () => show(current + 1));
  document.getElementById('modalClose')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('dblclick', (event) => event.preventDefault());
  let lastTouchEnd = 0;
  dialog?.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd < 350) event.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};

const syncBtn = () => {
  const btn = document.getElementById('downloadButton');
  if (btn) btn.textContent = location.hash === '#ts' ? 'Gu\u00eda de instalaci\u00f3n' : 'Descargar';
};
window.addEventListener('hashchange', syncBtn);

const initPage = () => {
  syncBtn();
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
  initImageModal();
};

document.addEventListener('astro:page-load', initPage);
