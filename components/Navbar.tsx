"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Brain, Menu, PlusSquare } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import BASE_URL from "../lib/config";
import { UserProps } from "@/types/user";
import axios from "axios";
import ProfileImage from "./ProfileImage";
import { redirect } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserProps>();

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

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (typeof res.data === "object") {
          setUser(res.data);
        } else {
          setUser(undefined);
        }
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  const signOut = () => {
    window.location.href = `${BASE_URL}/oauth/logout`;
  };

  const logIn = () => {
    window.location.href = `${BASE_URL}`;
  };

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
          {user ? (
            <div className="flex space-x-5">
              <button onClick={() => redirect("/section/add")}>
                <PlusSquare />
              </button>
              <ProfileImage user={user} />
              <Button onClick={signOut}>Sign Out</Button>
            </div>
          ) : (
            <Button onClick={logIn}>Log In</Button>
          )}
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

          {user ? (
            <div className="flex flex-col items-center space-y-5">
              <button>
                <PlusSquare />
              </button>
              <ProfileImage user={user} />
              <Button onClick={signOut}>Sign Out</Button>
            </div>
          ) : (
            <Button onClick={logIn}>Log In</Button>
          )}
        </div>
      )}
    </header>
  );
}
