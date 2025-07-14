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
  
  playground: [
    {
      id: "demo-1",
      title: "Particle Galaxy Simulator",
      description: "Interactive 3D galaxy formation with realistic particle physics. Watch as thousands of particles form spiral arms and interact gravitationally with N-body simulation.",
      technologies: ["Three.js", "WebGL", "Particle Systems", "Physics", "N-body Simulation"],
      category: "Physics Simulation",
      featured: true,
      demo: "https://galaxy-sim.demo.com",
      github: "https://github.com/alexcosmos/galaxy-simulator",
      highlights: [
        "Real-time N-body gravitational physics",
        "GPU-accelerated particle rendering (100k+ particles)",
        "Interactive camera controls with cinematic modes",
        "Customizable galaxy parameters and initial conditions",
        "Dark matter visualization and halos",
        "Time-lapse evolution controls"
      ],
      type: "interactive",
      complexity: "Advanced",
      performance: "GPU Required"
    },
    {
      id: "demo-2", 
      title: "Procedural Planet Generator",
      description: "Generate infinite unique planets with realistic terrain, atmospheres, weather systems, and biomes using advanced noise functions and atmospheric scattering.",
      technologies: ["Three.js", "WebGL Shaders", "Noise Functions", "Procedural Generation", "Atmospheric Scattering"],
      category: "Procedural Graphics",
      featured: true,
      demo: "https://planet-gen.demo.com",
      github: "https://github.com/alexcosmos/planet-generator",
      highlights: [
        "Multi-octave noise terrain generation",
        "Realistic atmospheric scattering (Rayleigh & Mie)",
        "Dynamic weather and cloud systems",
        "Procedural biome distribution",
        "Custom vertex and fragment shaders",
        "Real-time LOD (Level of Detail) system"
      ],
      type: "interactive",
      complexity: "Expert",
      performance: "High-end GPU"
    },
    {
      id: "demo-3",
      title: "Crystal Cave Explorer",
      description: "Navigate through a mystical crystal cave with dynamic lighting, real-time reflections, volumetric fog, and particle effects in a fully immersive 3D environment.",
      technologies: ["Three.js", "WebGL", "HDR Lighting", "Post-processing", "Volumetric Rendering"],
      category: "Interactive Experience",
      featured: true,
      demo: "https://crystal-cave.demo.com",
      github: "https://github.com/alexcosmos/crystal-cave",
      highlights: [
        "Dynamic HDR lighting with multiple light sources",
        "Real-time reflections and refractions",
        "Volumetric fog and god-ray effects",
        "Procedural crystal growth animations",
        "First-person exploration controls",
        "Spatial audio integration"
      ],
      type: "experience",
      complexity: "Advanced",
      performance: "Modern GPU"
    },
    {
      id: "demo-4",
      title: "Morphing Geometry Lab",
      description: "Experiment with advanced vertex shaders and geometry morphing. Watch as 3D shapes transform and animate using mathematical functions and noise algorithms.",
      technologies: ["Three.js", "Vertex Shaders", "GLSL", "Geometry", "Mathematical Visualization"],
      category: "Shader Art",
      featured: true,
      demo: "https://morph-lab.demo.com", 
      github: "https://github.com/alexcosmos/morphing-lab",
      highlights: [
        "Real-time vertex shader transformations",
        "Interactive parameter control panel",
        "Mathematical function visualizations",
        "Noise-based organic deformations",
        "Multi-geometry morphing sequences",
        "Export animations as video/GIF"
      ],
      type: "experiment",
      complexity: "Intermediate",
      performance: "Standard GPU"
    },
    {
      id: "demo-5",
      title: "Audio Visualizer 3D",
      description: "Music visualization with 3D graphics that react to audio frequency, amplitude, and beat detection. Features multiple visualization modes and real-time audio analysis.",
      technologies: ["Three.js", "Web Audio API", "FFT Analysis", "Real-time Graphics", "Beat Detection"],
      category: "Audio Visualization",
      featured: false,
      demo: "https://audio-viz.demo.com",
      github: "https://github.com/alexcosmos/audio-visualizer",
      highlights: [
        "Real-time FFT audio analysis (2048 bins)",
        "Multiple visualization modes (waveform, spectrum, 3D)",
        "Beat detection and rhythm synchronization",
        "Particle systems reactive to music",
        "Custom audio filters and effects",
        "Microphone input and file upload support"
      ],
      type: "interactive",
      complexity: "Advanced",
      performance: "Standard GPU"
    },
    {
      id: "demo-6",
      title: "Fluid Simulation",
      description: "GPU-accelerated fluid dynamics simulation with particle-based rendering, realistic physics, and interactive controls for creating beautiful fluid behaviors.",
      technologies: ["Three.js", "WebGL Compute", "Fluid Dynamics", "Particle Systems", "Physics"],
      category: "Physics Simulation",
      featured: false,
      demo: "https://fluid-sim.demo.com",
      github: "https://github.com/alexcosmos/fluid-simulation",
      highlights: [
        "GPU-accelerated SPH (Smoothed Particle Hydrodynamics)",
        "Real-time fluid-obstacle interactions",
        "Viscosity and surface tension effects",
        "Multiple fluid types (water, honey, mercury)",
        "Interactive force application tools",
        "High-resolution particle rendering (50k+ particles)"
      ],
      type: "simulation",
      complexity: "Expert",
      performance: "High-end GPU"
    },
    {
      id: "demo-7",
      title: "Neural Network Visualizer",
      description: "Educational 3D visualization of neural networks showing data flow, learning processes, and network topology changes in real-time during training.",
      technologies: ["Three.js", "TensorFlow.js", "Machine Learning", "Data Visualization", "WebGL"],
      category: "AI Visualization",
      featured: false,
      demo: "https://neural-viz.demo.com",
      github: "https://github.com/alexcosmos/neural-visualizer",
      highlights: [
        "3D neural network topology visualization",
        "Real-time training data flow animation",
        "Interactive layer and neuron inspection",
        "Multiple network architectures (CNN, RNN, Transformer)",
        "Training metrics dashboard",
        "Custom dataset upload and training"
      ],
      type: "educational",
      complexity: "Advanced",
      performance: "Standard GPU"
    },
    {
      id: "demo-8",
      title: "Quantum Physics Simulator",
      description: "Visualize quantum mechanical phenomena including wave functions, particle interactions, and quantum field effects in an interactive 3D environment.",
      technologies: ["Three.js", "WebGL Shaders", "Physics Simulation", "Mathematical Visualization", "Quantum Mechanics"],
      category: "Scientific Simulation",
      featured: false,
      demo: "https://quantum-sim.demo.com",
      github: "https://github.com/alexcosmos/quantum-simulator",
      highlights: [
        "Wave function probability density visualization",
        "Quantum tunneling effect demonstrations",
        "Particle-wave duality experiments",
        "Interactive Schrödinger equation solver",
        "Quantum entanglement visualizations",
        "Educational quantum mechanics modules"
      ],
      type: "educational",
      complexity: "Expert",
      performance: "High-end GPU"
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
    color: "#FFA500",
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
    color: "#CD5C5C",
    description: "Academic background and learning"
  },
  jupiter: {
    name: "Contact",
    section: "contact",
    position: [28, 0, 0],
    scale: 1.5,
    color: "#D2691E",
    description: "Get in touch with me"
  },
  saturn: {
    name: "Playground",
    section: "playground",
    position: [36, 0, 0],
    scale: 1.2,
    color: "#FAD5A5",
    description: "Interactive demos and experiments"
  }
};

export const navigationData = [
  { name: "About", section: "about", planet: "sun" },
  { name: "Skills", section: "skills", planet: "mercury" },
  { name: "Experience", section: "experience", planet: "venus" },
  { name: "Projects", section: "projects", planet: "earth" },
  { name: "Education", section: "education", planet: "mars" },
  { name: "Contact", section: "contact", planet: "jupiter" },
  { name: "Playground", section: "playground", planet: "saturn" }
];