document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links li a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Scroll Animations using IntersectionObserver
  const setupObserver = () => {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          // Once animated, unobserve to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    // Add elements to observe
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-card, .section-title');
    elementsToAnimate.forEach(el => {
      // Setup initial state for animation
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      // The CSS class 'animate-fade-up' will handle the transition back to normal state
      scrollObserver.observe(el);
    });
  };

  setupObserver();

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section, header');
  const navLi = document.querySelectorAll('.nav-links li a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLi.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current)) {
        a.classList.add('active');
      }
    });
  });
});
