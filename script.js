// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLoading();
  initBackgroundGradient();
  initNavigation();
  initScrolling();
  initTypingEffect();
  initTitleAnimation();
  initCustomCursor();
  initRevealAnimations();
  initParticles();
});

// =========================================================================
// Loading Screen
// =========================================================================
function initLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.floor(progress)}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      // Hide loading screen with delay
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          document.body.classList.remove('no-scroll');
        }, 500);
      }, 500);
    }
  }, 200);
  
  // Prevent scrolling during loading
  document.body.classList.add('no-scroll');
}

// =========================================================================
// Interactive Background Gradient
// =========================================================================
function initBackgroundGradient() {
  const canvas = document.getElementById('gradient-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Create gradient animation
  const colorSets = [
    ['#3B82F6', '#8B5CF6'],
    ['#60A5FA', '#2563EB'],
    ['#10B981', '#3B82F6'],
    ['#8B5CF6', '#F59E0B']
  ];
  
  let currentSet = 0;
  let nextSet = 1;
  let progress = 0;
  const transitionSpeed = 0.003;
  
  function drawGradient() {
    const currentColors = colorSets[currentSet];
    const nextColors = colorSets[nextSet];
    
    // Interpolate between color sets
    const color1 = interpolateColor(currentColors[0], nextColors[0], progress);
    const color2 = interpolateColor(currentColors[1], nextColors[1], progress);
    
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update progress
    progress += transitionSpeed;
    if (progress >= 1) {
      progress = 0;
      currentSet = nextSet;
      nextSet = (nextSet + 1) % colorSets.length;
    }
    
    requestAnimationFrame(drawGradient);
  }
  
  function interpolateColor(color1, color2, factor) {
    const result = '#';
    for (let i = 1; i <= 6; i += 2) {
      const c1 = parseInt(color1.substr(i, 2), 16);
      const c2 = parseInt(color2.substr(i, 2), 16);
      const hex = Math.round(c1 + (c2 - c1) * factor).toString(16).padStart(2, '0');
      result += hex;
    }
    return result;
  }
  
  drawGradient();
}

// =========================================================================
// Navigation
// =========================================================================
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close menu when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Header appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// =========================================================================
// Smooth Scrolling
// =========================================================================
function initScrolling() {
  const navDots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('.section');
  
  // Update active section based on scroll position
  function updateActiveSection() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    navDots.forEach(dot => {
      const dotSection = dot.getAttribute('href').substring(1);
      if (dotSection === currentSection) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
  
  // Smooth scroll to sections when clicking navigation items
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =========================================================================
// Typing Effect
// =========================================================================
function initTypingEffect() {
  const dynamicText = document.querySelector('.dynamic-text');
  if (!dynamicText) return;
  
  const words = JSON.parse(dynamicText.getAttribute('data-words'));
  const wait = parseInt(dynamicText.getAttribute('data-wait'), 10);
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove character
      dynamicText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      // Add character
      dynamicText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = wait;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing effect
  setTimeout(type, 1000);
}

// =========================================================================
// Title Animation
// =========================================================================
function initTitleAnimation() {
  const titleAnimation = document.querySelector('.title-animation');
  
  if (titleAnimation) {
    setTimeout(() => {
      titleAnimation.classList.add('animated');
    }, 500);
  }
}

// =========================================================================
// Custom Cursor
// =========================================================================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');
  
  if (!cursor || !cursorInner || !cursorOuter) return;
  
  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    cursor.style.visibility = 'visible';
    cursorInner.style.left = `${e.clientX}px`;
    cursorInner.style.top = `${e.clientY}px`;
    cursorOuter.style.left = `${e.clientX}px`;
    cursorOuter.style.top = `${e.clientY}px`;
  });
  
  // Hide cursor when it leaves the window
  document.addEventListener('mouseout', () => {
    cursor.style.visibility = 'hidden';
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.visibility = 'visible';
  });
  
  // Scale cursor when hovering over links and buttons
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card-btn, .project-card, .article-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
      cursorInner.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOuter.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOuter.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
    });
    
    el.addEventListener('mouseout', () => {
      cursorInner.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOuter.style.backgroundColor = 'transparent';
    });
  });
}

// =========================================================================
// Reveal Animations on Scroll
// =========================================================================
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  window.addEventListener('resize', checkReveal);
  checkReveal(); // Initial check
}

// =========================================================================
// Interactive Particles
// =========================================================================
function initParticles() {
  const particleContainer = document.getElementById('particle-container');
  if (!particleContainer) return;
  
  const particleCount = 30;
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particleContainer, colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createParticle(container, color) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random position, size and animation duration
  const size = Math.random() * 15 + 5;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background-color: ${color};
    left: ${posX}%;
    top: ${posY}%;
    opacity: ${Math.random() * 0.6 + 0.2};
    border-radius: 50%;
    box-shadow: 0 0 10px ${color};
    filter: blur(1px);
    animation: floatParticle ${duration}s ease-in-out ${delay}s infinite alternate;
  `;
  
  container.appendChild(particle);
  
  // Create keyframes dynamically for floating animation
  const style = document.createElement('style');
  const keyframes = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      100% {
        transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 360}deg);
      }
    }
  `;
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

// =========================================================================
// Form Handling
// =========================================================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const originalText = buttonText.textContent;
    
    // Update button state
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form submitted:', formValues);
      
      // Reset form
      contactForm.reset();
      
      // Reset button state
      submitButton.disabled = false;
      buttonText.textContent = 'Message Sent!';
      
      // Reset to original text after delay
      setTimeout(() => {
        buttonText.textContent = originalText;
      }, 3000);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
    }, 2000);
  });
  
  // Add focus events for form field animations
  const formFields = contactForm.querySelectorAll('input, textarea');
  
  formFields.forEach(field => {
    field.addEventListener('focus', function() {
      this.parentElement.querySelector('.form-border').style.width = '100%';
    });
    
    field.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.querySelector('.form-border').style.width = '0';
      }
    });
  });
});
