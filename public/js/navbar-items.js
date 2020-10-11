const url = window.location.href;

if (url.includes('profile')) {
  document.getElementById('profile').classList.add('active');
  document.getElementById('cart').classList.add('text-muted');
  document.getElementById('cart').classList.add('hoverable');
  document.getElementById('logo').classList.add('text-muted');
  document.getElementById('logo').classList.add('hoverable');
} else if(url.includes('cart')) {
  document.getElementById('profile').classList.remove('active');
  document.getElementById('cart').classList.remove('text-muted');
  document.getElementById('cart').classList.remove('hoverable');
  document.getElementById('logo').classList.add('text-muted');
  document.getElementById('logo').classList.add('hoverable');
} else {
  document.getElementById('profile').classList.remove('active');
  document.getElementById('cart').classList.add('text-muted');
  document.getElementById('cart').classList.add('hoverable');
  document.getElementById('logo').classList.remove('text-muted');
  document.getElementById('logo').classList.remove('hoverable');
}