(function () {
  'use strict';

  var doc = document;
  var header = doc.querySelector('.site-header');
  var toggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('primary-nav');
  var year = doc.getElementById('year');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'မီနူး ပိတ်ရန်' : 'မီနူး ဖွင့်ရန်');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    doc.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setNav(false);
    });

    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  var revealItems = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach(function (item) {
      item.classList.add('in');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach(function (item, index) {
    item.style.transitionDelay = (index % 4) * 60 + 'ms';
    observer.observe(item);
  });
})();
