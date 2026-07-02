// Clean-URL section routing (works together with vercel.json rewrites:
// /about, /projects, /stack, /contact all serve index.html; this script
// scrolls to the right section and keeps the URL clean when navigating)
const sectionRoutes = { '/about': 'about', '/projects': 'projects', '/stack': 'stack', '/contact': 'contact' };

function scrollToRoute(path) {
  if (path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const id = sectionRoutes[path];
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Only run on index.html (where these section ids actually exist)
if (document.getElementById('about')) {
  // Land on the right section immediately if loaded via a clean URL
  const initialPath = window.location.pathname;
  if (sectionRoutes[initialPath]) {
    window.addEventListener('load', () => {
      const el = document.getElementById(sectionRoutes[initialPath]);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }

  // Intercept same-page nav clicks so the URL updates without a full reload
  document.querySelectorAll('a[href^="/"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '/' || sectionRoutes[href]) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, '', href);
        scrollToRoute(href);
      });
    }
  });

  window.addEventListener('popstate', () => {
    scrollToRoute(window.location.pathname);
  });
}

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