"use client";

import BASE_URL from "@/lib/config";
import { NoteProps } from "@/types/note";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import markdownit from "markdown-it";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import EditButton from "@/components/buttons/EditButton";
import DeleteButton from "@/components/buttons/DeleteButton";

const NoteDetail = ({
  params,
}: {
  params: Promise<{ id: string; noteid: string }>;
}) => {
  const md = markdownit();
  const { theme } = useTheme();
  const router = useRouter();

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

  const parsedContent = md.render(note?.content || "");

  const deleteSection = async () => {
    try {
      await axios.delete(`${BASE_URL}/section/${id}/note/${noteid}`, {
        withCredentials: true,
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete section ${note.title}?`
    );

    if (confirmed) {
      deleteSection();
      router.push(`/section/${id}`);
    }
  };

  return (
    <div className="mt-4 ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <div className="flex justify-between">
        <BackButton url={`/section/${id}`} />

        <div className="flex space-x-3 mb-5">
          <EditButton url={`/section/${id}/note/${noteid}/edit`} />
          <DeleteButton handleOnClick={handleDelete} />
        </div>
      </div>
      <h1 className="heading mb-4">{note.title}</h1>
      {parsedContent ? (
        <div data-color-mode={theme === "dark" ? "dark" : "light"}>
          <MDEditor.Markdown
            source={parsedContent}
            className="p-5 rounded-xl"
          />
        </div>
      ) : (
        <p>No details provied</p>
      )}
    </div>
  );
};

export default NoteDetail;
