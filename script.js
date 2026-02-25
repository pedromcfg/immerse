document.addEventListener('DOMContentLoaded', function() {
    // ===============================
    // Navegação suave
    // ===============================
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
 
    // ===============================
    // Sistema de cookies - Obrigatório em mobile
    // ===============================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const isMobileDevice = window.innerWidth <= 768;
    
    if (cookieBanner && acceptBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'flex';
            
            // Em mobile, bloquear interação até aceitar cookies
            if (isMobileDevice) {
                // Criar overlay que bloqueia a página
                const overlay = document.createElement('div');
                overlay.id = 'cookie-overlay';
                overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 9998;';
                document.body.appendChild(overlay);
                
                // Bloquear scroll
                document.body.style.overflow = 'hidden';
            }
        }
        
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
            
            // Remover overlay e desbloquear scroll em mobile
            if (isMobileDevice) {
                const overlay = document.getElementById('cookie-overlay');
                if (overlay) overlay.remove();
                document.body.style.overflow = '';
            }
        });
    }
 
    // ===============================
    // Trailer Interativo (apenas mobile)
    // ===============================
    const trailerPlaceholder = document.getElementById('trailerPlaceholder');
    const trailerVideoFullscreen = document.getElementById('trailerVideoFullscreen');
    const trailerVideo = document.getElementById('trailerVideo');
    const closeTrailer = document.getElementById('closeTrailer');
    const rotationMessage = document.querySelector('.trailer-rotation-message');
    
    if (trailerPlaceholder && trailerVideoFullscreen) {
        // Detectar orientação do dispositivo
        function checkOrientation() {
            if (window.innerHeight > window.innerWidth) {
                // Portrait - mostrar mensagem
                rotationMessage.style.display = 'block';
            } else {
                // Landscape - esconder mensagem e mostrar vídeo
                rotationMessage.style.display = 'none';
            }
        }
        
        // Abrir trailer em fullscreen
        trailerPlaceholder.addEventListener('click', function() {
            if (window.innerWidth <= 768) { // Apenas em mobile
                trailerVideoFullscreen.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                checkOrientation();
                
                // Adicionar URL do vídeo aqui (substituir quando tiveres)
                // trailerVideo.src = 'caminho/para/video.mp4';
            }
        });
        
        // Fechar trailer
        if (closeTrailer) {
            closeTrailer.addEventListener('click', function() {
                trailerVideoFullscreen.style.display = 'none';
                document.body.style.overflow = '';
                if (trailerVideo) {
                    trailerVideo.pause();
                    trailerVideo.currentTime = 0;
                }
            });
        }
        
        // Verificar orientação quando muda
        window.addEventListener('orientationchange', checkOrientation);
        window.addEventListener('resize', checkOrientation);
    }

    // ===============================
    // Mostrar categoria específica
    // ===============================
    const isMobile = window.innerWidth <= 768;
    const categoryToggleBtn = document.getElementById('categoryToggleBtn');
    const categoriesSection = document.getElementById('categoriesSection');
    const clearBtnMobile = document.getElementById('clearBtnMobile');
    
    window.showCategory = function(category) {
        const sections = document.querySelectorAll('.movies');
        sections.forEach(sec => sec.style.display = 'none');
        const targetSection = document.getElementById(category);
        if (targetSection) targetSection.style.display = 'grid';
        
        // Em mobile: esconder categorias, mostrar apenas botão limpar
        if (isMobile && categoriesSection && clearBtnMobile) {
            categoriesSection.classList.remove('show');
            categoriesSection.style.display = 'none';
            clearBtnMobile.style.display = 'block';
            if (categoryToggleBtn) {
                categoryToggleBtn.textContent = 'Escolher Categoria';
                categoryToggleBtn.classList.remove('active');
            }
            
            // Scroll para início da secção de filmes
            setTimeout(() => {
                const firstMovieSection = document.querySelector('.movies[style*="grid"], .movies:not([style*="none"])');
                if (firstMovieSection) {
                    firstMovieSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };
  
    window.showAllMovies = function() {
        const sections = document.querySelectorAll('.movies');
        sections.forEach(sec => sec.style.display = 'grid');
        
        // Em mobile: esconder botão limpar, mostrar botão escolher categoria
        if (isMobile && clearBtnMobile && categoryToggleBtn) {
            clearBtnMobile.style.display = 'none';
            categoryToggleBtn.textContent = 'Escolher Categoria';
            categoryToggleBtn.classList.remove('active');
        }
    };
    
    // Toggle do botão Escolher Categoria (apenas mobile)
    if (categoryToggleBtn && categoriesSection && isMobile) {
        categoryToggleBtn.addEventListener('click', function() {
            const isShowing = categoriesSection.classList.contains('show');
            if (isShowing) {
                categoriesSection.classList.remove('show');
                categoriesSection.style.display = 'none';
                this.classList.remove('active');
            } else {
                categoriesSection.classList.add('show');
                categoriesSection.style.display = 'grid';
                this.classList.add('active');
                clearBtnMobile.style.display = 'none';
            }
        });
    }
 
    // ===============================
    // Carrossel de vídeos
    // ===============================
    const carouselVideos = document.querySelectorAll('.carousel-video');
    if (carouselVideos.length > 0) {
        let currentVideo = 0;
        function showNextVideo() {
            carouselVideos[currentVideo].classList.remove('active');
            currentVideo = (currentVideo + 1) % carouselVideos.length;
            carouselVideos[currentVideo].classList.add('active');
        }
        setInterval(showNextVideo, 5000);
    }
 
    // ===============================
    // Video fixo no layout (sem parallax)
    // ===============================
    // O efeito de parallax foi removido para evitar que o player
    // de video "deslize" ao fazer scroll.
 
    // ===============================
    // Animação de entrada para cards
    // ===============================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
 
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
 
    // ===============================
    // Formulário de Contacto via Formspree
    // ===============================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
 
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
 
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
 
            if (!name || !email || !message) {
                if (typeof showErrorMessage === 'function') {
                    showErrorMessage('Por favor, preencha todos os campos.');
                } else if (formMessage) {
                    formMessage.textContent = 'Por favor, preencha todos os campos.';
                    formMessage.style.color = 'red';
                }
                return;
            }

            if (!isValidEmail(email)) {
                if (typeof showErrorMessage === 'function') {
                    showErrorMessage('Por favor, insira um email válido.');
                } else if (formMessage) {
                    formMessage.textContent = 'Por favor, insira um email válido.';
                    formMessage.style.color = 'red';
                }
                return;
            }

            try {
                const response = await fetch('https://formspree.io/f/xnngzwkp', { // substitui pelo teu endpoint
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (typeof showSuccessMessage === 'function') {
                        showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
                    } else if (formMessage) {
                        formMessage.textContent = 'Mensagem enviada com sucesso! ✅';
                        formMessage.style.color = 'green';
                    }
                    contactForm.reset();
                } else {
                    if (typeof showErrorMessage === 'function') {
                        showErrorMessage('Erro ao enviar a mensagem. Tente novamente.');
                    } else if (formMessage) {
                        formMessage.textContent = 'Erro ao enviar a mensagem. ❌';
                        formMessage.style.color = 'red';
                    }
                }
            } catch (error) {
                if (typeof showErrorMessage === 'function') {
                    showErrorMessage('Erro ao enviar a mensagem. Tente novamente.');
                } else if (formMessage) {
                    formMessage.textContent = 'Erro ao enviar a mensagem. ❌';
                    formMessage.style.color = 'red';
                }
            }
        });
    }
 
    // ===============================
    // Destacar link ativo
    // ===============================
    setActiveNavLink();
});
 
// ===============================
// Funções auxiliares
// ===============================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
 
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}
const form = document.getElementById('purchase-form');
const celebrationMessage = document.getElementById('celebration-message');
const confettiContainer = document.getElementById('confetti-container');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Mostra a mensagem
  celebrationMessage.style.display = 'block';

  // Cria confetes
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    confettiContainer.appendChild(confetti);

    // Remove confete após a animação
    setTimeout(() => confetti.remove(), 5000);
  }

  // Esconde a mensagem após 3 segundos
  setTimeout(() => {
    celebrationMessage.style.display = 'none';
  }, 3000);

  // Limpa o formulário
  form.reset();
});
