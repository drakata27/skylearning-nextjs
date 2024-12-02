import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteProps } from "@/types/note";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";

const NoteItem = ({ note }: { note: NoteProps }) => {
  function handleOnClick(isDeleting: boolean) {
    console.log("isDeleting,", isDeleting);
  }

  return (
    <Card className="mt-3 p-2 mb-4 cursor-pointer">
      <div onClick={() => handleOnClick(false)}>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardFooter className="space-x-3"></CardFooter>
      </div>

      <div className="space-x-4">
        <Button onClick={() => handleOnClick(true)}>
          <Trash />
        </Button>

        <Button>
          <Pen />
        </Button>
      </div>
    </Card>
  );
};

export default NoteItem;
