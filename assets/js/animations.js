import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // 1. Ken Burns Hero Effect
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg) {
    gsap.to(heroBg, {
      scale: 1.15,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // 2. Parallax elements
  const parallaxItems = document.querySelectorAll('.parallax');
  parallaxItems.forEach(item => {
    const speed = item.dataset.speed || 0.5;
    gsap.to(item, {
      y: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: item.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // 3. Slide Up Fade In
  const fadeUpItems = document.querySelectorAll('.fade-up');
  fadeUpItems.forEach(item => {
    gsap.from(item, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Staggered Fade Up for Grid items
  const staggerContainers = document.querySelectorAll('.stagger-container');
  staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.stagger-item');
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // 4. Word-by-word reveal
  const textReveals = document.querySelectorAll('.text-reveal');
  textReveals.forEach(el => {
    // splits words into spans roughly
    const words = el.innerText.split(' ');
    el.innerHTML = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.style.display = 'inline-block';
      el.appendChild(span);
    });
    
    gsap.from(el.querySelectorAll('span'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%"
      }
    });
  });

  // 5. Number Counters
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    gsap.to(counter, {
      innerHTML: target,
      duration: 2.5,
      snap: { innerHTML: 1 },
      ease: "power3.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 90%",
      }
    });
  });
}
