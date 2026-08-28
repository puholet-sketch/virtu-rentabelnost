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

/* Smart tooltips — fixed positioning, viewport-aware (escapes overflow clip) */
(function initSmartTooltips() {
  document.documentElement.classList.add('js-tips');

  const GAP = 8;
  const PAD = 16;
  let floater = null;
  let activeTip = null;

  function getFloater() {
    if (!floater) {
      floater = document.createElement('div');
      floater.className = 'tip-float';
      floater.hidden = true;
      document.body.appendChild(floater);
    }
    return floater;
  }

  function positionFloater(el) {
    const text = el.getAttribute('data-tip');
    if (!text) return;

    const f = getFloater();
    f.textContent = text;
    f.hidden = false;

    const rect = el.getBoundingClientRect();
    const fRect = f.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - fRect.width / 2;
    left = Math.max(PAD, Math.min(left, window.innerWidth - fRect.width - PAD));

    let top = rect.bottom + GAP;
    if (top + fRect.height > window.innerHeight - PAD) {
      top = rect.top - fRect.height - GAP;
    }
    top = Math.max(PAD, top);

    f.style.left = `${left}px`;
    f.style.top = `${top}px`;
    activeTip = el;
  }

  function hideFloater() {
    if (floater) floater.hidden = true;
    activeTip = null;
  }

  function closeAllTips() {
    document.querySelectorAll('.tip.is-open').forEach((t) => t.classList.remove('is-open'));
    hideFloater();
  }

  const isTouch = window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.tip[data-tip]').forEach((el) => {
    if (isTouch) {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = el.classList.contains('is-open');
        closeAllTips();
        if (!wasOpen) {
          el.classList.add('is-open');
          positionFloater(el);
        }
      });
    } else {
      el.addEventListener('mouseenter', () => positionFloater(el));
      el.addEventListener('focus', () => positionFloater(el));
      el.addEventListener('mouseleave', hideFloater);
      el.addEventListener('blur', hideFloater);
    }
  });

  if (isTouch) {
    document.addEventListener('click', closeAllTips);
  }

  window.addEventListener(
    'scroll',
    () => {
      if (activeTip && floater && !floater.hidden) positionFloater(activeTip);
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    if (activeTip && floater && !floater.hidden) positionFloater(activeTip);
  });
})();

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
