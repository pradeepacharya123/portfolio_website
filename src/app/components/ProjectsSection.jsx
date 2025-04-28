'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import * as THREE from "three"; // Import Three.js
import FOG from "vanta/dist/vanta.fog.min";


const PROJECTS = [
  {
    title: "Brain Tumor Detection",
    image: "/images/brain.png",
    description:
      "Brain Tumor Detection is an intelligent medical imaging system designed to assist healthcare professionals in the early and accurate identification of brain tumors from MRI scans. It simplifies the diagnostic process by automatically analyzing medical images and highlighting abnormal regions, supporting faster and more precise clinical decisions. This project features a deep learning model based on VGG16, specifically trained to detect brain tumors with high reliability.The technologies used include Python with deep learning frameworks like TensorFlow and Keras. Development was supported by libraries such as NumPy, Pandas, Matplotlib, and OpenCV, and the model training and evaluation were carried out in Jupyter Notebook.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy"],
  },
  {
    title: "Mental Health Care Website",
    image: "/images/mental.png",
    description:
      "Anonymous and Stigma-Free Mental Health Support Website is a secure and inclusive platform designed to support individuals in need of mental health assistance without the fear of being judged. The platform provides real-time anonymous chat with mental health professionals, along with therapeutic tools like musical therapy and engaging games to help users manage stress and improve emotional well-being.The technologies used include HTML, CSS, JavaScript, and React for the frontend, Django for backend development, and MySQL for managing the database. Django’s authentication system was implemented for security.",
    technologies: ["React", "Django", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Real-Time Chat Application",
    image: "/images/chat.png",
    description:
      "Real-Time Chat Application is a dynamic communication platform designed to enable seamless, instant messaging between users. It features a clean and responsive user interface, supporting one-on-one conversations with real-time message delivery. The application ensures smooth user interaction, making it suitable for both casual and professional use cases.The technologies used include React for the frontend, Node.js with Express.js for the backend, and Socket.io for enabling real-time messaging. MongoDB was used for database operations, and JWT tokens were implemented for user authentication."
      ,technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io"],
  },
  {
    title: "Tic Tac Toe Game",
    image: "/images/tic.png",
    description:
      "Tic Tac Toe Game is a classic two-player board game built for fun and logic development. The game features a responsive and intuitive interface, allowing players to take turns and track wins in real time. It also includes logic to detect wins, losses, and draws, enhancing the overall user experience." ,technologies: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Task Manager",
    image: "/images/task.png",
    description:
      "Task Manager is an intuitive web application designed to help users organize and manage their tasks efficiently. It allows users to add, update, and delete tasks, as well as mark tasks as completed. The application provides a clear, user-friendly interface that enhances productivity by allowing for task categorization, deadlines, and real-time updates.", technologies: ["React", "Node.js", "MongoDB"],
  },
];

const speak = (text) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }
};

const ProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x000000,  // Light Pink
          midtoneColor: 0xFF1493,    // Lighter Pink
          lowlightColor: 0x000000,   // Black
          baseColor: 0x0,
          speed: 1.3,
          zoom: 0.1,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    if (activeIndex !== null) {
      speak(PROJECTS[activeIndex].description);
    }
    return () => stopSpeech();
  }, [activeIndex]);

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <section
      className="text-white flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-8 relative overflow-hidden"
      id="projects"
      ref={vantaRef}
    >
      <div className="project-background"></div>

      <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-primary-950 to-secondary-600 text-transparent bg-clip-text mb-10 text-center z-10">
        Projects
      </h1>

      {/* Straight Line Below Projects Heading */}
      <div className="w-[75%] sm:w-[60%] h-[3px] bg-gradient-to-r from-primary-950 to-secondary-600 mb-10"></div>

      <div className="space-y-20 max-w-5xl w-full z-10">
        {PROJECTS.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Project Title with Repeating Type Animation */}
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-900 to-secondary-600 text-transparent bg-clip-text mb-4 relative"
                style={{
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  borderRadius: "10px",
                }}
              >
                <TypeAnimation
                  sequence={[project.title, 2000, "", 500]} // This makes it type and then delete repeatedly
                  speed={50}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity} // Make it repeat infinitely
                />
              </motion.h2>

              <div className="bg-[#03044700] rounded-xl px-4 py-6 sm:p-8 shadow-md">
                {/* Image with Zoom Effect */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.1 }}
                  whileOutOfView={{ scale: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="w-full max-w-xs sm:max-w-md mx-auto"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="rounded-lg shadow-lg object-cover w-[400px] h-[250px]"
                  />
                </motion.div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 justify-center mt-8">
                  {project.technologies.map((tech, idx) => (
                    <motion.div
                      key={idx}
                      className="inline-block rounded-md px-2 py-1 text-[25px] sm:text-xs font-medium bg-[#000102] text-white hover:scale-105 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.06,
                        type: "spring",
                        stiffness: 80,
                        damping: 12,
                      }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => {
                      setActiveIndex(isActive ? null : index);
                      setIsVisible(true);
                    }, 500);
                  }}
                  className="mt-8 px-5 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-full bg-gradient-to-r from-primary-900 to-secondary-950 hover:opacity-90 transition text-white font-medium"
                >
                  {isActive ? "Hide Explanation" : "Show Detailed Explanation"}
                </button>

                {/* Detailed Description */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1.5 }}
                    className="mt-9 text-sm sm:text-base text-white max-w-2xl mx-auto"
                  >
                    <TypeAnimation
                      sequence={[project.description, 4000]}
                      speed={50}
                      wrapper="p"
                      cursor={false}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectSection;
