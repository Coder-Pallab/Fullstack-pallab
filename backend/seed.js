import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const initialProjects = [
    {
        title: "Aaahar Food Delivery",
        description: "Aaahar is your trusted food delivery service, bringing fresh, hygienic, and delicious meals straight to your doorstep. We focus on quality ingredients, quick delivery, and home-style taste to make every meal satisfying and convenient for you.",
        image: "/projects/aaahar-food-delivery.png",
        tags: ["React", "Tailwind CSS", "Node Js", "Express Js", "MongoDB", "Json Web Token"],
        url: "https://aaahar.vercel.app",
        code: "https://github.com/Coder-Pallab/Aaahar-Food-Delivery-App",
    },
    {
        title: "AI Student Mentorship System",
        description: "Our AI Student Mentor System is designed to guide students through their academic journey with personalized support, smart recommendations, and 24/7 assistance. It helps students understand concepts better, manage their studies efficiently, and achieve their learning goals with confidence.",
        image: "/projects/ai-student-mentor.png",
        tags: ["React", "Tailwind CSS", "Node Js", "Express Js", "MongoDB", "Json Web Token", "Generative AI", "Gemini API"],
        url: "#",
        code: "https://github.com/deepmoina2005/Gen-AI-Student-Mentor",
    },
    {
        title: "Authentication System",
        description: "Our Authentication System ensures secure, reliable, and seamless access to digital platforms. By using modern security techniques, it protects user data, prevents unauthorized access, and delivers a smooth login experience you can trust.",
        image: "/projects/authentication-system.png",
        tags: ["React", "Tailwind CSS", "Node Js", "Express Js", "MongoDB", "Json Web Token", "Brevo SMTP", "NodeMailer"],
        url: "https://authentication-system-static.onrender.com",
        code: "https://github.com/Coder-Pallab/Authentication-System",
    },
    {
        title: "Background Removal App",
        description: "Our Background Removal tool uses AI to instantly remove backgrounds from images with precision and clarity. Perfect for product photos, profiles, and designs, it saves time while delivering professional-quality results in just one click.",
        image: "/projects/background-removal-app.png",
        tags: ["React", "Tailwind CSS", "Node Js", "Express Js", "MongoDB", "Clerk", "ClipDrop API"],
        url: "https://background-removal-app-sigma.vercel.app",
        code: "https://github.com/Coder-Pallab/Background-Removal-App",
    },
    {
        title: "Brahmaputra Real Estate",
        description: "Brahmaputra Real Estate is committed to helping you find the perfect property with trust and transparency. From residential homes to commercial spaces, we offer reliable real estate solutions that combine local expertise with customer-focused service.",
        image: "/projects/brahmaputra-RE.png",
        tags: ["React", "Tailwind CSS"],
        url: "https://brahmaputra-real-estate.netlify.app",
        code: "https://github.com/Coder-Pallab/The-Brahmaputra-Real-Estate",
    },
    {
        title: "2025 Portfolio",
        description: "This portfolio showcases my early projects, skills, and learning journey as a developer. It reflects my growth, experimentation, and foundation in web development, highlighting the work that shaped my technical skills.",
        image: "/projects/pallab-portfolio2025.png",
        tags: ["React", "Tailwind CSS", "Web3Forms"],
        url: "https://pallab-portfolio-updated.vercel.app",
        code: "https://github.com/Coder-Pallab/Updated-Portfolio-Website-2025",
    }
];

const initialSkills = [
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "Javascript", level: 80, category: "Frontend" },
    { name: "React Js", level: 80, category: "Frontend" },
    { name: "Tailwind CSS", level: 90, category: "Frontend" },
    { name: "Framer Motion", level: 90, category: "Animation" },
    { name: "Node Js", level: 70, category: "Backend" },
    { name: "Express Js", level: 90, category: "Backend" },
    { name: "MongoDB", level: 70, category: "Database" },
    { name: "MySQL", level: 60, category: "Database" },
    { name: "Json Web Token", level: 70, category: "Authentication" },
    { name: "Python", level: 60, category: "Backend" },
    { name: "Java", level: 50, category: "Backend" },
    { name: "C", level: 80, category: "Programming Language" },
    { name: "Git/Github", level: 90, category: "Tools" },
    { name: "Figma", level: 90, category: "Tools" },
    { name: "VS Code", level: 90, category: "Tools" },
    { name: "IntelliJ Idea", level: 40, category: "Tools" },
    { name: "Ms Word", level: 100, category: "Tools" },
    { name: "Ms Powerpoint", level: 100, category: "Tools" },
    { name: "Ms Exel", level: 100, category: "Tools" }
];

const initialTestimonial = [
    {
        name: "John Doe",
        role: "Client",
        comment: "Pallab is an amazing developer. He delivered my project on time and it exceeded my expectations!",
        approved: true
    }
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Project.deleteMany();
        await Skill.deleteMany();
        await Testimonial.deleteMany();

        await Project.insertMany(initialProjects);
        await Skill.insertMany(initialSkills);
        await Testimonial.insertMany(initialTestimonial);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
