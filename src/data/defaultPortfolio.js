// Centralized default data for the portfolio
export const defaultPortfolio = {
  about: {
    title: 'Building Scalable Backend Solutions',
    paragraphs: [
      "I'm a passionate Backend Developer with experience in building robust, scalable, and efficient web applications using technologies like Python, PHP, Laravel, JavaScript, and React. I thrive in collaborative environments where I can contribute to both backend logic and system integration while learning and growing with the team.",
      "My work has involved designing and implementing CRM and HR management systems, ensuring smooth data flow, clean architecture, and reliable performance. I enjoy turning complex requirements into clean, maintainable solutions with a strong understanding of API integration, database management, and backend optimization."
    ],
    highlights: [
      {
        title: '🎯 What Drives Me',
        text: "I believe in writing clean, efficient code and learning continuously. I'm excited by challenges that involve performance tuning, architectural decisions, or building something from scratch."
      },
      {
        title: '💼 Open To',
        bullets: [
          'Backend developer roles',
          'Remote or hybrid opportunities',
          'Projects involving scalable systems, APIs, or cloud integration',
          'Collaboration with innovative teams'
        ]
      }
    ]
  },

  skills: {
    categories: [
      {
        title: 'Backend Development',
        skills: [
          { name: 'Python', level: 90 },
          { name: 'Django', level: 85 },
          { name: 'Flask', level: 85 },
          { name: 'PHP', level: 85 },
          { name: 'Laravel', level: 85 },
          { name: 'Node.js', level: 80 },
          { name: 'Express', level: 80 }
        ]
      },
      {
        title: 'Frontend Development',
        skills: [
          { name: 'JavaScript', level: 85 },
          { name: 'TypeScript', level: 80 },
          { name: 'React', level: 85 },
          { name: 'Tailwind CSS', level: 80 },
          { name: 'Bootstrap', level: 80 }
        ]
      },
      {
        title: 'Database Management',
        skills: [
          { name: 'MySQL', level: 85 },
          { name: 'PostgreSQL', level: 85 },
          { name: 'MongoDB', level: 75 },
          { name: 'SQLite', level: 80 }
        ]
      },
      {
        title: 'Machine Learning & AI',
        skills: [
          { name: 'PyTorch', level: 80 },
          { name: 'scikit-learn', level: 85 },
          { name: 'Deep Learning', level: 75 }
        ]
      },
      {
        title: 'Tools & Technologies',
        skills: [
          { name: 'Git', level: 90 },
          { name: 'REST API', level: 90 },
          { name: 'Socket.io', level: 75 }
        ]
      }
    ],
    core: [
      'Full-Stack Development',
      'API Design & Integration',
      'System Architecture',
      'Database Optimization',
      'Machine Learning & Computer Vision',
      'E-Commerce Solutions',
      'HR Management Systems',
      'Vendor Management',
      'RESTful Services',
      'Real-time Applications',
      'Problem Solving',
      'Clean Code Practices'
    ]
  },

  experiences: [
    {
      company: 'VirtualTx',
      role: 'Software Developer',
      duration: 'August 2024 - Present',
      location: 'Remote',
      type: 'Full-time',
      description: [
        'Developing and maintaining scalable backend systems',
        'Working with modern tech stack including Python, PHP, and JavaScript',
        'Collaborating with cross-functional teams to deliver high-quality solutions',
        'Contributing to system architecture and design decisions'
      ]
    },
    {
      company: 'HyScaler',
      role: 'Junior Technical Programmer',
      duration: 'June 2023 - April 2024',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Full-time',
      description: [
        'Designed and implemented CRM and HR management systems',
        'Ensured smooth data flow and clean architecture',
        'Worked on API integration and database management',
        'Focused on backend optimization and reliable performance',
        'Collaborated with team members on various projects'
      ]
    },
    {
      company: 'HyScaler',
      role: 'Junior Software Developer Trainee',
      duration: 'February 2023 - June 2023',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Trainee',
      description: [
        'Completed intensive training in backend development',
        'Learned Laravel framework and modern development practices',
        'Worked on real-world projects under senior developers',
        'Gained hands-on experience with API development and testing',
        'Participated in code reviews and team meetings'
      ]
    }
  ],

  education: [
    {
      institution: 'Sambalpur University Institute of Information Technology (SUIIT)',
      degree: 'Bachelor of Technology - BTech',
      field: 'Computer Science',
      duration: 'August 2019 - May 2023',
      description: [
        'Completed comprehensive Computer Science curriculum',
        'Gained strong foundation in programming and software development',
        'Participated in various technical projects and hackathons',
        'Developed problem-solving and analytical skills'
      ]
    },
    {
      institution: 'Jawahar Navodaya Vidyalaya (JNV)',
      degree: '12th Grade',
      field: 'Science',
      duration: 'August 2015 - April 2019',
      description: [
        'Completed higher secondary education with Science stream',
        'Strong foundation in Mathematics, Physics, and Chemistry',
        'Developed early interest in technology and programming'
      ]
    }
  ],

  certifications: [
    'upStart - Priceless Learning Programs from upGrad',
    'Introduction to Back-End Development',
    'Skills Boost Arcade Trivia April 2025 Week 1'
  ],

  timeline: [
    { id: 1, date: '2015-2019', title: '12th Grade', subtitle: 'Jawahar Navodaya Vidyalaya', description: 'Completed higher secondary education with Science stream', type: 'education', icon: 'graduation', location: 'India', achievements: [], technologies: [] },
    { id: 2, date: '2019-2023', title: 'BTech Computer Science', subtitle: 'SUIIT, Sambalpur University', description: 'Bachelor of Technology in Computer Science', type: 'education', icon: 'graduation', location: 'India', achievements: [], technologies: ['Python', 'Java', 'Data Structures'] },
    { id: 3, date: 'Feb 2023', title: 'Junior Software Developer Trainee', subtitle: 'HyScaler', description: 'Completed intensive training in backend development', type: 'work', icon: 'briefcase', location: 'Bhubaneswar, India', achievements: [], technologies: ['Laravel', 'PHP'] },
    { id: 4, date: 'Jun 2023', title: 'Junior Technical Programmer', subtitle: 'HyScaler', description: 'Designed and implemented CRM and HR management systems', type: 'work', icon: 'briefcase', location: 'Bhubaneswar, India', achievements: [], technologies: ['PHP', 'Laravel', 'MySQL'] },
    { id: 5, date: 'Aug 2024', title: 'Software Developer', subtitle: 'VirtualTx', description: 'Developing and maintaining scalable backend systems', type: 'work', icon: 'briefcase', location: 'Remote', achievements: [], technologies: ['Python', 'PHP', 'JavaScript'] }
  ],

  projects: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with backend API and frontend interface. Features include product management, shopping cart, order processing, user authentication, and payment integration.',
      longDescription: 'A comprehensive e-commerce solution built with modern web technologies. The backend provides RESTful APIs for product management, user authentication, and order processing. The frontend offers a seamless shopping experience with advanced features like real-time inventory updates, secure payment processing, and responsive design.',
      technologies: ['Node.js', 'Express', 'MySQL', 'React', 'Tailwind CSS'],
      githubLink: 'https://github.com/satyajitdipu/ecom-backend-frontend',
      liveLink: null,
      stars: 12,
      forks: 4,
      status: 'Completed',
      category: 'Full-Stack',
      createdAt: '2023-08-15',
      lastUpdated: '2024-01-20',
      features: ['User Authentication', 'Product Management', 'Shopping Cart', 'Payment Integration', 'Order Tracking']
    },
    {
      id: 2,
      name: 'HR Management System',
      description: 'Comprehensive HR management portal for employee tracking, attendance management, leave requests, payroll processing, and performance evaluation. Built with robust backend architecture.',
      longDescription: 'Enterprise-grade HR management system designed to streamline human resource operations. Features comprehensive employee management, automated payroll processing, leave management, and performance tracking with detailed analytics and reporting capabilities.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Livewire', 'Bootstrap'],
      githubLink: 'https://github.com/satyajitdipu/HR-management',
      liveLink: null,
      stars: 8,
      forks: 2,
      status: 'Completed',
      category: 'Backend',
      createdAt: '2023-06-10',
      lastUpdated: '2023-12-05',
      features: ['Employee Management', 'Attendance Tracking', 'Payroll Processing', 'Leave Management', 'Performance Evaluation']
    },
    {
      id: 3,
      name: 'Vendor Management System',
      description: 'Enterprise vendor management solution covering onboarding, purchase orders and performance analytics.',
      longDescription: 'Handles vendor lifecycle with dashboards, automated invoicing, and reporting.',
      technologies: ['Python', 'Django', 'PostgreSQL'],
      githubLink: 'https://github.com/satyajitdipu/vendor_management',
      liveLink: null,
      stars: 15,
      forks: 6,
      status: 'Completed',
      category: 'Backend',
      createdAt: '2023-09-01',
      lastUpdated: '2024-02-15',
      features: ['Vendor Onboarding', 'Purchase Orders', 'Invoice Management']
    },
    {
      id: 4,
      name: 'Crop Disease Detection System',
      description: 'ML-powered crop disease detection with image preprocessing and model training pipelines.',
      longDescription: 'Computer vision solution utilizing CNNs to detect plant diseases and recommend treatments.',
      technologies: ['Python', 'PyTorch', 'OpenCV'],
      githubLink: 'https://github.com/satyajitdipu/Crop_Remodelling_and_Disease_Detection',
      liveLink: null,
      stars: 20,
      forks: 8,
      status: 'Completed',
      category: 'AI/ML',
      createdAt: '2023-04-20',
      lastUpdated: '2023-11-30',
      features: ['Image Analysis', 'Disease Detection']
    },
    {
      id: 5,
      name: 'Image Classification System',
      description: 'Deep learning-based image classification application using convolutional neural networks.',
      longDescription: 'Advanced image classification with multiple model support and analytics.',
      technologies: ['React', 'TypeScript', 'Fabric.js', 'Socket.io'],
      githubLink: 'https://github.com/satyajitdipu/image-classification',
      liveLink: null,
      stars: 18,
      forks: 5,
      status: 'In Progress',
      category: 'AI/ML',
      createdAt: '2023-07-12',
      lastUpdated: '2024-01-10',
      features: ['Real-time Classification', 'Performance Analytics']
    },
    {
      id: 6,
      name: 'Book Catalog System',
      description: 'Digital book catalog management with search and user reviews.',
      longDescription: 'RESTful API backend with React frontend for catalog management.',
      technologies: ['Laravel', 'MySQL', 'React'],
      githubLink: 'https://github.com/satyajitdipu/Book-catalog',
      liveLink: null,
      stars: 10,
      forks: 3,
      status: 'Completed',
      category: 'Full-Stack',
      createdAt: '2023-05-08',
      lastUpdated: '2023-10-25',
      features: ['Book Search', 'Inventory Management']
    },
    {
      id: 7,
      name: 'Real-Time Chat App',
      description: 'Secure real-time chat built with Socket.io and Redis.',
      longDescription: 'Supports rooms, message persistence, and presence indicators.',
      technologies: ['Node.js', 'Socket.io', 'Redis'],
      githubLink: null,
      liveLink: null,
      stars: 7,
      forks: 1,
      status: 'Completed',
      category: 'Realtime',
      createdAt: '2022-11-02',
      lastUpdated: '2023-01-15',
      features: ['Rooms', 'Message Persistence']
    },
    {
      id: 8,
      name: 'Analytics Dashboard',
      description: 'Dashboard project with interactive charts and drill-downs.',
      longDescription: 'Data visualization and reporting for business metrics.',
      technologies: ['React', 'D3.js', 'Node.js'],
      githubLink: null,
      liveLink: null,
      stars: 9,
      forks: 2,
      status: 'Completed',
      category: 'Data Visualization',
      createdAt: '2022-06-10',
      lastUpdated: '2023-05-20',
      features: ['Interactive Charts', 'Export Reports']
    },
    {
      id: 9,
      name: 'Inventory Management System',
      description: 'Inventory control and supplier management system for small businesses.',
      longDescription: 'Includes barcode scanner integration and low-stock alerts.',
      technologies: ['PHP', 'Laravel', 'MySQL'],
      githubLink: null,
      liveLink: null,
      stars: 6,
      forks: 1,
      status: 'Completed',
      category: 'Backend',
      createdAt: '2021-09-15',
      lastUpdated: '2021-12-01',
      features: ['Barcode Integration', 'Alerts']
    },
    {
      id: 10,
      name: 'Open Source CLI Tool',
      description: 'A small CLI utility to process CSV files and generate reports.',
      longDescription: 'Cross-platform CLI implemented with Node.js and sharp performance for large files.',
      technologies: ['Node.js'],
      githubLink: 'https://github.com/satyajitdipu/csv-tool',
      liveLink: null,
      stars: 5,
      forks: 0,
      status: 'Completed',
      category: 'Utilities',
      createdAt: '2020-03-12',
      lastUpdated: '2020-04-01',
      features: ['CSV Processing', 'Report Generation']
    },
    {
      id: 11,
      name: 'Microservice Auth Gateway',
      description: 'Authentication and centralized session management for microservices.',
      longDescription: 'OAuth2-based gateway with JWT token handling and refresh workflows.',
      technologies: ['Go', 'Redis', 'PostgreSQL'],
      githubLink: null,
      liveLink: null,
      stars: 11,
      forks: 2,
      status: 'Completed',
      category: 'Backend',
      createdAt: '2021-01-15',
      lastUpdated: '2021-06-01',
      features: ['JWT', 'OAuth2']
    },
    {
      id: 12,
      name: 'Serverless Image Processor',
      description: 'Serverless pipeline to resize and optimize images on upload.',
      longDescription: 'Uses cloud functions to generate responsive images and webp formats.',
      technologies: ['AWS Lambda', 'S3'],
      githubLink: null,
      liveLink: null,
      stars: 14,
      forks: 1,
      status: 'Completed',
      category: 'Cloud',
      createdAt: '2021-08-10',
      lastUpdated: '2022-05-20',
      features: ['Auto-resize', 'WebP conversion']
    },
    {
      id: 13,
      name: 'Feature Flag Service',
      description: 'Simple feature flag service to enable/disable features at runtime.',
      longDescription: 'Supports percentage rollouts and targeting rules.',
      technologies: ['Node.js', 'Redis'],
      githubLink: null,
      liveLink: null,
      stars: 3,
      forks: 0,
      status: 'Completed',
      category: 'DevOps',
      createdAt: '2020-11-02',
      lastUpdated: '2021-02-10',
      features: ['Rollouts', 'Targeting']
    },
    {
      id: 14,
      name: 'Micro-Analytics Collector',
      description: 'Tiny high-throughput event collector and batch aggregator.',
      longDescription: 'Designed for low-latency ingestion with eventual consistency.',
      technologies: ['Rust', 'Kafka'],
      githubLink: null,
      liveLink: null,
      stars: 2,
      forks: 0,
      status: 'Completed',
      category: 'Data',
      createdAt: '2022-02-01',
      lastUpdated: '2022-03-11',
      features: ['Ingestion', 'Aggregation']
    },
    {
      id: 15,
      name: 'Education LMS Module',
      description: 'Lightweight LMS module for course management.',
      longDescription: 'Supports course creation, enrollment, and progress tracking.',
      technologies: ['PHP', 'Laravel'],
      githubLink: null,
      liveLink: null,
      stars: 4,
      forks: 1,
      status: 'Completed',
      category: 'EdTech',
      createdAt: '2019-09-20',
      lastUpdated: '2020-01-02',
      features: ['Courses', 'Progress']
    }
  ],

  testimonials: [],

  blog: [
    {
      id: 1,
      title: 'The Evolution of Web Development: From Static Sites to Modern Frameworks',
      excerpt: 'Exploring the journey of web development technologies and how they have shaped the digital landscape over the past decades.',
      content: '<h2>The Dawn of the Web</h2><p>Sample blog content</p>',
      author: 'Satyajit Dipu',
      date: '2024-01-15',
      tags: ['Web Development', 'JavaScript', 'Frameworks'],
      readTime: '5 min read',
      image: 'https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Web+Dev+Evolution'
    },
    {
      id: 2,
      title: 'Machine Learning in Agriculture: Revolutionizing Crop Management',
      excerpt: 'How AI and ML are changing farming and crop monitoring.',
      content: '<p>ML in agriculture overview</p>',
      author: 'Satyajit Dipu',
      date: '2024-01-10',
      tags: ['Machine Learning', 'Agriculture'],
      readTime: '6 min read',
      image: 'https://via.placeholder.com/600x300/059669/FFFFFF?text=ML+in+Agriculture'
    },
    {
      id: 3,
      title: 'Building Scalable Backend Systems with Node.js and Express',
      excerpt: 'Architectural patterns for scalable Node.js backends.',
      content: '<p>Node.js best practices</p>',
      author: 'Satyajit Dipu',
      date: '2024-01-05',
      tags: ['Node.js', 'Backend'],
      readTime: '7 min read',
      image: 'https://via.placeholder.com/600x300/DC2626/FFFFFF?text=Node.js+Backend'
    },
    {
      id: 4,
      title: 'The Future of HCI: Voice and Gesture Interfaces',
      excerpt: 'Emerging interaction models and usability.',
      content: '<p>HCI perspectives</p>',
      author: 'Satyajit Dipu',
      date: '2023-12-28',
      tags: ['HCI', 'Voice'],
      readTime: '6 min read',
      image: 'https://via.placeholder.com/600x300/7C3AED/FFFFFF?text=HCI+Future'
    },
    {
      id: 5,
      title: 'Cybersecurity for IoT: What You Need to Know',
      excerpt: 'Security considerations for IoT ecosystems.',
      content: '<p>IoT security essentials</p>',
      author: 'Satyajit Dipu',
      date: '2023-12-20',
      tags: ['IoT', 'Security'],
      readTime: '5 min read',
      image: 'https://via.placeholder.com/600x300/EF4444/FFFFFF?text=IoT+Security'
    },
    {
      id: 6,
      title: 'Data Visualization: Telling Stories with Charts',
      excerpt: 'Principles and tools for great visualizations.',
      content: '<p>Data viz tips</p>',
      author: 'Satyajit Dipu',
      date: '2023-12-15',
      tags: ['Data Visualization'],
      readTime: '4 min read',
      image: 'https://via.placeholder.com/600x300/F59E0B/FFFFFF?text=Data+Viz'
    }
  ],

  gallery: [
    { id: 1, title: 'Data Visualization Chart', image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Data+Visualization', category: 'Data Science', description: 'Data visualization sample', tags: ['Data', 'Visualization'] },
    { id: 2, title: 'Database Schema Design', image: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Database+Schema', category: 'Database', description: 'ER diagram sample', tags: ['Database', 'Schema'] },
    { id: 3, title: 'Machine Learning Model Snapshot', image: 'https://via.placeholder.com/600x400/059669/FFFFFF?text=ML+Model', category: 'AI/ML', description: 'Model training visualization', tags: ['ML'] },
    { id: 4, title: 'Interactive Dashboard', image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Dashboard', category: 'Data Viz', description: 'Charts and filters', tags: ['Dashboard'] },
    { id: 5, title: 'Code Snippet', image: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Code', category: 'Dev', description: 'Formatted code', tags: ['Code'] }
  ],

  contact: {
    contactMethods: [
      { type: 'email', label: 'Email', value: 'satyajits1001@gmail.com' },
      { type: 'phone', label: 'Phone', value: '+91-7008666331' }
    ],
    contactInfo: [
      { label: 'Location', value: 'Bhubaneswar, Odisha, India' },
      { label: 'Availability', value: 'Open for opportunities' }
    ],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/satyajitdipu' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/' }
    ],
    faqs: [
      { q: 'What is your availability?', a: 'Open for full-time and remote opportunities.' }
    ],
    stats: [
      { label: 'Years Experience', value: '7+' },
      { label: 'Projects Completed', value: '15+' }
    ]
  },

  newsletter: {
    enabled: true,
    placeholder: 'Enter your email to subscribe',
    successMessage: 'Thanks for subscribing!'
  },

  footer: {
    links: [
      { label: 'GitHub', url: 'https://github.com/satyajitdipu' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/' }
    ],
    copyright: `© ${new Date().getFullYear()} Satyajit Dipu`
  }
};
