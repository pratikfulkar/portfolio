"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import Image from "next/image";

import {
  Code,
  Briefcase,
  User,
  Mail,
  Phone,
  Cpu,
  CircuitBoard,
  Droplets,
  CreditCard,
  Car,
  Award,
  Medal,
  ArrowUpRight,
  MessageCircle,
  ShoppingCart,
  Users,
  Folder,
  Linkedin,
} from "lucide-react";
import profile from "../assets/pratik_profile.jpg";

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter = ({ end, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation only once

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        if (progress < duration * 1000) {
          const nextCount = Math.min(
            Math.floor((progress / (duration * 1000)) * end),
            end
          );
          setCount(nextCount);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>+{count}</span>;
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  // Create refs with proper typing
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation only once

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Replace these with your actual EmailJS IDs
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    emailjs.send(serviceID, templateID, formData, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");

        // Reset formData to initial state
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          message: "",
        });
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send the message, please try again.");
      }
    );
  };
  // Mapping of section IDs to their corresponding refs
  const sectionRefs = {
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    skills: skillsRef,
    achievements: achievementsRef,
    contact: contactRef,
  };

  // Updated type for scrollToSection function
  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement>,
    section: string
  ) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(section);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      const sections = [
        { ref: aboutRef, id: "about" },
        { ref: experienceRef, id: "experience" },
        { ref: projectsRef, id: "projects" },
        { ref: skillsRef, id: "skills" },
        { ref: achievementsRef, id: "achievements" },
        { ref: contactRef, id: "contact" },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const element = section.ref.current;
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Previous code remains the same...
  const skills = [
    "HTML5",
    "CSS3",
    "Bootstrap",
    "MUI/Material-UI",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "REST API",
    "Firestore",
    "MongoDB",
    "MySQL",
    "GCP",
    "Postman",
    "GitHub",
    "Bitbucket",
    "Core UI",
    "SCSS",
    "Redux Saga",
    "Embedded C",
    "IoT",
    "Firebase",
    "ChatGPT",
    "DeepSeek",
    "Jira Automation",
    "Zapier",
    "CRM Integration",
    "Chatbot Development",
    "Mailchimp Integration",
    "Webhooks",
    "Third-Party API Integration",
    "Real-Time Communication",
    "Automation & Workflow Optimization",
    "Cloud Computing (AWS, GCP)",
    "Serverless Architecture",
    "Continuous Integration/Continuous Deployment (CI/CD)",
    "Test-Driven Development (TDD)",
    "Agile Methodologies",
    "UX/UI Design",
    "Product Management Tools (Jira, Trello)",
    "Data Visualization (Chart.js, D3.js)",
    "Google Vision API",
    "Payment Gateway Integration (Razorpay, PayPal)",
    "Multi-Channel Communication (Email, SMS, WhatsApp)",
    "Voice Assistants (Google Assistant, Alexa)",
    "API Rate Limiting & Security",
    "SEO & Performance Optimization",
    "Version Control (Git)",
    "RESTful API Design",
    "Responsive Design",
    "Database Optimization",
    "Cloud Functions",
    "Push Notifications",
  ];

  const experiences = [
    {
      company: "Altisource",
      role: "Senior Software Engineer",
      period: "Aug 2024 - Present",
      description:
        "Led development of software portal for lenders and agents, optimizing UX with secure authentication and dynamic forms.",
    },
    {
      company: "Flashaid",
      role: "Software Engineer",
      period: "Apr 2023 - Present",
      description:
        "Collaborated on MERN stack solutions and participated in agile development processes.",
    },
    {
      company: "EasyAsptaal",
      role: "Jr. Frontend Developer",
      period: "Aug 2021 - Apr 2023",
      description:
        "Developed scalable UIs with React. Received 2023 Innovation Award.",
    },
  ];

  const projects = [
    {
      title: "User Management Dashboard",
      period: "Feb 2025 - Present",
      icon: <Users className="w-8 h-8 text-blue-400" />,
      description:
        "Comprehensive user management dashboard with document generation, messaging automation, reports, and third-party integrations.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Redux",
        "Material-UI",
        "Jira Integration",
        "Mailchimp Integration",
        "Twilio API",
        "WhatsApp Business API",
        "Google Cloud Platform (GCP)",
        "Razorpay",
        "Cashfree",
        "Email/SMS Automation",
        "Real-time Communication",
        "RESTful APIs",
        "Document Generation & Management",
      ],
      type: "software",
    },

    {
      title: "Customer Buying Journey System",
      period: "Feb 2025 - Present",
      icon: <ShoppingCart className="w-8 h-8 text-green-400" />,
      description:
        "End-to-end solution for managing customer purchases with automated invoicing, notifications, and real-time payment gateways.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "Razorpay",
        "Cashfree",
        "MongoDB",
        "PostgreSQL",
        "Google Cloud Vision API",
        "Twilio API",
        "Mailchimp Integration",
        "WhatsApp Business API",
        "AI Document Scanning",
        "State Management (Redux)",
        "Responsive Design",
        "Real-time Notifications",
      ],
      type: "software",
    },

    {
      title: "WhatsApp Chatbot Integration",
      period: "Feb 2025 - Present",
      icon: <MessageCircle className="w-8 h-8 text-yellow-400" />,
      description:
        "Automated customer support and user flow management through WhatsApp with chatbot integration.",
      technologies: [
        "Node.js",
        "Express.js",
        "WhatsApp Business API",
        "Twilio API",
        "Google Cloud Platform (GCP)",
        "MongoDB",
        "State Management (Redux)",
        "Automated Workflows",
        "Lead Generation",
        "User Support Automation",
        "CRM Integration",
        "API Integration",
        "Real-time Communication",
      ],
      type: "software",
    },

    {
      title: "Online Blood Finder",
      period: "Feb 2021 - Mar 2021",
      icon: <Droplets className="w-8 h-8 text-red-400" />,
      description:
        "Platform for blood donation registration and matching with authentication",
      technologies: [
        "React.js",
        "Firebase Authentication",
        "Firebase Database",
        "Responsive Design",
        "Custom Hooks",
        "RESTful APIs",
        "Authentication Flow",
        "Form Validation",
        "Material-UI",
        "Error Handling",
        "JavaScript ES6+",
      ],
      type: "software",
    },
    {
      title: "Expense Tracker",
      period: "Jan 2021 - Feb 2021",
      icon: <CreditCard className="w-8 h-8 text-green-400" />,
      description: "Complete transaction management system",
      technologies: [
        "React.js",
        "State Management (Redux)",
        "UI/UX Design",
        "Local Storage",
        "Responsive Design",
        "Chart.js (Data Visualization)",
        "JavaScript ES6+",
        "CSS Flexbox/Grid",
        "Material-UI",
        "Form Validation",
        "Transaction Filtering & Sorting",
      ],
      type: "software",
    },
    {
      title: "Voice Controlled Vehicle",
      period: "Apr 2019 - May 2019",
      icon: <Car className="w-8 h-8 text-purple-400" />,
      description:
        "Google Assistant controlled vehicle with obstacle detection",
      technologies: [
        "Nodemcu",
        "ESP8266",
        "Ultrasonic Sensor",
        "Motor Driver",
        "Embedded C",
        "Adafruit",
        "IFTTT",
      ],
      type: "hardware",
    },
    {
      title: "IoT Wheelchair Fall Detection",
      period: "Jan 2021 - Jun 2021",
      icon: <CircuitBoard className="w-8 h-8 text-blue-400" />,
      description:
        "Smart system that detects sudden wheelchair jerks and sends mobile notifications",
      technologies: [
        "Nodemcu",
        "Accelerometer",
        "Gyroscope",
        "IFTTT",
        "Embedded C",
      ],
      type: "hardware",
    },
  ];

  const achievements = [
    {
      title: "Arjuna Award for Best Individual Performer",
      organization: "Flashaid",
      date: "November 2023",
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      description:
        "Recognized for outstanding individual performance and collaborative efforts in driving company success.",
      type: "professional",
    },
    {
      title: "Innovation Award",
      organization: "EasyAspataal",
      date: "February 2023",
      icon: <Medal className="w-8 h-8 text-blue-400" />,
      description:
        "Awarded for innovative contributions during the quarter, demonstrating creative problem-solving abilities.",
      type: "professional",
    },
    {
      title: "Best Project Award",
      organization: "ExpertHub",
      date: "November 2019",
      icon: <Award className="w-8 h-8 text-green-400" />,
      description:
        "Recognized for delivering the highest quality project during the internship program.",
      type: "professional",
    },
    {
      title: "National Cadet Corps",
      organization: "NCC India",
      date: "Aug 2012 - Apr 2014",
      // icon: <Military className="w-8 h-8 text-red-400" />,
      description:
        "Served in Junior Division (JD), developing leadership, discipline, and character through military training.",
      type: "military",
    },
  ];
  const stats = [
    { icon: Briefcase, color: "blue", value: 5, label: "Years of Experience" },
    { icon: Code, color: "green", value: 20, label: "Projects Completed" },
    { icon: Award, color: "yellow", value: 3, label: "Awards Won" },
    { icon: ArrowUpRight, color: "red", value: 9, label: "Clients" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Header*/}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-800 bg-opacity-95 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <nav className="flex space-x-6">
            {[
              { id: "about", icon: <User size={24} /> },
              { id: "experience", icon: <Briefcase size={24} /> },
              { id: "projects", icon: <Folder size={24} /> },
              { id: "skills", icon: <Code size={24} /> },
              { id: "achievements", icon: <Award size={24} /> },
              { id: "contact", icon: <Mail size={24} /> },
            ].map(({ id, icon }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(sectionRefs[id], id)}
                className={`text-white p-2 rounded-full transition-all duration-300 transform ${
                  activeSection === id
                    ? "bg-blue-400 scale-105"
                    : "hover:bg-blue-400 hover:scale-105"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {icon}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>
      {/* Animated Background Lines */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%, transparent 50%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.1) 75%, transparent 75%, transparent)",
          backgroundSize: "40px 40px",
        }}
      />

      <main className="max-w-6xl mx-auto p-6 py-20 relative z-10">
        {/* About Section  */}
        <div
          ref={aboutRef}
          className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
        >
          {/* Profile Image with Hover Effect */}
          <div className="text-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-64 h-64 rounded-full border-4 border-blue-400 overflow-hidden shadow-2xl relative group"
            >
              <Image
                src={profile.src}
                alt="Pratik Fulkar"
                width={256} // Set the width
                height={256} // Set the height
                className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
              />
              <div className="absolute inset-0 bg-blue-500/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <ArrowUpRight className="text-white w-12 h-12" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Pratik Fulkar
            </h1>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-blue-400">
              SOFTWARE ENGINEER
            </h2>
            <p className="mt-4 text-gray-300">
              Passionate about creating intuitive and engaging user experiences.
              Specialize in transforming ideas into beautifully crafted
              products&apos;.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`bg-gray-700/50 p-4 rounded-lg border border-gray-600/50 hover:border-${stat.color}-400 transition-all duration-300`}
                >
                  <stat.icon
                    className={`mx-auto mb-2 text-${stat.color}-400`}
                  />
                  <h3 className={`font-bold text-2xl text-${stat.color}-400`}>
                    <Counter end={stat.value} />
                  </h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section - New Addition */}
        <motion.div // Changed from motion.section to motion.div
          ref={projectsRef}
          className="min-h-screen py-12"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Cpu className="mr-2" />
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    {project.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-400">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.period}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`text-xs px-3 py-1 rounded-full ${
                        project.type === "hardware"
                          ? "bg-purple-900 text-purple-200"
                          : "bg-blue-900 text-blue-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* New Achievements Section */}
        <motion.div // Changed from motion.section to motion.div
          ref={achievementsRef}
          className="min-h-screen py-12"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Award className="mr-2" />
            Achievements & Recognition
          </h3>
          {/* Professional Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
            {achievements
              .filter((achievement) => achievement.type === "professional")
              .map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-blue-400">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {achievement.organization}
                      </p>
                      <p className="text-sm text-gray-500">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
          </div>{" "}
          {/* Military Service Highlight */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mb-8 bg-gradient-to-r from-red-900 to-red-800 p-6 rounded-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {/* Optionally add an icon */}
                {/* <Military className="w-12 h-12 text-red-400" /> */}
                <div>
                  <h4 className="text-xl font-bold">
                    National Cadet Corps (NCC)
                  </h4>
                  <p className="text-gray-300">
                    Junior Division (JD) | 2012 - 2014
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h4 className="text-xl font-bold">
                    National Cadet Corps (NCC)
                  </h4>
                  <p className="text-gray-300">
                    Senior Division (SD) | 2017 - 2020
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-200">
              Proudly served in India's premier youth organization, developing
              leadership, discipline, and character through military training
              and national service.
            </p>
          </motion.div>
        </motion.div>
        {/* Experience Section */}

        <motion.div // Changed from motion.section to motion.div
          ref={experienceRef}
          className="min-h-screen py-12"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Briefcase className="mr-2" />
            Work Experience
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-bold text-blue-400">
                  {exp.company}
                </h4>
                <p className="text-gray-400 mt-1">{exp.role}</p>
                <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
                <p className="mt-3">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        {/* <motion.div // Changed from motion.section to motion.div
          ref={skillsRef}
          className="min-h-screen py-12"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Code className="mr-2" />
            Skills & Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div> */}
        <motion.div ref={skillsRef} className="min-h-screen py-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Code className="mr-2" />
            Skills & Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                ref={ref}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        {/* <motion.div // Changed from motion.section to motion.div
          ref={contactRef}
          className="py-12" // Removed min-h-screen
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Mail className="mr-2" />
            Get in Touch
          </h3>
          <div className="flex flex-col space-y-4">
            <motion.a
              href="mailto:pratik.fwork@gmail.com"
              whileHover={{ x: 10 }}
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <Mail className="mr-2" /> pratik.fwork@gmail.com
            </motion.a>
            <motion.a
              href="tel:+919763021186"
              whileHover={{ x: 10 }}
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <Phone className="mr-2" /> +91 9763021186
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/pratik-fulkar-00/"
              target="_blank"
              whileHover={{ x: 10 }}
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <Linkedin className="mr-2" /> LinkedIn
            </motion.a>
          </div>
        </motion.div> */}
        {/* Contact Section */}
        <motion.div ref={contactRef} className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Mail className="mr-2" />
                Get in Touch
              </h3>
              <div className="flex flex-col space-y-4">
                <motion.a
                  href="mailto:pratik.fwork@gmail.com"
                  whileHover={{ x: 10 }}
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  <Mail className="mr-2" /> pratik.fwork@gmail.com
                </motion.a>
                <motion.a
                  href="tel:+919763021186"
                  whileHover={{ x: 10 }}
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  <Phone className="mr-2" /> +91 9763021186
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/pratik-fulkar-00/"
                  target="_blank"
                  whileHover={{ x: 10 }}
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  <Linkedin className="mr-2" /> LinkedIn
                </motion.a>
              </div>
            </div>

            {/* Right Side - Let's Work Together Form */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <MessageCircle className="mr-2" />
                LET'S WORK TOGETHER
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your@email.com"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Your Contact Number"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Message"
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      {/* Footer Section */}
      <footer className="bg-gray-800 py-6 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Pratik Fulkar. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
