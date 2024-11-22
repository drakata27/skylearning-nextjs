"use client";

import SectionItem from "@/components/SectionItem";
import axios from "axios";
import React, { useEffect, useState } from "react";

// TODO: Put interfaces in file
interface SectionProps {
  title: string;
  subtitle: string;
}

interface UserProps {
  avatar_url?: string;
  bio: string;
  name: string;
  email: string;
}

const HomePage = () => {
  const [user, setUser] = useState<UserProps>({
    avatar_url: "",
    name: "",
    email: "hidden",
    bio: "",
  });

  const [sections, setSections] = useState<SectionProps[]>([]);

  useEffect(() => {
    axios
      // TODO: Create env variables for url
      .get("http://localhost:8080/user", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  useEffect(() => {
    axios
      // TODO: Create env variables for url
      .get("http://localhost:8080/section", {
        withCredentials: true,
      })
      .then((res) => setSections(res.data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  return (
    <div className="heading space-y-3">
      <h1 className="">Home</h1>
      {sections.map((section, id: number) => (
        <SectionItem
          key={id}
          title={section.title}
          subtitle={section.subtitle}
          user={user.name}
        />
      ))}
    </div>
  );
};

export default HomePage;
