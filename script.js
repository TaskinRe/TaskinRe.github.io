// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLoading();
  initBackgroundGradient();
  initNavigation();
  initScrolling();
  initTypingEffect();
  initEnhancedAnimatedName();
  initEnhancedCustomCursor();
  initParticles();
  init3DProjectCards();
  initRevealAnimations();
  initPageTransitions();
  initPerformanceOptimizations();
});

// =========================================================================
// Loading Screen
// =========================================================================
function initLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  
  // Set body to loading state
  document.body.classList.add('is-loading');
  
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
          document.body.classList.remove('is-loading');
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
      return result + hex;
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
        
        // Mark section as in viewport for animations
        section.classList.add('in-viewport');
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
// Enhanced Animated Name
// =========================================================================
function initEnhancedAnimatedName() {
  const animatedName = document.querySelector('.animated-name');
  if (!animatedName) return;
  
  // Split text into letters for individual animation
  const text = animatedName.textContent;
  animatedName.textContent = '';
  
  // Create wrapper for letters
  const wrapper = document.createElement('div');
  wrapper.className = 'name-wrapper';
  animatedName.appendChild(wrapper);
  
  // Add each letter as a span
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'name-letter';
    span.textContent = char;
    span.style.animationDelay = `${index * 0.1}s`;
    wrapper.appendChild(span);
  });
  
  // Add glitch effect elements
  const glitchBefore = document.createElement('div');
  glitchBefore.className = 'name-glitch name-glitch-before';
  glitchBefore.setAttribute('data-text', text);
  
  const glitchAfter = document.createElement('div');
  glitchAfter.className = 'name-glitch name-glitch-after';
  glitchAfter.setAttribute('data-text', text);
  
  animatedName.appendChild(glitchBefore);
  animatedName.appendChild(glitchAfter);
  
  // Add magnetic effect on mouse move
  const magnetStrength = 30; // Adjust as needed
  
  document.addEventListener('mousemove', e => {
    const { clientX, clientY } = e;
    const rect = animatedName.getBoundingClientRect();
    
    // Calculate center of element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized)
    const distanceX = (clientX - centerX) / (window.innerWidth / 2);
    const distanceY = (clientY - centerY) / (window.innerHeight / 2);
    
    // Calculate the distance from element
    const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));
    
    // Only apply effect if mouse is close enough
    if (distance < 400) {
      // Calculate magnetic pull (stronger when closer)
      const pull = 1 - Math.min(1, distance / 400);
      
      // Apply transformation
      wrapper.style.transform = `
        translate(${distanceX * magnetStrength * pull}px, ${distanceY * magnetStrength * pull}px)
        rotate(${distanceX * distanceY * pull * 5}deg)
      `;
      
      // Adjust glitch intensity based on mouse distance
      const glitchIntensity = Math.min(10, 10 * pull);
      
      glitchBefore.style.textShadow = `
        ${Math.random() * glitchIntensity - glitchIntensity/2}px 
        ${Math.random() * glitchIntensity - glitchIntensity/2}px 
        rgba(255, 0, 0, 0.7)
      `;
      
      glitchAfter.style.textShadow = `
        ${Math.random() * glitchIntensity - glitchIntensity/2}px 
        ${Math.random() * glitchIntensity - glitchIntensity/2}px 
        rgba(0, 255, 255, 0.7)
      `;
      
      // Trigger subtle glitch effect randomly
      if (Math.random() < 0.05 * pull) {
        glitchBefore.classList.add('active');
        glitchAfter.classList.add('active');
        
        setTimeout(() => {
          glitchBefore.classList.remove('active');
          glitchAfter.classList.remove('active');
        }, 100);
      }
    } else {
      // Reset when mouse is far
      wrapper.style.transform = 'translate(0, 0) rotate(0deg)';
      glitchBefore.style.textShadow = 'none';
      glitchAfter.style.textShadow = 'none';
    }
  });
  
  // Add click effect
  animatedName.addEventListener('click', () => {
    // Trigger intense glitch effect
    glitchBefore.classList.add('active');
    glitchAfter.classList.add('active');
    
    // Add random transformation to each letter
    const letters = wrapper.querySelectorAll('.name-letter');
    letters.forEach(letter => {
      letter.style.transform = `
        translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)
        rotate(${Math.random() * 30 - 15}deg)
        scale(${0.8 + Math.random() * 0.4})
      `;
      
      // Reset after animation
      setTimeout(() => {
        letter.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
      }, 500);
    });
    
    // End glitch effect
    setTimeout(() => {
      glitchBefore.classList.remove('active');
      glitchAfter.classList.remove('active');
    }, 500);
  });
}

