function initComparator(comparator: HTMLElement) {
  const after = comparator.querySelector<HTMLElement>('.image-after');
  const slider = comparator.querySelector<HTMLElement>('.slider');
  const labels = comparator.querySelector<HTMLElement>('.comparator-labels');
  const leftLabel = labels?.querySelector<HTMLElement>('.label-left');
  const rightLabel = labels?.querySelector<HTMLElement>('.label-right');
  if (!after || !slider || !leftLabel || !rightLabel) return;

  let dragging = false;
  let pct = 50;

  const paint = (position: number) => {
    pct = Math.max(0, Math.min(100, position));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    slider.style.left = `${pct}%`;
    leftLabel.classList.toggle('hidden', pct <= 20);
    rightLabel.classList.toggle('hidden', pct >= 75);
  };

  const move = (clientX: number) => {
    const rect = comparator.getBoundingClientRect();
    paint(((clientX - rect.left) / rect.width) * 100);
  };

  paint(50);
  slider.addEventListener('mousedown', (event) => {
    dragging = true;
    event.preventDefault();
  });
  document.addEventListener('mousemove', (event) => dragging && move(event.clientX));
  document.addEventListener('mouseup', () => {
    dragging = false;
  });
  slider.addEventListener('touchstart', (event) => {
    dragging = true;
    event.preventDefault();
  }, { passive: false });
  document.addEventListener('touchmove', (event) => dragging && move(event.touches[0].clientX));
  document.addEventListener('touchend', () => {
    dragging = false;
  });
}

const comparators = Array.from(document.querySelectorAll<HTMLElement>('.image-comparator'))
  .filter((comparator) => !comparator.closest('[data-sc-clone]'));
comparators.forEach(initComparator);

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.p4d-slide'));
  if (!slides.length) return;

  let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  const setActive = (next: number) => {
    slides[active]?.classList.remove('active');
    active = (next + slides.length) % slides.length;
    slides[active]?.classList.add('active');
  };

  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => setActive(active - 1));
  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => setActive(active + 1));
});

const dialog = document.getElementById('imageModal') as HTMLDialogElement | null;
const modalImg = document.getElementById('modalImage') as HTMLImageElement | null;
const label = document.getElementById('imageLabel');
const gallery: string[] = [];

comparators.forEach((comparator) => {
  const before = comparator.querySelector<HTMLImageElement>('.image-before');
  const after = comparator.querySelector<HTMLImageElement>('.image-after');
  if (before) gallery.push(before.src);
  if (after) gallery.push(after.src);
});

let current = 0;
const show = (index: number) => {
  if (!gallery.length) return;

  current = (index + gallery.length) % gallery.length;
  const src = gallery[current];
  if (modalImg) modalImg.src = src;
  if (!label) return;

  if (src.includes('_ps4')) {
    label.textContent = 'PS4';
    label.style.display = 'block';
  } else if (src.includes('_psv')) {
    label.textContent = 'PS Vita';
    label.style.display = 'block';
  } else {
    label.style.display = 'none';
  }
};

comparators.forEach((comparator, index) => {
  comparator.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.classList.contains('slider')) return;

    const rect = comparator.getBoundingClientRect();
    show(event.clientX - rect.left < rect.width / 2 ? index * 2 : index * 2 + 1);
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

const arrow = document.getElementById('scrollDownArrow');
window.addEventListener('scroll', () => {
  arrow?.classList.toggle('visible', window.scrollY < 200);
});
arrow?.classList.add('visible');
arrow?.addEventListener('click', () => {
  document.getElementById('p4d-gallery')?.scrollIntoView({ behavior: 'smooth' });
});
