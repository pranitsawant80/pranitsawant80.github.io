/* ============================================================
   script.js — Pranit Sawant Portfolio
   ============================================================
   Sections:
   1. Nav — active link highlight & mobile toggle
   2. Scroll Reveal — fade-in elements on scroll
   3. Smooth scroll — handled by CSS (scroll-behavior: smooth)
   4. Future hooks — commented stubs for features to add later
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAVIGATION
     ---------------------------------------------------------- */

  // Mobile hamburger toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) { 
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close menu when any link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }

  // Active nav link based on scroll position
  const sections  = document.querySelectorAll('section[id]');
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

  // function setActiveNav() {
  //   let currentId = '';

  //   sections.forEach(section => {
  //     const sectionTop = section.offsetTop - 100;
  //     if (window.scrollY >= sectionTop) {
  //       currentId = section.getAttribute('id');
  //     }
  //   });

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav(); // run once on load


  /* ----------------------------------------------------------
     2. SCROLL REVEAL
     Add class="reveal" to any element in HTML to enable fade-in.
     Already applied to project cards, skill groups, timeline items.
     ---------------------------------------------------------- */

  // Auto-add reveal class to common elements
  const revealTargets = [
    '.project-card',
    '.skill-group',
    '.timeline-item',
    '.stat-card',
    '.award-badge',
    '.certifications-list li',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // IntersectionObserver to trigger animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger: delay each item slightly
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

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


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
     4. THEME TOGGLE
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
     5. AVATAR LIGHTBOX
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
     6. FUTURE FEATURE HOOKS
     Uncomment and build on these when you're ready.
     ---------------------------------------------------------- */

  // --- 5a. Project filter by category ---
  // const filterBtns = document.querySelectorAll('.filter-btn');
  // filterBtns.forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     const category = btn.dataset.category;
  //     document.querySelectorAll('.project-card').forEach(card => {
  //       const match = category === 'all' || card.dataset.category === category;
  //       card.style.display = match ? 'block' : 'none';
  //     });
  //   });
  // });


  // --- 4c. Contact form submission (add a <form id="contact-form"> in HTML) ---
  // const form = document.getElementById('contact-form');
  // if (form) {
  //   form.addEventListener('submit', async (e) => {
  //     e.preventDefault();
  //     const data = Object.fromEntries(new FormData(form));
  //     // POST to your backend or a service like Formspree / EmailJS
  //     console.log('Form data:', data);
  //   });
  // }


  // --- 4d. Typewriter effect for hero title ---
  // const titles = ['AI Engineer', 'GenAI Specialist', 'LLM Builder', 'Agentic AI Developer'];
  // let titleIndex = 0, charIndex = 0;
  // const titleEl = document.querySelector('.hero-eyebrow');
  // function typeWriter() {
  //   if (charIndex < titles[titleIndex].length) {
  //     titleEl.textContent = titles[titleIndex].slice(0, ++charIndex);
  //     setTimeout(typeWriter, 80);
  //   } else {
  //     setTimeout(() => { charIndex = 0; titleIndex = (titleIndex + 1) % titles.length; typeWriter(); }, 2000);
  //   }
  // }
  // typeWriter();


  // --- 4e. Analytics page view (replace with your GA ID) ---
  // gtag('event', 'page_view', { page_title: 'Portfolio', page_location: window.location.href });


  console.log('Portfolio loaded ✓');
});
