"use client";
import SectionItem from "@/components/SectionItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../lib/config";
import { UserProps } from "@/types/user";
import { SkeletonCard } from "@/components/SkeletonCard";
import { SectionProps } from "@/types/section";
import Searchbox from "@/components/Searchbox";

const HomePage = () => {
  const [user, setUser] = useState<UserProps>();
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [filteredSections, setFilteredSections] = useState<SectionProps[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, sectionsRes] = await Promise.all([
        axios.get(`${BASE_URL}/user`, { withCredentials: true }),
        axios.get(`${BASE_URL}/section`, { withCredentials: true }),
      ]);

      if (typeof sectionsRes.data !== "object") {
        console.warn("Unauthenticated: HTML response received.");
        setUser(undefined);
        return;
      }

      setUser(userRes.data);
      setSections(sectionsRes.data);
      setFilteredSections(sectionsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredSections(sections);
    } else {
      setFilteredSections(
        sections.filter((section) =>
          section.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, sections]);

  if (user === undefined)
    return (
      <div className="items-center">
        <h1 className="text-9xl">Unauthenticated</h1>
        <p className="text-3xl">Please log in</p>
      </div>
    );

  return (
    <div className="heading space-y-3">
      <h1>Home</h1>
      <Searchbox onSearch={setSearchQuery} />
      {isLoading ? (
        <>
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </>
      ) : (
        filteredSections.map((section: SectionProps, id: number) => (
          <SectionItem
            key={id}
            section={section}
            user={user!}
            refreshSection={fetchData}
          />
        ))
      )}
      {filteredSections.length === 0 && <p>No sections found</p>}
    </div>
  );
};

export default HomePage;
