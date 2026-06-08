/* Kairox Studios - Scroll Animations */

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /* PATH A: GSAP + ScrollTrigger available                              */
  /* ------------------------------------------------------------------ */
  if (!reducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

    gsap.registerPlugin(ScrollTrigger);

    /* Reveal elements — fromTo so destination is always explicit opacity:1 */
    document.querySelectorAll('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    /* Staggered children */
    document.querySelectorAll('.reveal-stagger').forEach(function (parent) {
      gsap.fromTo(Array.from(parent.children),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    /* Section labels slide in */
    document.querySelectorAll('.section-label').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    /* Horizontal rule draws in */
    document.querySelectorAll('.divider').forEach(function (el) {
      gsap.fromTo(el,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    /* Accent lines grow */
    document.querySelectorAll('.accent-line').forEach(function (el) {
      gsap.fromTo(el,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    /* Hero text entrance — index.html */
    if (document.querySelector('.hero-display')) {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.hero-eyebrow',  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo('.hero-display',  { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, '-=0.1')
        .fromTo('.hero-tagline',  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-actions',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
    }

    /* Hero text entrance — game pages */
    if (document.querySelector('.game-hero-content')) {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.game-hero-tag',     { opacity: 0, y: 8  }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo('.game-hero-title',   { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, '-=0.1')
        .fromTo('.game-hero-quote',   { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .fromTo('.game-hero-desc',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .fromTo('.game-hero-actions', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    return; /* GSAP path handled — skip fallback below */
  }

  /* ------------------------------------------------------------------ */
  /* PATH B: GSAP unavailable — IntersectionObserver CSS-class fallback  */
  /* ------------------------------------------------------------------ */
  if (reducedMotion) return;

  /* Mark elements so CSS can hide them before they enter the viewport */
  var revealEls = document.querySelectorAll('.reveal');
  var staggerEls = document.querySelectorAll('.reveal-stagger');

  revealEls.forEach(function (el) { el.classList.add('will-animate'); });
  staggerEls.forEach(function (parent) {
    Array.from(parent.children).forEach(function (child) {
      child.classList.add('will-animate');
    });
  });

  if (!('IntersectionObserver' in window)) {
    /* Very old browser — just show everything */
    revealEls.forEach(function (el) { el.classList.remove('will-animate'); });
    staggerEls.forEach(function (parent) {
      Array.from(parent.children).forEach(function (c) { c.classList.remove('will-animate'); });
    });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.classList.remove('will-animate');
        el.classList.add('is-visible');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(function (el) { obs.observe(el); });
  staggerEls.forEach(function (parent) {
    Array.from(parent.children).forEach(function (child) { obs.observe(child); });
  });

})();
