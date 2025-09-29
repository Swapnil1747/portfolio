document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 800, once: true });

  const tagline = "Building intelligent systems with data and AI";
  let i = 0;
  const typeWriter = () => {
    const pElement = document.querySelector("header p");
    if (i === 0) {
      pElement.textContent = '';
    }
    if (i < tagline.length) {
      pElement.textContent += tagline.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  typeWriter();

  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  let isDark = storedTheme === "dark";
  if (storedTheme === null) {
    isDark = true; // Default to dark on first visit
    localStorage.setItem("theme", "dark");
  }
  if (isDark) {
    document.body.classList.add("dark");
    themeToggle.innerHTML = "☀️";
  } else {
    themeToggle.innerHTML = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.classList.toggle("rotate");
    const newIsDark = document.body.classList.contains("dark");
    themeToggle.innerHTML = newIsDark ? "☀️" : "🌙";
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  });

  // Navigation smooth scrolling
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Animate stats counters
  function animateStats() {
    const stats = document.querySelectorAll('.stats-item h4');
    stats.forEach(stat => {
      const text = stat.textContent;
      const target = parseInt(text.replace(/[^\d]/g, ''));
      const suffix = text.replace(/\d/g, '');
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    });
  }

  // Trigger stats animation on scroll
  const statsSection = document.getElementById('stats');
  let statsAnimated = false;
  window.addEventListener('scroll', () => {
    if (!statsAnimated && statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
      animateStats();
      statsAnimated = true;
    }
  });

  // Load projects dynamically
  const projectsRow = document.querySelector('#projects .row');
  fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
      projectsRow.innerHTML = ''; // Clear hardcoded content
      projects.forEach((project, index) => {
        const colClass = 'col-md-6 col-lg-4';
        const aosEffect = getAosEffect(index);
        const animateEffect = getAnimateEffect(index);
        const cardHtml = `
          <div class="${colClass}" data-aos="${aosEffect}" data-aos-delay="${index * 100}" data-aos-duration="800">
            <div class="card h-100 shadow-sm animate__animated ${animateEffect}">
              <img src="${project.image}" class="card-img-top" alt="${project.title}" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-primary">${project.title}</h5>
                <p class="card-text flex-grow-1">${project.description}</p>
                <div class="mt-auto d-flex justify-content-center">
                  ${project.demo ? `<a href="${project.demo}" class="btn btn-primary btn-sm me-2 project-btn animate__animated animate__pulse" target="_blank"><i class="fas fa-external-link-alt me-1"></i>Live Demo</a>` : ''}
                  <a href="${project.repo}" class="btn btn-outline-secondary btn-sm project-btn animate__animated animate__pulse" target="_blank"><i class="fab fa-github me-1"></i>View Code</a>
                </div>
              </div>
            </div>
          </div>
        `;
        projectsRow.innerHTML += cardHtml;
      });
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      // Fallback to hardcoded projects
      const hardcodedProjects = [
        {
          title: "Unified Computer Vision Platform",
          description: "YOLOv11-powered multi-task app for object detection, segmentation, and classification.",
          image: "data/images/computer-vision-banner.png",
          demo: "https://multitasking-yolomodel-app.onrender.com/",
          repo: "https://github.com/Swapnil1747/Multitasking_yolomodel_app"
        },
        {
          title: "Customer Feedback Sentiment Analyzer",
          description: "BERT-based model for churn prediction from customer reviews.",
          image: "data/images/Bert.jpeg",
          demo: "https://huggingface.co/spaces/swapnil2230/Review_Analysis_System",
          repo: "https://github.com/Swapnil1747/Product_review_prediction_bert"
        },
        {
          title: "AI Personal Email Assistant",
          description: "Generative AI agent for managing and replying to emails intelligently.",
          image: "data/images/Ai_email.jpeg",
          repo: "https://github.com/Swapnil1747/email_assistant/tree/main"
        },
        {
          title: "Stock Market Predictor",
          description: "A machine learning powered web app for predicting stock market trends and prices with interactive visualizations, built using Streamlit.",
          image: "data/images/stock.jpg",
          demo: "https://stockmarketpredictor-hjkav7jmuqwlduavjcxqp5.streamlit.app/",
          repo: "https://github.com/Swapnil1747/Stock_Market_Predictor"
        },
        {
          title: "Telescout Chatbot",
          description: "An AI-powered conversational chatbot built with Streamlit, designed to assist users with queries and provide interactive responses.",
          image: "data/images/telescout.webp",
          demo: "https://telescoutchatboart.streamlit.app/",
          repo: "https://github.com/Swapnil1747/TeleScout_chatboart"
        },
        {
          title: "Movies Recommendation System",
          description: "An interactive app that recommends movies based on user inputs using machine learning / content-based filtering models.",
          image: "data/images/movie_recomendation.jpg",
          demo: "https://huggingface.co/spaces/swapnil2230/Movies_recomendation_system",
          repo: "https://github.com/Swapnil1747/Movies_recomendation_system"
        }
      ];
      projectsRow.innerHTML = '';
      hardcodedProjects.forEach((project, index) => {
        const colClass = 'col-md-6 col-lg-4';
        const aosEffect = getAosEffect(index);
        const animateEffect = getAnimateEffect(index);
        const cardHtml = `
          <div class="${colClass}" data-aos="${aosEffect}" data-aos-delay="${index * 100}" data-aos-duration="800">
            <div class="card h-100 shadow-sm animate__animated ${animateEffect}">
              <img src="${project.image}" class="card-img-top" alt="${project.title}" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-primary">${project.title}</h5>
                <p class="card-text flex-grow-1">${project.description}</p>
                <div class="mt-auto d-flex justify-content-center">
                  ${project.demo ? `<a href="${project.demo}" class="btn btn-primary btn-sm me-2 animate__animated animate__pulse" target="_blank">Live Demo</a>` : ''}
                  <a href="${project.repo}" class="btn btn-outline-secondary btn-sm animate__animated animate__pulse" target="_blank">View Code</a>
                </div>
              </div>
            </div>
          </div>
        `;
        projectsRow.innerHTML += cardHtml;
      });
    });

  function getAosEffect(index) {
    const effects = ['zoom-in', 'fade-up', 'flip-left', 'zoom-out', 'fade-right', 'slide-up'];
    return effects[index % effects.length];
  }

  function getAnimateEffect(index) {
    const effects = ['zoomIn', 'fadeInUp', 'flipInX', 'zoomOut', 'fadeInRight', 'slideInUp'];
    return effects[index % effects.length];
  }

  // Initialize EmailJS using config
  emailjs.init(CONFIG.publicKey);

  // Bootstrap Modal handling
  const messageModalEl = document.getElementById('message-modal');
  const modalMessage = document.getElementById('modal-message');
  const messageModal = new bootstrap.Modal(messageModalEl);

  function showModal(type, text) {
    modalMessage.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} text-${type === 'success' ? 'success' : 'danger'} me-2"></i><p>${text}</p>`;
    modalMessage.className = `text-${type === 'success' ? 'success' : 'danger'}`;
    messageModal.show();
  }

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const name = contactForm.querySelector('input[name="user_name"]').value.trim();
      const email = contactForm.querySelector('input[name="user_email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      // Custom validation
      if (!name || !email || !message) {
        showModal('error', 'Please fill in all fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showModal('error', 'Please enter a valid email address.');
        return;
      }

      if (message.length < 10) {
        showModal('error', 'Message should be at least 10 characters long.');
        return;
      }

      // Add loading spinner
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
      submitBtn.disabled = true;

      // Use config for service and template IDs
      emailjs.sendForm(CONFIG.serviceId, CONFIG.templateId, contactForm)
        .then((result) => {
          console.log('SUCCESS!', result.text);
          showModal('success', 'Thank you for your message! I will get back to you soon.');
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, (error) => {
          console.log('FAILED...', error.text);
          showModal('error', 'Failed to send the message. Please try again or contact me directly at swapnilmishrak2230@gmail.com.');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});
