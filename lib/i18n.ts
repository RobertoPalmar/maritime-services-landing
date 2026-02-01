export type Locale = "es" | "en"

export const translations = {
  es: {
    nav: {
      services: "Servicios",
      about: "Nosotros",
      clients: "Clientes",
      contact: "Contacto",
      cta: "Solicitar Cotización",
    },
    hero: {
      tagline: "Más de 9 años de experiencia",
      title1: "World Maritime",
      title2: "Services",
      description: "Expertos en aseo de embarcaciones y suministro de insumos para barcos y navíos. Su embarcación en las mejores manos.",
      cta: "Solicitar Cotización",
      ctaSecondary: "Nuestros Servicios",
      imageAlt: "Barco comercial en el océano",
    },
    carousel: {
      title: "Nuestra Operación",
      subtitle: "Excelencia en cada detalle",
      images: [
        { alt: "Operaciones portuarias de carga", caption: "Operaciones portuarias" },
        { alt: "Equipo de trabajo en cubierta", caption: "Equipo profesional" },
        { alt: "Sala de máquinas", caption: "Mantenimiento técnico" },
        { alt: "Entrega de suministros", caption: "Logística de suministros" },
      ],
    },
    services: {
      tagline: "Nuestros Servicios",
      title1: "Soluciones integrales para",
      title2: "la industria marítima",
      description: "Ofrecemos una gama completa de servicios diseñados para mantener su flota operando de manera eficiente y segura.",
      categories: [
        {
          title: "Provisiones y Suministros Generales",
          items: [
            {
              title: "Alimentos y Bebidas",
              description: "Suministro completo de productos frescos, congelados y secos. Carnes, frutas de temporada y confitería de alta calidad.",
            },
            {
              title: "Higiene y Camarote",
              description: "Todo lo necesario para el bienestar de la tripulación: desde lencería de cama hasta productos de limpieza y aseo personal.",
            },
            {
              title: "Agua y Logística",
              description: "Suministro de agua potable y mineral con una red logística propia que garantiza puntualidad.",
            },
          ],
        },
        {
          title: "Suministros Técnicos y Consumibles",
          items: [
            {
              title: "Ferretería y Cubierta",
              description: "Herramientas, discos abrasivos, juntas, sellos y repuestos esenciales para el mantenimiento diario.",
            },
            {
              title: "Consumibles de Máquinas",
              description: "Una gama completa de lubricantes, aceites y filtros críticos para sistemas de combustible y aire.",
            },
            {
              title: "Logística de Repuestos",
              description: "Transporte seguro y eficiente de piezas críticas directamente a su embarcación, minimizando tiempos de inactividad.",
            },
          ],
        },
        {
          title: "Servicios Portuarios Especializados",
          items: [
            {
              title: "Mantenimiento y Seguridad",
              description: "Limpieza de buques, fumigación certificada y medición de aguas de lastre.",
            },
            {
              title: "Gestión de Residuos",
              description: "Descarga de basura y eliminación de desechos en cumplimiento estricto con las normativas ambientales internacionales.",
            },
            {
              title: "Soporte Auxiliar",
              description: "Coordinación de servicios de pilotaje, entrega de suministros de oficina y gestión de artículos misceláneos.",
            },
          ],
        },
      ],
    },
    whyUs: {
      tagline: "¿Por qué elegirnos?",
      title: "Su socio de confianza en servicios marítimos",
      description: "Nos diferenciamos por nuestra dedicación a la excelencia y nuestro profundo conocimiento del sector marítimo.",
      features: [
        {
          title: "Especialistas en Port Hedland",
          description: "Conocimiento profundo de las dinámicas locales y requisitos portuarios.",
        },
        {
          title: "Soluciones a Medida",
          description: "No creemos en soluciones genéricas. Adaptamos nuestro servicio a los requerimientos específicos de cada buque.",
        },
        {
          title: "Calidad Garantizada",
          description: "Solo trabajamos con estándares que aseguran la durabilidad y seguridad de su tripulación y maquinaria.",
        },
        {
          title: "Disponibilidad 24/7",
          description: "El mar no descansa, y nosotros tampoco. Estamos listos cuando usted nos necesite.",
        },
      ],
    },
    about: {
      tagline: "Sobre Nosotros",
      title: "Comprometidos con la excelencia marítima",
      description: "Desde hace más de dos décadas, World Maritime Services se ha consolidado como líder en servicios marítimos de alta calidad. Nuestra misión es proporcionar soluciones integrales que superen las expectativas de nuestros clientes, manteniendo los más altos estándares de calidad y seguridad.",
      features: [
        "Personal altamente capacitado y certificado",
        "Productos ecológicos y biodegradables",
        "Cobertura en los principales puertos",
        "Precios competitivos y transparentes",
        "Respuesta inmediata a solicitudes urgentes",
        "Garantía de satisfacción en cada servicio",
      ],
      stats: [
        { value: "9+", label: "Años de experiencia" },
        { value: "500+", label: "Embarcaciones atendidas" },
        { value: "15", label: "Puertos de operación" },
        { value: "98%", label: "Clientes satisfechos" },
      ],
    },
    clients: {
      tagline: "Testimonios",
      title: "Lo que dicen nuestros clientes",
      description: "La satisfacción de nuestros clientes es nuestra mayor recompensa y motivación para seguir mejorando cada día.",
      trustText: "Empresas que confían en nosotros",
      testimonials: [
        {
          quote: "World Maritime Services ha sido nuestro socio de confianza durante más de 10 años. Su profesionalismo y calidad de servicio son incomparables.",
          author: "Carlos Mendoza",
          role: "Director de Operaciones",
          company: "Naviera del Pacífico",
        },
        {
          quote: "La rapidez de respuesta y la calidad de los insumos que proporcionan nos han permitido optimizar nuestras escalas portuarias significativamente.",
          author: "María Fernández",
          role: "Capitán",
          company: "Flota Mercante Internacional",
        },
        {
          quote: "Excelente servicio de aseo. Nuestras embarcaciones siempre quedan impecables y listas para zarpar. Altamente recomendados.",
          author: "Roberto Sánchez",
          role: "Gerente de Flota",
          company: "Transportes Marítimos SA",
        },
      ],
    },
    contact: {
      tagline: "Contacto",
      title: "Hablemos de su proyecto",
      description: "Estamos listos para atender sus necesidades. Contáctenos para una cotización personalizada sin compromiso.",
      info: {
        address: { title: "Dirección", content: "Puerto Principal, Av. Marítima 1234" },
        phone: { title: "Teléfono", content: "+1 (555) 123-4567" },
        email: { title: "Email", content: "info@worldmaritimeservices.com" },
        hours: { title: "Horario", content: "24/7 - Servicio continuo" },
      },
      form: {
        name: "Nombre completo",
        namePlaceholder: "Su nombre",
        company: "Empresa",
        companyPlaceholder: "Nombre de la empresa",
        email: "Correo electrónico",
        emailPlaceholder: "correo@ejemplo.com",
        phone: "Teléfono",
        phonePlaceholder: "+1 (555) 000-0000",
        service: "Servicio de interés",
        servicePlaceholder: "Seleccione un servicio",
        serviceOptions: [
          { value: "provisions", label: "Provisiones y Suministros" },
          { value: "technical", label: "Suministros Técnicos" },
          { value: "port", label: "Servicios Portuarios" },
          { value: "other", label: "Otro" },
        ],
        message: "Mensaje",
        messagePlaceholder: "Describa sus necesidades...",
        submit: "Enviar Mensaje",
        submitting: "Enviando...",
        successMessage: "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
      },
    },
    footer: {
      description: "Líderes en servicios marítimos con más de 9 años de experiencia. Su embarcación en las mejores manos.",
      servicesTitle: "Servicios",
      services: [
        { label: "Provisiones Generales", href: "#servicios" },
        { label: "Suministros Técnicos", href: "#servicios" },
        { label: "Servicios Portuarios", href: "#servicios" },
      ],
      companyTitle: "Empresa",
      company: [
        { label: "Sobre nosotros", href: "#nosotros" },
        { label: "Por qué elegirnos", href: "#por-que-elegirnos" },
        { label: "Clientes", href: "#clientes" },
        { label: "Contacto", href: "#contacto" },
      ],
      legalTitle: "Legal",
      legal: [
        { label: "Términos y condiciones", href: "#" },
        { label: "Política de privacidad", href: "#" },
      ],
      copyright: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      clients: "Clients",
      contact: "Contact",
      cta: "Get a Quote",
    },
    hero: {
      tagline: "Over 9 years of experience",
      title1: "World Maritime",
      title2: "Services",
      description: "Experts in vessel cleaning and supply of provisions for ships and vessels. Your ship in the best hands.",
      cta: "Get a Quote",
      ctaSecondary: "Our Services",
      imageAlt: "Commercial ship in the ocean",
    },
    carousel: {
      title: "Our Operations",
      subtitle: "Excellence in every detail",
      images: [
        { alt: "Port loading operations", caption: "Port operations" },
        { alt: "Crew working on deck", caption: "Professional team" },
        { alt: "Engine room", caption: "Technical maintenance" },
        { alt: "Supply delivery", caption: "Supply logistics" },
      ],
    },
    services: {
      tagline: "Our Services",
      title1: "Comprehensive solutions for",
      title2: "the maritime industry",
      description: "We offer a complete range of services designed to keep your fleet operating efficiently and safely.",
      categories: [
        {
          title: "Provisions & General Supplies",
          items: [
            {
              title: "Food & Beverages",
              description: "Complete supply of fresh, frozen, and dry products. Meats, seasonal fruits, and high-quality confectionery.",
            },
            {
              title: "Hygiene & Cabin",
              description: "Everything needed for crew welfare: from bed linens to cleaning and personal care products.",
            },
            {
              title: "Water & Logistics",
              description: "Supply of drinking and mineral water with our own logistics network guaranteeing punctuality.",
            },
          ],
        },
        {
          title: "Technical Supplies & Consumables",
          items: [
            {
              title: "Hardware & Deck",
              description: "Tools, abrasive discs, gaskets, seals, and essential spare parts for daily maintenance.",
            },
            {
              title: "Machine Consumables",
              description: "A complete range of lubricants, oils, and critical filters for fuel and air systems.",
            },
            {
              title: "Spare Parts Logistics",
              description: "Safe and efficient transport of critical parts directly to your vessel, minimizing downtime.",
            },
          ],
        },
        {
          title: "Specialized Port Services",
          items: [
            {
              title: "Maintenance & Safety",
              description: "Ship cleaning, certified fumigation, and ballast water measurement.",
            },
            {
              title: "Waste Management",
              description: "Garbage discharge and waste disposal in strict compliance with international environmental regulations.",
            },
            {
              title: "Auxiliary Support",
              description: "Coordination of pilotage services, office supplies delivery, and miscellaneous items management.",
            },
          ],
        },
      ],
    },
    whyUs: {
      tagline: "Why Choose Us?",
      title: "Your trusted partner in maritime services",
      description: "We stand out for our dedication to excellence and our deep knowledge of the maritime sector.",
      features: [
        {
          title: "Port Hedland Specialists",
          description: "Deep understanding of local dynamics and port requirements.",
        },
        {
          title: "Tailored Solutions",
          description: "We don't believe in generic solutions. We adapt our service to the specific requirements of each vessel.",
        },
        {
          title: "Guaranteed Quality",
          description: "We only work with standards that ensure the durability and safety of your crew and machinery.",
        },
        {
          title: "24/7 Availability",
          description: "The sea never rests, and neither do we. We're ready when you need us.",
        },
      ],
    },
    about: {
      tagline: "About Us",
      title: "Committed to maritime excellence",
      description: "For over two decades, World Maritime Services has established itself as a leader in high-quality maritime services. Our mission is to provide comprehensive solutions that exceed our clients' expectations, maintaining the highest standards of quality and safety.",
      features: [
        "Highly trained and certified personnel",
        "Eco-friendly and biodegradable products",
        "Coverage in major ports",
        "Competitive and transparent pricing",
        "Immediate response to urgent requests",
        "Satisfaction guarantee on every service",
      ],
      stats: [
        { value: "9+", label: "Years of experience" },
        { value: "500+", label: "Vessels served" },
        { value: "15", label: "Operating ports" },
        { value: "98%", label: "Satisfied clients" },
      ],
    },
    clients: {
      tagline: "Testimonials",
      title: "What our clients say",
      description: "Our clients' satisfaction is our greatest reward and motivation to keep improving every day.",
      trustText: "Companies that trust us",
      testimonials: [
        {
          quote: "World Maritime Services has been our trusted partner for over 10 years. Their professionalism and quality of service are unmatched.",
          author: "Carlos Mendoza",
          role: "Operations Director",
          company: "Pacific Shipping",
        },
        {
          quote: "The quick response and quality of supplies they provide have allowed us to significantly optimize our port calls.",
          author: "María Fernández",
          role: "Captain",
          company: "International Merchant Fleet",
        },
        {
          quote: "Excellent cleaning service. Our vessels are always spotless and ready to sail. Highly recommended.",
          author: "Roberto Sánchez",
          role: "Fleet Manager",
          company: "Maritime Transport SA",
        },
      ],
    },
    contact: {
      tagline: "Contact",
      title: "Let's talk about your project",
      description: "We are ready to meet your needs. Contact us for a personalized quote with no obligation.",
      info: {
        address: { title: "Address", content: "Main Port, Maritime Ave. 1234" },
        phone: { title: "Phone", content: "+1 (555) 123-4567" },
        email: { title: "Email", content: "info@worldmaritimeservices.com" },
        hours: { title: "Hours", content: "24/7 - Continuous service" },
      },
      form: {
        name: "Full name",
        namePlaceholder: "Your name",
        company: "Company",
        companyPlaceholder: "Company name",
        email: "Email address",
        emailPlaceholder: "email@example.com",
        phone: "Phone",
        phonePlaceholder: "+1 (555) 000-0000",
        service: "Service of interest",
        servicePlaceholder: "Select a service",
        serviceOptions: [
          { value: "provisions", label: "Provisions & Supplies" },
          { value: "technical", label: "Technical Supplies" },
          { value: "port", label: "Port Services" },
          { value: "other", label: "Other" },
        ],
        message: "Message",
        messagePlaceholder: "Describe your needs...",
        submit: "Send Message",
        submitting: "Sending...",
        successMessage: "Message sent successfully. We will contact you soon.",
      },
    },
    footer: {
      description: "Leaders in maritime services with over 9 years of experience. Your ship in the best hands.",
      servicesTitle: "Services",
      services: [
        { label: "General Provisions", href: "#services" },
        { label: "Technical Supplies", href: "#services" },
        { label: "Port Services", href: "#services" },
      ],
      companyTitle: "Company",
      company: [
        { label: "About us", href: "#about" },
        { label: "Why choose us", href: "#why-us" },
        { label: "Clients", href: "#clients" },
        { label: "Contact", href: "#contact" },
      ],
      legalTitle: "Legal",
      legal: [
        { label: "Terms and conditions", href: "#" },
        { label: "Privacy policy", href: "#" },
      ],
      copyright: "All rights reserved.",
    },
  },
}

export type Translations = typeof translations.es
