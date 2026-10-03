/**
 * ATIF PORTFOLIO - JAVASCRIPT CORE
 * Features: Particle Constellation Canvas, Typewriter, Scrollspy,
 * Dynamic Project Filtering, Interactive Modals, Animated Counters, Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PROJECT DATA REPOSITORY (For interactive modal)
  const projectsData = {
    'ai-dashboard': {
      title: 'Aether Analytics AI - SaaS Intelligence Suite',
      category: 'AI & SaaS / Full Stack',
      image: 'assets/images/project-ai-dashboard.jpg',
      overview: 'A high-performance enterprise analytics platform built with modern full-stack technologies. Features automated predictive insights, real-time user telemetry, financial forecasting, and interactive data visualization with dark glassmorphic UI.',
      features: [
        'Real-time WebSocket telemetry tracking 50k+ events/second',
        'Predictive AI engine integrating Python FastAPI & PyTorch models',
        'Interactive SVG & Canvas charting with sub-second recalculation',
        'Secure multi-tenant workspace with role-based JWT authentication',
        'Custom report generator exporting directly to PDF and Excel'
      ],
      tech: ['React', 'Next.js', 'Node.js', 'Python FastAPI', 'MongoDB', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
      liveUrl: 'https://github.com/atifu6048-coder/atif-portfolio',
      codeUrl: 'https://github.com/atifu6048-coder/atif-portfolio'
    },
    'ecommerce': {
      title: 'Aether Tech - Luxury Smart Audio & Gadgets Store',
      category: 'E-Commerce / Full Stack',
      image: 'assets/images/project-ecommerce.jpg',
      overview: 'A bespoke modern e-commerce storefront engineered for high conversion and blazingly fast checkout experiences. Powered by MERN stack with Redis cache layer, integrated Stripe 3D-secure payments, and real-time inventory synchronization.',
      features: [
        'Interactive product customization and real-time inventory counter',
        'Full Stripe Elements integration with Apple Pay & Google Pay support',
        'Redis-backed caching for sub-80ms product catalog lookups',
        'Comprehensive admin panel for order management and discount campaigns',
        'Automated order confirmation emails and WhatsApp dispatch alerts'
      ],
      tech: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Stripe API', 'Tailwind CSS', 'Redux Toolkit'],
      liveUrl: 'https://github.com/atifu6048-coder/atif-portfolio',
      codeUrl: 'https://github.com/atifu6048-coder/atif-portfolio'
    },
    'cloud-chat': {
      title: 'DevPulse - Collaborative Workspace & Team Messenger',
      category: 'Full Stack / Real-time',
      image: 'assets/images/project-cloud-chat.svg',
      overview: 'A real-time developer communication hub combining channel-based team chat, syntax-highlighted code sharing, sub-15ms WebSocket pipeline, and WebRTC peer-to-peer screen & audio streaming.',
      features: [
        'Sub-15ms latency bidirectional messaging using Socket.io clusters',
        'Instant code snippet sharing with live Monaco syntax highlighting',
        'WebRTC encrypted video/audio huddles with zero server strain',
        'Rich markdown preview, file attachment processing, and emoji reactions',
        'PostgreSQL schema with indexed full-text message search'
      ],
      tech: ['React', 'Node.js', 'Socket.io', 'WebRTC', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Express'],
      liveUrl: 'https://github.com/atifu6048-coder/atif-portfolio',
      codeUrl: 'https://github.com/atifu6048-coder/atif-portfolio'
    },
    'devops-pipeline': {
      title: 'CloudMatrix - Kubernetes CI/CD & Cluster Orchestrator',
      category: 'Cloud & DevOps / Backend',
      image: 'assets/images/project-devops-pipeline.svg',
      overview: 'An infrastructure management console designed to orchestrate Docker containers, manage Kubernetes microservice clusters, monitor pod health metrics, and trigger automated GitHub Actions deployment pipelines.',
      features: [
        'Automated blue/green deployment triggers with zero downtime',
        'Live cluster pod status monitoring with Prometheus & Grafana alerts',
        'TLS certificate auto-renewal and Ingress traffic routing management',
        'Centralized microservice log streaming with search & error detection',
        'High-security RBAC with OAuth2 GitHub & Google single sign-on'
      ],
      tech: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'AWS ECS', 'Prometheus', 'React', 'Shell Scripting'],
      liveUrl: 'https://github.com/atifu6048-coder/atif-portfolio',
      codeUrl: 'https://github.com/atifu6048-coder/atif-portfolio'
    }
  };

  // 2. CONSTELLATION & PARTICLE CANVAS
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 65 : 30, 80);

    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(168, 85, 247, ';
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 2.5;
            this.y -= Math.sin(angle) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 3. TYPEWRITER EFFECT
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = [
      'Full Stack Web Developer',
      'MERN Stack Specialist',
      'Node.js & Python Engineer',
      'High-Performance UI Architect'
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeLoop() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 45;
      } else {
        typedEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2200; // pause at word end
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 400; // pause before next word
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  // 4. NAVBAR SCROLL EFFECT & MOBILE MENU
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active class
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Scroll top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // Scroll to top action
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. ANIMATED STAT COUNTERS
  const counterItems = document.querySelectorAll('.counter-num');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterItems.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + (counter.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const counterContainer = document.querySelector('.about-counters');
  if (counterContainer) {
    counterObserver.observe(counterContainer);
  }

  // 6. ABOUT SECTION TABS
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) activePane.classList.add('active');
    });
  });

  // 7. SKILLS FILTER & ANIMATED PROGRESS BARS
  const skillFilters = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      skillFilters.forEach((f) => f.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.getAttribute('data-filter');

      skillCards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Animate skill progress bars on scroll
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = document.querySelectorAll('.skill-bar-fill');
          bars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          });
        }
      });
    }, { threshold: 0.2 });
    skillObserver.observe(skillSection);
  }

  // 8. PROJECTS FILTERING
  const projFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 9. INTERACTIVE PROJECT DETAILS MODAL
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-project-modal');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !modalOverlay) return;

    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalOverview').textContent = data.overview;

    // Populate features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    data.features.forEach((feat) => {
      const li = document.createElement('li');
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    // Populate tech pills
    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = '';
    data.tech.forEach((t) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    // Populate buttons
    const liveBtn = document.getElementById('modalLiveLink');
    if (liveBtn) liveBtn.href = data.liveUrl;

    const codeBtn = document.getElementById('modalCodeLink');
    if (codeBtn) codeBtn.href = data.codeUrl;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // 10. RESUME / CV MODAL
  const cvModal = document.getElementById('cvModal');
  const openCvBtns = document.querySelectorAll('.open-cv-modal');
  const closeCvBtn = document.getElementById('cvCloseBtn');
  const printCvBtn = document.getElementById('printCvBtn');

  function openResumeModal() {
    if (cvModal) {
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  openCvBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeCvBtn) closeCvBtn.addEventListener('click', closeResumeModal);
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeResumeModal();
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ESC key closes both modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResumeModal();
    }
  });

  // 11. CONTACT FORM SUBMISSION SIMULATION & TOAST NOTIFICATION
  const contactForm = document.getElementById('contactForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toastNotification) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('🎉 Message sent successfully! Atif will respond to you within 24 hours.');
      }, 1200);
    });
  }
});
