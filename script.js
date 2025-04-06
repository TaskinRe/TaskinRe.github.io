// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLoading();
  initBackgroundGradient();
  initNavigation();
  initScrolling();
  initTypingEffect();
  initAnimatedName();
  initCustomCursor();
  initRevealAnimations();
  initParticles();
  initEnhancedInteractions();
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
// Interactive Animated Name
// =========================================================================
function initAnimatedName() {
  const animatedName = document.querySelector('.animated-name');
  
  if (!animatedName) return;
  
  // Add 3D effect on mouse hover
  animatedName.addEventListener('mousemove', (e) => {
    const rect = animatedName.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = 10 * (0.5 - y);
    const rotateY = 10 * (x - 0.5);
    
    animatedName.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  // Reset on mouse leave
  animatedName.addEventListener('mouseleave', () => {
    animatedName.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
  
  // Optional: Add click effect
  animatedName.addEventListener('click', () => {
    // Create ripple effect with temporary span
    const ripple = document.createElement('span');
    ripple.classList.add('name-ripple');
    animatedName.appendChild(ripple);
    
    // Remove after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Trigger a text scramble effect
    scrambleText(animatedName);
  });
}

// Text scramble effect for animated name
function scrambleText(element) {
  const originalText = element.innerText;
  const scrambleChars = "!<>-_\\/*&^%$#@+=";
  const frames = 20;
  let frame = 0;
  
  const interval = setInterval(() => {
    let scrambledText = "";
    
    for (let i = 0; i < originalText.length; i++) {
      // Keep original character as we get closer to the end
      if (Math.random() < frame / frames) {
        scrambledText += originalText[i];
      } else {
        // Replace with random character
        scrambledText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
    }
    
    element.setAttribute('data-text', scrambledText);
    
    frame++;
    if (frame >= frames) {
      clearInterval(interval);
      element.setAttribute('data-text', originalText);
    }
  }, 30);
}
