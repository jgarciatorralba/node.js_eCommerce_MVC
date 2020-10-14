const url = window.location.href;

if (url.includes('profile')) {
  if (document.getElementById('profile') !== null) {
    document.getElementById('profile').classList.add('active');
  }
  document.getElementById('cart').classList.add('text-muted');
  document.getElementById('cart').classList.add('hoverable');
  document.getElementById('logo').classList.add('text-muted');
  document.getElementById('logo').classList.add('hoverable');
} else if(url.includes('cart') || url.includes('checkout')) {
  if (document.getElementById('profile') !== null) {
    document.getElementById('profile').classList.remove('active');
  }
  document.getElementById('cart').classList.remove('text-muted');
  document.getElementById('cart').classList.remove('hoverable');
  document.getElementById('logo').classList.add('text-muted');
  document.getElementById('logo').classList.add('hoverable');
} else {
  if (document.getElementById('profile') !== null) {
    document.getElementById('profile').classList.remove('active');
  }
  document.getElementById('cart').classList.add('text-muted');
  document.getElementById('cart').classList.add('hoverable');
  document.getElementById('logo').classList.remove('text-muted');
  document.getElementById('logo').classList.remove('hoverable');
}