fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('site-navbar').innerHTML = html;

    const href = window.location.pathname.split("/").pop();
    let activeClass = '';
    if (href === '' || href === 'index.html') activeClass = 'home';
    else if (href === 'aboutUs.html') activeClass = 'about';
    else if (href === 'services.html') activeClass = 'services';
    else if (href === 'contactUs.html') activeClass = 'contact';
    if (activeClass) {
      document.querySelectorAll('.navbar-menu li').forEach(li => li.classList.remove('active'));
      const activeLi = document.querySelector('.navbar-menu li.' + activeClass);
      if (activeLi) activeLi.classList.add('active');
    }

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
  });
