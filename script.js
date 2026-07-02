/* ═══════════════════════════════════════════════════════
   HARSHIT RATHAUR PORTFOLIO — script.js
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Dynamic Copyright Year ── */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Loader ── */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');
  const loadMessages = ['Initializing...', 'Loading assets...', 'Compiling experience...', 'Almost there...', 'Ready'];
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      loaderText.textContent = 'Ready';
      setTimeout(() => loader.classList.add('done'), 300);
    } else {
      loaderText.textContent = loadMessages[Math.min(Math.floor(progress / 25), loadMessages.length - 1)];
    }
    loaderFill.style.width = progress + '%';
  }, 150);

  /* ── Custom Cursor ── */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .tilt-card, .skill-card, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  } else {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ── Scroll Progress Bar ── */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* ── Sticky Nav (shrink + active link) ── */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── Mobile Menu ── */
  const navToggle = document.getElementById('navToggle');
  const navLinksWrap = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinksWrap.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    navLinksWrap.classList.remove('open');
  }));

  /* ── Smooth Scrolling ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ── Typing Effect ── */
  const typedEl = document.getElementById('typed');
  const phrases = ['Full-Stack Developer', 'Software Engineer', 'GCP - Arcade Novice Tier Achiever', 'Programmer'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Animated Counters ── */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let count = 0;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / target), 30);
        const counterInterval = setInterval(() => {
          count++;
          el.textContent = count;
          if (count >= target) clearInterval(counterInterval);
        }, stepTime);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  /* ── Project Filtering ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ── Tilt Effect on Cards ── */
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (!isTouchDevice) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ── Magnetic Buttons ── */
  const magneticEls = document.querySelectorAll('.magnetic');
  if (!isTouchDevice) {
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ── Mouse Spotlight on Hero (Canvas Particles) ── */
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx * 0.015;
          this.y -= dy * 0.015;
        }
      }
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 79, 209, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particleCount = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 79, 209, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ── Back to Top ── */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Contact Form (Netlify) ── */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  function encodeFormData(formEl) {
    const formData = new FormData(formEl);
    return new URLSearchParams(formData).toString();
  }

  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formSuccess.style.display = 'none';
    formError.style.display = 'none';

    if (!name || !email || !message || !emailPattern.test(email)) {
      e.preventDefault();
      formError.textContent = '⚠️ Please fill out all fields with a valid email.';
      formError.style.display = 'block';
      return;
    }

    // Valid — let the native POST go through to Netlify
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
  });

  /* ── Page Transition Fade-in ── */
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  });

  /* ── Disable Right-Click & DevTools Shortcuts (deterrent only) ── */
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    const blocked =
      key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(key)) ||
      (e.ctrlKey && ['U', 'u', 'S', 's'].includes(key)) ||
      (e.metaKey && e.altKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(key));
    if (blocked) e.preventDefault();
  });

});
