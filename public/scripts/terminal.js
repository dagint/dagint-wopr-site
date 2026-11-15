// Progressive enhancement: normal links and page content never depend on the intro.
(() => {
  const button = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (button && menu) {
    menu.classList.add('hidden');
    button.hidden = false;
  }
  button?.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('hidden');
    document.getElementById('menu-icon-open')?.classList.toggle('hidden');
    document.getElementById('menu-icon-close')?.classList.toggle('hidden');
  });

  const palette = document.getElementById('phosphor-palette');
  try {
    if (sessionStorage.getItem('dg-phosphor') === 'amber') palette.value = 'amber';
  } catch { /* Storage is optional. */ }
  document.documentElement.dataset.phosphor = palette.value;
  palette.addEventListener('change', () => {
    document.documentElement.dataset.phosphor = palette.value;
    try { sessionStorage.setItem('dg-phosphor', palette.value); } catch { /* Optional. */ }
  });
  document.getElementById('terminal-controls').hidden = false;

  const start = document.getElementById('boot-start');
  const intro = document.getElementById('boot-intro');
  const skip = document.getElementById('boot-skip');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let played = false;
  let timer;
  try { played = sessionStorage.getItem('dg-boot-played') === '1'; } catch { /* Optional. */ }
  start.hidden = played;
  const finish = () => {
    clearTimeout(timer);
    // Restore focus only if it is still inside the disappearing panel.
    const restoreFocus = intro.contains(document.activeElement);
    intro.hidden = true;
    if (restoreFocus) palette.focus();
  };
  start.addEventListener('click', () => {
    if (played) return;
    played = true;
    try { sessionStorage.setItem('dg-boot-played', '1'); } catch { /* Once per page without storage. */ }
    start.hidden = true;
    intro.hidden = false;
    skip.focus();
    // Reduced motion shows the complete static transcript, dismissed manually.
    if (!reducedMotion.matches) timer = setTimeout(finish, 4000);
  });
  skip.addEventListener('click', finish);
  intro.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') finish();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) clearTimeout(timer);
  });
})();
