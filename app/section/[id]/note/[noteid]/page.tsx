"use client";

import BASE_URL from "@/lib/config";
import { NoteProps } from "@/types/note";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

const NoteDetail = ({
  params,
}: {
  params: Promise<{ id: string; noteid: string }>;
}) => {
  const { id, noteid } = use(params);
  const [note, setNote] = useState<NoteProps>({
    noteId: 0,
    title: "None",
    content: "None",
    section_id: 0,
  });

  useEffect(() => {
    const fetchNote = async () => {
      axios
        .get(`${BASE_URL}/section/${id}/note/${noteid}`, {
          withCredentials: true,
        })
        .then((res) => setNote(res.data))
        .catch((e) => console.log(e));
    };
    fetchNote();
  }, [id, noteid]);

  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteDetail;
