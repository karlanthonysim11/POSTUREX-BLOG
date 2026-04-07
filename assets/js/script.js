// Smooth scrolling for in-page links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetSelector = this.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            return;
        }

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

const header = document.querySelector('header');

// Keep a darker navbar after user scrolls.
window.addEventListener('scroll', () => {
    if (!header) {
        return;
    }

    if (window.scrollY > 100) {
        header.style.background = 'rgba(8, 14, 22, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.45)';
    } else {
        header.style.background = 'rgba(15, 20, 25, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Fade in sections when they enter the viewport.
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle the mobile navigation menu.
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu after selecting a nav link.
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Highlight current section in navbar while scrolling.
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const pageSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let currentId = '';

    pageSections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentId = section.getAttribute('id') || '';
        }
    });

    navAnchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        const isActive = href === `#${currentId}`;
        anchor.style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)';
    });
});

const imageModal = document.getElementById('imageModal');
const imageModalImg = document.getElementById('imageModalImg');
const imageModalCaption = document.getElementById('imageModalCaption');
const imageModalClose = document.getElementById('imageModalClose');

function openImageModal(image) {
    if (!imageModal || !imageModalImg || !imageModalCaption) {
        return;
    }

    imageModalImg.src = image.src;
    imageModalImg.alt = image.alt || '';

    const figcaption = image.closest('figure')?.querySelector('figcaption');
    imageModalCaption.textContent = figcaption ? figcaption.textContent : image.alt || '';

    imageModal.classList.add('active');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeImageModal() {
    if (!imageModal || !imageModalImg || !imageModalCaption) {
        return;
    }

    imageModal.classList.remove('active');
    imageModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    imageModalImg.src = '';
    imageModalImg.alt = '';
    imageModalCaption.textContent = '';
}

document.querySelectorAll('.chapter-figure img').forEach(image => {
    image.addEventListener('click', () => openImageModal(image));
});

if (imageModalClose) {
    imageModalClose.addEventListener('click', closeImageModal);
}

if (imageModal) {
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeImageModal();
        }
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
