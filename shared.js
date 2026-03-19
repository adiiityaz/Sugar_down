// ── SUGAR DOWN SHARED CART LOGIC ──
const PRODUCTS = {
  'kwath': { id:'kwath', name:'Pravahi Kwath', sub:'500ml Herbal Juice', price:565, img:'🍃', tag:'Morning Care' },
  'daycaps': { id:'daycaps', name:'Diabetes Care Capsules', sub:'60 Capsules', price:745, img:'💊', tag:'Daytime Care' },
  'sleepcaps': { id:'sleepcaps', name:'Sleep Care Capsules', sub:'30 Capsules', price:360, img:'😴', tag:'Night Care' },
  'corekit': { id:'corekit', name:'Core Kit', sub:'Kwath + Day Capsules', price:1310, img:'📦', tag:'Best Value', badge:'5% OFF' },
  'balkit': { id:'balkit', name:'Balanced Kit', sub:'Kwath + Day + Sleep Capsules', price:1670, img:'⭐', tag:'Most Recommended', badge:'5% OFF' },
};

function getCart() {
  try { return JSON.parse(localStorage.getItem('sd_cart') || '[]'); } catch(e) { return []; }
}
function saveCart(cart) { localStorage.setItem('sd_cart', JSON.stringify(cart)); }

function addToCart(id, qty=1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  updateCartBadge();
  showToast('Added to cart!');
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function showToast(msg) {
  let t = document.getElementById('sd-toast');
  if (!t) { t = document.createElement('div'); t.id='sd-toast'; t.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1B4D2E;color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.2);transition:opacity .3s;'; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = '1';
  setTimeout(() => t.style.opacity = '0', 2000);
}

function cartTotal() {
  const cart = getCart();
  return cart.reduce((s,i) => { const p = PRODUCTS[i.id]; return s + (p ? p.price * i.qty : 0); }, 0);
}

function generateOrderId() {
  return 'SD' + Date.now().toString().slice(-8) + Math.floor(Math.random()*100);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
