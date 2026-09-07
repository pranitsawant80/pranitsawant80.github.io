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

  function renderList(containerName, items, templateFn) {
    const container = document.querySelector(`[data-container="${containerName}"]`);
    if (!container || !items.length) return;

    container.innerHTML = items.map(templateFn).join('');

    // Re-apply reveal animations to new elements
    applyRevealAnimations();
  }

  renderList('education', contentData.education, item => `
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
  `);

  renderList('projects', contentData.projects, project => `
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
  `);

  renderList('testimonials', contentData.testimonials, testimonial => {
    const linkedinIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
    const nameBlock = testimonial.linkedin
      ? `<a class="testimonial-name testimonial-name-link" href="${testimonial.linkedin}" target="_blank" rel="noreferrer">${testimonial.name}${linkedinIcon}</a>`
      : `<div class="testimonial-name">${testimonial.name}</div>`;
    return `
    <div class="testimonial-card reveal">
      <div class="testimonial-content">
        <p class="testimonial-quote">"${testimonial.quote}"</p>
      </div>
      <div class="testimonial-author">
        <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy" onerror="this.onerror=null;this.src='assets/images/male_icon.jpg'">
        <div class="testimonial-info">
          ${nameBlock}
          <div class="testimonial-title">${testimonial.title}</div>
        </div>
      </div>
    </div>
  `;
  });

  renderList('experience', contentData.experience, job => `
    <div class="timeline-item reveal">
      <div class="timeline-date">${job.startDate} – ${job.endDate}</div>
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-role">${job.role}</div>
        <div class="timeline-company">${job.company}</div>
        <p class="timeline-desc">${job.description}</p>
      </div>
    </div>
  `);

  renderList('skills', contentData.skills, skillGroup => `
    <div class="skill-group reveal">
      <div class="skill-group-title">${skillGroup.category}</div>
      <div class="tags">
        ${skillGroup.items.map(item => `<span class="tag">${item}</span>`).join('')}
      </div>
    </div>
  `);

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
     6. MODALS (avatar lightbox + location map)
     ---------------------------------------------------------- */

  function setupModal(trigger, modal, closeBtn, onOpen) {
    const triggers = trigger instanceof NodeList || Array.isArray(trigger)
      ? Array.from(trigger)
      : [trigger];
    if (!triggers.length || !triggers[0] || !modal || !closeBtn) return;

    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }

    triggers.forEach(t => t.addEventListener('click', () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      if (typeof onOpen === 'function') onOpen();
    }));

    closeBtn.addEventListener('click', close);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
      }
    });
  }

  setupModal(
    document.querySelector('.nav-avatar'),
    document.querySelector('.avatar-modal'),
    document.querySelector('.avatar-modal-close')
  );

  setupModal(
    document.querySelector('.location-trigger'),
    document.getElementById('location-modal'),
    document.querySelector('.location-modal-close')
  );

  setupModal(
    document.querySelectorAll('[data-resume-trigger]'),
    document.getElementById('resume-modal'),
    document.querySelector('.resume-modal-close'),
    () => {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({ path: 'resume-request', title: 'Resume request', event: true });
      }
    }
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     8. HERO ROTATING HEADLINE
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
     9. ANIMATED STAT COUNTERS
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

  /* ----------------------------------------------------------
     10. VISITOR COUNTER (GoatCounter)
     ---------------------------------------------------------- */

  const visitorCountEl = document.getElementById('visitor-count');

  if (visitorCountEl) {
    fetch('https://pranitsawant.goatcounter.com/counter/TOTAL.json')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        const count = Number(data.count_unique);
        visitorCountEl.textContent = Number.isFinite(count) ? count.toLocaleString() : '—';
      })
      .catch(() => {
        const wrapper = visitorCountEl.closest('.visitor-counter');
        if (wrapper) wrapper.style.display = 'none';
      });
  }

  console.log('Portfolio loaded ✓');
});
