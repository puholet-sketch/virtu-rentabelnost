/** VIRTU Rentabelnost — report page */

function bindSmoothNav(links) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

bindSmoothNav(document.querySelectorAll('.top__nav a[href^="#"]'));
bindSmoothNav(document.querySelectorAll('.top__nav-mobile a[href^="#"]'));

/* Mobile nav toggle */
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.getElementById('report-nav-mobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const open = navMobile.hasAttribute('hidden');
    navMobile.toggleAttribute('hidden', !open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navMobile.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.setAttribute('hidden', '');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* PM tabs */
const pmTabs = document.querySelectorAll('.pm-tab');
const pmPanels = document.querySelectorAll('.pm-panel');

pmTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.pmTab;
    pmTabs.forEach((t) => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });
    pmPanels.forEach((p) => {
      p.classList.toggle('is-active', p.dataset.pmPanel === id);
    });
  });
});

/* Mobile tooltips — tap to toggle */
if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.tip').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = el.classList.contains('is-open');
      document.querySelectorAll('.tip.is-open').forEach((t) => t.classList.remove('is-open'));
      if (!wasOpen) el.classList.add('is-open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.tip.is-open').forEach((t) => t.classList.remove('is-open'));
  });
}

/* PM cards — scroll to tab on click */
document.querySelectorAll('.pm-card[data-pm]').forEach((card) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const id = card.dataset.pm;
    const tab = document.querySelector(`.pm-tab[data-pm-tab="${id}"]`);
    if (tab) {
      tab.click();
      document.getElementById('pm-cards')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
