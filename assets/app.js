const body = document.body;
const themeBtn = document.querySelector('[data-theme-toggle]');
const rtlBtn = document.querySelector('[data-rtl-toggle]');
const menuBtn = document.querySelector('.menu-btn');
if (localStorage.getItem('millet-theme')) body.dataset.theme = localStorage.getItem('millet-theme');
if (localStorage.getItem('millet-rtl') === 'true') body.classList.add('rtl');
themeBtn?.addEventListener('click', () => { body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('millet-theme', body.dataset.theme) });
rtlBtn?.addEventListener('click', () => { body.classList.toggle('rtl'); localStorage.setItem('millet-rtl', body.classList.contains('rtl')) });
menuBtn?.addEventListener('click', () => document.querySelector('.nav-links')?.classList.toggle('open'));
let cart = 0;
document.querySelectorAll('.add-btn').forEach(b => b.addEventListener('click', () => { cart++; const c = document.querySelector('[data-cart-count]'); if (c) c.textContent = cart; toast('Added to your basket') }));
function toast(msg) { let t = document.querySelector('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.append(t) } t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2200) }
document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); const f = btn.dataset.filter; document.querySelectorAll('[data-category]').forEach(card => card.hidden = !(f === 'all' || card.dataset.category === f)) }));
document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); toast(f.dataset.success || 'Thanks! Your details have been received.'); f.reset() }));
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    if (!this.dataset.fallbackApplied) {
      this.dataset.fallbackApplied = 'true';
      this.src = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80';
    }
  });
});
