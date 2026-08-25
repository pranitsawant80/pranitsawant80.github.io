/* ============================================================
   Portfolio - Data-Driven JavaScript
   Loads content from data/content.json and renders dynamically
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

  // ===== Load Content Data =====
  let contentData = {
    projects: [],
    testimonials: [],
    experience: [],
    education: [],
    skills: []
  };

  try {
    const response = await fetch('data/content.json');
    if (response.ok) {
      contentData = await response.json();
    }
  } catch (error) {
    console.warn('Could not load content.json:', error);
  }

  /* ----------------------------------------------------------
     Render Functions for Dynamic Content
     ---------------------------------------------------------- */

  function renderProjects() {
    const container = document.querySelector('[data-container="projects"]');
    if (!container || !contentData.projects.length) return;

    container.innerHTML = contentData.projects.map(project => `
      <div class="project-card reveal">
        <div class="project-meta">
          <span class="project-client">${project.client}</span>
          <span class="project-duration">${project.duration}</span>
        </div>
        <div class="project-title">${project.title}</div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Re-apply reveal animations to new elements
    applyRevealAnimations();
  }

  function renderTestimonials() {
    const container = document.querySelector('[data-container="testimonials"]');
    if (!container || !contentData.testimonials.length) return;

    container.innerHTML = contentData.testimonials.map(testimonial => `
      <div class="testimonial-card reveal">
        <div class="testimonial-content">
          <p class="testimonial-quote">"${testimonial.quote}"</p>
        </div>
        <div class="testimonial-author">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy" onerror="this.onerror=null;this.src='assets/images/male_icon.jpg'">
          <div class="testimonial-info">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-title">${testimonial.title}</div>
          </div>
        </div>
      </div>
    `).join('');

    applyRevealAnimations();
  }

  function renderExperience() {
    const container = document.querySelector('[data-container="experience"]');
    if (!container || !contentData.experience.length) return;

    container.innerHTML = contentData.experience.map(job => `
      <div class="timeline-item reveal">
        <div class="timeline-date">${job.startDate} – ${job.endDate}</div>
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-role">${job.role}</div>
          <div class="timeline-company">${job.company}</div>
          <p class="timeline-desc">${job.description}</p>
        </div>
      </div>
    `).join('');

    applyRevealAnimations();
  }

  function renderEducation() {
    const container = document.querySelector('[data-container="education"]');
    if (!container || !contentData.education.length) return;

    container.innerHTML = contentData.education.map(item => `
      <div class="education-card reveal">
        <div>
          <div class="education-degree">${item.degree}</div>
          <div class="education-institution">${item.institution}</div>
        </div>
        <div class="education-meta">
          <div>${item.period}</div>
          <div class="education-grade">${item.grade}</div>
        </div>
      </div>
    `).join('');

    applyRevealAnimations();
  }

  function renderSkills() {
    const container = document.querySelector('[data-container="skills"]');
    if (!container || !contentData.skills.length) return;

    container.innerHTML = contentData.skills.map(skillGroup => `
      <div class="skill-group reveal">
        <div class="skill-group-title">${skillGroup.category}</div>
        <div class="tags">
          ${skillGroup.items.map(item => `<span class="tag">${item}</span>`).join('')}
        </div>
      </div>
    `).join('');

    applyRevealAnimations();
  }

  renderEducation();
  renderProjects();
  renderTestimonials();
  renderExperience();
  renderSkills();

  /* ----------------------------------------------------------
     1. NAVIGATION
     ---------------------------------------------------------- */

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }
     
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNav() {
    let currentId = '';
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentId = section.getAttribute('id');
      }
    });

    if (!currentId && window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      currentId = sections[sections.length - 1].getAttribute('id');
    }

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ----------------------------------------------------------
     2. SCROLL REVEAL
     ---------------------------------------------------------- */

  function applyRevealAnimations() {
    const revealTargets = [
      '.project-card',
      '.skill-group',
      '.timeline-item',
      '.education-card',
      '.stat-card',
      '.award-badge',
      '.testimonial-card',
      '.certifications-list li'
    ];

    revealTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });
    });

    triggerRevealObserver();
  }

  function triggerRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  }

  /* ----------------------------------------------------------
     3. NAV BACKGROUND on scroll
     ---------------------------------------------------------- */

  const nav = document.querySelector('nav');

  function updateNavBackground() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', updateNavBackground, { passive: true });
  updateNavBackground();

  /* ----------------------------------------------------------
     4. LIVE CLOCK + VISITOR COUNT
     ---------------------------------------------------------- */

  const liveClockEl = document.getElementById('live-clock');

  function updateLiveClock() {
    if (!liveClockEl) return;

    const now = new Date();
    const datePart = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
    const dayPart = now.toLocaleDateString('en-US', {
      weekday: 'short'
    });
    const timePart = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    liveClockEl.textContent = `${datePart}, ${dayPart}, ${timePart}`;
  }

  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  /* ----------------------------------------------------------
     5. THEME TOGGLE
     ---------------------------------------------------------- */

  const themeToggle = document.querySelector('.theme-toggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  }

  /* ----------------------------------------------------------
     6. AVATAR LIGHTBOX / MODAL
     ---------------------------------------------------------- */

  const avatarTrigger = document.querySelector('.nav-avatar');
  const avatarModal = document.querySelector('.avatar-modal');
  const avatarClose = document.querySelector('.avatar-modal-close');

  function closeAvatarModal() {
    if (!avatarModal) return;
    avatarModal.classList.remove('open');
    avatarModal.setAttribute('aria-hidden', 'true');
  }

  if (avatarTrigger && avatarModal && avatarClose) {
    avatarTrigger.addEventListener('click', () => {
      avatarModal.classList.add('open');
      avatarModal.setAttribute('aria-hidden', 'false');
    });

    avatarClose.addEventListener('click', closeAvatarModal);

    avatarModal.addEventListener('click', (event) => {
      if (event.target === avatarModal) {
        closeAvatarModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAvatarModal();
      }
    });
  }

  /* ----------------------------------------------------------
     7. LOCATION MAP MODAL
     ---------------------------------------------------------- */

  const locationTrigger = document.querySelector('.location-trigger');
  const locationModal = document.getElementById('location-modal');
  const locationClose = document.querySelector('.location-modal-close');

  function closeLocationModal() {
    if (!locationModal) return;
    locationModal.classList.remove('open');
    locationModal.setAttribute('aria-hidden', 'true');
  }

  if (locationTrigger && locationModal && locationClose) {
    locationTrigger.addEventListener('click', () => {
      locationModal.classList.add('open');
      locationModal.setAttribute('aria-hidden', 'false');
    });

    locationClose.addEventListener('click', closeLocationModal);

    locationModal.addEventListener('click', (event) => {
      if (event.target === locationModal) {
        closeLocationModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLocationModal();
      }
    });
  }

  /* ----------------------------------------------------------
     8. RENDER DYNAMIC CONTENT
     ---------------------------------------------------------- */

  renderProjects();
  renderTestimonials();
  renderExperience();
  renderSkills();
  applyRevealAnimations();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     9. HERO ROTATING HEADLINE
     ---------------------------------------------------------- */

  const heroRotateEl = document.getElementById('hero-rotate');
  const heroPhrases = [
    'intelligent systems',
    'agentic AI platforms',
    'LLM-powered products',
    'enterprise AI solutions'
  ];

  function typewriteHero() {
    if (!heroRotateEl) return;

    let phraseIndex = 0;
    let charIndex = heroRotateEl.textContent.length;
    let deleting = false;

    function tick() {
      const phrase = heroPhrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        heroRotateEl.textContent = phrase.slice(0, charIndex);
        if (charIndex >= phrase.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        heroRotateEl.textContent = phrase.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % heroPhrases.length;
        }
      }

      setTimeout(tick, deleting ? 35 : 55);
    }

    charIndex = 0;
    setTimeout(tick, 1400);
  }

  if (heroRotateEl) {
    if (prefersReducedMotion) {
      heroRotateEl.textContent = heroPhrases[0];
    } else {
      typewriteHero();
    }
  }

  /* ----------------------------------------------------------
     10. ANIMATED STAT COUNTERS
     ---------------------------------------------------------- */

  function animateStatCounters() {
    document.querySelectorAll('.stat-num').forEach((el, index) => {
      const match = el.textContent.match(/^(\d+)(.*)$/);
      if (!match) return;

      const target = parseInt(match[1], 10);
      const suffix = match[2];

      if (prefersReducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1100;
      const startDelay = index * 80;

      setTimeout(() => {
        const startTime = performance.now();

        function frame(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(frame);
          }
        }

        requestAnimationFrame(frame);
      }, startDelay);
    });
  }

  animateStatCounters();

  console.log('Portfolio loaded ✓');
});
