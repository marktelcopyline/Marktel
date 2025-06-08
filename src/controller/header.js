document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.querySelector('.nav-overlay');
  
    hamburger.addEventListener('click', () => {
      const isOpen = navOverlay.classList.toggle('active');
      navOverlay.hidden = !isOpen;
      document.body.classList.toggle('nav-open', isOpen);
    });
  });
  