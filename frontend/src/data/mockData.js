export const portfolioData = {
  personal: {
    name: "Alex Cosmos",
    title: "Full Stack Developer & 3D Artist",
    tagline: "Exploring the digital universe, one project at a time",
    bio: "I'm a passionate developer who loves creating immersive digital experiences. With expertise in modern web technologies and 3D visualization, I bring ideas to life through code and creativity. When I'm not coding, you can find me stargazing and drawing inspiration from the cosmos.",
    location: "San Francisco, CA",
    email: "alex.cosmos@example.com",
    phone: "+1 (555) 123-4567",
    social: {
      github: "https://github.com/alexcosmos",
      linkedin: "https://linkedin.com/in/alexcosmos",
      twitter: "https://twitter.com/alexcosmos",
      portfolio: "https://alexcosmos.dev"
    }
  },
  
  skills: [
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "React", level: 92, category: "Frontend" },
    { name: "Three.js", level: 88, category: "3D Graphics" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "WebGL", level: 78, category: "3D Graphics" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "PostgreSQL", level: 75, category: "Database" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "AWS", level: 72, category: "Cloud" },
    { name: "Blender", level: 65, category: "3D Graphics" },
    { name: "Unity", level: 60, category: "Game Dev" }
  ],
  
  experience: [
    {
      id: "1",
      company: "Stellar Dynamics",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      description: "Lead developer for immersive web experiences using React and Three.js. Built award-winning 3D product configurators that increased customer engagement by 300%.",
      achievements: [
        "Developed 3D product visualization platform serving 1M+ users",
        "Led team of 5 developers in agile environment",
        "Reduced page load times by 40% through optimization",
        "Implemented real-time collaboration features"
      ],
      technologies: ["React", "Three.js", "Node.js", "MongoDB", "WebGL"]
    },
    {
      id: "2",
      company: "Cosmic Labs",
      position: "Frontend Developer",
      duration: "2020 - 2022",
      location: "Remote",
      description: "Specialized in creating interactive data visualizations and 3D web applications for scientific research institutions.",
      achievements: [
        "Built interactive galaxy simulation for NASA research",
        "Created data visualization tools for astronomical data",
        "Contributed to open-source Three.js ecosystem",
        "Mentored junior developers"
      ],
      technologies: ["Vue.js", "D3.js", "Three.js", "Python", "FastAPI"]
    },
    {
      id: "3",
      company: "Digital Nebula",
      position: "Junior Web Developer",
      duration: "2018 - 2020",
      location: "Austin, TX",
      description: "Focused on responsive web design and modern JavaScript frameworks. Gained expertise in performance optimization and accessibility.",
      achievements: [
        "Developed responsive websites for 50+ clients",
        "Improved site accessibility scores by 25%",
        "Implemented modern CI/CD workflows",
        "Collaborated with design teams on UI/UX"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Sass"]
    }
  ],
  
  projects: [
    {
      id: "1",
      title: "Galactic Explorer",
      description: "An interactive 3D space exploration game built with Three.js and React. Features procedurally generated planets, realistic physics, and immersive audio.",
      image: "/api/placeholder/600/400",
      technologies: ["Three.js", "React", "WebGL", "Web Audio API"],
      category: "3D Game",
      featured: true,
      demo: "https://galactic-explorer.demo.com",
      github: "https://github.com/alexcosmos/galactic-explorer",
      highlights: [
        "Procedural planet generation",
        "Physics-based spacecraft controls",
        "Dynamic lighting and shadows",
        "Spatial audio system"
      ]
    },
    {
      id: "2",
      title: "Cosmic Data Visualizer",
      description: "A web-based tool for visualizing astronomical data in 3D space. Used by researchers to analyze star formations and galaxy clusters.",
      image: "/api/placeholder/600/400",
      technologies: ["D3.js", "Three.js", "Python", "FastAPI"],
      category: "Data Visualization",
      featured: true,
      demo: "https://cosmic-viz.demo.com",
      github: "https://github.com/alexcosmos/cosmic-viz",
      highlights: [
        "Real-time data streaming",
        "Interactive 3D scatter plots",
        "Custom shader materials",
        "Export to various formats"
      ]
    },
    {
      id: "3",
      title: "Stellar Portfolio",
      description: "A 3D portfolio website inspired by our solar system. Each planet represents a different section with smooth animations and interactions.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Three.js", "Framer Motion", "WebGL"],
      category: "Portfolio",
      featured: true,
      demo: "https://stellar-portfolio.demo.com",
      github: "https://github.com/alexcosmos/stellar-portfolio",
      highlights: [
        "Interactive solar system navigation",
        "Particle effects and shaders",
        "Responsive 3D design",
        "Smooth performance optimization"
      ]
    },
    {
      id: "4",
      title: "Quantum Commerce",
      description: "E-commerce platform with 3D product visualization. Customers can interact with products in virtual space before purchasing.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Three.js", "Node.js", "PostgreSQL"],
      category: "E-commerce",
      featured: false,
      demo: "https://quantum-commerce.demo.com",
      github: "https://github.com/alexcosmos/quantum-commerce",
      highlights: [
        "3D product configurator",
        "AR try-before-buy feature",
        "Real-time inventory sync",
        "Payment gateway integration"
      ]
    },
    {
      id: "5",
      title: "Neural Network Visualizer",
      description: "Educational tool for understanding neural networks through 3D visualization. Shows data flow and learning processes in real-time.",
      image: "/api/placeholder/600/400",
      technologies: ["Three.js", "TensorFlow.js", "React", "D3.js"],
      category: "Education",
      featured: false,
      demo: "https://neural-viz.demo.com",
      github: "https://github.com/alexcosmos/neural-viz",
      highlights: [
        "Real-time training visualization",
        "Interactive network topology",
        "Educational animations",
        "Performance metrics dashboard"
      ]
    },
    {
      id: "6",
      title: "Cosmic Weather",
      description: "Weather app with 3D Earth visualization showing global weather patterns, satellite imagery, and climate data.",
      image: "/api/placeholder/600/400",
      technologies: ["Three.js", "React", "OpenWeatherMap API", "WebGL"],
      category: "Utility",
      featured: false,
      demo: "https://cosmic-weather.demo.com",
      github: "https://github.com/alexcosmos/cosmic-weather",
      highlights: [
        "Real-time weather data integration",
        "3D Earth with cloud layers",
        "Interactive climate visualization",
        "Responsive design"
      ]
    }
  ],
  
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Master of Science in Computer Science",
      field: "Computer Graphics & HCI",
      duration: "2016 - 2018",
      location: "Stanford, CA",
      gpa: "3.9/4.0",
      achievements: [
        "Thesis: Real-time Procedural Planet Generation",
        "Teaching Assistant for CS148 (Computer Graphics)",
        "Winner of Annual Graphics Competition"
      ]
    },
    {
      id: "2",
      institution: "UC Berkeley",
      degree: "Bachelor of Science in Computer Science",
      field: "Software Engineering",
      duration: "2012 - 2016",
      location: "Berkeley, CA",
      gpa: "3.8/4.0",
      achievements: [
        "Summa Cum Laude",
        "President of ACM Student Chapter",
        "Hackathon Winner (Cal Hacks 2015)"
      ]
    }
  ],
  
  certifications: [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      id: "aws-sa-001"
    },
    {
      name: "Three.js Certified Developer",
      issuer: "Three.js Foundation",
      date: "2022",
      id: "threejs-dev-001"
    },
    {
      name: "React Advanced Patterns",
      issuer: "React Training",
      date: "2021",
      id: "react-adv-001"
    }
  ]
};

