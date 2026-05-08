/* ================================================
   RANGUEBAYE NANTARA — Portfolio IT
   Fichier : assets/js/main.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Menu mobile ─────────────────────────── */
  const burger  = document.getElementById('burger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // Animer les barres du burger
      burger.classList.toggle('active');
    });

    // Fermer le menu mobile en cliquant sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
      });
    });
  }

  /* ── 2. Scroll actif sur nav ────────────────── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-mobile a');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observerNav.observe(s));

  /* ── 3. Fade-in au scroll ───────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observerFade = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Délai progressif pour les grilles
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observerFade.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observerFade.observe(el));

  /* ── 4. Navbar transparente / opaque ───────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  /* ── 5. Smooth scroll sur les ancres ───────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 6. Animation compteur (stats si présentes) */
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + (counter.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
      }
    }, 16);
  });

  /* ── 7. Année dynamique dans le footer ──────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
