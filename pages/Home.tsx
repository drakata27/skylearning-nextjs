"use client";

import SectionItem from "@/components/SectionItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../lib/config";
import { UserProps } from "@/types/user";
import { SkeletonCard } from "@/components/SkeletonCard";

interface SectionProps {
  id: number;
  title: string;
  subtitle: string;
}

const HomePage = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user`, { withCredentials: true }),
          axios.get(`${BASE_URL}/section`, { withCredentials: true }),
        ]);

        setUser(userRes.data);
        setSections(sectionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="heading space-y-3">
      <h1 className="">Home</h1>

      {isLoading ? (
        <>
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </>
      ) : (
        sections.map((section) => (
          <SectionItem
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            user={user!}
            id={section.id}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
