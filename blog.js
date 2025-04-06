// =========================================================================
// Blog Page JavaScript
// =========================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize blog-specific components
  initFeaturedSlider();
  initCategoryFilter();
  initGridViewToggle();
  initSortPosts();
  initLoadMore();
  initSearch();
  initNewsletterForm();
});

// =========================================================================
// Featured Posts Slider
// =========================================================================
function initFeaturedSlider() {
  const slider = document.querySelector('.featured-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.slider-item');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dots = slider.querySelectorAll('.pagination-dot');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let interval;
  
  // Show active slide
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
  
  // Initialize first slide
  showSlide(currentIndex);
  
  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }
  
  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
  
  // Pagination dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
      resetInterval();
    });
  });
  
  // Auto play
  function startInterval() {
    interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }
  
  startInterval();
  
  // Pause auto play when hovering over slider
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', startInterval);
  
  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go to next slide
      nextSlide();
      resetInterval();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go to previous slide
      prevSlide();
      resetInterval();
    }
  }
}

// =========================================================================
// Category Filter
// =========================================================================
function initCategoryFilter() {
  const categoryPills = document.querySelectorAll('.category-pill');
  const postCards = document.querySelectorAll('.post-card');
  
  if (categoryPills.length === 0 || postCards.length === 0) return;
  
  // Filter posts by category
  function filterPosts(category) {
    postCards.forEach(card => {
      if (category === 'all') {
        card.style.display = 'flex';
      } else {
        const cardCategories = card.dataset.category.split(' ');
        if (cardCategories.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
  }
  
  // Handle category pill click
  categoryPills.forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();
      
      // Update active pill
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      // Filter posts
      const category = pill.dataset.category;
      filterPosts(category);
    });
  });
}

// =========================================================================
// Grid/List View Toggle
// =========================================================================
function initGridViewToggle() {
  const gridViewBtn = document.querySelector('.grid-view');
  const listViewBtn = document.querySelector('.list-view');
  const postsGrid = document.querySelector('.posts-grid');
  
  if (!gridViewBtn || !listViewBtn || !postsGrid) return;
  
  // Switch to grid view
  gridViewBtn.addEventListener('click', () => {
    postsGrid.classList.remove('list-view');
    listViewBtn.classList.remove('active');
    gridViewBtn.classList.add('active');
    
    // Save preference
    localStorage.setItem('blog-view', 'grid');
  });
  
  // Switch to list view
  listViewBtn.addEventListener('click', () => {
    postsGrid.classList.add('list-view');
    gridViewBtn.classList.remove('active');
    listViewBtn.classList.add('active');
    
    // Save preference
    localStorage.setItem('blog-view', 'list');
  });
  
  // Load saved preference
  const savedView = localStorage.getItem('blog-view');
  if (savedView === 'list') {
    postsGrid.classList.add('list-view');
    gridViewBtn.classList.remove('active');
    listViewBtn.classList.add('active');
  }
}

