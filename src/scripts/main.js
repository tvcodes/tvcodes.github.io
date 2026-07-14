import { spawnStars } from './starfield.js';

/* ===================== STARFIELD ===================== */

spawnStars('starfield', 170);
spawnStars('planetStars', 22);
spawnStars('featuredStars', 55);

/* ===================== FADE IN ===================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el);
});

/* ===================== MOBILE MENU ===================== */

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}

document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
  document.getElementById('mobileMenu')?.classList.toggle('open');
});

document
  .getElementById('mobileCloseBtn')
  ?.addEventListener('click', closeMobileMenu);

/* ===================== NAV DROPDOWN ===================== */

document.getElementById('dropdownTrigger')?.addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('navDropdown')?.classList.toggle('open');
});

document.addEventListener('click', () => {
  document.getElementById('navDropdown')?.classList.remove('open');
});

/* ===================== FOOTER YEAR ===================== */

const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}