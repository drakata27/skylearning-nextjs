"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserProps } from "@/types/user";
import { SectionProps } from "@/types/section";
import BASE_URL from "@/lib/config";

const SectionDetail = () => {
  const [user, setUser] = useState<UserProps>({
    id: 0,
    sub: 0,
    name: "undefined",
  });
  const [section, setSection] = useState<SectionProps>({
    id: 0,
    title: "Nothing fetched",
    subtitle: "Nothing",
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user`, { withCredentials: true }),
          axios.get(`${BASE_URL}/section/${section.id}`, {
            withCredentials: true,
          }),
        ]);
        setUser(userRes.data);
        setSection(sectionsRes.data);

        console.log(sectionsRes);
        console.log(userRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section.id]);

  return (
    <div>
      <h1 className="heading">{section.title}</h1>
      <h1 className="heading">{section.subtitle}</h1>
      <h1 className="heading">{user.name}</h1>
    </div>
  );
};

export default SectionDetail;
