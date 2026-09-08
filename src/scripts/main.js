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

/* ===================== FEATURED SCROLL ARROWS ===================== */

const featuredGrid = document.getElementById('featuredGrid');
const featuredPrevBtn = document.getElementById('featuredPrev');
const featuredNextBtn = document.getElementById('featuredNext');

if (featuredGrid && featuredPrevBtn && featuredNextBtn) {
  // cuộn 1 khoảng ~ bề rộng của 1 card (khớp với flex-basis trong CSS)
  const SCROLL_AMOUNT = 340 + 28; // width card + gap

  featuredPrevBtn.addEventListener('click', () => {
    featuredGrid.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  });

  featuredNextBtn.addEventListener('click', () => {
    featuredGrid.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  });

  // ẩn nút khi đã cuộn hết đầu/cuối, cho gọn UI
  const updateArrowState = () => {
    const maxScroll = featuredGrid.scrollWidth - featuredGrid.clientWidth;
    featuredPrevBtn.disabled = featuredGrid.scrollLeft <= 0;
    featuredNextBtn.disabled = featuredGrid.scrollLeft >= maxScroll - 1;
  };

  featuredGrid.addEventListener('scroll', updateArrowState);
  window.addEventListener('resize', updateArrowState);
  updateArrowState();
}