// =========================================================================
// Sort Posts
// =========================================================================
function initSortPosts() {
  const sortSelect = document.getElementById('sort-posts');
  const postsGrid = document.querySelector('.posts-grid');
  
  if (!sortSelect || !postsGrid) return;
  
  // Get posts and convert to array for sorting
  const getPostsArray = () => {
    return Array.from(postsGrid.querySelectorAll('.post-card'));
  };
  
  // Sort by date (newest first)
  function sortByNewest(posts) {
    return posts.sort((a, b) => {
      const dateA = new Date(a.querySelector('.post-date').textContent);
      const dateB = new Date(b.querySelector('.post-date').textContent);
      return dateB - dateA;
    });
  }
  
  // Sort by date (oldest first)
  function sortByOldest(posts) {
    return posts.sort((a, b) => {
      const dateA = new Date(a.querySelector('.post-date').textContent);
      const dateB = new Date(b.querySelector('.post-date').textContent);
      return dateA - dateB;
    });
  }
  
  // Sort by popularity (read time as proxy)
  function sortByPopular(posts) {
    return posts.sort((a, b) => {
      const readTimeA = parseInt(a.querySelector('.read-time').textContent);
      const readTimeB = parseInt(b.querySelector('.read-time').textContent);
      return readTimeB - readTimeA;
    });
  }
  
  // Apply sorting
  function applySorting(sortType) {
    const posts = getPostsArray();
    let sortedPosts;
    
    switch (sortType) {
      case 'newest':
        sortedPosts = sortByNewest(posts);
        break;
      case 'oldest':
        sortedPosts = sortByOldest(posts);
        break;
      case 'popular':
        sortedPosts = sortByPopular(posts);
        break;
      default:
        sortedPosts = posts;
    }
    
    // Remove current posts
    posts.forEach(post => post.remove());
    
    // Append sorted posts
    sortedPosts.forEach(post => postsGrid.appendChild(post));
    
    // Save preference
    localStorage.setItem('blog-sort', sortType);
  }
  
  // Handle sort selection change
  sortSelect.addEventListener('change', () => {
    applySorting(sortSelect.value);
  });
  
  // Load saved preference
  const savedSort = localStorage.getItem('blog-sort');
  if (savedSort) {
    sortSelect.value = savedSort;
    applySorting(savedSort);
  }
}

// =========================================================================
// Load More Posts
// =========================================================================
function initLoadMore() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  const postsGrid = document.querySelector('.posts-grid');
  
  if (!loadMoreBtn || !postsGrid) return;
  
  // In a real implementation, you would load more posts from a server
  // This is a simplified simulation for demonstration purposes
  
  let postIndex = 0;
  const postsPerPage = 6;
  const totalPosts = postsGrid.querySelectorAll('.post-card').length;
  
  // Hide posts beyond the initial count
  const postCards = postsGrid.querySelectorAll('.post-card');
  
  postCards.forEach((card, index) => {
    if (index >= postsPerPage) {
      card.style.display = 'none';
    }
  });
  
  postIndex = postsPerPage;
  
  // Load more posts
  loadMoreBtn.addEventListener('click', () => {
    const spinner = loadMoreBtn.querySelector('i');
    spinner.classList.add('fa-spin');
    
    // Simulate loading delay
    setTimeout(() => {
      for (let i = postIndex; i < postIndex + postsPerPage; i++) {
        if (i < totalPosts) {
          postCards[i].style.display = 'flex';
        }
      }
      
      postIndex += postsPerPage;
      
      // Hide button if all posts are shown
      if (postIndex >= totalPosts) {
        loadMoreBtn.style.display = 'none';
      }
      
      spinner.classList.remove('fa-spin');
    }, 800); // Simulate loading time
  });
}

// =========================================================================
// Search Functionality
// =========================================================================
function initSearch() {
  const searchForm = document.querySelector('.blog-search-form');
  const searchInput = document.querySelector('.blog-search-input');
  const postCards = document.querySelectorAll('.post-card');
  
  if (!searchForm || !searchInput || postCards.length === 0) return;
  
  // Handle search submission
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
      // Show all posts if search is empty
      postCards.forEach(card => {
        card.style.display = 'flex';
      });
      return;
    }
    
    // Filter posts by search term
    postCards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
      const category = card.querySelector('.post-category').textContent.toLowerCase();
      
      if (
        title.includes(searchTerm) || 
        excerpt.includes(searchTerm) || 
        category.includes(searchTerm)
      ) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Reset category pills
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => pill.classList.remove('active'));
    document.querySelector('[data-category="all"]').classList.add('active');
  });
}

// =========================================================================
// Newsletter Form
// =========================================================================
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) return;
    
    // In a real implementation, you would send the email to a server
    // This is a simplified simulation for demonstration purposes
    
    // Show success message
    const formGroup = newsletterForm.querySelector('.form-group');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
    successMessage.style.color = 'var(--color-accent)';
    successMessage.style.marginTop = 'var(--spacing-sm)';
    
    // Replace form with success message
    formGroup.style.display = 'none';
    newsletterForm.appendChild(successMessage);
  });
}
