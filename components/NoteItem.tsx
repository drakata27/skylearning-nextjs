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
          <div className="flex justify-between">
            <CardTitle>{note.title}</CardTitle>
            <div className="space-x-4">
              <Button
                className="bg-red-600"
                onClick={() => handleOnClick(true)}
              >
                <Trash />
              </Button>

              <Button className="bg-yellow-500">
                <Pen />
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
