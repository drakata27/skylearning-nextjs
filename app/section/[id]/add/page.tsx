"use client";

import NoteForm from "@/components/NoteForm";
import BASE_URL from "@/lib/config";
import { UserProps } from "@/types/user";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

const NoteAdd = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching deck data:", error);
      }
    };
    fetchUser();
  }, []);

  let userId = user?.id;

  if (user?.id === undefined) {
    userId = user?.sub;
  }

  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1 className="heading">New Note</h1>
      <NoteForm isEditing={false} id={id} userId={userId!} />
    </div>
  );
};

export default NoteAdd;
