'use client';
import React, { useState, useEffect, useRef } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import * as THREE from "three"; // Import Three.js
import FOG from "vanta/dist/vanta.fog.min"; // Import Vanta

const EmailSection = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Vanta effect initialization
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.name.value || !e.target.email.value || !e.target.subject.value || !e.target.message.value) {
      setStatusMessage("❌ Please fill in all fields.");
      setEmailSubmitted(false);
      return;
    }

    setIsLoading(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      setIsLoading(false);

      if (response.status === 200) {
        console.log("Message sent successfully.");
        setEmailSubmitted(true);
        setStatusMessage("✅ Email sent successfully!");
      } else {
        console.error("Failed to send message:", resData);
        setEmailSubmitted(false);
        setStatusMessage("❌ Failed to send the email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsLoading(false);
      setEmailSubmitted(false);
      setStatusMessage("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative" ref={vantaRef}>
      {/* Vanta background */}
    
      <div className="z-10 ml-6 md:ml-0"> {/* Added ml-4 for mobile spacing */}
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          Always open to new opportunities and conversations.
          Feel free to reach out — I&apos;d love to hear from you!
        </p>

        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/pradeepacharya123">
            <Image src={GithubIcon} alt="Github Icon" className="w-8 h-8" />
          </Link>
          <Link href="https://www.linkedin.com/in/pradeep-acharya-9268b0267">
            <Image src={LinkedinIcon} alt="Linkedin Icon" className="w-8 h-8" />
          </Link>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pradeepacharya9876@gmail.com&su=Let's Connect&body=Hi Pradeep,"
            title="Send me an email"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-3xl"
          >
            <MdEmail className="w-8 h-8" />
          </a>
        </div>
      </div>

      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="text-white block mb-2 text-sm font-medium">
              Your name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              className="bg-[#000000] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#000000] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#000000] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="bg-[#000000] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Let's talk about..."
            />
          </div>

          {statusMessage && (
            <p className={`text-sm mb-4 ${emailSubmitted ? 'text-green-500' : 'text-red-500'}`}>
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-primary-950 to-secondary-950 text-white font-medium py-2.5 px-5 rounded-lg w-full hover:opacity-90 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
