// Variáveis globais

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initializeNavbar();
    initializeTestimonials();
    initializeGallery();
    initializeFAQ();
    initializeScrollToTop();
    initializeSmoothScroll();
    initializeFormValidation();
    initializeFloatingElements();
    initializeMenuMobile();
    initializeParallax();
    // Novas animações com scroll gradual
    initializeAllEffects();
    var el = document.getElementById('contador-clientes');
    if (el) {
        let count = 0;
        let target = 500;
        let interval = setInterval(function() {
            count += 5;
            if (count >= target) {
                el.textContent = '500+';
                clearInterval(interval);
            } else {
                el.textContent = count;
            }
        }, 10);
    }

    // Contador animado para stats do sobre mim
    function animarContador(id, valorFinal, sufixo = '', duracao = 1000) {
        var el = document.getElementById(id);
        if (!el) return;
        let start = 0;
        let increment = Math.ceil(valorFinal / (duracao / 20));
        let current = start;
        let interval = setInterval(function() {
            current += increment;
            if (current >= valorFinal) {
                el.textContent = valorFinal + sufixo;
                clearInterval(interval);
            } else {
                el.textContent = current + sufixo;
            }
        }, 20);
    }
    animarContador('about-anos', 6);
    animarContador('about-satisfacao', 99, '%');
    animarContador('about-clientes', 500, '+');

    // Efeito de contagem animada para os números do Sobre Mim
    function animateCount(element, endValue, duration = 1500, suffix = '') {
        let start = 0;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (endValue - start) + start);
            element.textContent = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = endValue + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Seleciona os elementos dos números
    const anos = document.getElementById('about-anos');
    const satisfacao = document.getElementById('about-satisfacao');
    const clientes = document.getElementById('about-clientes');

    if (anos) animateCount(anos, 6, 1200);
    if (satisfacao) animateCount(satisfacao, 99, 1200, '%');
    if (clientes) animateCount(clientes, 500, 1200, '+');

    setTimeout(animateCounters, 300); // espera 300ms para garantir que tudo carregou
});

// Navegação - Efeitos na navbar
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efeito de glassmorphism na navbar ao scrollar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(253, 249, 243, 0.9)';
            navbar.style.boxShadow = '0 10px 40px rgba(93, 64, 55, 0.1)';
        } else {
            navbar.style.background = 'rgba(253, 249, 243, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Destaque do link ativo
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Remove classe active de todos os links
                navLinks.forEach(l => l.classList.remove('active'));
                // Adiciona classe active ao link clicado
                this.classList.add('active');
            }
        });
    });
}

// Menu mobile
function initializeMenuMobile() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Previne scroll do body quando menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Depoimentos - Agora estáticos lado a lado
function initializeTestimonials() {
    // Adiciona animações de entrada aos depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.animation = `fadeInScale 0.8s ease-out ${index * 0.2}s both`;
    });
}

// Galeria com abas
function initializeGallery() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const galleryGrids = document.querySelectorAll('#professional-gallery, #space-gallery');
    
    function showGallery(type) {
        // Remove active de todos os botões
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('bg-terracota', 'text-white');
            btn.classList.add('bg-white', 'text-deep-brown');
        });
        
        // Esconde todas as galerias
        galleryGrids.forEach(grid => {
            grid.classList.add('hidden');
        });
        
        // Mostra a galeria selecionada
        const targetGallery = document.getElementById(type + '-gallery');
        if (targetGallery) {
            targetGallery.classList.remove('hidden');
        }
        
        // Adiciona active ao botão clicado
        event.target.classList.add('active');
        event.target.classList.remove('bg-white', 'text-deep-brown');
        event.target.classList.add('bg-terracota', 'text-white');
    }
    
    // Exposição da função para uso global
    window.showGallery = showGallery;
    
    // Inicializa a primeira galeria
    if (tabButtons.length > 0) {
        showGallery('professional');
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        const icon = question.querySelector('i');
        if (icon) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const faqItem = question.closest('.faq-item');
                const answer = faqItem.querySelector('.faq-answer');
                const isActive = faqItem.classList.contains('active');

                // Fecha todos
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const itemAnswer = item.querySelector('.faq-answer');
                    const itemIcon = item.querySelector('.faq-question i');
                    if (itemAnswer) itemAnswer.style.maxHeight = '0';
                    if (itemIcon) itemIcon.className = 'fas fa-plus text-terracota transition-transform duration-300';
                });

                // Se não estava ativo, ativa
                if (!isActive) {
                    faqItem.classList.add('active');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) icon.className = 'fas fa-minus text-terracota transition-transform duration-300';
                }
            });
        }
    });
}

