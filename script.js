    function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

       
        if (Math.random() > 0.5) {
            particle.style.setProperty('--particle-color', '#00B2FF');
            const before = particle.style.getPropertyValue('--particle-color');
            particle.style.background = '#00B2FF';
        }

        particlesContainer.appendChild(particle);
    }
}


const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => item.classList.remove('active'));
            const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (currentNav) currentNav.classList.add('active');
        }
    });
}


window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});


updateActiveNav();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const tabs = document.querySelectorAll('.tab-item');
const panels = document.querySelectorAll('.content-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');

        
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    alert('Message sent! We\'ll get back to you soon.');
    this.reset();
});


createParticles();


const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;
let isAnimating = false;

function wrapTextInSpans(element) {
    const text = element.textContent;
    element.innerHTML = text.split('').map((char, i) =>
        `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
}

function animateTextIn(textSet) {
    const glitchText = textSet.querySelector('.glitch-text');
    const subtitle = textSet.querySelector('.subtitle');

   
    wrapTextInSpans(glitchText);

    
    glitchText.setAttribute('data-text', glitchText.textContent);

    
    setTimeout(() => {
        subtitle.classList.add('visible');
    }, 800);
}

function animateTextOut(textSet) {
    const chars = textSet.querySelectorAll('.char');
    const subtitle = textSet.querySelector('.subtitle');

    
    chars.forEach((char, i) => {
        char.style.animationDelay = `${i * 0.02}s`;
        char.classList.add('out');
    });

    
    subtitle.classList.remove('visible');
}

function rotateText() {
    if (isAnimating) return;
    isAnimating = true;

    const currentSet = textSets[currentIndex];
    const nextIndex = (currentIndex + 1) % textSets.length;
    const nextSet = textSets[nextIndex];

   
    animateTextOut(currentSet);

   
    setTimeout(() => {
        currentSet.classList.remove('active');
        nextSet.classList.add('active');
        animateTextIn(nextSet);

        currentIndex = nextIndex;
        isAnimating = false;
    }, 600);
}


textSets[0].classList.add('active');
animateTextIn(textSets[0]);


setTimeout(() => {
    setInterval(rotateText, 5000); 
}, 4000);


setInterval(() => {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        if (Math.random() > 0.95) {
            text.style.animation = 'none';
            setTimeout(() => {
                text.style.animation = '';
            }, 200);
        }
    });
}, 3000);