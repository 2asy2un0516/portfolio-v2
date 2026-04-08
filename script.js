// ===== Scroll Progress & Navbar =====
const scrollProgress = document.getElementById('scrollProgress');
const scrollTopBtn = document.getElementById('scrollTop');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
  navbar.classList.toggle('scrolled', scrollTop > 60);
  scrollTopBtn.classList.toggle('visible', scrollTop > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMobile.classList.remove('open');
  });
});

// ===== Typewriter Effect =====
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'MD 포지션을 목표합니다',
  '상품의 흐름을 이해합니다',
  '물류부터 마케팅까지 연결합니다',
  '꼼꼼한 상품 기획을 합니다',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typedTextEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedTextEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  if (!isDeleting && charIdx === current.length) {
    setTimeout(() => { isDeleting = true; }, 2200);
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
  }

  setTimeout(typeEffect, isDeleting ? 55 : 95);
}

typeEffect();

// ===== Fade-in on scroll =====
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===== Stats Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 1600;
      const step = target / (duration / 16);
      let current = 0;

      const tick = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(tick);
      }, 16);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 250);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ===== Active nav highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta), .nav-mobile a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? 'var(--dark)' : '';
        link.style.fontWeight = isActive ? '700' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ===== PDF Download =====
function downloadPDF() {
  window.print();
}
