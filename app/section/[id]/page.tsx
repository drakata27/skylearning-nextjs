"use client";

import axios from "axios";
import React, { use, useEffect, useState } from "react";
import BASE_URL from "@/lib/config";
import { UserProps } from "@/types/user";
import { SectionProps } from "@/types/section";

const SectionDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const [user, setUser] = useState<UserProps>();
  const [section, setSection] = useState<SectionProps>({
    id: 0,
    title: "undefined",
    subtitle: "undefined",
    userId: 0,
  });
  const [isLoading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user`, { withCredentials: true }),
          axios.get(`${BASE_URL}/section/${id}`, {
            withCredentials: true,
          }),
        ]);

        setUser(userRes.data);
        setSection(sectionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div>
      <h1 className="heading">{section.title}</h1>
      <h2 className="heading">{section.subtitle}</h2>
    </div>
  );
};

export default SectionDetail;
