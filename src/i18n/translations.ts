export type Language = "en" | "es" | "fr" | "it";

export const languageLabels: Record<Language, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
  it: "IT",
};

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type TranslationKeys = DeepStringify<typeof translations.en>;

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      experiences: "Experiences",
      contact: "Contact",
      bookNow: "Book Now",
    },
    hero: {
      title: "Night",
      titleAccent: "Dreams",
      subtitle: "Barcelona VIP Concierge",
      description:
        "Luxury yachts, private chefs, VIP nightlife, and bespoke experiences — crafted for elite travelers seeking the extraordinary.",
      exploreServices: "Explore Services",
      requestVip: "Request VIP Service",
    },
    about: {
      label: "About Us",
      titleLine1: "Your Gateway to",
      titleLine2: "Barcelona's Finest",
      paragraph1:
        "NightDreams is a premier VIP lifestyle service for elite travelers and high-profile guests in Barcelona. From luxury yacht charters and private chefs to VIP nightlife access and Michelin-starred dining — we curate every detail of your Barcelona experience.",
      paragraph2:
        "Our network of exclusive partners and local insiders ensures discretion, personalized attention, and access to experiences unavailable to the public. Your stay, elevated.",
      stat1Num: "500+",
      stat1Label: "Exclusive Partners",
      stat2Num: "12+",
      stat2Label: "Years of Excellence",
      stat3Num: "24/7",
      stat3Label: "Personal Support",
    },
    services: {
      label: "Our Services",
      titleLine1: "Tailored for the",
      titleLine2: "Elite",
      yacht: {
        title: "Yacht & Boat Charters",
        description:
          "Luxury yacht rentals and private boat experiences along the Mediterranean coast — sunset cruises, party boats, and exclusive day trips.",
      },
      chef: {
        title: "Private Chefs",
        description:
          "World-class private chefs for intimate dinners, villa events, and bespoke culinary experiences tailored to your palate.",
      },
      nightlife: {
        title: "VIP Nightlife",
        description:
          "Reserved VIP tables, bottle service, and priority access to Barcelona's most exclusive clubs and private parties.",
      },
      dining: {
        title: "Fine Dining",
        description:
          "Priority reservations at Michelin-starred restaurants and hidden gastronomic gems across the city.",
      },
      sports: {
        title: "Sports & Wellness",
        description:
          "Premium golf, padel, fitness sessions, spa retreats, and curated wellness experiences for mind and body.",
      },
    },
    experiences: {
      label: "Signature Experiences",
      titleLine1: "Moments Crafted",
      titleLine2: "Just for You",
      yacht: {
        title: "Sunset Yacht & Champagne Cruise",
        category: "Sea & Luxury",
      },
      nightlife: {
        title: "VIP Night Out — Bottle Service & Club Access",
        category: "Nightlife & Entertainment",
      },
      dining: {
        title: "Private Chef's Table with Wine Pairing",
        category: "Fine Dining",
      },
    },
    contact: {
      label: "Get in Touch",
      titleLine1: "Request Your",
      titleLine2: "VIP Experience",
      description:
        "Whether you're planning a weekend escape or an extended stay, our concierge team is ready to craft your perfect Barcelona experience. Share your vision and we'll handle every detail.",
      address: "Passeig de Gràcia, Barcelona",
      phone: "+34 600 000 000",
      email: "hello@conciergingbarcelona.com",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Phone Number",
      messagePlaceholder: "Tell us about your ideal Barcelona experience...",
      sendWhatsapp: "Send via WhatsApp",
    },
    footer: {
      copyright: "© 2025 NightDreams Barcelona",
    },
    floatingCta: {
      label: "Request VIP Service",
    },
    booking: {
      label: "Let's get in touch!",
      titleLine1: "Plan Your",
      titleLine2: "VIP Experience",
      description: "Select your dates, group size, and desired activities — we'll craft a tailored VIP proposal and contact you by email.",
      arrivalDate: "Arrival Date",
      departureDate: "Departure Date (optional)",
      pickDate: "Pick a date",
      numberOfPeople: "Number of People",
      peoplePlaceholder: "e.g. 4",
      activities: "Activities",
      nightclubs: "Nightclubs",
      restaurants: "Restaurants",
      jetSkis: "Jet Skis",
      sportsActivities: "Sports Activities",
      poolParties: "Pool Parties",
      other: "Other",
      otherPlaceholder: "Describe your custom request...",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      notes: "Additional Notes (optional)",
      notesPlaceholder: "Any preferences, dietary needs, special occasions...",
      submit: "Send VIP Request",
      successTitle: "Thank You!",
      successMessage: "Your VIP request has been sent. Our concierge team will contact you shortly with a tailored proposal.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      experiences: "Experiencias",
      contact: "Contacto",
      bookNow: "Reservar",
    },
    hero: {
      title: "Night",
      titleAccent: "Dreams",
      subtitle: "Barcelona Concierge VIP",
      description:
        "Yates de lujo, chefs privados, vida nocturna VIP y experiencias a medida — diseñadas para viajeros de élite que buscan lo extraordinario.",
      exploreServices: "Explorar Servicios",
      requestVip: "Solicitar Servicio VIP",
    },
    about: {
      label: "Sobre Nosotros",
      titleLine1: "Tu Puerta a lo",
      titleLine2: "Mejor de Barcelona",
      paragraph1:
        "NightDreams es un servicio de estilo de vida VIP de primera clase para viajeros de élite e invitados de alto perfil. Desde alquiler de yates de lujo y chefs privados hasta acceso VIP a la vida nocturna y restaurantes con estrellas Michelin — cuidamos cada detalle de tu experiencia en Barcelona.",
      paragraph2:
        "Nuestra red de socios exclusivos y expertos locales garantiza discreción, atención personalizada y acceso a experiencias no disponibles para el público. Tu estancia, elevada.",
      stat1Num: "500+",
      stat1Label: "Socios Exclusivos",
      stat2Num: "12+",
      stat2Label: "Años de Excelencia",
      stat3Num: "24/7",
      stat3Label: "Soporte Personal",
    },
    services: {
      label: "Nuestros Servicios",
      titleLine1: "Diseñado para la",
      titleLine2: "Élite",
      yacht: {
        title: "Alquiler de Yates",
        description:
          "Alquiler de yates de lujo y experiencias náuticas privadas a lo largo de la costa mediterránea — cruceros al atardecer, barcos de fiesta y excursiones exclusivas.",
      },
      chef: {
        title: "Chefs Privados",
        description:
          "Chefs privados de clase mundial para cenas íntimas, eventos en villas y experiencias culinarias a medida.",
      },
      nightlife: {
        title: "Vida Nocturna VIP",
        description:
          "Mesas VIP reservadas, servicio de botellas y acceso prioritario a los clubs más exclusivos de Barcelona.",
      },
      dining: {
        title: "Alta Gastronomía",
        description:
          "Reservas prioritarias en restaurantes con estrellas Michelin y joyas gastronómicas ocultas de la ciudad.",
      },
      sports: {
        title: "Deportes y Bienestar",
        description:
          "Golf premium, pádel, sesiones de fitness, retiros de spa y experiencias de bienestar para cuerpo y mente.",
      },
    },
    experiences: {
      label: "Experiencias Exclusivas",
      titleLine1: "Momentos Creados",
      titleLine2: "Solo para Ti",
      yacht: {
        title: "Crucero al Atardecer con Champán",
        category: "Mar y Lujo",
      },
      nightlife: {
        title: "Noche VIP — Botellas y Acceso a Clubs",
        category: "Vida Nocturna",
      },
      dining: {
        title: "Mesa Privada del Chef con Maridaje",
        category: "Alta Gastronomía",
      },
    },
    contact: {
      label: "Contáctanos",
      titleLine1: "Solicita Tu",
      titleLine2: "Experiencia VIP",
      description:
        "Ya sea que estés planeando una escapada de fin de semana o una estancia prolongada, nuestro equipo de concierge está listo para crear tu experiencia perfecta en Barcelona. Comparte tu visión y nosotros nos encargamos de cada detalle.",
      address: "Passeig de Gràcia, Barcelona",
      phone: "+34 600 000 000",
      email: "hello@conciergingbarcelona.com",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "Correo Electrónico",
      phonePlaceholder: "Número de Teléfono",
      messagePlaceholder: "Cuéntanos sobre tu experiencia ideal en Barcelona...",
      sendWhatsapp: "Enviar por WhatsApp",
    },
    footer: {
      copyright: "© 2025 NightDreams Barcelona",
    },
    floatingCta: {
      label: "Solicitar Servicio VIP",
    },
    booking: {
      label: "¡Contactemos!",
      titleLine1: "Planifica Tu",
      titleLine2: "Experiencia VIP",
      description: "Selecciona tus fechas, tamaño del grupo y actividades deseadas — te enviaremos una propuesta VIP personalizada por email.",
      arrivalDate: "Fecha de Llegada",
      departureDate: "Fecha de Salida (opcional)",
      pickDate: "Elige una fecha",
      numberOfPeople: "Número de Personas",
      peoplePlaceholder: "ej. 4",
      activities: "Actividades",
      nightclubs: "Discotecas",
      restaurants: "Restaurantes",
      jetSkis: "Motos de Agua",
      sportsActivities: "Actividades Deportivas",
      poolParties: "Pool Parties",
      other: "Otro",
      otherPlaceholder: "Describe tu solicitud personalizada...",
      email: "Correo Electrónico",
      emailPlaceholder: "tu@email.com",
      notes: "Notas Adicionales (opcional)",
      notesPlaceholder: "Preferencias, necesidades dietéticas, ocasiones especiales...",
      submit: "Enviar Solicitud VIP",
      successTitle: "¡Gracias!",
      successMessage: "Tu solicitud VIP ha sido enviada. Nuestro equipo de concierge te contactará en breve con una propuesta personalizada.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      experiences: "Expériences",
      contact: "Contact",
      bookNow: "Réserver",
    },
    hero: {
      title: "Night",
      titleAccent: "Dreams",
      subtitle: "Barcelona Concierge VIP",
      description:
        "Yachts de luxe, chefs privés, vie nocturne VIP et expériences sur mesure — conçues pour les voyageurs d'élite en quête d'extraordinaire.",
      exploreServices: "Découvrir les Services",
      requestVip: "Demander un Service VIP",
    },
    about: {
      label: "À Propos",
      titleLine1: "Votre Accès au",
      titleLine2: "Meilleur de Barcelone",
      paragraph1:
        "NightDreams est un service lifestyle VIP de premier plan pour les voyageurs d'élite et les invités de prestige. Des locations de yachts de luxe et chefs privés à l'accès VIP en vie nocturne et restaurants étoilés Michelin — nous orchestrons chaque détail de votre expérience barcelonaise.",
      paragraph2:
        "Notre réseau de partenaires exclusifs et d'initiés locaux garantit discrétion, attention personnalisée et accès à des expériences inaccessibles au public. Votre séjour, sublimé.",
      stat1Num: "500+",
      stat1Label: "Partenaires Exclusifs",
      stat2Num: "12+",
      stat2Label: "Ans d'Excellence",
      stat3Num: "24/7",
      stat3Label: "Support Personnel",
    },
    services: {
      label: "Nos Services",
      titleLine1: "Conçu pour",
      titleLine2: "l'Élite",
      yacht: {
        title: "Location de Yachts",
        description:
          "Location de yachts de luxe et expériences nautiques privées le long de la côte méditerranéenne — croisières au coucher du soleil, bateaux festifs et excursions exclusives.",
      },
      chef: {
        title: "Chefs Privés",
        description:
          "Chefs privés de renommée mondiale pour des dîners intimes, événements en villa et expériences culinaires sur mesure.",
      },
      nightlife: {
        title: "Vie Nocturne VIP",
        description:
          "Tables VIP réservées, service de bouteilles et accès prioritaire aux clubs les plus exclusifs de Barcelone.",
      },
      dining: {
        title: "Gastronomie Fine",
        description:
          "Réservations prioritaires dans des restaurants étoilés Michelin et des pépites gastronomiques cachées de la ville.",
      },
      sports: {
        title: "Sports & Bien-être",
        description:
          "Golf premium, padel, séances de fitness, retraites spa et expériences bien-être pour le corps et l'esprit.",
      },
    },
    experiences: {
      label: "Expériences Signature",
      titleLine1: "Des Moments Créés",
      titleLine2: "Rien que pour Vous",
      yacht: {
        title: "Croisière Yacht & Champagne au Coucher du Soleil",
        category: "Mer & Luxe",
      },
      nightlife: {
        title: "Soirée VIP — Bouteilles & Accès Club",
        category: "Vie Nocturne",
      },
      dining: {
        title: "Table Privée du Chef avec Accord Mets-Vins",
        category: "Gastronomie Fine",
      },
    },
    contact: {
      label: "Nous Contacter",
      titleLine1: "Demandez Votre",
      titleLine2: "Expérience VIP",
      description:
        "Que vous planifiiez une escapade de week-end ou un séjour prolongé, notre équipe de concierges est prête à créer votre expérience barcelonaise parfaite. Partagez votre vision et nous nous occupons de chaque détail.",
      address: "Passeig de Gràcia, Barcelona",
      phone: "+34 600 000 000",
      email: "hello@conciergingbarcelona.com",
      namePlaceholder: "Votre Nom",
      emailPlaceholder: "Adresse Email",
      phonePlaceholder: "Numéro de Téléphone",
      messagePlaceholder: "Décrivez votre expérience idéale à Barcelone...",
      sendWhatsapp: "Envoyer via WhatsApp",
    },
    footer: {
      copyright: "© 2025 NightDreams Barcelona",
    },
    floatingCta: {
      label: "Demander un Service VIP",
    },
    booking: {
      label: "Contactez-nous !",
      titleLine1: "Planifiez Votre",
      titleLine2: "Expérience VIP",
      description: "Sélectionnez vos dates, la taille de votre groupe et les activités souhaitées — nous vous enverrons une proposition VIP sur mesure par email.",
      arrivalDate: "Date d'Arrivée",
      departureDate: "Date de Départ (optionnel)",
      pickDate: "Choisir une date",
      numberOfPeople: "Nombre de Personnes",
      peoplePlaceholder: "ex. 4",
      activities: "Activités",
      nightclubs: "Boîtes de Nuit",
      restaurants: "Restaurants",
      jetSkis: "Jet Skis",
      sportsActivities: "Activités Sportives",
      poolParties: "Pool Parties",
      other: "Autre",
      otherPlaceholder: "Décrivez votre demande personnalisée...",
      email: "Adresse Email",
      emailPlaceholder: "votre@email.com",
      notes: "Notes Supplémentaires (optionnel)",
      notesPlaceholder: "Préférences, besoins alimentaires, occasions spéciales...",
      submit: "Envoyer la Demande VIP",
      successTitle: "Merci !",
      successMessage: "Votre demande VIP a été envoyée. Notre équipe de concierges vous contactera sous peu avec une proposition sur mesure.",
    },
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi Siamo",
      services: "Servizi",
      experiences: "Esperienze",
      contact: "Contatti",
      bookNow: "Prenota",
    },
    hero: {
      title: "Night",
      titleAccent: "Dreams",
      subtitle: "Barcelona Concierge VIP",
      description:
        "Yacht di lusso, chef privati, vita notturna VIP ed esperienze su misura — create per viaggiatori d'élite alla ricerca dell'eccezionale.",
      exploreServices: "Scopri i Servizi",
      requestVip: "Richiedi Servizio VIP",
    },
    about: {
      label: "Chi Siamo",
      titleLine1: "La Tua Porta verso il",
      titleLine2: "Meglio di Barcellona",
      paragraph1:
        "NightDreams è un servizio lifestyle VIP di prima classe per viaggiatori d'élite e ospiti di alto profilo. Dal noleggio di yacht di lusso e chef privati all'accesso VIP alla vita notturna e ristoranti stellati Michelin — curiamo ogni dettaglio della tua esperienza a Barcellona.",
      paragraph2:
        "La nostra rete di partner esclusivi e insider locali garantisce discrezione, attenzione personalizzata e accesso a esperienze non disponibili al pubblico. Il tuo soggiorno, elevato.",
      stat1Num: "500+",
      stat1Label: "Partner Esclusivi",
      stat2Num: "12+",
      stat2Label: "Anni di Eccellenza",
      stat3Num: "24/7",
      stat3Label: "Supporto Personale",
    },
    services: {
      label: "I Nostri Servizi",
      titleLine1: "Su Misura per",
      titleLine2: "l'Élite",
      yacht: {
        title: "Noleggio Yacht",
        description:
          "Noleggio yacht di lusso ed esperienze nautiche private lungo la costa mediterranea — crociere al tramonto, barche per feste ed escursioni esclusive.",
      },
      chef: {
        title: "Chef Privati",
        description:
          "Chef privati di fama mondiale per cene intime, eventi in villa ed esperienze culinarie su misura.",
      },
      nightlife: {
        title: "Vita Notturna VIP",
        description:
          "Tavoli VIP riservati, servizio bottiglie e accesso prioritario ai club più esclusivi di Barcellona.",
      },
      dining: {
        title: "Alta Cucina",
        description:
          "Prenotazioni prioritarie in ristoranti stellati Michelin e gemme gastronomiche nascoste della città.",
      },
      sports: {
        title: "Sport & Benessere",
        description:
          "Golf premium, padel, sessioni di fitness, ritiri spa ed esperienze di benessere per corpo e mente.",
      },
    },
    experiences: {
      label: "Esperienze Esclusive",
      titleLine1: "Momenti Creati",
      titleLine2: "Solo per Te",
      yacht: {
        title: "Crociera Yacht & Champagne al Tramonto",
        category: "Mare & Lusso",
      },
      nightlife: {
        title: "Serata VIP — Bottiglie & Accesso Club",
        category: "Vita Notturna",
      },
      dining: {
        title: "Tavola Privata dello Chef con Abbinamento Vini",
        category: "Alta Cucina",
      },
    },
    contact: {
      label: "Contattaci",
      titleLine1: "Richiedi la Tua",
      titleLine2: "Esperienza VIP",
      description:
        "Che tu stia pianificando un weekend o un soggiorno prolungato, il nostro team di concierge è pronto a creare la tua esperienza perfetta a Barcellona. Condividi la tua visione e noi ci occuperemo di ogni dettaglio.",
      address: "Passeig de Gràcia, Barcelona",
      phone: "+34 600 000 000",
      email: "hello@conciergingbarcelona.com",
      namePlaceholder: "Il Tuo Nome",
      emailPlaceholder: "Indirizzo Email",
      phonePlaceholder: "Numero di Telefono",
      messagePlaceholder: "Raccontaci la tua esperienza ideale a Barcellona...",
      sendWhatsapp: "Invia via WhatsApp",
    },
    footer: {
      copyright: "© 2025 NightDreams Barcelona",
    },
    floatingCta: {
      label: "Richiedi Servizio VIP",
    },
    booking: {
      label: "Mettiamoci in contatto!",
      titleLine1: "Pianifica la Tua",
      titleLine2: "Esperienza VIP",
      description: "Seleziona le tue date, la dimensione del gruppo e le attività desiderate — ti invieremo una proposta VIP personalizzata via email.",
      arrivalDate: "Data di Arrivo",
      departureDate: "Data di Partenza (opzionale)",
      pickDate: "Scegli una data",
      numberOfPeople: "Numero di Persone",
      peoplePlaceholder: "es. 4",
      activities: "Attività",
      nightclubs: "Discoteche",
      restaurants: "Ristoranti",
      jetSkis: "Moto d'Acqua",
      sportsActivities: "Attività Sportive",
      poolParties: "Pool Parties",
      other: "Altro",
      otherPlaceholder: "Descrivi la tua richiesta personalizzata...",
      email: "Indirizzo Email",
      emailPlaceholder: "tua@email.com",
      notes: "Note Aggiuntive (opzionale)",
      notesPlaceholder: "Preferenze, esigenze alimentari, occasioni speciali...",
      submit: "Invia Richiesta VIP",
      successTitle: "Grazie!",
      successMessage: "La tua richiesta VIP è stata inviata. Il nostro team di concierge ti contatterà a breve con una proposta personalizzata.",
    },
  },
} as const;
