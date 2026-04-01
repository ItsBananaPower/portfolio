/* =========================================
   BAPTISTE MARSAA — PORTFOLIO JS
   ========================================= */

/* === 1. LANGUAGE SYSTEM === */
const LANG_KEY = 'portfolio_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

const langBtn   = document.getElementById('lang-btn');
const langLabel = document.getElementById('lang-label');

function applyLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute(`data-${lang}`);
    if (val) el.textContent = val;
  });
  langLabel.textContent = lang === 'en' ? 'FR' : 'EN';
  document.documentElement.lang = lang;
}

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  localStorage.setItem(LANG_KEY, currentLang);
  applyLang(currentLang);
  // Restart typewriter after lang change
  startTypewriter();
});

// Init on load
applyLang(currentLang);


/* === 2. TYPEWRITER EFFECT === */
const phrases = {
  en: [
    'Full-Stack Developer in Training',
    'C++ · Python · JavaScript · SQL',
    'Seeking a 10-week internship · April 2026',
  ],
  fr: [
    'Développeur Full-Stack en formation',
    'C++ · Python · JavaScript · SQL',
    'Recherche un stage de 10 semaines · Avril 2026',
  ],
};

let twIndex   = 0;
let twCharIdx = 0;
let twDeleting  = false;
let twTimeout = null;

function startTypewriter() {
  clearTimeout(twTimeout);
  twIndex   = 0;
  twCharIdx = 0;
  twDeleting = false;
  const el = document.getElementById('typewriter');
  if (el) el.textContent = '';
  tick();
}

function tick() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const list = phrases[currentLang];
  const word = list[twIndex];

  if (!twDeleting) {
    el.textContent = word.slice(0, ++twCharIdx);
    if (twCharIdx === word.length) {
      twDeleting = true;
      twTimeout  = setTimeout(tick, 2200);
      return;
    }
  } else {
    el.textContent = word.slice(0, --twCharIdx);
    if (twCharIdx === 0) {
      twDeleting = false;
      twIndex    = (twIndex + 1) % list.length;
    }
  }
  twTimeout = setTimeout(tick, twDeleting ? 45 : 80);
}

startTypewriter();


/* === 3. REVEAL ON SCROLL === */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || '0', 10);
    setTimeout(() => el.classList.add('visible'), delay);
    revealObserver.unobserve(el);
  });
}, {
  threshold:  0.12,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));


/* === 4. FLOATING CTA (show after scroll) === */
const ctaFloat = document.getElementById('cta-float');

const ctaObserver = new IntersectionObserver((entries) => {
  // Hide CTA when hero is visible, show once scrolled past
  const heroVisible = entries[0].isIntersecting;
  ctaFloat.classList.toggle('visible', !heroVisible);
}, { threshold: 0.3 });

const hero = document.getElementById('hero');
if (hero) ctaObserver.observe(hero);


/* === 5. ACTIVE NAV HIGHLIGHT (optional) === */
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* === 6. SKILL CARDS STAGGER ON HOVER AREA === */
// Adds extra delight: when the skills section enters viewport,
// stagger each card's appear with its data-delay attribute
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) return;
  skillCards.forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), i * 55);
  });
  skillObserver.disconnect();
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* === 7. SKILL TO PROJECT NAVIGATION === */
const skillToProjectMap = {
  'Python': 'project-radio',
  'C++': 'project-radio',
  'JavaScript': 'project-web',
  'HTML': 'project-web',
  'CSS': 'project-web',
  'SQL': 'project-database',
  'Qt / C++': 'project-radio',
  'Marionnet': 'project-network',
  'Figma': 'project-agendsup',
  'GanttProject': 'project-agendsup'
};

document.querySelectorAll('.skill-card').forEach(card => {
  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    const skillName = card.querySelector('span').textContent.trim();
    const projectId = skillToProjectMap[skillName];

    if (projectId) {
      const targetProject = document.getElementById(projectId);
      if (targetProject) {
        // Scroll fluide vers le projet
        targetProject.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Petit effet visuel pour montrer quel projet est concerné
        targetProject.style.transition = 'outline 0.3s ease';
        targetProject.style.outline = '2px solid var(--accent)';
        
        setTimeout(() => {
          targetProject.style.outline = '2px solid transparent';
        }, 2000);
      }
    }
  });
});