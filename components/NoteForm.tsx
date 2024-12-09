"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import axios from "axios";
import BASE_URL from "@/lib/config";
import { useRouter } from "next/navigation";
import { NoteProps } from "@/types/note";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";

const NoteForm = ({
  isEditing = false,
  id,
  noteid,
}: {
  isEditing: boolean;
  id: string;
  noteid?: string;
}) => {
  const router = useRouter();
  const { theme } = useTheme();

  const [note, setNote] = useState<NoteProps>({
    noteId: 0,
    title: "",
    content: "",
    section_id: 0,
  });

  useEffect(() => {
    const fetchNote = async () => {
      if (isEditing) {
        try {
          const noteRes = await axios.get(
            `${BASE_URL}/section/${id}/note/${noteid}`,
            {
              withCredentials: true,
            }
          );
          setNote(noteRes.data);
        } catch (error) {
          console.error("Error fetching ntoe data:", error);
        }
      }
    };
    fetchNote();
  }, [id, noteid, isEditing]);

  const createNote = async () => {
    const noteData = {
      title: note.title as string,
      content: note.content as string,
      section_id: id,
    };

    try {
      await axios.post(`${BASE_URL}/section/${id}/note`, noteData, {
        withCredentials: true,
      });
      router.push(`/section/${id}`);
    } catch (e) {
      window.alert(`Please check your content: ${e}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const updateNote = async () => {
    const noteData = {
      title: note.title as string,
      content: note.content as string,
      section_id: id,
    };

    try {
      await axios.put(`${BASE_URL}/section/${id}/note/${noteid}`, noteData, {
        withCredentials: true,
      });
      router.push(`/section/${id}/note/${noteid}`);
    } catch (e) {
      window.alert(`Error updating note: ${e}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (note.title.length === 0 && note.content.length === 0) {
      alert("Note title and content cannot be empty");
    } else {
      if (isEditing) {
        await updateNote();
      } else {
        await createNote();
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
        value={note.title}
        onChange={handleInputChange}
        placeholder="Add title..."
      />
      <div data-color-mode={theme === "light" ? "light" : "dark"}>
        <MDEditor
          value={note.content}
          onChange={(value) =>
            setNote((prevNote) => ({
              ...prevNote,
              content: value || "",
            }))
          }
          preview="edit"
          autoCapitalize="none"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Add your content",
            autoCapitalize: "none",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
      </div>

      <Button type="submit">
        {isEditing ? "Save" : "Add"} <Send />
      </Button>
    </form>
  );
};

export default NoteForm;
