// Configuração do Template - Personalize aqui!
const SITE_CONFIG = {
    // Informações básicas
    business: {
        name: "Simone",
        title: "Massoterapeuta",
        description: "Especialista em massagens relaxantes e sensuais no RJ",
        phone: "(21) 98222-4737",
        whatsapp: "5521982224737",
        location: "Centro e Zona Sul, Rio de Janeiro - RJ",
        schedule: "Segunda à Domingo - 10h às 20h"
    },
    
    // SEO
    seo: {
        title: "Massagem Tântrica e Relaxante no Centro e Zona Sul RJ | Simone Massoterapeuta",
        description: "Massagem tântrica e relaxante com Simone no Centro e Zona Sul do Rio de Janeiro. Atendimento exclusivo, ambiente seguro e resultados comprovados. Agende sua sessão!",
        keywords: "massagem tântrica, massagem relaxante, massagem centro RJ, massagem zona sul RJ, massoterapeuta, massagem sensual, Simone massagista, massagem para homens, massagem para mulheres, massagem profissional RJ"
    },
    
    // Cores personalizadas (já configuradas no Tailwind)
    colors: {
        primary: "#B85450",      // Terracota
        secondary: "#8B4513",    // Terra Brown
        accent: "#DAA520",       // Accent Gold
        dark: "#5D4037",         // Deep Brown
        light: "#F5F0E8",        // Cream
        white: "#FDF9F3"         // Warm White
    },
    
    // Serviços
    services: [
        {
            name: "Massagem Relaxante",
            description: "Alivia tensões, reduz o estresse e proporciona relaxamento físico e mental.",
            price: "R$ 200",
            duration: "60 min",
            icon: "fas fa-hands",
            features: [
                "Movimentos lentos e ritmados",
                "Óleos essenciais aromáticos",
                "Ambiente tranquilo"
            ]
        },
        {
            name: "Massagem Tântrica",
            description: "Estimula a sensibilidade do corpo, aumenta o autoconhecimento e proporciona bem-estar.",
            price: "R$ 220",
            duration: "75 min",
            icon: "fas fa-heart",
            features: [
                "Toques sensuais",
                "Equilíbrio energético",
                "Consciência corporal"
            ]
        },
        {
            name: "Massagem Nuru",
            description: "Massagem feita com gel especial, usando o corpo para deslizar e relaxar profundamente.",
            price: "R$ 270",
            duration: "90 min",
            icon: "fas fa-spa",
            features: [
                "Gel especial",
                "Deslizes corporais",
                "Conexão sensorial"
            ]
        },
        {
            name: "Drenagem Linfática",
            description: "Ajuda a eliminar líquidos e toxinas, reduz inchaço e melhora a circulação.",
            price: "5 sessões por R$ 500",
            duration: "60 min cada",
            icon: "fas fa-tint",
            features: [
                "Estimulação da circulação",
                "Eliminação de toxinas",
                "Redução de inchaços"
            ]
        },
        {
            name: "Depilação",
            description: "Remoção de pelos com cera. Virilha total, axila e outras áreas.",
            price: "A partir de R$ 30",
            duration: "30 min",
            icon: "fas fa-cut",
            features: [
                "Virilha total - R$ 100",
                "Axila - R$ 30",
                "Cuidado personalizado"
            ]
        },
        {
            name: "Reflexologia Podal",
            description: "Técnica oriental que estimula pontos reflexos nos pés para equilibrar todo o corpo e promover relaxamento profundo",
            price: "R$ 100",
            duration: "60 min",
            icon: "fa-solid fa-shoe-prints",
            features: [
                "Mapeamento dos pontos",
                "Estímulo energético",
                "Relaxamento profundo"
            ]
        }
    ],
    
    // Estatísticas
    stats: {
        experience: 6,
        satisfaction: 99,
        clients: 500
    },
    
    // Depoimentos
    testimonials: [
        {
            text: "A massagem nuru com Simone foi uma experiência além do físico — sensações que me conectaram com meu corpo como nunca antes.",
            author: "Carlos R.",
            type: "Cliente"
        },
        {
            text: "A massagem tântrica mudou minha forma de entender o prazer e o relaxamento. Simone domina cada toque com maestria.",
            author: "Lucas M.",
            type: "Cliente"
        },
        {
            text: "Relaxe e sensibilidade entregues sem rodeios. A atenção dela cria um ambiente seguro e intenso, impossível não voltar.",
            author: "Pedro T.",
            type: "Cliente"
        }
    ],
    
    // FAQ
    faq: [
        {
            question: "Você também trabalha com depilação?",
            answer: "Sim, ofereço serviços de depilação a cera e aparação para completar seu cuidado pessoal."
        },
        {
            question: "As massagens são indicadas para todos os públicos?",
            answer: "Sim, todos que buscam relaxamento e despertar sensorial podem se beneficiar, respeitando limites pessoais."
        },
        {
            question: "Posso escolher combinar massagens diferentes na mesma sessão?",
            answer: "Sim, personalizo conforme sua necessidade e desejo para máximo resultado."
        },
        {
            question: "Quanto tempo dura cada sessão?",
            answer: "As sessões variam entre 60 a 90 minutos, dependendo do serviço escolhido."
        },
        {
            question: "Como faço para agendar?",
            answer: "Basta clicar no botão WhatsApp e falar direto comigo para reservar seu horário."
        }
    ]
};

// Função para aplicar configurações
function applyConfig() {
    // Aplicar título e meta tags
    document.title = SITE_CONFIG.seo.title;
    
    // Aplicar nome do negócio
    const businessNames = document.querySelectorAll('.business-name');
    businessNames.forEach(el => el.textContent = SITE_CONFIG.business.name);
    
    // Aplicar título do negócio
    const businessTitles = document.querySelectorAll('.business-title');
    businessTitles.forEach(el => el.textContent = SITE_CONFIG.business.title);
    
    // Aplicar descrição do negócio
    const businessDescriptions = document.querySelectorAll('.business-description');
    businessDescriptions.forEach(el => el.textContent = SITE_CONFIG.business.description);
    
    // Aplicar telefone e WhatsApp
    const phoneElements = document.querySelectorAll('.phone-number');
    phoneElements.forEach(el => el.textContent = SITE_CONFIG.business.phone);
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${SITE_CONFIG.business.whatsapp}`;
    });
    
    // Aplicar localização
    const locationElements = document.querySelectorAll('.location');
    locationElements.forEach(el => el.textContent = SITE_CONFIG.business.location);
    
    // Aplicar horário
    const scheduleElements = document.querySelectorAll('.schedule');
    scheduleElements.forEach(el => el.textContent = SITE_CONFIG.business.schedule);
    
    console.log('✅ Configurações aplicadas com sucesso!');
}

// Executar configuração quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', applyConfig);

// Exportar para uso global
window.SITE_CONFIG = SITE_CONFIG; 