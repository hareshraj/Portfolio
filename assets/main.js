// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    navToggle.textContent = open ? 'CLOSE' : 'MENU';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = 'MENU';
    });
  });
}

// Scroll reveal (progressive enhancement — content is visible by
// default via CSS; this just adds the fade-in on top when it can)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('pre'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}