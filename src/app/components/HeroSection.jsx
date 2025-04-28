'use client';
import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three"; // Import Three.js
import FOG from "vanta/dist/vanta.fog.min"; // Import Vanta

const HeroSection = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Vanta effect initialization for the hero section
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 100.0,
          minWidth: 100.0,
          highlightColor: 0x000000,  // Dark color for fog
          midtoneColor: 0xFF1400,    // Lighter pink color
          lowlightColor: 0x000000,   // Dark color for fog
          baseColor: 0x000000,       // Background color set to black
          speed: 1.3,
          zoom: 0.1,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section
      className="relative h[-75%]-screen flex items-center justify-center px-10 bg-[#000000] mt-[-50px] py-4 overflow-hidden"
      ref={vantaRef}
    >
      {/* Vanta Animation Background */}
   
      <div className="text-center max-w-4xl mx-auto z-10">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
            <Image
              src="/images/mp.png" // Ensure the image path is correct here
              alt="Pradeep Acharya"
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Heading: Hello I'm */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-snug mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-950 to-secondary-950">
            Hello, I&apos;m
          </span>
        </motion.h1>

        {/* Name */}
        <motion.h2
          className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        >
          Pradeep Acharya
        </motion.h2>

        {/* Roles with TypeAnimation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#ADB7BE] mb-8"
        >
          <TypeAnimation
            sequence={[
              "Web Developer", 1500,
              "AI/ML Engineer", 1500,
              "Problem Solver", 1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Short Bio */}
        <p className="text-white text-base sm:text-lg lg:text-xl mb-10 px-4">
          Driven by data, powered by innovation — a passionate AI & Data Science engineer with a CGPA of 9.06.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-950 to-secondary-950 text-white hover:opacity-90 transition"
          >
            Hire Me
          </Link>
          <Link
            href="/Pradeep-15-1.pdf"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-950 to-secondary-950 text-white hover:opacity-90 transition"
          >
            Download CV
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
