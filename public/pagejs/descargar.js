(function () {
  'use strict';

  var GUIDES = ['instalacion', 'extras', 'faq'];

  /* ----------------------------- Guide tabs ----------------------------- */
  function selectGuide(guide, scrollTo) {
    if (GUIDES.indexOf(guide) === -1) guide = 'instalacion';

    GUIDES.forEach(function (g) {
      var section = document.getElementById('guide-' + g);
      if (section) section.classList.toggle('hidden', g !== guide);
    });

    document.querySelectorAll('button[data-guide]').forEach(function (btn) {
      btn.classList.toggle('disabled-guide', btn.getAttribute('data-guide') !== guide);
    });

    if (guide === 'extras' || guide === 'faq') {
      localStorage.removeItem('selectedDevice');
      localStorage.removeItem('selectedMethod');
    }

    window.location.hash = scrollTo ? '#' + guide + '&section=' + scrollTo : '#' + guide;

    if (guide === 'extras') {
      requestAnimationFrame(openDefaultExtrasAccordions);
    }

    if (scrollTo) {
      setTimeout(function () {
        var el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  /* -------------------------- Method / device --------------------------- */
  var activeMethod = null;

  function setPlaceholder(containerId, show) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var p = container.querySelector(':scope > p');
    if (p) p.classList.toggle('hidden', !show);
  }

  function selectMethod(method) {
    var patch = document.getElementById('patchrom_btn');
    var layer = document.getElementById('layerfs_btn');
    var parcheo = document.getElementById('method-parcheo');
    var layerfs = document.getElementById('method-layerfs');

    // Toggle off if the active method is clicked again.
    if (activeMethod === method) {
      activeMethod = null;
      patch.classList.remove('active-btn');
      layer.classList.remove('active-btn');
      parcheo.classList.add('hidden');
      layerfs.classList.add('hidden');
      setPlaceholder('method-content', true);
      localStorage.removeItem('selectedDevice');
      localStorage.removeItem('selectedMethod');
      return;
    }

    activeMethod = method;
    setPlaceholder('method-content', false);

    if (method === 'parcheo') {
      localStorage.removeItem('selectedDevice');
      localStorage.setItem('selectedMethod', 'parcheo');
      patch.classList.add('active-btn');
      layer.classList.remove('active-btn');
      parcheo.classList.remove('hidden');
      layerfs.classList.add('hidden');
    } else if (method === 'layerfs') {
      localStorage.removeItem('selectedMethod');
      layer.classList.add('active-btn');
      patch.classList.remove('active-btn');
      layerfs.classList.remove('hidden');
      parcheo.classList.add('hidden');
    }
  }

  function selectDevice(type) {
    localStorage.setItem('selectedDevice', type);
    setPlaceholder('content-device', false);

    ['console', 'android', 'pc'].forEach(function (t) {
      var el = document.getElementById('device-' + t);
      if (el) el.classList.toggle('hidden', t !== type);
    });

    document.querySelectorAll('.btn-design').forEach(function (btn) {
      btn.classList.remove('active-btn');
    });
    var layer = document.getElementById('layerfs_btn');
    var patch = document.getElementById('patchrom_btn');
    if (layer) layer.classList.add('active-btn');
    if (patch) patch.classList.remove('active-btn');
    var deviceBtn = document.querySelector('[data-device="' + type + '"]');
    if (deviceBtn) deviceBtn.classList.add('active-btn');
  }

  /* --------------------- Collapse / accordion (native) ------------------ */
  function setCollapseHeight(panel) {
    if (!panel) return;
    panel.style.setProperty('--collapse-height', panel.scrollHeight + 'px');
  }

  function setCollapseOpen(panel, open) {
    setCollapseHeight(panel);
    panel.classList.toggle('is-open', open);
    if (open) {
      requestAnimationFrame(function () { setCollapseHeight(panel); });
    }
  }

  function toggleCollapse(target, group) {
    if (group) {
      document
        .querySelectorAll('[data-accordion="' + group + '"] .collapsible.is-open')
        .forEach(function (panel) {
          if (panel !== target) {
            setCollapseOpen(panel, false);
            var entry = panel.closest && panel.closest('.creator-entry');
            if (entry) entry.classList.remove('is-expanded');
            markButton(panel.id, true);
          }
        });
    }
    var willOpen = !target.classList.contains('is-open');
    setCollapseOpen(target, willOpen);
    var creatorEntry = target.closest && target.closest('.creator-entry');
    if (creatorEntry) creatorEntry.classList.toggle('is-expanded', willOpen);
    markButton(target.id, !willOpen);
  }

  function markButton(panelId, collapsed) {
    var btn = document.querySelector('[data-collapse-target="#' + panelId + '"]');
    if (btn) btn.classList.toggle('collapsed', collapsed);
  }

  function openDefaultExtrasAccordions() {
    ['collapseOne', 'collapseFour'].forEach(function (id) {
      var panel = document.getElementById(id);
      if (!panel) return;
      setCollapseOpen(panel, true);
      markButton(id, false);
    });
  }

  /* ---------------------------- Delegation ------------------------------ */
  document.addEventListener('click', function (e) {
    var guideBtn = e.target.closest('[data-guide]');
    if (guideBtn) {
      e.preventDefault();
      selectGuide(guideBtn.getAttribute('data-guide'), guideBtn.getAttribute('data-scroll'));
      return;
    }

    var methodBtn = e.target.closest('[data-method]');
    if (methodBtn) {
      e.preventDefault();
      selectMethod(methodBtn.getAttribute('data-method'));
      return;
    }

    var deviceBtn = e.target.closest('[data-device]');
    if (deviceBtn) {
      e.preventDefault();
      selectDevice(deviceBtn.getAttribute('data-device'));
      return;
    }

    var collapseBtn = e.target.closest('[data-collapse-target]');
    if (collapseBtn) {
      e.preventDefault();
      var sel = collapseBtn.getAttribute('data-collapse-target');
      var target = sel && document.querySelector(sel);
      if (target) {
        saveComparatorPositions(target);
        toggleCollapse(target, collapseBtn.getAttribute('data-collapse-group'));
      }
      return;
    }

    var scrollLink = e.target.closest('[data-scroll]');
    if (scrollLink && !scrollLink.hasAttribute('data-guide')) {
      e.preventDefault();
      var el = document.getElementById(scrollLink.getAttribute('data-scroll'));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* --------------------------- Image comparator ------------------------- */
  function initComparator(comparator) {
    var afterImage = comparator.querySelector('.image-after');
    var slider = comparator.querySelector('.slider');
    if (!afterImage || !slider) return;
    var isDragging = false;

    var saved = comparator.getAttribute('data-slider-position');
    if (saved) {
      afterImage.style.clipPath = 'inset(0 0 0 ' + saved + '%)';
      slider.style.left = saved + '%';
    }

    function update(clientX) {
      var rect = comparator.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(pct, 100));
      afterImage.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      slider.style.left = pct + '%';
      comparator.setAttribute('data-slider-position', pct);
    }

    slider.addEventListener('mousedown', function (e) { isDragging = true; e.preventDefault(); });
    document.addEventListener('mousemove', function (e) { if (isDragging) update(e.clientX); });
    document.addEventListener('mouseup', function () { isDragging = false; });
    slider.addEventListener('touchstart', function (e) { isDragging = true; e.preventDefault(); });
    document.addEventListener('touchmove', function (e) { if (isDragging) update(e.touches[0].clientX); });
    document.addEventListener('touchend', function () { isDragging = false; });
  }

  function saveComparatorPositions(panel) {
    var comparator = panel.querySelector && panel.querySelector('.image-comparator');
    if (comparator) {
      var left = comparator.querySelector('.slider').style.left;
      if (left) comparator.setAttribute('data-slider-position', parseFloat(left));
    }
  }

  function loadFromHash() {
    var hash = window.location.hash.substring(1);
    var parts = hash.split('&');
    var guide = parts[0] || 'instalacion';
    var sub = null;
    var sectionParam = parts.find(function (p) { return p.indexOf('section=') === 0; });
    if (sectionParam) sub = sectionParam.split('=')[1];

    if (GUIDES.indexOf(guide) !== -1) selectGuide(guide, sub);
    else selectGuide('instalacion');

    var savedMethod = localStorage.getItem('selectedMethod');
    var savedDevice = localStorage.getItem('selectedDevice');
    if (savedMethod === 'parcheo') selectMethod('parcheo');
    if (savedDevice) {
      selectMethod('layerfs');
      selectDevice(savedDevice);
    }
  }

  function resizeHandler() {
    document.querySelectorAll('.collapsible.is-open').forEach(setCollapseHeight);
  }

  document.addEventListener('astro:page-load', function () {
    document.querySelectorAll('.collapsible').forEach(setCollapseHeight);
    openDefaultExtrasAccordions();
    document.querySelectorAll('.image-comparator').forEach(initComparator);

    loadFromHash();
    window.removeEventListener('hashchange', loadFromHash);
    window.addEventListener('hashchange', loadFromHash);

    window.removeEventListener('resize', resizeHandler);
    window.addEventListener('resize', resizeHandler);

    // Safari <video> fallback.
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var video = document.querySelector('.video-overlay video');
    var fallback = document.querySelector('.fallback-image');
    if (video && fallback) {
      video.style.display = isSafari ? 'none' : '';
      fallback.style.display = isSafari ? 'block' : 'none';
    }
  });
})();
