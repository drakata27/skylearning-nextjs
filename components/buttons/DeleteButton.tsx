import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const DeleteButton = ({
  handleOnClick,
}: {
  handleOnClick: (isDeleting: boolean) => void;
}) => {
  return (
    <Button
      className="bg-red-600"
      onClick={(e) => {
        e.stopPropagation();
        handleOnClick(true);
      }}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;
