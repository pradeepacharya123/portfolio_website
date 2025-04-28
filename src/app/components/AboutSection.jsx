"use client";
import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

// 🧩 Importing icons
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaReact, FaDatabase } from "react-icons/fa";
import { SiC, SiMysql, SiJavascript, SiDjango, SiMinds, SiDeepnote } from "react-icons/si";

// Certificate Item Component
const CertificateItem = ({ title, imageSrc, delay }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <li className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 1 }}
        className="text-lg sm:text-2xl font-semibold text-[#ADB7BE] mb-4"
      >
        <TypeAnimation sequence={[title, 2000]} wrapper="span" speed={50} repeat={0} />
      </motion.div>

      <button
        onClick={() => setShowImage(!showImage)}
        className="bg-gradient-to-r from-primary-400 to-primary-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
      >
        {showImage ? "Hide Certificate" : "View Certificate"}
      </button>

      {showImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 w-full max-w-md"
        >
          <Image
            src={imageSrc}
            alt={title}
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-contain"
          />
        </motion.div>
      )}
    </li>
  );
};

// Skill Icon Mapper
const skillIcons = {
  C: <SiC className="text-blue-400 text-xl" />,
  Java: <FaJava className="text-red-600 text-xl" />,
  Python: <FaPython className="text-yellow-400 text-xl" />,
  HTML: <FaHtml5 className="text-orange-500 text-xl" />,
  CSS: <FaCss3Alt className="text-blue-500 text-xl" />,
  JavaScript: <SiJavascript className="text-yellow-300 text-xl" />,
  React: <FaReact className="text-cyan-400 text-xl" />,
  Django: <SiDjango className="text-green-500 text-xl" />,
  MySQL: <SiMysql className="text-blue-300 text-xl" />,
  "Machine Learning": <SiMinds className="text-pink-400 text-xl" />,
  "Deep Learning": <SiDeepnote className="text-purple-400 text-xl" />,
};

// Tab Data
const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="bg-[#0a0a0a] p-6 rounded-xl mt-6 space-y-10">
        {[
          { title: "Programming Languages", items: ["C", "Java", "Python"], delay: 1 },
          {
            title: "Web Technologies",
            items: ["HTML", "CSS", "JavaScript", "React", "Django"],
            delay: 3,
          },
          { title: "Database", items: ["MySQL"], delay: 5 },
          {
            title: "Others",
            items: ["Machine Learning", "Deep Learning"],
            delay: 7,
          },
        ].map(({ title, items, delay }, index) => (
          <div className="text-center" key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay, duration: 1 }}
              className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-primary-950 to-secondary-600 text-transparent bg-clip-text mb-4"
            >
              <TypeAnimation sequence={[title, 1500]} wrapper="span" speed={50} repeat={0} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 1, duration: 1 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {items.map((skill) => (
                <motion.span
                  key={skill}
                  className="bg-gray-800 px-6 py-3 rounded-md text-lg sm:text-xl font-medium shadow-md hover:scale-105 transition duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.1, opacity: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skillIcons[skill]} {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <div className="bg-gray-800/60 p-6 rounded-xl mt-6 text-center">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="space-y-10 max-w-xl mx-auto"
        >
          <CertificateItem
            title="Finalist in IEEE Eureka-2023"
            imageSrc="/images/eureka.jpg"
            delay={1}
          />
          <CertificateItem
            title="Udemy Certification – Full Stack Web Development"
            imageSrc="/images/udemy.jpg"
            delay={2}
          />
        </motion.ul>
      </div>
    ),
  },
];

// About Section Component
const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const currentTab = TAB_DATA.find((item) => item.id === tab);

  const handleTabChange = (id) => {
    startTransition(() => setTab(id));
  };

  return (
    <section
      className="relative text-white flex items-center justify-center min-h-screen px-4 sm:px-8 mt-16"
      id="about"
    >
      {/* Blue Radial Glow Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-950 to-secondary-950 rounded-full h-[120px] w-[300px] sm:h-[200px] sm:w-[500px] z-0 blur-[120px] sm:blur-[180px] absolute top-1/3 sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />

      <div className="w-full max-w-5xl py-8 sm:py-16 z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary-400 to-secondary-600 text-transparent bg-clip-text">
            About Me
          </h1>
        </div>

        <p className="text-base sm:text-lg lg:text-xl mb-10 text-center leading-relaxed">
          Final-year engineering student specializing in Artificial Intelligence and Data Science at Shri Madhwa Vadiraja Institute of Technology and Management. As a highly self-driven and results-oriented individual, I am passionate about continuous learning, tackling complex problems, and actively seeking opportunities for both personal and professional growth. I approach each challenge with analytical rigor, dedication, and a strong commitment to excellence. Motivated by the potential to create impactful solutions, I am focused on leveraging my skills and knowledge to contribute to innovative and meaningful projects that drive tangible outcomes.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {TAB_DATA.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => handleTabChange(tabItem.id)}
              className={`px-5 py-2 text-sm sm:text-base font-semibold rounded-full border transition duration-300 
                ${
                  tab === tabItem.id
                    ? "bg-gradient-to-r from-primary-400 to-secondary-600 text-white"
                    : "border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white"
                }`}
            >
              {tabItem.title}
            </button>
          ))}
        </div>

        {tab && <div>{currentTab?.content}</div>}
      </div>
    </section>
  );
};

export default AboutSection;
