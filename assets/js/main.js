(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Gate: locked lower sections + assemble reveal ---------- */
  const gate = document.getElementById('gate');
  const exploreWrap = document.getElementById('explore-wrap');
  let assembleTimer = null;

  if (gate && gate.classList.contains('is-locked')) {
    document.body.classList.add('gate-locked');
  }

  function unlockGate() {
    if (!gate || !gate.classList.contains('is-locked')) return false;
    gate.classList.remove('is-locked');
    document.body.classList.remove('gate-locked');
    if (exploreWrap) {
      exploreWrap.classList.add('is-hidden');
      setTimeout(() => { exploreWrap.style.display = 'none'; }, 420);
    }

    if (!prefersReducedMotion) {
      gate.classList.add('is-assembling');
      clearTimeout(assembleTimer);
      assembleTimer = setTimeout(() => gate.classList.remove('is-assembling'), 1500);
    }
    return true;
  }

  /* ---------- Smooth scroll + gate unlock + close mobile nav on click ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      // If the target lives inside the locked gate, reveal it first so layout exists.
      const justUnlocked = gate && gate.contains(target) ? unlockGate() : false;

      const doScroll = () => {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      };

      // Let the gate paint its first assemble frame before scrolling.
      if (justUnlocked && !prefersReducedMotion) {
        requestAnimationFrame(() => requestAnimationFrame(doScroll));
      } else {
        doScroll();
      }

      if (navLinks && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------- Scroll-spy (nav + cs-toc) ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav__links a[href^="#"], .cs-toc__inner a[href^="#"]');

  if (sections.length && navItems.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            item.classList.toggle('is-active', item.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* ---------- Scroll progress bar ---------- */
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);
  }

  let scrollTicking = false;
  function updateScrollUI() {
    const doc = document.documentElement;
    const scrolled = window.scrollY;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (scrolled / max) * 100) : 0;
    progressBar.style.width = pct + '%';

    if (backToTop) {
      backToTop.classList.toggle('is-visible', scrolled > 600);
    }
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollUI);
      scrollTicking = true;
    }
  }, { passive: true });

  /* ---------- Back to top button ---------- */
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.type = 'button';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Lên đầu trang');
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  updateScrollUI();

  /* ---------- Reveal-on-scroll ---------- */
  const revealables = document.querySelectorAll('.reveal');
  if (revealables.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealables.forEach((el, i) => {
      if (!el.style.transitionDelay) {
        const groupIndex = Number(el.dataset.revealStagger);
        if (!Number.isNaN(groupIndex) && groupIndex >= 0) {
          el.style.transitionDelay = (groupIndex * 80) + 'ms';
        }
      }
      revealObserver.observe(el);
    });
  } else {
    revealables.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Make proof-card images clickable ---------- */
  document.querySelectorAll('.proof-card').forEach(card => {
    const media = card.querySelector('.proof-card__media');
    if (!media || media.querySelector('a')) return;
    const primary =
      card.querySelector('.proof-card__footer a') ||
      card.querySelector('a.link-arrow') ||
      card.querySelector('a.button');
    if (!primary || !primary.href) return;
    const link = document.createElement('a');
    link.href = primary.href;
    if (primary.target) link.target = primary.target;
    if (primary.rel) link.rel = primary.rel;
    link.className = 'proof-card__cover-link';
    link.setAttribute('aria-label', (primary.textContent || 'Mở dự án').trim().replace(/[→↗]/g, '').trim());
    link.setAttribute('tabindex', '-1');
    media.appendChild(link);
  });

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    function runCounter(el) {
      const target = parseFloat(el.dataset.counter);
      if (Number.isNaN(target)) return;
      const suffix = el.dataset.counterSuffix || '';
      const prefix = el.dataset.counterPrefix || '';
      const duration = parseInt(el.dataset.counterDuration || '1400', 10);
      const start = performance.now();
      const formatter = new Intl.NumberFormat('vi-VN');

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(eased * target);
        el.textContent = prefix + formatter.format(value) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => {
      const t = parseFloat(c.dataset.counter);
      if (!Number.isNaN(t)) c.textContent = (c.dataset.counterPrefix || '') + t.toLocaleString('vi-VN') + (c.dataset.counterSuffix || '');
    });
  }
})();
