const canvas = document.getElementById('bg-canvas'); /* gets the canvas from html */
const ctx = canvas.getContext('2d'); /* gets the context of the canvas, which is where we will draw the particles */
let particles = []; /* array to hold the particles */

function resize() {
    canvas.width = window.innerWidth; /* sets the canvas width to the window width */
    canvas.height = window.innerHeight; /* sets the canvas height to the window height */
}
window.addEventListener('resize', resize);
resize(); /* call resize to set the canvas size initially */

function make_particles() {
    particles = []; /* clear the particles array */
    const count = Math.min(60, Math.floor(window.innerWidth / 25)); /* number of particles based on window width */
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width, /* random x position */
            y: Math.random() * canvas.height, /* random y position */
            vx: (Math.random() - 0.5) * 0.3, /* random x velocity */
            vy: (Math.random() - 0.5) * 0.3, /* random y velocity */
        });
    }
}
make_particles(); /* call make_particles to create the initial particles */

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1; /* bounce off left/right edges */
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); /* draw the particle as a circle */
        ctx.fillStyle = 'rgba(76, 224, 210, 0.5)'; /* white color with some transparency */
        ctx.fill();
    })
    requestAnimationFrame(tick); /* call tick again on the next frame */
}

const preferReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; /* check if user prefers reduced motion */
if (!preferReduceMotion) {
    tick(); /* start the animation loop if user does not prefer reduced motion */
}

/* Fade in Scroll Animation */
const revealElements = document.querySelectorAll('.reveal'); /* select all elements with class 'reveal' */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.15 }); /* trigger when 15% of the element is visible */
revealElements.forEach(el => observer.observe(el)); /* start observing each reveal element */

const sections = document.querySelectorAll('section'); /* select all section elements */
    const dots = document.querySelectorAll('[data-dot]'); 
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { 
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          dots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(sec => sectionObserver.observe(sec));