const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isVisible(el: HTMLElement): boolean {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function initDrawer(trigger: HTMLElement): void {
  const id = trigger.getAttribute('data-drawer-trigger');
  if (!id) return;

  const panel = document.getElementById(id);
  if (!panel || panel.dataset.drawerReady === 'true') return;
  panel.dataset.drawerReady = 'true';

  const backdrop = document.getElementById(`${id}-backdrop`);
  const breakpoint = Number(panel.dataset.drawerBreakpoint || '1200');

  let isOpen = false;
  let lastFocused: HTMLElement | null = null;

  const isMobile = () => window.innerWidth < breakpoint;
  const focusables = () =>
    Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isVisible);

  // Closed mobile overlays must not stay reachable by keyboard or screen reader.
  function syncClosedA11y(): void {
    if (isMobile() && !isOpen) {
      panel.setAttribute('aria-hidden', 'true');
      panel.setAttribute('inert', '');
    } else {
      panel.removeAttribute('aria-hidden');
      panel.removeAttribute('inert');
    }
  }

  function open(): void {
    if (isOpen || !isMobile()) return;
    isOpen = true;
    lastFocused = document.activeElement as HTMLElement | null;

    panel.setAttribute('data-open', '');
    panel.removeAttribute('inert');
    panel.removeAttribute('aria-hidden');
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.setAttribute('data-open', '');
    }
    trigger.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('drawer-lock');
    document.body.classList.add('drawer-lock');

    const target = focusables()[0] || panel;
    window.requestAnimationFrame(() => target.focus());
  }

  function close(restoreFocus = true): void {
    if (!isOpen) return;
    isOpen = false;

    panel.removeAttribute('data-open');
    if (backdrop) {
      backdrop.removeAttribute('data-open');
      backdrop.hidden = true;
    }
    trigger.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('drawer-lock');
    document.body.classList.remove('drawer-lock');
    syncClosedA11y();

    if (restoreFocus && lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  trigger.addEventListener('click', () => (isOpen ? close() : open()));
  panel
    .querySelectorAll<HTMLElement>('[data-drawer-close]')
    .forEach((btn) => btn.addEventListener('click', () => close()));
  backdrop?.addEventListener('click', () => close());

  panel.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) close();
  });

  panel
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((link) => link.addEventListener('click', () => isMobile() && close()));

  let resizeScheduled = false;
  window.addEventListener('resize', () => {
    if (resizeScheduled) return;
    resizeScheduled = true;
    window.requestAnimationFrame(() => {
      resizeScheduled = false;
      if (!isMobile()) close(false);
      syncClosedA11y();
    });
  });

  syncClosedA11y();
}

function initAll(): void {
  document
    .querySelectorAll<HTMLElement>('[data-drawer-trigger]')
    .forEach(initDrawer);
}

if (document.readyState !== 'loading') initAll();
else document.addEventListener('DOMContentLoaded', initAll);
