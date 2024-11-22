"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Brain, Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-5 py-3 shadow-sm sticky top-0 w-full z-10 transition-all ${
        scrolled ? "bg-opacity-20" : "bg-transparent bg-opacity-20"
      } backdrop-blur-lg`}
    >
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link
          className="transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg"
          href="/"
        >
          <span className="text-xl font-bold flex">
            skylearning <Brain className="ml-2" />
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Link href="https://blog.aleksdraka.online" target="blank">
            <Button>Log In</Button>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden p-2 "
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-2 mt-3  p-4 rounded shadow">
          <ModeToggle />
          <Link href="https://blog.aleksdraka.online" target="blank">
            <Button>Log In</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
