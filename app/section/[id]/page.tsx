"use client";

import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import BASE_URL from "@/lib/config";
import { UserProps } from "@/types/user";
import { SectionProps } from "@/types/section";

interface PageProps {
  params: {
    id: string; // This matches the dynamic route
  };
}

const SectionDetail: FC<PageProps> = ({ params }) => {
  const [user, setUser] = useState<UserProps>();
  const [section, setSection] = useState<SectionProps>({
    id: 0,
    title: "undefined",
    subtitle: "undefined",
  });
  const [isLoading, setLoading] = useState(true);
  const { id } = params;

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