// =========================================================================
// Enhanced Custom Cursor
// =========================================================================
function initEnhancedCustomCursor() {
  // Only enable on desktop
  if (window.innerWidth < 1024) return;
  
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  
  const cursorInner = cursor.querySelector('.cursor-inner');
  const cursorOuter = cursor.querySelector('.cursor-outer');
  
  // Create additional cursor elements
  const cursorText = document.createElement('div');
  cursorText.className = 'cursor-text-content';
  cursor.appendChild(cursorText);
  
  // Add additional cursor shapes
  const cursorShapes = [
    { name: 'arrow-right', html: '<i class="fas fa-arrow-right"></i>' },
    { name: 'arrow-left', html: '<i class="fas fa-arrow-left"></i>' },
    { name: 'social', html: '<i class="fas fa-share-alt"></i>' },
    { name: 'menu', html: '<i class="fas fa-bars"></i>' }
  ];
  
  cursorShapes.forEach(shape => {
    const div = document.createElement('div');
    div.className = `cursor-shape cursor-${shape.name}`;
    div.innerHTML = shape.html;
    cursor.appendChild(div);
  });
  
  // Add cursor trail
  const trailContainer = document.createElement('div');
  trailContainer.className = 'cursor-trail-container';
  document.body.appendChild(trailContainer);
  
  const trailCount = 5;
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = 1 - (i / trailCount);
    trail.style.transform = 'translate(-100px, -100px) scale(' + (1 - (i * 0.05)) + ')';
    trailContainer.appendChild(trail);
  }
  
  const trails = document.querySelectorAll('.cursor-trail');
  let trailPositions = Array(trailCount).fill({ x: -100, y: -100 });
  
  // Track mouse position
  let mouseX = -100;
  let mouseY = -100;
  let lastTarget = null;
  
  // Position cursor on mouse move
  document.addEventListener('mousemove', e => {
    const { clientX, clientY } = e;
    mouseX = clientX;
    mouseY = clientY;
    
    // Update positions array for trail
    trailPositions.unshift({ x: clientX, y: clientY });
    trailPositions = trailPositions.slice(0, trailCount);
    
    // Update last target
    lastTarget = e.target;
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseout', e => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = '0';
      trailContainer.style.opacity = '0';
    }
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    trailContainer.style.opacity = '1';
  });
  
  // Add hover elements detection
  const hoverElements = [
    { selector: 'a, button, .project-card, .article-card, .cta-button', className: 'cursor-hover' },
    { selector: '.animated-name', className: 'cursor-text', text: 'Click' },
    { selector: '.social-link', className: 'cursor-social' },
    { selector: '.menu-toggle', className: 'cursor-menu' },
    { selector: '.view-all-btn, .read-more, .article-link', className: 'cursor-arrow-right' },
    { selector: '.slider-prev', className: 'cursor-arrow-left' },
    { selector: '.slider-next', className: 'cursor-arrow-right' }
  ];
  
  // Animation loop for cursor
  function animateCursor() {
    // Update inner cursor position immediately
    cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    
    // Update outer cursor with some lag for smooth effect
    const outerX = lerp(parseFloat(cursorOuter.style.transform.split('(')[1]) || mouseX, mouseX, 0.15);
    const outerY = lerp(parseFloat(cursorOuter.style.transform.split(',')[1]) || mouseY, mouseY, 0.15);
    cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
    
    // Update cursor state based on hovered element
    updateCursorState(lastTarget);
    
    // Update trail positions
    trails.forEach((trail, index) => {
      if (trailPositions[index]) {
        const { x, y } = trailPositions[index];
        trail.style.transform = `translate(${x}px, ${y}px) scale(${1 - (index * 0.05)})`;
      }
    });
    
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation loop
  animateCursor();
  
  // Update cursor state based on hovered element
  function updateCursorState(target) {
    if (!target) return;
    
    // Reset all classes first
    cursorInner.classList.remove('active');
    cursorOuter.classList.remove('active');
    cursor.classList.remove('cursor-hover', 'cursor-text', 'cursor-social', 'cursor-menu', 'cursor-arrow-right', 'cursor-arrow-left');
    cursorText.textContent = '';
    
    // Check if target matches any of our hover elements
    for (const { selector, className, text } of hoverElements) {
      if (target.matches(selector) || target.closest(selector)) {
        cursor.classList.add(className);
        cursorInner.classList.add('active');
        cursorOuter.classList.add('active');
        
        // Add text if specified
        if (text) {
          cursorText.textContent = text;
        }
        
        return;
      }
    }
  }
  
  // Add click effect
  document.addEventListener('mousedown', () => {
    cursorInner.style.transform += ' scale(0.7)';
    cursorOuter.style.transform += ' scale(1.4)';
  });
  
  document.addEventListener('mouseup', () => {
    cursorInner.style.transform = cursorInner.style.transform.replace(' scale(0.7)', '');
    cursorOuter.style.transform = cursorOuter.style.transform.replace(' scale(1.4)', '');
  });
  
  // Linear interpolation helper function
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }
}

