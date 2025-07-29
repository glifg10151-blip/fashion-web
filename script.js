document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.navigation');
  const buyButton = document.querySelector('.buy-button');

  hamburger.addEventListener('click', function() {
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
      buyButton.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      buyButton.style.display = 'block';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Intersection Observer for fade-in effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Countdown timer
  function countdown() {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + 7);
    
    const diff = targetDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Update progress circle
    const totalTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const progress = 360 - (diff / totalTime) * 360;
    const progressCircle = document.querySelector('.progress');
    progressCircle.style.setProperty('--progress', `${progress}deg`);

    // Change color based on progress
    let progressColor;
    if (diff > totalTime * 0.5) {
      progressColor = '#4CAF50'; // green
    } else if (diff > totalTime * 0.25) {
      progressColor = '#FF9800'; // orange
    } else {
      progressColor = '#F44336'; // red
    }
    progressCircle.style.setProperty('--progress-color', progressColor);
  };

  setInterval(countdown, 1000);

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);

  // Add back-to-top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
  document.body.appendChild(backToTop);

  // Update progress bar and back-to-top visibility
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
    
    // Show back-to-top button after scrolling 300px
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  // Initialize back-to-top button styles
  backToTop.style.position = 'fixed';
  backToTop.style.bottom = '20px';
  backToTop.style.right = '20px';
  backToTop.style.width = '40px';
  backToTop.style.height = '40px';
  backToTop.style.borderRadius = '50%';
  backToTop.style.background = '#ff7e5f';
  backToTop.style.color = 'white';
  backToTop.style.border = 'none';
  backToTop.style.fontSize = '20px';
  backToTop.style.cursor = 'pointer';
  backToTop.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  backToTop.style.display = 'flex';
  backToTop.style.justifyContent = 'center';
  backToTop.style.alignItems = 'center';

  // Fade-in elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('visible');
      }
    });
  };
  
  // Initial check
  fadeInOnScroll();
  window.addEventListener('scroll', fadeInOnScroll);
});
