import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteProps } from "@/types/note";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BASE_URL from "@/lib/config";

const NoteItem = ({
  note,
  refreshNote,
  id,
}: {
  note: NoteProps;
  refreshNote: () => void;
  id: number;
}) => {
  const router = useRouter();

  const deleteNote = async () => {
    try {
      await axios.delete(`${BASE_URL}/section/${id}/note/${note.noteId}`, {
        withCredentials: true,
      });
      refreshNote();
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete note ${note.title}?`
    );

    if (confirmed) {
      deleteNote();
    }
  };

  function handleOnClick(isDeleting: boolean) {
    if (isDeleting) {
      handleDelete();
    } else {
      router.push(`/section/${id}/note/${note.noteId}`);
    }
  }

  return (
    <Card className="mt-3 p-2 mb-4 cursor-pointer">
      <div onClick={() => handleOnClick(false)}>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{note.title}</CardTitle>
            <div className="space-x-4">
              <Button
                className="bg-yellow-500"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/section/${id}/note/${note.noteId}/edit`);
                }}
              >
                <Pen />
              </Button>

              <Button
                className="bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnClick(true);
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="space-x-3"></CardFooter>
      </div>
    </Card>
  );
};

export default NoteItem;
