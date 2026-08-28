/** VIRTU Rentabelnost — report page */
document.querySelectorAll('.top__nav a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

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
