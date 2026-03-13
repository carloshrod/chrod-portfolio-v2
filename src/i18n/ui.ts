export type Locale = "en" | "es";

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.services": "Services",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.lang.label": "ES",
    "nav.lang.url": "/es",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",
    "hero.scroll": "Scroll to explore",

    // About
    "about.label": "About Me",
    "about.heading": "Passionate about building great web experiences",
    "about.p1":
      "A full-stack developer with a strong focus on frontend, dedicated to building responsive, accessible, and high-performance interfaces using modern tools and frameworks.",
    "about.p2":
      "Enjoys working across the entire stack—from designing clean UI components, to connecting APIs and managing databases. Deeply values code quality, developer experience, and delivering real value.",
    "about.p3":
      "Outside of coding, explores new technologies and sharpens design sensibilities.",
    "about.stat1.label": "Years experience",
    "about.stat2.label": "Projects shipped",
    "about.stat3.label": "Happy clients",
    "about.resume": "Download Resume",
    "about.resume.url": "/resume-en.pdf",

    // Services
    "services.label": "Services",
    "services.heading": "What I can build for you",
    "services.subtitle":
      "Whether you're launching something new or improving what already exists, I focus on delivering clean, performant solutions that are tailored to your goals — not generic templates.",
    "services.cta.text":
      "Not sure what you need? Let's talk and figure it out together.",
    "services.cta.button": "Tell me about your project",
    "services.s1.title": "Landing Pages",
    "services.s1.desc":
      "Fast, focused, and built to convert. I craft landing pages that communicate your value proposition clearly and turn visitors into leads or customers — no bloat, just results.",
    "services.s2.title": "Business Websites",
    "services.s2.desc":
      "Your website is your first impression. I build polished, professional sites that reflect your brand, instill trust, and give you a solid foundation for growth.",
    "services.s3.title": "Web Applications",
    "services.s3.desc":
      "From idea to production-ready product. I develop scalable, interactive web apps with clean architecture, real-time features, and intuitive UX — built to handle real-world complexity.",
    "services.s4.title": "E-commerce Development",
    "services.s4.desc":
      "Online stores that don't just look great — they sell. Whether it's a custom Shopify setup or a tailored solution, I build e-commerce experiences that delight shoppers and maximize revenue.",
    "services.s5.title": "API & Backend Development",
    "services.s5.desc":
      "The engine behind your product. I design and build robust REST APIs, handle authentication, integrate third-party services, and set up the server-side logic your app depends on.",
    "services.s6.title": "Workflow Automation",
    "services.s6.desc":
      "Stop wasting time on repetitive tasks. I build automated workflows using tools like n8n to connect your apps, trigger actions, and keep your business running on autopilot.",

    // Skills
    "skills.label": "Skills",
    "skills.heading": "Technologies I work with",
    "skills.category.languages": "Languages",
    "skills.category.frameworks": "Frameworks & Libraries",
    "skills.category.ui": "UI & Styling",
    "skills.category.backend": "Backend & Databases",
    "skills.category.tools": "Tools & Workflow",

    // Projects
    "projects.label": "Work",
    "projects.heading": "Selected Projects",
    "projects.subtitle":
      "A collection of projects I've built — from simple static sites, through dashboards and e-commerce platforms, to full-stack apps.",

    // Reviews
    "reviews.label": "Testimonials",
    "reviews.heading": "What clients say",
    "reviews.subtitle":
      "Feedback from people I've had the pleasure of working with.",

    // Contact
    "contact.label": "Contact",
    "contact.heading": "Let's work together",
    "contact.body":
      "Have a project in mind or just want to connect? I'd love to hear from you. Open the form or reach out directly on WhatsApp — whatever works best for you.",
    "contact.button": "Get in touch",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.privacy.url": "/privacy-policy",
    "footer.terms.url": "/terms",

    // Contact Drawer
    "drawer.title": "Get in touch",
    "drawer.close.label": "Close contact form",
    "drawer.form.intro":
      "Fill out the form below and I'll respond as soon as possible.",
    "drawer.name.label": "Name",
    "drawer.name.placeholder": "Your name",
    "drawer.email.label": "Email",
    "drawer.email.placeholder": "your@email.com",
    "drawer.message.label": "Message",
    "drawer.message.placeholder": "Tell me about your project or idea…",
    "drawer.error": "Something went wrong. Please try again.",
    "drawer.error.name.required": "Name is required.",
    "drawer.error.email.required": "Email is required.",
    "drawer.error.email.invalid": "Please enter a valid email address.",
    "drawer.error.message.required": "Message is required.",
    "drawer.error.message.short": "Message must be at least 10 characters.",
    "drawer.submit": "Send Message",
    "drawer.sending": "Sending…",
    "drawer.success.title": "Message sent!",
    "drawer.success.body":
      "Thanks for reaching out. I'll get back to you soon.",
    "drawer.success.close": "Close",

    // Project Modal
    "modal.no_screenshots": "No screenshots available",
    "modal.about": "About the project",
    "modal.tech": "Technologies",
    "modal.github.default": "View on GitHub",
    "modal.live": "Live demo",
    "modal.close": "Close project details",

    // WhatsApp
    "whatsapp.label": "Contact me on WhatsApp",

    // Legal pages
    "legal.back": "Back to home",
  },

  es: {
    // Navbar
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.skills": "Tecnologías",
    "nav.projects": "Proyectos",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",
    "nav.lang.label": "EN",
    "nav.lang.url": "/",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.cta.projects": "Ver proyectos",
    "hero.cta.contact": "Contactar",
    "hero.scroll": "Desplázate para explorar",

    // About
    "about.label": "Sobre mí",
    "about.heading": "Apasionado por crear experiencias web increíbles",
    "about.p1":
      "Soy desarrollador un full-stack con enfoque fuerte en frontend. Me gusta construir interfaces rápidas, accesibles y bien diseñadas utilizando herramientas y frameworks modernos.",
    "about.p2":
      "Disfruto trabajar en todo el stack: desde diseñar componentes de UI limpios y funcionales, hasta conectar APIs y gestionar bases de datos. Siempre busco escribir código limpio, crear proyectos fáciles de mantener y desarrollar productos que realmente aporten valor.",
    "about.p3":
      "Cuando no estoy programando, exploro nuevas tecnologías y sigo desarrollando mi criterio de diseño.",
    "about.stat1.label": "Años de experiencia",
    "about.stat2.label": "Proyectos entregados",
    "about.stat3.label": "Clientes satisfechos",
    "about.resume": "Descargar CV",
    "about.resume.url": "/resume-es.pdf",

    // Services
    "services.label": "Servicios",
    "services.heading": "Cómo puedo ayudarte",
    "services.subtitle":
      "Ya sea que estés lanzando un nuevo proyecto o mejorando uno existente, me enfoco en crear soluciones limpias y de alto rendimiento, adaptadas a tus objetivos, sin plantillas genéricas.",
    "services.cta.text":
      "¿No tienes claro lo que necesitas? Cuéntame sobre tu proyecto y encontremos la mejor solución.",
    "services.cta.button": "Cuéntame tu idea",
    "services.s1.title": "Landing Pages",
    "services.s1.desc":
      "Rápidas, enfocadas y diseñadas para convertir. Creo landing pages que comunican tu propuesta de valor con claridad y convierten visitantes en leads o clientes. Sin relleno, solo resultados.",
    "services.s2.title": "Sitios Web Empresariales",
    "services.s2.desc":
      "Tu sitio web es tu primera impresión. Construyo sitios profesionales y pulidos que reflejan tu marca, generan confianza y te dan una base sólida para crecer.",
    "services.s3.title": "Aplicaciones Web",
    "services.s3.desc":
      "De la idea al producto final. Desarrollo aplicaciones web escalables e interactivas, con arquitectura limpia, diseñadas para ofrecer una experiencia de usuario clara e intuitiva, y que resuelven problemas reales.",
    "services.s4.title": "Desarrollo E-commerce",
    "services.s4.desc":
      "Tiendas online que no solo se ven bien: también venden. Ya sea con Shopify o una solución a medida, creo experiencias que deleitan a los compradores y maximizan los ingresos.",
    "services.s5.title": "APIs y Desarrollo Backend",
    "services.s5.desc":
      "El motor detrás de tu producto. Diseño y construyo APIs REST robustas, gestiono autenticación, integro servicios externos y configuro toda la lógica del servidor que tu aplicación necesita.",
    "services.s6.title": "Automatización de Procesos",
    "services.s6.desc":
      "Deja de perder tiempo en tareas repetitivas. Construyo flujos de trabajo automatizados con herramientas como n8n para conectar tus apps, activar procesos y mantener tu negocio en piloto automático.",

    // Skills
    "skills.label": "Tecnologías",
    "skills.heading": "Tecnologías con las que trabajo",
    "skills.category.languages": "Lenguajes",
    "skills.category.frameworks": "Frameworks y Librerías",
    "skills.category.ui": "UI y Estilos",
    "skills.category.backend": "Backend y Bases de datos",
    "skills.category.tools": "Herramientas",

    // Projects
    "projects.label": "Proyectos",
    "projects.heading": "Proyectos destacados",
    "projects.subtitle":
      "Una selección de proyectos que he desarrollado — desde sitios web estáticos y dashboards, hasta plataformas web y aplicaciones full-stack.",

    // Reviews
    "reviews.label": "Testimonios",
    "reviews.heading": "Lo que dicen los clientes",
    "reviews.subtitle":
      "Opiniones de personas con quienes he tenido el placer de trabajar.",

    // Contact
    "contact.label": "Contacto",
    "contact.heading": "Trabajemos juntos",
    "contact.body":
      "¿Tienes un proyecto en mente o simplemente quieres conectar? Me encantaría escucharte. Abre el formulario o si prefieres, podemos hablar por WhatsApp.",
    "contact.button": "Hablemos",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos y condiciones",
    "footer.privacy.url": "/es/privacy-policy",
    "footer.terms.url": "/es/terms",

    // Contact Drawer
    "drawer.title": "Escríbeme",
    "drawer.close.label": "Cerrar formulario de contacto",
    "drawer.form.intro":
      "Completa el formulario y te responderé lo antes posible.",
    "drawer.name.label": "Nombre",
    "drawer.name.placeholder": "Tu nombre",
    "drawer.email.label": "Correo electrónico",
    "drawer.email.placeholder": "tu@email.com",
    "drawer.message.label": "Mensaje",
    "drawer.message.placeholder": "Cuéntame sobre tu proyecto o idea…",
    "drawer.error": "Algo salió mal. Por favor, intenta de nuevo.",
    "drawer.error.name.required": "El nombre es obligatorio.",
    "drawer.error.email.required": "El correo electrónico es obligatorio.",
    "drawer.error.email.invalid":
      "Por favor ingresá un correo electrónico válido.",
    "drawer.error.message.required": "El mensaje es obligatorio.",
    "drawer.error.message.short":
      "El mensaje debe tener al menos 10 caracteres.",
    "drawer.submit": "Enviar mensaje",
    "drawer.sending": "Enviando…",
    "drawer.success.title": "¡Mensaje enviado!",
    "drawer.success.body":
      "Gracias por escribirme. Te responderé lo más pronto posible.",
    "drawer.success.close": "Cerrar",

    // Project Modal
    "modal.no_screenshots": "Sin capturas disponibles",
    "modal.about": "Sobre el proyecto",
    "modal.tech": "Tecnologías",
    "modal.github.default": "Ver en GitHub",
    "modal.live": "Ver demo",
    "modal.close": "Cerrar detalles del proyecto",

    // WhatsApp
    "whatsapp.label": "Contáctame por WhatsApp",

    // Legal pages
    "legal.back": "Volver al inicio",
  },
};
