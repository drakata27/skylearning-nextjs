"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { SectionProps } from "@/types/section";
import { UserProps } from "@/types/user";
import axios from "axios";
import BASE_URL from "@/lib/config";

const SectionForm = () => {
  const [section, setSection] = useState<SectionProps>();
  const [user, setUser] = useState<UserProps>({
    id: 0,
    sub: 0,
    name: "No name",
  });

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${BASE_URL}/user`, { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch((e) => console.log("Error fetching data", e));
    };
    fetchData();
  }, []);

  const createSection = async () => {
    const sectionData = {
      title: section?.title || "",
      subtitle: section?.subtitle || "",
      owner: user.id ? user.id : user.sub,
    };

    axios
      .post(`${BASE_URL}/section`, sectionData)
      .then((res) => console.log(res.data))
      .catch((e) => window.alert(`Error: ${e}`));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  const handleSubmit = () => {
    try {
      createSection();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="rounded-xl border mt-5 space-y-4 p-5"
    >
      <Input
        value={section?.title}
        onChange={handleInputChange}
        placeholder="Add title..."
      />
      <Input
        value={section?.subtitle}
        onChange={handleInputChange}
        placeholder="Add subtitle..."
      />
      <p>Author: {user.name}</p>
      <Button type="submit">
        Add <Send />
      </Button>
    </form>
  );
};

export default SectionForm;