export const planetData = {
  sun: {
    name: "About",
    section: "about",
    position: [0, 0, 0],
    scale: 3,
    color: "#FDB813",
    description: "Central hub - Learn about me"
  },
  mercury: {
    name: "Skills",
    section: "skills",
    position: [8, 0, 0],
    scale: 0.4,
    color: "#8C7853",
    description: "Technical abilities and expertise"
  },
  venus: {
    name: "Experience",
    section: "experience",
    position: [12, 0, 0],
    scale: 0.6,
    color: "#FFC649",
    description: "Professional journey and achievements"
  },
  earth: {
    name: "Projects",
    section: "projects",
    position: [16, 0, 0],
    scale: 0.8,
    color: "#6B93D6",
    description: "Showcase of my work and creations"
  },
  mars: {
    name: "Education",
    section: "education",
    position: [20, 0, 0],
    scale: 0.5,
    color: "#C1440E",
    description: "Academic background and learning"
  },
  jupiter: {
    name: "Contact",
    section: "contact",
    position: [28, 0, 0],
    scale: 1.5,
    color: "#D8CA9D",
    description: "Get in touch with me"
  }
};

export const navigationData = [
  { name: "About", section: "about", planet: "sun" },
  { name: "Skills", section: "skills", planet: "mercury" },
  { name: "Experience", section: "experience", planet: "venus" },
  { name: "Projects", section: "projects", planet: "earth" },
  { name: "Education", section: "education", planet: "mars" },
  { name: "Contact", section: "contact", planet: "jupiter" }
];