// =========================================================================
// Interactive Particle System
// =========================================================================
function initParticles() {
  const particleContainer = document.getElementById('particle-container');
  if (!particleContainer) return;
  
  const particleCount = 30;
  const particles = [];
  const mousePosition = { x: 0, y: 0 };
  let isMouseInContainer = false;
  
  // Track mouse position
  particleContainer.addEventListener('mousemove', (e) => {
    const rect = particleContainer.getBoundingClientRect();
    mousePosition.x = e.clientX - rect.left;
    mousePosition.y = e.clientY - rect.top;
    isMouseInContainer = true;
  });
  
  particleContainer.addEventListener('mouseleave', () => {
    isMouseInContainer = false;
  });
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const speedX = (Math.random() - 0.5) * 0.3;
    const speedY = (Math.random() - 0.5) * 0.3;
    const hue = Math.random() * 60 + 200; // Blue to purple range
    
    // Set particle styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
    particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
    
    // Add to container and array
    particleContainer.appendChild(particle);
    
    particles.push({
      element: particle,
      x,
      y,
      speedX,
      speedY,
      size
    });
  }
  
  // Create SVG for connection lines
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1';
  particleContainer.appendChild(svg);
  
  // Animation loop
  function animate() {
    // Clear previous connection lines
    svg.innerHTML = '';
    
    // Update each particle
    particles.forEach((particle, index) => {
      // Move particle
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= 100) {
        particle.speedX *= -1;
      }
      
      if (particle.y <= 0 || particle.y >= 100) {
        particle.speedY *= -1;
      }
      
      // Apply position
      particle.element.style.left = `${particle.x}%`;
      particle.element.style.top = `${particle.y}%`;
      
      // Draw connections to nearby particles
      particles.forEach((otherParticle, otherIndex) => {
        if (index === otherIndex) return;
        
        // Calculate distance between particles
        const dx = (particle.x - otherParticle.x) / 100 * particleContainer.offsetWidth;
        const dy = (particle.y - otherParticle.y) / 100 * particleContainer.offsetHeight;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Draw line if particles are close enough
        if (distance < 100) {
          const opacity = 1 - (distance / 100);
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          
          line.setAttribute('x1', `${particle.x}%`);
          line.setAttribute('y1', `${particle.y}%`);
          line.setAttribute('x2', `${otherParticle.x}%`);
          line.setAttribute('y2', `${otherParticle.y}%`);
          line.setAttribute('stroke', `rgba(59, 130, 246, ${opacity * 0.5})`);
          line.setAttribute('stroke-width', '1');
          
          svg.appendChild(line);
        }
      });
      
      // Connect to mouse if mouse is in container
      if (isMouseInContainer) {
        const particleX = (particle.x / 100) * particleContainer.offsetWidth;
        const particleY = (particle.y / 100) * particleContainer.offsetHeight;
        
        const dx = mousePosition.x - particleX;
        const dy = mousePosition.y - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = 1 - (distance / 150);
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          
          line.setAttribute('x1', `${particle.x}%`);
          line.setAttribute('y1', `${particle.y}%`);
          line.setAttribute('x2', `${mousePosition.x / particleContainer.offsetWidth * 100}%`);
          line.setAttribute('y2', `${mousePosition.y / particleContainer.offsetHeight * 100}%`);
          line.setAttribute('stroke', `rgba(16, 185, 129, ${opacity * 0.8})`);
          line.setAttribute('stroke-width', '1.5');
          
          svg.appendChild(line);
          
          // Slightly attract particles to mouse
          particle.speedX += dx * 0.0001;
          particle.speedY += dy * 0.0001;
        }
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// =========================================================================
// 3D Project Cards
// =========================================================================
function init3DProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!projectCards.length) return;
  
  projectCards.forEach(card => {
    // Store card color for glow effect
    const cardColor = card.getAttribute('data-color') || '#3B82F6';
    
    // Add event listeners for mouse movement
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Calculate rotation and movement values
      const rotateX = 10 * (0.5 - y);
      const rotateY = 10 * (x - 0.5);
      
      // Create a glow effect based on mouse position
      const glowX = 100 * (x - 0.5);
      const glowY = 100 * (y - 0.5);
      
      // Apply transformations
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
      
      // Add dynamic shadow and glow effect
      card.style.boxShadow = `
        0 15px 35px rgba(0, 0, 0, 0.2),
        ${glowX / 10}px ${glowY / 10}px 30px rgba(${hexToRgb(cardColor)}, 0.3)
      `;
      
      // Move card image slightly for parallax effect
      const cardImage = card.querySelector('.card-image');
      if (cardImage) {
        cardImage.style.transform = `translateX(${rotateY * -1.5}px) translateY(${rotateX * 1.5}px)`;
      }
    });
    
    // Reset card on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.boxShadow = 'var(--shadow-sm)';
      
      const cardImage = card.querySelector('.card-image');
      if (cardImage) {
        cardImage.style.transform = 'translate(0, 0)';
      }
    });
    
    // Add click effect
    card.addEventListener('mousedown', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(0.98, 0.98, 0.98)';
    });
    
    card.addEventListener('mouseup', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
  
  // Helper function to convert hex color to RGB
  function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }
}

