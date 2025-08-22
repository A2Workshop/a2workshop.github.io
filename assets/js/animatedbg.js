document.addEventListener('DOMContentLoaded', function () {
  const background = document.querySelector('.animated-background');

  const logoUrls = [
    '../../assets/img/BO1/logo.webp',
    '../../assets/img/BO3/logo.webp',
    '../../assets/img/IW/images.steamusercontent.jpeg',
    '../../assets/img/MWR/MWR.webp',
    '../../pq2/img/es_logo/blackbg.webp',
    '../../p4d/img/es_logo/blackbg.webp',
    '../../assets/img/LB2/icon.jpg'
  ];

  let currentMode = window.innerWidth <= 768 ? 'mobile' : 'desktop';

  for (let i = 0; i < 7; i++) {
    createLogo(logoUrls[i % logoUrls.length]);
  }

  function createLogo(imageUrl) {
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.style.backgroundImage = `url('${imageUrl}')`;

    const startY = Math.random() * 100;
    logo.style.top = `${startY}vh`;

    applyLogoSize(logo);

    const duration = 10 + Math.random() * 20;
    logo.style.animationDuration = `${duration}s`;

    const rotation = -20 + Math.random() * 40;
    logo.style.transform = `rotate(${rotation}deg)`;

    logo.style.animationDelay = `${Math.random() * 10}s`;
    logo.style.opacity = '0';

    background.appendChild(logo);
  }

  function applyLogoSize(logo) {
    const isMobile = window.innerWidth <= 768;
    const minSize = isMobile ? 20 : 40;
    const maxSize = isMobile ? 40 : 80;
    const size = minSize + Math.random() * (maxSize - minSize);
    logo.style.width = `${size}px`;
    logo.style.height = `${size}px`;
  }

  window.addEventListener('resize', function () {
    const newMode = window.innerWidth <= 768 ? 'mobile' : 'desktop';

    if (newMode !== currentMode) {
      currentMode = newMode;
      document.querySelectorAll('.logo').forEach(logo => applyLogoSize(logo));
    }
  });
});
