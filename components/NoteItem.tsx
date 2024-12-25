import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteProps } from "@/types/note";
import { useRouter } from "next/navigation";
import axios from "axios";
import BASE_URL from "@/lib/config";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import { NotebookIcon } from "lucide-react";

const NoteItem = ({
  note,
  refreshNote,
  id,
  isRecent,
}: {
  note: NoteProps;
  refreshNote: () => void;
  id?: number;
  isRecent: boolean;
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
      if (!isRecent) {
        router.push(`/section/${id}/note/${note.noteId}`);
      }
    }
  }

  return (
    <Card className="mt-3 p-2 mb-4 cursor-pointer">
      <div onClick={() => handleOnClick(false)}>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{note.title}</CardTitle>
            {!isRecent ? (
              <div className="space-x-4">
                <EditButton url={`/section/${id}/note/${note.noteId}/edit`} />
                <DeleteButton handleOnClick={handleOnClick} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </CardHeader>
        <CardFooter className="space-x-3">
          <NotebookIcon />
        </CardFooter>
      </div>
    </Card>
  );
};

export default NoteItem;
