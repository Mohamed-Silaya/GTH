// Global variable to track if header is loaded
let headerLoaded = false;

// Mobile menu toggle function
function toggleMobileMenu() {
  console.log('Toggle mobile menu called'); // Debug log
  
  const dropdown = document.getElementById('mobile-dropdown');
  const toggle = document.querySelector('.navbar-toggle');
  
  if (dropdown && toggle) {
    dropdown.classList.toggle('active');
    
    // Change hamburger to X when open
    const icon = toggle.querySelector('i');
    if (dropdown.classList.contains('active')) {
      icon.className = 'fas fa-times';
      console.log('Menu opened'); // Debug log
    } else {
      icon.className = 'fas fa-bars';
      console.log('Menu closed'); // Debug log
    }
  } else {
    console.log('Dropdown or toggle not found'); // Debug log
  }
}

// Set active navigation item
function setActiveNavItem() {
  const href = window.location.pathname.split("/").pop();
  let activeClass = '';
  
  if (href === '' || href === 'index.html') activeClass = 'home';
  else if (href === 'aboutUs.html') activeClass = 'about';
  else if (href === 'services.html') activeClass = 'services';
  else if (href === 'contactUs.html') activeClass = 'contact';
  
  // Set active for desktop menu
  if (activeClass) {
    document.querySelectorAll('.desktop-menu li, .mobile-dropdown li').forEach(li => {
      li.classList.remove('active');
    });
    
    const activeDesktop = document.querySelector('.desktop-menu li.' + activeClass);
    const activeMobile = document.querySelector('.mobile-dropdown li.' + activeClass);
    
    if (activeDesktop) activeDesktop.classList.add('active');
    if (activeMobile) activeMobile.classList.add('active');
  }
  
  // Set active for bottom navigation
  document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  if (activeClass === 'home') {
    const homeNav = document.querySelector('.mobile-bottom-nav .home-nav');
    if (homeNav) homeNav.classList.add('active');
  } else if (activeClass === 'services') {
    const servicesNav = document.querySelector('.mobile-bottom-nav .services-nav');
    if (servicesNav) servicesNav.classList.add('active');
  } else if (activeClass === 'contact') {
    const contactNav = document.querySelector('.mobile-bottom-nav .contact-nav');
    if (contactNav) contactNav.classList.add('active');
  }
}

// Setup event listeners after header is loaded
function setupEventListeners() {
  // Handle clicks outside mobile dropdown to close it
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('mobile-dropdown');
    const toggle = document.querySelector('.navbar-toggle');
    
    if (dropdown && dropdown.classList.contains('active')) {
      if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
        dropdown.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    }
  });

  // Add click listeners to mobile dropdown items to close menu
  document.querySelectorAll('.mobile-dropdown a').forEach(link => {
    link.addEventListener('click', function() {
      const dropdown = document.getElementById('mobile-dropdown');
      const toggle = document.querySelector('.navbar-toggle');
      
      if (dropdown) {
        dropdown.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  });
}

// Load header and handle page initialization
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('site-navbar').innerHTML = html;
    headerLoaded = true;
    
    // Setup event listeners after DOM is updated
    setTimeout(() => {
      setupEventListeners();
      setActiveNavItem();
      console.log('Header loaded and setup complete'); // Debug log
    }, 100);

    // Fade in content and remove loading overlay
    const main = document.getElementById('main-content');
    if(main) {
      main.style.transition = "opacity 0.33s";
      main.style.opacity = 1;
    }
    
    setTimeout(() => {
      const overlay = document.getElementById('loading-overlay');
      if(overlay) overlay.classList.add('done');
      document.body.classList.remove('page-loading');
    }, 150);  
  })
  .catch(error => {
    console.error('Error loading header:', error);
  });

// Handle resize events
function handleResize() {
  if (!headerLoaded) return;
  
  const dropdown = document.getElementById('mobile-dropdown');
  const toggle = document.querySelector('.navbar-toggle');
  
  if (window.innerWidth > 750) {
    if (dropdown) {
      dropdown.classList.remove('active');
    }
    if (toggle) {
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  }
}

window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);

// Make toggleMobileMenu available globally
window.toggleMobileMenu = toggleMobileMenu;
