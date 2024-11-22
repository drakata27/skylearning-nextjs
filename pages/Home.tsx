"use client";

import SectionItem from "@/components/SectionItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../lib/config";
import { UserProps } from "@/types/user";

interface SectionProps {
  id: number;
  title: string;
  subtitle: string;
}

const HomePage = () => {
  const [user, setUser] = useState<UserProps>({
    id: 0,
    avatar_url: "",
    name: "",
  });

  const [sections, setSections] = useState<SectionProps[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/section`, {
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
          user={user}
          id={section.id}
        />
      ))}
    </div>
  );
};

export default HomePage;
