(() => {
  const hero = document.querySelector('.fs-hero');
  const stage = document.querySelector('.hero-stage');
  const character = document.querySelector('.hero-character');
  const logo = document.querySelector('.logo-button');
  const feedback = document.querySelector('.hero-feedback');
  const tabs = [...document.querySelectorAll('.hero-step')];
  const dots = [...document.querySelectorAll('.feedback-dots i')];
  const motion = document.querySelector('.hero-motion');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [
    ['Your practice, in focus', 'Start with your clip.', 'Choose a figure. Add a practice video.'],
    ['See the details', 'Catch the little things.', 'Review your body line, height and alignment.'],
    ['Make your next move', 'Know what to work on.', 'Find your focus for the next practice.']
  ];
  let active = 0;
  let paused = reduced.matches;
  let rotationTimer;

  function scheduleRotation() {
    clearTimeout(rotationTimer);
    if (paused || document.hidden || document.body.dataset.page !== 'home' || tabs.includes(document.activeElement)) return;
    rotationTimer = setTimeout(() => selectStep((active + 1) % scenes.length, false), 5000);
  }

  function selectStep(index, manual = true) {
    active = index;
    feedback.setAttribute('aria-live', manual ? 'polite' : 'off');
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === active));
      tab.tabIndex = i === active ? 0 : -1;
      dots[i].classList.toggle('is-active', i === active);
    });
    feedback.setAttribute('aria-labelledby', tabs[active].id);
    feedback.querySelector('.feedback-kicker').textContent = scenes[active][0];
    feedback.querySelector('h2').textContent = scenes[active][1];
    feedback.querySelector('p').textContent = scenes[active][2];
    feedback.classList.remove('is-changing');
    void feedback.offsetWidth;
    feedback.classList.add('is-changing');
    scheduleRotation();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStep(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (active + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (active + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectStep(next);
      tabs[next].focus();
    });
  });
  logo.addEventListener('click', () => {
    selectStep((active + 1) % tabs.length);
    logo.classList.remove('is-rippling');
    void logo.offsetWidth;
    logo.classList.add('is-rippling');
  });


  function resetTilt() {
    character.style.setProperty('--tilt-x', '0deg');
    character.style.setProperty('--tilt-y', '0deg');
  }
  stage.addEventListener('pointermove', event => {
    if (paused || reduced.matches || event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect();
    character.style.setProperty('--tilt-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 8}deg`);
    character.style.setProperty('--tilt-y', `${((event.clientY - bounds.top) / bounds.height - .5) * -5}deg`);
  });
  stage.addEventListener('pointerleave', resetTilt);
  function updateMotion() {
    hero.classList.toggle('motion-paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.setAttribute('aria-label', paused ? 'Play hero animation' : 'Pause hero animation');
    motion.title = paused ? 'Play motion' : 'Pause motion';
    motion.disabled = reduced.matches;
    if (reduced.matches) {
      motion.setAttribute('aria-label', 'Animation disabled by reduced motion preference');
      motion.title = 'Your system prefers reduced motion';
    }
    if (paused) resetTilt();
    feedback.setAttribute('aria-live', paused ? 'polite' : 'off');
    scheduleRotation();
  }
  motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reduced.addEventListener('change', event => { paused = event.matches; updateMotion(); });
  document.addEventListener('visibilitychange', scheduleRotation);
  hero.addEventListener('focusin', scheduleRotation);
  hero.addEventListener('focusout', () => queueMicrotask(scheduleRotation));
  new MutationObserver(scheduleRotation).observe(document.body, { attributes:true, attributeFilter:['data-page'] });
  updateMotion();
})();
