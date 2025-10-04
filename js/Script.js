// init AOS animation (AOS is loaded via CDN in index.html)
window.addEventListener('DOMContentLoaded', function () {
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init({
      duration: prefersReduced ? 0 : 900,
      easing: 'ease-out-cubic',
      offset: 80,
      once: false,
      mirror: false,
      startEvent: 'DOMContentLoaded',
      disable: function () { return prefersReduced; }
    });
  } else {
    console.warn('AOS not found. Make sure the AOS script is loaded before this file.');
  }

  // Accessible ripple effect for .hero-content__order-button
  var btn = document.querySelector('.hero-content__order-button');
  if (btn) {
    btn.addEventListener('click', function (e) {
      var rect = this.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  }
  
  // Smooth scroll helper for the "join us" button
  window.scrollToSubscribe = function () {
    try {
      var el = document.getElementById('Services') || document.querySelector('.subscription');
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.hash = '#Services';
      }
    } catch (e) {
      window.location.hash = '#Services';
    }
  };
});