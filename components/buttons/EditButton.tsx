import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Pen } from "lucide-react";

const EditButton = ({ url }: { url: string }) => {
  const router = useRouter();
  return (
    <Button
      className="bg-yellow-500"
      onClick={(e) => {
        e.stopPropagation();
        router.push(url);
      }}
    >
      <Pen />
    </Button>
  );
};

export default EditButton;
