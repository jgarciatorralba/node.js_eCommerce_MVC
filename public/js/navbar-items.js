const url = window.location.href;

if (url.includes('profile')) {
  document.getElementById('profile').classList.add('active');
  document.getElementById('cart').classList.remove('active');
  document.getElementById('logo').classList.add('text-muted');
} else if(url.includes('cart')) {
  document.getElementById('cart').classList.add('active');
  document.getElementById('profile').classList.remove('active');
  document.getElementById('logo').classList.add('text-muted');
} else {
  document.getElementById('profile').classList.remove('active');
  document.getElementById('profile').classList.remove('active');
  document.getElementById('logo').classList.remove('text-muted');
}