// Animações de scroll - gradual por seção
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-100px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSectionElements(entry.target);
            }
        });
    }, observerOptions);

    // Observar cada seção individualmente
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Animar elementos de uma seção com delay progressivo
function animateSectionElements(section) {
    const elements = section.querySelectorAll('.slide-in-up, .slide-in-left, .slide-in-right');
    
    console.log(`Animando ${elements.length} elementos da seção:`, section.id || section.className);
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate');
            console.log(`Elemento ${index + 1} animado:`, element.tagName, element.className);
        }, index * 200); // Delay de 200ms entre cada elemento
    });
}

// Navegação suave
function initializeSmoothScroll() {
    // Smooth scroll para todos os links internos
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
}

// Botão scroll to top
function initializeScrollToTop() {
    // Criar botão scroll to top
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(184, 84, 80, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Ação do botão
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 40px rgba(184, 84, 80, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(184, 84, 80, 0.3)';
    });
}

// Validação do formulário de newsletter
function initializeFormValidation() {
    const newsletterForm = document.querySelector('.newsletter');
    const emailInput = newsletterForm?.querySelector('input[type="email"]');
    const submitBtn = newsletterForm?.querySelector('button');
    
    if (newsletterForm && emailInput && submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showNotification('Por favor, digite seu e-mail', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showNotification('Por favor, digite um e-mail válido', 'error');
                return;
            }
            
            // Simula envio
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Obrigado por se inscrever!', 'success');
                emailInput.value = '';
                submitBtn.textContent = 'Inscrever';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#B85450'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Elementos flutuantes animados
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    // Adiciona movimento aleatório aos elementos
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;
        
        element.style.animationDelay = `-${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        
        // Movimento adicional no mouse
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
}

// Efeito parallax simples
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background, .testimonials');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Contador animado para estatísticas
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2 segundos
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const currentValue = Math.floor(start + (target - start) * progress);
            counter.textContent = currentValue + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Observa quando os contadores entram na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Efeitos de hover para cards
function initializeCardEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Lazy loading para imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Tema escuro/claro (opcional)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Salva a preferência
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('dark-theme', isDark);
        });
        
        // Recupera a preferência salva
        const savedTheme = localStorage.getItem('dark-theme');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Preloader
function initializePreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce aos eventos de scroll
const debouncedScroll = debounce(() => {
    // Funções que dependem do scroll
    checkScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Intersection Observer para animações
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ser animados
    document.querySelectorAll('.scroll-animation').forEach(el => {
        observer.observe(el);
    });
}

// Inicializa todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initializeIntersectionObserver();
    initializeLazyLoading();
    initializeThemeToggle();
    initializePreloader();
    setTimeout(animateCounters, 300);
    setTimeout(initializeFAQ, 300);
});

// Tratamento de erros global
window.addEventListener('error', function(e) {
    console.error('Erro JavaScript:', e.error);
    // Aqui você pode implementar um sistema de relatório de erros
});

// Service Worker para PWA (opcional) - REMOVIDO
// Se precisar de PWA, descomente e crie o arquivo sw.js
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}
*/

// Exporta funções para uso global
window.SerenityApp = {
    showGallery,
    toggleFAQ,
    showNotification
};

// Função já implementada acima - removida duplicação

// Inicializar efeitos modernos - apenas adicionar classes, não ativar
function initializeModernEffects() {
    // Adicionar classes de animação aos elementos SEM ativar
    const sections = document.querySelectorAll('section');
    console.log(`Inicializando efeitos modernos em ${sections.length} seções`);
    
    sections.forEach((section, index) => {
        const elements = section.querySelectorAll('h2, h3, p, .service-card, .testimonial-card, .gallery-item, .faq-item');
        console.log(`Seção ${index + 1} (${section.id || section.className}): ${elements.length} elementos`);
        
        elements.forEach((element, elementIndex) => {
            if (elementIndex % 3 === 0) {
                element.classList.add('slide-in-up');
            } else if (elementIndex % 3 === 1) {
                element.classList.add('slide-in-left');
            } else {
                element.classList.add('slide-in-right');
            }
        });
    });
}

// Efeito parallax sutil
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const about = document.querySelector('.about');
        const testimonials = document.querySelector('.testimonials');
        
        // Aplicar parallax apenas em seções específicas
        [hero, about, testimonials].forEach((section, index) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                const speed = 0.2; // Mais sutil
                
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const yPos = -(scrolled * speed);
                    section.style.backgroundPosition = `center ${yPos}px`;
                }
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Elementos interativos
function initializeInteractiveElements() {
    // Adicionar classe interativa a cards e botões
    const interactiveElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .cta-button, .tab-button');
    interactiveElements.forEach(element => {
        element.classList.add('interactive-hover');
    });
}

// Função para estrelas amarelas nos depoimentos
function createStarRating(rating = 5) {
    const starContainer = document.createElement('div');
    starContainer.className = 'testimonial-stars';
    
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        starContainer.appendChild(star);
    }
    
    return starContainer;
}

// Adicionar estrelas aos depoimentos existentes
function addStarsToTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        const content = card.querySelector('.testimonial-content');
        const stars = card.querySelector('.stars');
        
        // Se já existem estrelas, não adicionar novamente
        if (content && stars && !content.querySelector('.testimonial-stars')) {
            const newStars = createStarRating(5);
            content.insertBefore(newStars, content.firstChild);
        }
    });
}

// Inicializar tudo quando o DOM estiver pronto
function initializeAllEffects() {
    console.log('Iniciando efeitos modernos...');
    // Aguardar um pouco para garantir que tudo carregou
    setTimeout(() => {
        console.log('Executando inicialização dos efeitos...');
        addStarsToTestimonials();
        initializeModernEffects();
        initializeScrollAnimations();
        initializeParallaxEffects();
        initializeInteractiveElements();
        initializeCounters();
        initializeCardEffects();
        console.log('Efeitos modernos inicializados com sucesso!');
    }, 100);
}

// Efeito de destaque no navbar conforme a seção visível
function highlightNavbarOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // ajuste para navbar fixa
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', highlightNavbarOnScroll);

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    let count = 0;
    const increment = Math.max(1, target / 60); // velocidade da animação

    function updateCounter() {
      if (count < target) {
        count += increment;
        counter.textContent = Math.floor(count) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    }
    updateCounter();
  });
}

document.addEventListener('DOMContentLoaded', animateCounters);

function setupFAQ() {
  document.querySelectorAll('.faq-toggle').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      const faqItem = icon.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const isOpen = faqItem.classList.contains('active');

      // Fecha todos
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) {
          ans.style.maxHeight = '0';
          ans.style.padding = '0';
        }
        const ic = item.querySelector('.faq-toggle');
        if (ic) {
          ic.classList.remove('fa-minus');
          ic.classList.add('fa-plus');
        }
      });

      // Abre se não estava aberto
      if (!isOpen) {
        faqItem.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.padding = '0 24px 24px 24px';
        }
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(animateCounters, 300);
  setTimeout(setupFAQ, 300);
});