"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md shadow-md">
      <div className="flex container items-center justify-between mx-auto px-4 py-3 lg:py-4">
        {/* Logo and Portfolio Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="logo image"
            width={40}
            height={60}
            className="ml-2 hover:scale-110 transition-transform duration-300"
          />
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            My_portfolio
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-200 hover:bg-white/10 transition"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-6 w-6 text-pink-400" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-pink-400" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  title={
                    <span className="text-lg font-medium bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text hover:underline underline-offset-4 decoration-pink-400 transition-all duration-200">
                      {link.title}
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {navbarOpen && (
        <MenuOverlay
          links={navLinks}
          onLinkClick={() => setNavbarOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