// =========================================================================
// Enhanced Reveal Animations with GSAP
// =========================================================================
function initRevealAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback to simple reveal if GSAP is not available
    implementSimpleReveal();
    return;
  }
  
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate title of each section
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title, 
      { 
        opacity: 0, 
        y: 50,
        backgroundPosition: '200% 0' 
      },
      {
        opacity: 1,
        y: 0,
        backgroundPosition: '0% 0',
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Animate project cards with staggered effect
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    gsap.fromTo(projectCards, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: '.projects-container',
          start: "top 70%",
        }
      }
    );
  }
  
  // Animate research papers
  const papers = document.querySelectorAll('.paper-item');
  if (papers.length) {
    papers.forEach((paper, index) => {
      gsap.fromTo(paper, 
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paper,
            start: "top 85%",
          }
        }
      );
    });
  }
  
  // Animate blog articles
  const articles = document.querySelectorAll('.article-card, .featured-article');
  if (articles.length) {
    gsap.fromTo(articles, 
      { 
        opacity: 0, 
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: '.articles-grid, .featured-article',
          start: "top 80%",
        }
      }
    );
  }
  
  // Parallax effect for profile image
  const profileContainer = document.querySelector('.profile-container');
  if (profileContainer) {
    gsap.to(profileContainer, {
      y: -50,
      scrollTrigger: {
        trigger: '.intro-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
  
  // Animate the floating shape with parallax
  const floatingShape = document.querySelector('.floating-shape');
  if (floatingShape) {
    gsap.to(floatingShape, {
      y: 100,
      rotation: 15,
      scrollTrigger: {
        trigger: '.intro-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
  
  // Enhanced scroll indicator behavior
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: '.intro-section',
        start: '10% top',
        end: '20% top',
        scrub: true
      }
    });
  }
}

// Simple fallback reveal animation using Intersection Observer
function implementSimpleReveal() {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
          
          // Stop observing after animation
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '-50px 0px', // Slightly delayed reveal
      threshold: 0.1
    });
    
    // Observe all sections and elements with reveal class
    document.querySelectorAll('.section, .reveal').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    document.querySelectorAll('.section, .reveal').forEach(el => {
      el.classList.add('in-viewport');
    });
  }
}

