const initLazyMedia = () => {
  const videos = Array.from(document.querySelectorAll('video[data-autoplay-on-visible]'));
  if (!videos.length) return;

  if (!('IntersectionObserver' in window)) {
    videos.forEach((video) => video.play().catch(() => {}));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: '240px 0px' },
  );

  videos.forEach((video) => observer.observe(video));
};

document.addEventListener('astro:page-load', initLazyMedia);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyMedia, { once: true });
} else {
  initLazyMedia();
}
