/* Kairox Studios - Navigation Behavior */

(function () {
  const nav    = document.getElementById('site-nav');
  const burger = document.getElementById('nav-hamburger');
  const mobile = document.getElementById('nav-mobile');

  if (!nav) return;

  /* Scroll: add .scrolled after 60px */
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Hamburger toggle */
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      const open = mobile.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    /* Close mobile menu when a link is clicked */
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* Dropdown: delay-on-leave so cursor can cross the gap without closing */
  nav.querySelectorAll('.nav-dropdown-trigger').forEach(function (trigger) {
    var closeTimer = null;

    trigger.addEventListener('mouseenter', function () {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      trigger.classList.add('is-open');
    });

    trigger.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        trigger.classList.remove('is-open');
        closeTimer = null;
      }, 175);
    });
  });

  /* Mark active link based on current page */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && href !== '#') {
      const file = href.split('/').pop();
      if (file === path || (path === '' && file === 'index.html')) {
        a.classList.add('active');
      }
    }
  });
})();
