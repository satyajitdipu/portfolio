// Centralized default data for the portfolio — sourced directly from Satyajit Sahoo's resume
export const defaultPortfolio = {
  personal: {
    name: 'Satyajit Sahoo',
    title: 'Software Engineer',
    tagline: 'Full-Stack & Backend • AI/ML Integration',
    email: 'satyajits101@gmail.com',
    phone: '+91 6372754900',
    location: 'Bhubaneswar, Odisha, India',
    github: 'https://github.com/satyajitdipu',
    linkedin: 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/'
  },

  about: {
    title: 'Building Scalable Backend Solutions with AI-Powered Features',
    paragraphs: [
      "I'm a Software Engineer with 3+ years of experience building scalable SaaS platforms, RESTful microservices, and AI-powered features in production. I work across Python (Flask, FastAPI) and PHP (Laravel) backends alongside React.js frontends, with hands-on experience in AWS cloud infrastructure, real-time data workflows, and LLM integrations.",
      "I enjoy turning complex requirements into clean, maintainable systems — from healthcare SaaS platforms with real-time integrations to CRM and HR systems that cut manual overhead. I've worked in Agile teams delivering complex features on schedule, and I'm always looking for the next hard problem to solve."
    ],
    highlights: [
      {
        title: '🎯 What Drives Me',
        text: "I believe in writing clean, efficient code and learning continuously. I'm excited by challenges that involve performance tuning, architectural decisions, or building something from scratch."
      },
      {
        title: '💼 Open To',
        bullets: [
          'Backend / full-stack engineering roles',
          'Remote or hybrid opportunities',
          'Systems involving scalable architecture, APIs, or AI/LLM integration',
          'Collaboration with innovative teams'
        ]
      }
    ]
  },

  skills: {
    categories: [
      {
        title: 'Languages',
        skills: ['Python', 'PHP', 'JavaScript', 'TypeScript', 'SQL']
      },
      {
        title: 'Backend Frameworks',
        skills: ['FastAPI', 'Flask', 'Laravel', 'Node.js', 'Express.js', 'Django', 'Yii']
      },
      {
        title: 'Frontend',
        skills: ['React.js', 'Vue.js', 'Tailwind CSS', 'HTML5', 'CSS3']
      },
      {
        title: 'Cloud & DevOps',
        skills: ['AWS EC2', 'AWS S3', 'Git', 'GitHub', 'Linux', 'Docker']
      },
      {
        title: 'Databases',
        skills: ['PostgreSQL', 'MySQL']
      },
      {
        title: 'APIs & Integrations',
        skills: ['RESTful APIs', 'Stripe', 'Authorize.net', 'Unity', 'Postman']
      },
      {
        title: 'AI / ML',
        skills: ['LLMs', 'Hugging Face', 'Image Classification', 'OpenCV', 'scikit-learn']
      },
      {
        title: 'Methodologies',
        skills: ['Agile / Scrum', 'Microservices', 'OOP', 'MVC', 'Data Structures & Algorithms']
      }
    ]
  },

  experiences: [
    {
      company: 'VirtualTx',
      role: 'Software Engineer',
      duration: 'August 2024 – Present',
      location: 'Remote',
      type: 'Full-time',
      description: [
        'Architected and deployed React.js + Python (Flask/FastAPI) microservices on AWS EC2 to power a healthcare SaaS platform, managing media assets through AWS S3 for optimized retrieval.',
        'Built and maintained a bi-directional real-time data integration layer between Unity game engine and a React.js web app, enabling live state synchronization for therapy sessions.',
        'Engineered LLM-driven AI image generation features allowing users to create custom visual assets from natural language prompts, directly leveraging language model inference pipelines.',
        'Implemented secure payment subscription workflows using Stripe and Authorize.net, supporting recurring billing for hundreds of active users.',
        'Designed therapist activity card workflows for clinical session delivery; collaborated with designers and PMs in Agile sprints to ship features on time.'
      ],
      technologies: ['React.js', 'Python', 'Flask', 'FastAPI', 'AWS EC2/S3', 'Unity', 'Stripe', 'Authorize.net', 'Laravel', 'RESTful APIs']
    },
    {
      company: 'Hyscaler',
      role: 'Software Developer',
      duration: 'February 2023 – April 2024',
      location: 'Bhubaneswar, India',
      type: 'Full-time',
      description: [
        'Engineered a full CRM web application using PHP (Laravel), Vue.js, Tailwind CSS, and PostgreSQL, achieving a measurable 20% improvement in page load times through query optimization and caching strategies.',
        'Designed and documented end-to-end CRM architecture; led requirement-gathering sessions with stakeholders and improved cross-module data flows.',
        'Built a comprehensive HR Management System with automated email notification pipelines and social media recruitment API integrations, reducing manual HR overhead.',
        'Wrote clean, MVC-structured, OOP code; actively participated in code reviews to uphold team quality standards.'
      ],
      technologies: ['PHP', 'Laravel', 'Vue.js', 'Tailwind CSS', 'PostgreSQL', 'MySQL', 'RESTful APIs', 'Git']
    }
  ],

  education: [
    {
      institution: 'Sambalpur University Institute of Information Technology (SUIIT)',
      degree: 'B.Tech in Information Technology',
      duration: 'Graduated May 2023',
      grade: 'CGPA: 8.01 / 10',
      location: 'Burla, Odisha, India'
    }
  ],

  certifications: [
    {
      name: 'Data Analysis using Python',
      issuer: 'upGrad / upStart, Priceless Learning Programs',
      link: 'https://www.credential.net/55057e03-e043-429d-b7f7-8da1c9828aad'
    },
    {
      name: 'Introduction to Java',
      issuer: 'upGrad / upStart, Priceless Learning Programs',
      link: 'https://www.credential.net/55057e03-e043-429d-b7f7-8da1c9828aad#acc.l0yAYdpI'
    },
    {
      name: 'Introduction to Back-End Development',
      issuer: 'Coursera • Certificate ID: MBPLFBGX5KE8',
      link: 'https://coursera.org/account/accomplishments/certificate/MBPLFBGX5KE8'
    }
  ],

  projects: [
    {
      id: 1,
      name: 'AI Drawing & Image Analysis Tool',
      description: 'A TypeScript/React web app integrating a digital drawing canvas with AI-powered image analysis using Hugging Face models — NSFW detection, image classification, and caption generation. Optimized the inference pipeline for sub-second response times and added full canvas export functionality.',
      technologies: ['React', 'TypeScript', 'Hugging Face', 'Image Classification'],
      githubLink: 'https://github.com/satyajitdipu/image-classification',
      category: 'AI/ML'
    },
    {
      id: 2,
      name: 'Vendor Management System',
      description: 'A Python/Django system for vendor profile management, purchase order tracking, and business analytics dashboards — demonstrating backend data modeling and API design skills.',
      technologies: ['Python', 'Django', 'PostgreSQL'],
      githubLink: 'https://github.com/satyajitdipu/vendor_management',
      category: 'Backend'
    },
    {
      id: 3,
      name: 'HR Management System',
      description: 'A centralized Employee Management System (PHP, Laravel) handling payroll, attendance, and end-to-end recruitment workflows with third-party API automation.',
      technologies: ['PHP', 'Laravel', 'MySQL'],
      githubLink: 'https://github.com/satyajitdipu/HR-management',
      category: 'Full-Stack'
    },
    {
      id: 4,
      name: 'Crop Remodelling & Disease Detection',
      description: 'A Python/Flask smart-farming application with deep learning plant-disease detection, providing crop and fertilizer recommendations from soil analysis data.',
      technologies: ['Python', 'Flask', 'Deep Learning', 'OpenCV'],
      githubLink: 'https://github.com/satyajitdipu/Crop_Remodelling_and_Disease_Detection',
      category: 'AI/ML'
    },
    {
      id: 5,
      name: 'E-Commerce Platform',
      description: 'A full-stack Node.js + React.js + MySQL e-commerce solution with product management, query-optimized search, and payment gateway integration.',
      technologies: ['Node.js', 'React', 'MySQL', 'Express'],
      githubLink: 'https://github.com/satyajitdipu/ecom-backend-frontend',
      category: 'Full-Stack'
    }
  ],

  contact: {
    contactMethods: [
      { type: 'email', label: 'Email', value: 'satyajits101@gmail.com', link: 'mailto:satyajits101@gmail.com' },
      { type: 'phone', label: 'Phone', value: '+91 6372754900', link: 'tel:+916372754900' },
      { type: 'location', label: 'Location', value: 'Bhubaneswar, Odisha, India', link: null }
    ],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/satyajitdipu' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/' }
    ],
    stats: [
      { label: 'Years Experience', value: '3+' },
      { label: 'Key Projects', value: '5+' }
    ]
  },

  footer: {
    links: [
      { label: 'GitHub', url: 'https://github.com/satyajitdipu' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/' }
    ],
    copyright: `© ${new Date().getFullYear()} Satyajit Sahoo`
  }
};
