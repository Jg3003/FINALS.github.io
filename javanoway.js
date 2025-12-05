window.addEventListener('scroll', () => {
    const targets = [
        { element: document.getElementById('head'), class: 'seehead' },
        { element: document.getElementById('yapaa'), class: 'seeyap' },
        { element: document.getElementById('bouty'), class: 'seehead' },
        { element: document.getElementById('yapab'), class: 'seeyap' }
    ];

    targets.forEach(t => {
        const pos = t.element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (pos < screenHeight * 0.75) {
            t.element.classList.add(t.class);
        } else {
            t.element.classList.remove(t.class);
        }
    });
});
/*scroll shenanigans1*/
window.addEventListener('scroll', function() {
    if (this.window.scrollY > 600) {
        this.document.body.classList.add('scrolled-color');
    } else {
        this.document.body.classList.remove('scrolled-color');
    }
});
/*CAROUSEL*/
document.addEventListener('DOMContentLoaded', () => {
  const explanation = document.getElementById('explanation');
  const explanations = [
    'REZE       - The bomb hybrid.',
    'HIMENO     - The arrow hybrid.',
    'MAKIMA     - The control devil.',
    'ASA/YORU   - The human and war devil.',
    'POWER      - The blood fiend.',
    'FAMI       - The death devil.'
  ];
  const radios = Array.from(document.querySelectorAll('input[name="slider"]'));
  const labels = Array.from(document.querySelectorAll('.card-thumb'));
  const marquee = document.querySelector('.marquee-track');
  function setExplanationForIndex(index) {
    if (index >= 0 && explanations[index]) {
      explanation.textContent = explanations[index];
    } else {
      explanation.textContent = 'Click a card to see its explanation here.';
    }
    explanation.classList.add('visible');
  }

  function setExplanationForChecked() {
    const checkedIndex = radios.findIndex(r => r.checked);
    setExplanationForIndex(checkedIndex);
    labels.forEach(l => l.classList.remove('active'));
    const idx = checkedIndex + 1;
    if (idx > 0) {
      const sel = document.querySelector(`label.card-thumb[for="s${idx}"]`);
      if (sel) sel.classList.add('active');
    }
  }

  radios.forEach(radio => radio.addEventListener('change', setExplanationForChecked));

  labels.forEach(label => {
    label.addEventListener('click', (e) => {
      const f = label.getAttribute('for');
      if (!f) return;
      const target = document.getElementById(f);
      if (target) {
        setTimeout(() => {
          setExplanationForChecked();
          target.focus({ preventScroll: true });
        }, 10);
      }
    });
  });

  setExplanationForChecked();

  function setupMarquee() {
    if (!marquee) return;
    const totalScrollWidth = marquee.scrollWidth;
    const distance = totalScrollWidth / 2;
    const pxPerSec = 60;
    let durationSec = Math.max(10, distance / pxPerSec);
    marquee.style.setProperty('--marquee-distance', `${distance}px`);
    marquee.style.setProperty('--marquee-duration', `${durationSec}s`);
    marquee.style.animation = 'none';
    marquee.offsetHeight;
    marquee.style.animation = '';
  }

  setupMarquee();
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setupMarquee();
    }, 150);
  });

  const imgs = marquee ? marquee.querySelectorAll('img') : [];
  let loaded = 0;
  if (imgs.length > 0) {
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === imgs.length) setupMarquee();
        });
      }
    });
    if (loaded === imgs.length) setupMarquee();
  }
});