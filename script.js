/* ═══════════════════════════════════════════════════════
   PRINCE RAJ — PORTFOLIO  |  script.js
═══════════════════════════════════════════════════════ */

/* ── 1. Navbar: scroll detection + active link ──────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky style
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link highlighting
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ── 2. Smooth scrolling ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── 3. Mobile hamburger ────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

/* ── 4. Dark / Light mode toggle ───────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const icon        = themeToggle.querySelector('i');

// Restore preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  icon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ── 5. Typing animation ────────────────────────────── */
const roles   = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'Competitive Programmer'];
const typedEl = document.getElementById('typed-text');
let   roleIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, --charIdx);
  } else {
    typedEl.textContent = current.substring(0, ++charIdx);
  }

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 1000);

/* ── 6. Scroll reveal ───────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

// Auto-tag all major section children
document.querySelectorAll(
  '.about-grid, .project-card, .skill-category, .tl-item, .contact-wrapper, .section-header'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── 7. Skill bars animation ────────────────────────── */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.skill-item').forEach(item => {
      const fill  = item.querySelector('.skill-fill');
      const level = item.dataset.level;
      setTimeout(() => { fill.style.width = level + '%'; }, 200);
    });
    skillObserver.unobserve(e.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

/* ── 8. Contact form validation ─────────────────────── */
const form = document.getElementById('contact-form');

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ['err-name','err-email','err-subject','err-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const name    = document.getElementById('fname');
  const email   = document.getElementById('femail');
  const subject = document.getElementById('fsubj');
  const message = document.getElementById('fmsg');
  let   valid   = true;

  if (!name.value.trim()) {
    showError('err-name', 'Name is required.');
    name.classList.add('error');
    valid = false;
  }
  if (!email.value.trim()) {
    showError('err-email', 'Email is required.');
    email.classList.add('error');
    valid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError('err-email', 'Please enter a valid email address.');
    email.classList.add('error');
    valid = false;
  }
  if (!subject.value.trim()) {
    showError('err-subject', 'Subject is required.');
    subject.classList.add('error');
    valid = false;
  }
  if (!message.value.trim()) {
    showError('err-message', 'Message cannot be empty.');
    message.classList.add('error');
    valid = false;
  }

  if (valid) {
    // Simulate sending (replace with actual API call)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      const success = document.getElementById('form-success');
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 5000);
    }, 1500);
  }
});

/* ── 9. Animated number counter (stats) ─────────────── */
function animateCounter(el, target, decimals = 0) {
  let start     = 0;
  const step    = target / 60;
  const timer   = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = decimals ? start.toFixed(decimals) : Math.floor(start) + '+';
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const nums = e.target.querySelectorAll('.stat-num');
    nums.forEach(num => {
      const text = num.textContent;
      if (text.includes('580')) animateCounter(num, 580);
      else if (text.includes('9.07')) {
        num.textContent = '0.00';
        animateCounter(num, 9.07, 2);
      }
    });
    statsObserver.unobserve(e.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);