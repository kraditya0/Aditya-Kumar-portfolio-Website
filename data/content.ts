export const contact = {
  email: "aditya2003iitm@gmail.com",
  github: "https://github.com/kraditya0",
  linkedin: "https://www.linkedin.com/in/aditya-kumar-1a43b91b1",
};

export const experience = [
  {
    role: "Full Stack Web Developer",
    company: "Ments, IIT Madras",
    period: "May 2026 - Present",
    mode: "Onsite",
    description:
      "Building and strengthening a production platform across frontend, backend, database, and payments.",
    achievements: [
      "Built and maintained the platform using Next.js with React and TypeScript, Node.js and Express.js, PostgreSQL, and Prisma ORM.",
      "Redesigned key UI components using Tailwind CSS and Framer Motion.",
      "Diagnosed and fixed backend and server-side issues to improve application stability, performance, and database reliability.",
      "Implemented subscription plans end-to-end using Razorpay for recurring and one-time transactions.",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Framer Motion",
      "Razorpay",
    ],
  },
  {
    role: "Research Analyst Intern",
    company: "Bug Coders",
    period: "January 2025 - September 2025",
    mode: "Remote",
    description:
      "Turned multi-source research and collaboration data into focused partnership and competitive insights.",
    achievements: [
      "Analyzed collaboration data from 250+ R&D units and startups to identify partnership opportunities.",
      "Conducted competitive analysis using business intelligence tools and research frameworks.",
      "Delivered data-driven insights and strategic recommendations by synthesizing multiple data sources.",
    ],
    tags: [
      "Research",
      "Data Analysis",
      "Competitive Intelligence",
      "Business Intelligence",
      "Strategic Analysis",
    ],
  },
];

export const skillGroups = [
  {
    title: "Programming",
    index: "01",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "HTML/CSS"],
  },
  {
    title: "Web Development",
    index: "02",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "Flask",
      "Vue.js",
      "Jinja2",
      "Tailwind CSS",
      "Bootstrap",
      "Framer Motion",
      "REST APIs",
      "DOM Manipulation",
    ],
  },
  {
    title: "Machine Learning & AI",
    index: "03",
    skills: [
      "Scikit-learn",
      "Machine Learning",
      "Supervised Learning",
      "Classification",
      "Regression",
      "Feature Engineering",
      "Data Preprocessing",
      "Model Evaluation",
      "NLP Fundamentals",
    ],
  },
  {
    title: "Data & Visualization",
    index: "04",
    skills: [
      "Pandas",
      "NumPy",
      "Statistical Analysis",
      "Tableau",
      "Power BI",
      "Matplotlib",
      "Plotly",
      "Seaborn",
      "Excel",
    ],
  },
  {
    title: "Databases",
    index: "05",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Prisma ORM",
      "Database Design",
      "Query Optimization",
    ],
  },
  {
    title: "Integrations",
    index: "06",
    skills: ["Auth.js / NextAuth", "Razorpay", "Stripe", "Shiprocket API", "Cloudinary"],
  },
  {
    title: "Tools & Deployment",
    index: "07",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Railway",
      "Render",
      "Hostinger",
      "Linux",
      "VS Code",
      "Google Workspace",
    ],
  },
];

export type Project = {
  id: "toxic" | "placement" | "expense";
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  features: string[];
  problem: string;
  solution: string;
  implementation: string;
  result: string;
  github?: string;
};

export const projects: Project[] = [
  {
    id: "toxic",
    number: "01",
    title: "Toxic Comment Classification",
    category: "Machine Learning / NLP",
    description:
      "A machine learning system for classifying online comments into multiple categories using NLP techniques, feature engineering, and ensemble models.",
    tags: ["Python", "NLP", "LightGBM", "XGBoost", "TF-IDF", "Scikit-learn"],
    features: [
      "TF-IDF vectorization",
      "Feature extraction",
      "Feature engineering",
      "LightGBM",
      "XGBoost",
      "Ensemble modeling",
      "Hyperparameter optimization",
    ],
    problem:
      "Online comments can contain multiple forms of toxicity, requiring multi-category text classification.",
    solution:
      "Transform comment text into TF-IDF and engineered features, then classify it with optimized ensemble models.",
    implementation:
      "The pipeline combines text vectorization, feature extraction, LightGBM, XGBoost, ensemble modeling, and hyperparameter optimization.",
    result: "Achieved a 0.81+ Kaggle leaderboard score.",
  },
  {
    id: "placement",
    number: "02",
    title: "Placement Portal Web Application",
    category: "Full-Stack Platform",
    description:
      "A full-stack campus placement platform supporting Admin, Company, and Student workflows.",
    tags: ["Flask", "Vue.js", "SQLite", "Redis", "Celery", "JWT"],
    features: [
      "JWT authentication",
      "Role-based access control",
      "Placement drive management",
      "Student applications",
      "Eligibility validation",
      "Resume uploads",
      "CSV export",
      "RESTful APIs",
      "Redis caching",
      "Celery background jobs",
      "Automated email notifications",
      "Monthly reports",
    ],
    problem:
      "Campus placements need coordinated workflows for administrators, companies, and eligible students.",
    solution:
      "A role-aware web platform centralizes placement drives, applications, validation, reports, and communication.",
    implementation:
      "Flask REST APIs and Vue.js power the application, with SQLite persistence, Redis caching, Celery jobs, and JWT authentication.",
    result: "Delivered the complete Admin, Company, and Student workflow described in the project scope.",
  },
  {
    id: "expense",
    number: "03",
    title: "Smart Expense Tracker & Budget Management System",
    category: "Data-Driven Application",
    description:
      "A full-stack expense tracking and budget management application for monitoring financial transactions, budgets, spending patterns, and financial goals.",
    tags: ["Flask", "SQLite", "JavaScript", "Chart.js", "APScheduler"],
    features: [
      "Expense tracking",
      "Categorization",
      "CRUD operations",
      "Budget monitoring",
      "Automated alerts",
      "REST APIs",
      "Analytics dashboards",
      "Email notifications",
      "Modular backend architecture",
    ],
    problem:
      "Personal transactions, budgets, and financial goals are difficult to understand when tracked separately.",
    solution:
      "A single system organizes transactions and surfaces spending patterns, budget progress, and automated alerts.",
    implementation:
      "A modular Flask backend exposes REST APIs over SQLite, while JavaScript and Chart.js render analytics and APScheduler supports automated tasks.",
    result: "Created an integrated workflow for expense records, budgets, goals, analytics, and notifications.",
  },
];
