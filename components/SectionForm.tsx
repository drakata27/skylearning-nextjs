"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { SectionProps } from "@/types/section";
import { UserProps } from "@/types/user";
import axios from "axios";
import BASE_URL from "@/lib/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SectionForm = ({
  isEditing = false,
  id,
}: {
  isEditing: boolean;
  id: string;
}) => {
  const router = useRouter();

  const [section, setSection] = useState<SectionProps>({
    id: 0,
    title: "",
    subtitle: "",
    userId: 0,
  });

  const [user, setUser] = useState<UserProps>({
    id: 0,
    sub: 0,
    name: "No name",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(`${BASE_URL}/user`, {
          withCredentials: true,
        });
        setUser(userRes.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchSection = async () => {
      if (isEditing) {
        try {
          const sectionRes = await axios.get(`${BASE_URL}/section/${id}`, {
            withCredentials: true,
          });
          setSection(sectionRes.data);
        } catch (error) {
          console.error("Error fetching section data:", error);
        }
      }
    };

    fetchUser();
    fetchSection();
  }, [id, isEditing]);

  const createSection = async () => {
    const sectionData = {
      title: section.title as string,
      subtitle: section.subtitle as string,
      userId: user.id || user.sub,
    };

    try {
      await axios.post(`${BASE_URL}/section`, sectionData, {
        withCredentials: true,
      });
      router.push("/");
      toast("Section has been created.");
    } catch (e) {
      console.log(`Error creating section: ${e}`);
      toast(`Error creating section: ${e}`);
    }
  };

  const updateSection = async () => {
    const sectionData = {
      title: section?.title as string,
      subtitle: section?.subtitle as string,
      userId: section.userId,
    };

    try {
      await axios.put(`${BASE_URL}/section/${id}`, sectionData, {
        withCredentials: true,
      });
      router.push("/");
      toast("Section has been updated.");
    } catch (e) {
      console.log(`Error updating section: ${e}`);
      toast(`Error updating section: ${e}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (section.title.length === 0 && section.subtitle.length === 0) {
      alert("Section title or content is too short");
    } else {
      if (isEditing) {
        await updateSection();
      } else {
        await createSection();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border mt-5 space-y-4 p-5"
    >
      <Input
        name="title"
        value={section.title}
        onChange={handleInputChange}
        placeholder="Add title..."
      />
      <Input
        name="subtitle"
        value={section.subtitle}
        onChange={handleInputChange}
        placeholder="Add subtitle..."
      />

      <Button type="submit">
        {isEditing ? "Save" : "Add"} <Send />
      </Button>
    </form>
  );
};

export default SectionForm;