// =========================================================================
// Page Transitions
// =========================================================================
function initPageTransitions() {
  // Create references to transition elements
  const overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) return;
  
  const topPanel = overlay.querySelector('.top-panel');
  const bottomPanel = overlay.querySelector('.bottom-panel');
  const transitionLogo = overlay.querySelector('.transition-logo');
  
  // Set initial body state for page load animation
  document.body.classList.add('is-loading');
  
  // Hide overlay when page loads
  function endTransition() {
    // Ensure this runs after the page has fully loaded
    window.requestAnimationFrame(() => {
      overlay.classList.remove('active');
      document.body.classList.remove('is-loading');
    });
  }
  
  // Run end transition on initial page load
  if (document.readyState === 'complete') {
    endTransition();
  } else {
    window.addEventListener('load', endTransition);
  }
  
  // Prevent default navigation and add transitions
  document.addEventListener('click', e => {
    // Only process internal links that aren't anchor links
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || 
        href.includes('://') || link.getAttribute('target') === '_blank') {
      return;
    }
    
    // Prevent default navigation
    e.preventDefault();
    
    // Start transition
    startTransition(href);
  });
  
  // Function to start page transition
  function startTransition(url) {
    // Add active class to trigger animation
    overlay.classList.add('active');
    
    // Wait for animation to complete before navigating
    setTimeout(() => {
      window.location.href = url;
    }, 800); // Match this with the CSS transition duration
  }
  
  // Handle back/forward navigation
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      // Page was restored from back/forward cache
      endTransition();
    }
  });
}

// =========================================================================
// Performance Optimizations
// =========================================================================
function initPerformanceOptimizations() {
  // Implement lazy loading for images
  lazyLoadImages();
  
  // Implement intersection observer for revealing elements
  implementIntersectionObserver();
  
  // Detect if user prefers reduced motion
  detectReducedMotion();
}

// Lazy load images
function lazyLoadImages() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            // Replace src with data-src
            img.src = src;
            
            // Optional: fade in the image
            img.style.opacity = 0;
            img.onload = () => {
              img.style.transition = 'opacity 0.5s ease';
              img.style.opacity = 1;
            };
            
            // Stop observing the image
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '100px 0px', // Load images when they're 100px from viewport
      threshold: 0.01
    });
    
    // Target all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.getAttribute('data-src');
    });
  }
}

// Implement intersection observer for revealing elements
function implementIntersectionObserver() {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
          
          // Stop observing after animation
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '-50px 0px', // Slightly delayed reveal
      threshold: 0.1
    });
    
    // Observe all sections and elements with reveal class
    document.querySelectorAll('.section, .reveal').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    document.querySelectorAll('.section, .reveal').forEach(el => {
      el.classList.add('in-viewport');
    });
  }
}

// Detect if user prefers reduced motion
function detectReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Listen for changes
  prefersReducedMotion.addEventListener('change', e => {
    if (e.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  });
}
