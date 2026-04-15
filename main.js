/* =============================================
   Kevin — Awack Studio Portfolio
   main.js
   ============================================= */

(function () {
  'use strict';


  /* ── Smooth scroll for nav links ────────────── */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ── Scroll-triggered fade-in ───────────────── */

  var fadeEls = document.querySelectorAll(
    '.project-item, .skill-cell, .about-layout, .contact-wrap'
  );

  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });


  /* ── Progress bars animate on scroll ───────── */

  var progFills = document.querySelectorAll('.prog-fill');

  progFills.forEach(function (fill) {
    var targetWidth = fill.style.width;
    fill.style.width = '0%';

    var progObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              fill.style.width = targetWidth;
            }, 200);
            progObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    progObserver.observe(fill);
  });


  /* ── Nav: highlight active section ─────────── */

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"]');

  function onScroll() {
    var scrollY = window.scrollY;

    sections.forEach(function (section) {
      var top    = section.offsetTop - 120;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');

      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          if (scrollY >= top && scrollY < bottom) {
            link.style.color = 'var(--gold2)';
          } else {
            link.style.color = '';
          }
        }
      });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ── Nav background opacity on scroll ──────── */

  var nav = document.querySelector('nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(14, 11, 7, 0.97)';
    } else {
      nav.style.background = 'rgba(14, 11, 7, 0.92)';
    }
  }, { passive: true });


})();
