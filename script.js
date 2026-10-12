/**
 * HET D. RANA — ULTRA-PREMIUM PORTFOLIO SCRIPT
 * Unified Single Theme: Electric Indigo & Violet
 * Features: Interactive Cinema Seat Simulator, Live Skill Search & Filter,
 * Typewriter, IST Clock, 3D Tilt, Contact Preset Chips, Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DYNAMIC LIVE CLOCK (SURAT, GUJARAT / IST) ---
  const clockElement = document.getElementById('istClock');
  const clockStatus = document.getElementById('istStatus');

  function updateISTClock() {
    if (!clockElement) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const istTimeStr = new Intl.DateTimeFormat('en-US', options).format(now);
    clockElement.textContent = istTimeStr;

    // Check hour in Indian Standard Time (IST)
    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hour12: false
    });
    const currentHour = parseInt(hourFormatter.format(now), 10);

    if (clockStatus) {
      if (currentHour >= 14 && currentHour < 22) {
        clockStatus.innerHTML = '<span class="status-dot"></span> Available Now (Active Hours)';
        clockStatus.style.color = '#22c55e';
      } else {
        clockStatus.innerHTML = '<span style="color:var(--text-muted)">🌙 Next available today at 2:00 PM IST</span>';
        clockStatus.style.color = 'var(--text-muted)';
      }
    }
  }
  updateISTClock();
  setInterval(updateISTClock, 1000);

  // --- 2. DYNAMIC TYPEWRITER EFFECT ---
  const typeTarget = document.getElementById('typewriterText');
  if (typeTarget) {
    const roles = [
      'BCA Student @ VNSGU',
      'Aspiring Web Developer',
      'Frontend & UI Explorer',
      'Passionate Tech Learner'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typeTarget.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 45;
      } else {
        typeTarget.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  // --- 3. 3D TILT EFFECT ON PROFILE CARD ---
  const profileCard = document.querySelector('.profile-card');
  if (profileCard && window.matchMedia('(pointer: fine)').matches) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  // --- 4. CURSOR AURA GLOW ---
  const cursorAura = document.querySelector('.cursor-aura');
  if (cursorAura && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderAura() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorAura.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderAura);
    }
    renderAura();
  }

  // --- 5. MOBILE NAVIGATION DRAWER ---
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 6. NAVBAR SCROLL STATE & ACTIVE LINK TRACKING ---
  const navWrap = document.querySelector('.nav-wrap');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navWrap) {
      navWrap.classList.toggle('scrolled', scrollY > 40);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 400);
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentSectionId}`);
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 7. SCROLL REVEAL & SKILL BARS ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || '75%';
            bar.style.width = targetWidth;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // --- 8. SKILLS LIVE SEARCH & CATEGORY FILTERING ---
  const skillSearchInput = document.getElementById('skillSearchInput');
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  let activeCategory = 'all';

  function filterSkills() {
    const query = (skillSearchInput?.value || '').toLowerCase().trim();

    skillCards.forEach(card => {
      const category = card.dataset.category;
      const name = (card.querySelector('.skill-name')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.skill-desc')?.textContent || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || category === activeCategory;
      const matchesQuery = !query || name.includes(query) || desc.includes(query);

      if (matchesCat && matchesQuery) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.display = 'none';
      }
    });
  }

  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', filterSkills);
  }

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter;
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSkills();
    });
  });

  // --- 9. INTERACTIVE CINEMA SEAT MAP SIMULATOR ---
  const seatItems = document.querySelectorAll('.seat-item:not(.booked)');
  const seatCountDisplay = document.getElementById('selectedSeatCount');
  const seatPriceDisplay = document.getElementById('selectedSeatPrice');
  const bookSeatsBtn = document.getElementById('bookSeatsPreviewBtn');

  const SEAT_PRICE = 350;

  function updateSeatSummary() {
    const activeSeats = document.querySelectorAll('.seat-item.active');
    const count = activeSeats.length;
    const total = count * SEAT_PRICE;

    if (seatCountDisplay) {
      seatCountDisplay.textContent = `${count} Seat${count === 1 ? '' : 's'}`;
    }
    if (seatPriceDisplay) {
      seatPriceDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
  }

  seatItems.forEach(seat => {
    seat.addEventListener('click', () => {
      seat.classList.toggle('active');
      updateSeatSummary();
      const seatCode = seat.dataset.seat || 'Seat';
      if (seat.classList.contains('active')) {
        showToast(`🎟️ Added ${seatCode} to selection`);
      } else {
        showToast(`Removed ${seatCode}`);
      }
    });
  });

  if (bookSeatsBtn) {
    bookSeatsBtn.addEventListener('click', () => {
      const activeSeats = document.querySelectorAll('.seat-item.active');
      if (activeSeats.length === 0) {
        showToast('⚠️ Please tap on at least one seat to select!');
        return;
      }
      const count = activeSeats.length;
      const total = count * SEAT_PRICE;
      showToast(`🎬 Confirmed: ${count} seats booked for ₹${total}! (Interactive preview)`);
    });
  }

  // --- 9.5. INTERACTIVE 3D SPATIAL STUDIO SIMULATOR (CREATIVE TOUCH INTERIORS) ---
  const roomTabBtns = document.querySelectorAll('.room-tab-btn');
  const spatialCoordsDisplay = document.getElementById('spatialCoords');
  const spatialQuoteDisplay = document.getElementById('spatialLiveQuote');
  const spatialRoomTitle = document.getElementById('spatialRoomTitle');
  const spatialDocketBtn = document.getElementById('spatialDocketBtn');

  const roomData = {
    living: {
      name: '3D Living Spatial Layout',
      coords: 'X: 5.4m | Y: 3.2m | Z: 4.8m',
      quote: '₹4,85,000',
      specs: 'Italian Statuario Marble • Fluted Charcoal Paneling • Ambient 4000K'
    },
    master: {
      name: '3D Master Suite Spatial Layout',
      coords: 'X: 4.5m | Y: 3.0m | Z: 3.8m',
      quote: '₹3,60,000',
      specs: 'Acoustic Velvet Headboard • Engineered Oak Flooring • Recessed Halo'
    },
    kitchen: {
      name: '3D Modular Kitchen Spatial Layout',
      coords: 'X: 3.6m | Y: 2.8m | Z: 3.0m',
      quote: '₹2,95,000',
      specs: 'Quartz Countertops • Soft-Close Tandem Drawers • Under-Cabinet Strips'
    }
  };

  roomTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomKey = btn.dataset.room;
      const data = roomData[roomKey];
      if (!data) return;

      roomTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (spatialCoordsDisplay) spatialCoordsDisplay.textContent = data.coords;
      if (spatialQuoteDisplay) spatialQuoteDisplay.textContent = data.quote;
      if (spatialRoomTitle) spatialRoomTitle.textContent = data.name;

      showToast(`🛋️ Loaded ${data.name} & pricing docket`);
    });
  });

  if (spatialDocketBtn) {
    spatialDocketBtn.addEventListener('click', () => {
      showToast('📑 Generated PDF Proposal Docket preview (TCPDF Engine)');
    });
  }

  // --- 10. QUICK INQUIRY CHIPS FOR CONTACT FORM ---
  const inquiryChips = document.querySelectorAll('.inquiry-chip');
  const subjectInput = document.getElementById('senderSubject');
  const messageInput = document.getElementById('senderMessage');
  const charCounter = document.getElementById('charCounter');

  inquiryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const topic = chip.dataset.topic;
      if (subjectInput) subjectInput.value = topic;

      const templates = {
        'Internship Opportunity': 'Hi Het, we came across your portfolio and are impressed with your web development skills. We would like to discuss an internship opportunity with our team...',
        'Project Collaboration': 'Hi Het, I have a web application project idea that I would love to build together with you. Are you available to collaborate?',
        'General Inquiry': 'Hi Het, I saw your developer portfolio and wanted to connect!'
      };

      if (messageInput && templates[topic]) {
        messageInput.value = templates[topic];
        updateCharCounter();
        messageInput.focus();
      }
      showToast(`Prefilled message for: ${topic}`);
    });
  });

  function updateCharCounter() {
    if (messageInput && charCounter) {
      charCounter.textContent = `${messageInput.value.length} / 600`;
    }
  }

  if (messageInput) {
    messageInput.addEventListener('input', updateCharCounter);
  }

  // --- 11. COPY TO CLIPBOARD BUTTONS & TOAST ---
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.dataset.copy;
      const label = btn.dataset.copyLabel || 'Text';

      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Morph button label temporarily
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Copied!';
      setTimeout(() => { btn.innerHTML = originalText; }, 2000);

      showToast(`✓ Copied ${label} to clipboard!`);
    });
  });

  // --- 12. TOAST NOTIFICATION FUNCTION ---
  function showToast(message, duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 15);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  // --- 13. PROJECT DETAIL MODAL ---
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalDemoLink = document.getElementById('modalDemoLink');
  const modalCodeLink = document.getElementById('modalCodeLink');

  const projectData = {
    creative_touch: {
      title: 'Creative Touch Interiors — Enterprise 3D Spatial Architecture Platform',
      description: 'An enterprise interior design and 3D spatial visualization platform co-developed by Het D. Rana and Harsh Chotaliya. The system unites interactive Three.js WebGL spatial room modeling with real-time architectural cost computation, automated PDF proposal docket compilation, and a 3-tier Role-Based Access Control (RBAC) administrative suite.',
      features: [
        'Interactive 3D Spatial Studio: Three.js WebGL viewport allowing clients to orbit camera angles, test lighting presets, and view 3D room volumes in real-time.',
        'Dynamic Architectural Cost Calculator: Room-by-room calculation engine for surface finishes, dimension meters, premium fixtures, and tax totals.',
        'Automated PDF Docket Generation (TCPDF/FPDF): Compiles custom architectural specifications into printable, executive-ready client proposals.',
        '3-Tier Role-Based Access Control (RBAC): Structured administrative suite for Super Admins, Studio Admins, and Receptionists with audit logs.',
        'Self-Healing Database Engine: Built-in schema health checker and table repair routines (system_repair.php) ensuring zero-downtime database integrity.',
        'Co-Developed by Het D. Rana & Harsh Chotaliya (Open Source on GitHub).'
      ],
      demoLink: 'https://github.com/chotaliyaharsh2404-hash/creative_touch_interiors',
      codeLink: 'https://github.com/chotaliyaharsh2404-hash/creative_touch_interiors'
    },
    movie: {
      title: 'Online Movie Ticket Booking System',
      description: 'A full-stack web application designed to streamline the cinema ticketing journey. Users can explore trending films, inspect theater showtimes, pick custom seats via an interactive visual theater layout, calculate dynamic prices, and receive digital booking confirmations.',
      features: [
        'Interactive visual seat map with real-time selection and booked-state locks.',
        'Showtime and auditorium filtering based on dates and formats (2D, 3D, IMAX).',
        'State management handling seat pricing tiers, snacks add-ons, and tax totals.',
        'Clean, responsive mobile-first dark UI built with glassmorphic cards.'
      ],
      demoLink: '#projects',
      codeLink: '#'
    },
    kanban: {
      title: 'TaskPulse — Productivity & Kanban Board',
      description: 'A lightweight and modular productivity application featuring interactive drag-and-drop workflow columns, priority tagging, and instant client-side state persistence.',
      features: [
        'Drag-and-drop card movements between Backlog, In Progress, Review, and Done.',
        'Color-coded urgency indicators (High, Medium, Low) and search filtering.',
        'Persistent LocalStorage sync ensuring data remains intact on refresh.',
        'Zero bloated dependencies — 100% clean vanilla JavaScript logic.'
      ],
      demoLink: '#projects',
      codeLink: '#'
    },
    weather: {
      title: 'WeatherScope — Interactive Weather Dashboard',
      description: 'A modern meteorological dashboard that retrieves live atmospheric metrics from public REST APIs, visualizes 5-day forecasts, and adapts visual backgrounds to weather conditions.',
      features: [
        'Live geolocation and city search with autocomplete hints.',
        'Detailed climate data: Humidity, UV Index, Wind Direction, and Air Quality.',
        'Dynamic Celsius and Fahrenheit unit conversion with instant chart updates.',
        'Fully responsive card layout optimized for phones and tablets.'
      ],
      demoLink: '#projects',
      codeLink: '#'
    },
    portfolio: {
      title: 'Het Rana Portfolio — Personal Brand Experience',
      description: 'The very website you are experiencing now! Engineered from scratch with modern web standards, CSS custom properties, responsive glassmorphism, unified Electric Indigo theme, and accessibility.',
      features: [
        'Signature Electric Indigo & Violet obsidian glassmorphic design system.',
        'Interactive 3D mouse tilt and smooth scroll tracking.',
        'Live Surat Indian Standard Time (IST) clock with active hours indicator.',
        'Clean semantic markup optimized for 100% performance and accessibility.'
      ],
      demoLink: '#home',
      codeLink: '#'
    }
  };

  const modalTriggers = document.querySelectorAll('[data-project-modal]');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.dataset.projectModal;
      const data = projectData[projKey];
      if (!data || !projectModal) return;

      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
      
      if (modalDemoLink) modalDemoLink.href = data.demoLink;
      if (modalCodeLink) modalCodeLink.href = data.codeLink;

      if (typeof projectModal.showModal === 'function') {
        projectModal.showModal();
      } else {
        projectModal.setAttribute('open', 'true');
      }
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', () => {
      if (typeof projectModal.close === 'function') {
        projectModal.close();
      } else {
        projectModal.removeAttribute('open');
      }
    });

    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        if (typeof projectModal.close === 'function') {
          projectModal.close();
        } else {
          projectModal.removeAttribute('open');
        }
      }
    });
  }

  // --- 14. CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Project Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('⚠️ Please fill out all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Message...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '✓ Message Prepared';
        submitBtn.disabled = false;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Your message draft has been prepared. If your email application didn't launch automatically, click here to email Het directly: 
            <a href="mailto:hetrana00099@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}" style="text-decoration:underline; font-weight:700;">hetrana00099@gmail.com</a>.
          `;
        }

        showToast('✓ Message draft created! Launching email client...');

        const mailtoUri = `mailto:hetrana00099@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        window.location.href = mailtoUri;

        contactForm.reset();
        updateCharCounter();
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
        }, 4000);
      }, 700);
    });
  }

  // Set current copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
