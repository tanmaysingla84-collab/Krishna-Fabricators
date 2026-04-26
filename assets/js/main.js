import '../styles/variables.css'
import '../styles/global.css'
import '../styles/components.css'

import Lenis from 'lenis'
import gsap from 'gsap'

import { initAnimations } from './animations'

// --- Smooth Scrolling (Lenis) ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Sync GSAP ScrollTrigger with Lenis if needed
// (ScrollTrigger will be handled in animations.js, but good to have lenis globally)
window.lenis = lenis;

// --- Custom Cursor ---
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverLinks = document.querySelectorAll('a, button, .hover-target');
  hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('active'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

// --- Preloader ---
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const logo = document.querySelector('.preloader-logo');
  const bar = document.querySelector('.progress-bar');
  
  if (preloader && logo && bar) {
    const tl = gsap.timeline();
    tl.to(logo, { opacity: 1, duration: 1, ease: "power2.inOut" })
      .to(bar, { width: "100%", duration: 1.5, ease: "power2.inOut" })
      .to(preloader, { yPercent: -100, duration: 1, ease: "power4.inOut" })
      .from(".hero-content > *", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.5");
  } else {
    // If no preloader, just animate hero content
    gsap.from(".hero-content > *", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 });
  }

  // Initialize general animations
  initAnimations();

  // Fix broken images globally (If Unsplash is blocked by ISP)
  const images = document.querySelectorAll('img');
  const fallbacks = [
    'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/373905/pexels-photo-373905.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/273204/pexels-photo-273204.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];
  
  images.forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      img.src = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    img.addEventListener('error', function() {
      this.src = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    });
  });
});

// --- Navbar Sticky ---
const navbar = document.querySelector('.navbar');
if(navbar) {
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
