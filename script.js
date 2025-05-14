// Confirma que o JS está ativo
console.log("JavaScript está ativo!");

// Seleção dos links de navegação e seções
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Função para animar os elementos dentro da seção ativa
function animateElements(section) {
    const elements = section.querySelectorAll('.card, .barbeiro, .galeria-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 1s';
            element.style.opacity = '1';
        }, index * 100);
    });
}

// Função para mostrar uma seção específica
function showSection(sectionId) {
    // Remove classe active dos links e seções
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));

    // Adiciona classe active ao link e à seção correspondente
    const activeLink = document.querySelector(`a[data-section="${sectionId}"]`);
    const activeSection = document.querySelector(`#${sectionId}`);

    if (activeLink) activeLink.classList.add('active');
    if (activeSection) {
        activeSection.classList.add('active');
        animateElements(activeSection); // Aplica animação aos elementos visíveis
    }

    // Atualiza URL sem recarregar a página
    history.pushState(null, null, `#${sectionId}`);
}

// Evento de clique nos links de navegação
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Carrega a seção correta ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showSection(hash);
});

// Suporte ao botão de voltar/avançar do navegador
window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showSection(hash);
});

// Configuração do carrossel
const slides = document.querySelectorAll('.carrossel-slide');
const prevBtn = document.querySelector('.carrossel-btn.prev');
const nextBtn = document.querySelector('.carrossel-btn.next');
let currentSlide = 0;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.carrossel-container').style.transform = `translateX(${offset}%)`;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

if (slides.length > 0 && prevBtn && nextBtn) {
    // Controles manuais
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Auto-play do carrossel
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}