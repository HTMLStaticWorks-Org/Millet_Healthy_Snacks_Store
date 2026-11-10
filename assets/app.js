// Theme, RTL and Navigation Controls
const body = document.body;
const backToTopBtn = document.getElementById('backToTop');

// Load saved preferences
if (localStorage.getItem('millet-theme')) {
  body.dataset.theme = localStorage.getItem('millet-theme');
}
if (localStorage.getItem('millet-rtl') === 'true') {
  body.classList.add('rtl');
}

// Toggle Theme (support all theme buttons across desktop, mobile drawer, and auth)
document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('millet-theme', body.dataset.theme);
  });
});

// Toggle RTL (support all RTL buttons across desktop, mobile drawer, and auth)
document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    body.classList.toggle('rtl');
    localStorage.setItem('millet-rtl', body.classList.contains('rtl'));
  });
});

// Mobile / Tablet Hamburger Toggle
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nav = document.querySelector('.nav-links');
    nav?.classList.toggle('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav-links');
  const isMenuBtn = e.target.closest('.menu-btn');
  if (nav?.classList.contains('open') && !nav.contains(e.target) && !isMenuBtn) {
    nav.classList.remove('open');
  }
});

// Shopping Cart Count & Toast Notification
let cart = parseInt(localStorage.getItem('millet-cart-count') || '0', 10);
const cartCountElements = document.querySelectorAll('[data-cart-count]');
cartCountElements.forEach(el => el.textContent = cart);

document.querySelectorAll('.add-btn, .add-btn-bundle').forEach(btn => {
  btn.addEventListener('click', () => {
    cart++;
    localStorage.setItem('millet-cart-count', cart);
    cartCountElements.forEach(el => el.textContent = cart);
    toast('Added to your basket 🌾');
  });
});

function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.append(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// Product Tab Filters
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = !(f === 'all' || card.dataset.category === f);
    });
  });
});

// FAQ Accordion Toggle
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(x => x.classList.remove('open'));
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Password Visibility Eye Toggle
document.querySelectorAll('[data-eye-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.password-wrap');
    const input = wrap?.querySelector('input');
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🔒';
      btn.setAttribute('aria-label', 'Hide password');
    } else {
      input.type = 'password';
      btn.textContent = '👁';
      btn.setAttribute('aria-label', 'Show password');
    }
  });
});

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 280) {
    backToTopBtn?.classList.add('visible');
  } else {
    backToTopBtn?.classList.remove('visible');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Demo Form Submissions
document.querySelectorAll('form[data-demo]').forEach(f => {
  f.addEventListener('submit', e => {
    e.preventDefault();
    toast(f.dataset.success || 'Thank you! Your request has been received.');
    f.reset();
  });
});

// Image Fallback Handler
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    if (!this.dataset.fallbackApplied) {
      this.dataset.fallbackApplied = 'true';
      this.src = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80';
    }
  });
});
