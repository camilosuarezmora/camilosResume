// JavaScript para funcionalidades interactivas
        
// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Verificar preferencia guardada o usar preferencia del sistema
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observar todos los elementos con clase 'reveal'
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar menú móvil si está abierto
            mobileMenu.classList.add('hidden');
        }
    });
});

// Parallax effect para el hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroSection = document.getElementById('inicio');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Formulario de contacto
const contactForm = document.querySelector('#contacto form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ejemplo, usando EmailJS, Netlify Forms, o tu propio backend
    
    // Simulación de envío exitoso
    alert('¡Gracias por tu mensaje! Te responderé pronto.');
    contactForm.reset();
});

// Animación de typing para el título principal (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Navbar background change on scroll
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95', 'dark:bg-darkbrown/95');
    } else {
        navbar.classList.remove('bg-white/95', 'dark:bg-darkbrown/95');
    }
});

// Skills hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        card.style.transform = `perspective(1000px) rotateX(${y / 10}deg) rotateY(${x / 10}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Cursor personalizado (opcional)
const cursor = document.createElement('div');
cursor.classList.add('fixed', 'w-4', 'h-4', 'bg-primary', 'rounded-full', 'pointer-events-none', 'z-50', 'transition-all', 'duration-200', 'hidden', 'md:block');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 8 + 'px';
    cursor.style.top = e.clientY - 8 + 'px';
});

// Expandir cursor en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = '#E07A5F';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = '#8B5E3C';
    });
});

// Animación de carga inicial
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animar elementos del hero
    setTimeout(() => {
        document.querySelectorAll('#inicio .reveal').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200);
        });
    }, 500);
});

// Easter egg: Konami Code
let konamiCode = [];
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > pattern.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(pattern)) {
        // Easter egg activado
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 4000);
        console.log('🎉 ¡Easter egg activado! ¡Eres increíble!');
    }
});