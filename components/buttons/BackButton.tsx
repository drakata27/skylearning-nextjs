import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

const BackButton = ({ url }: { url: string }) => {
  const router = useRouter();

  return (
    <Button
      className="bg-red-500 hover:bg-red-700"
      onClick={(e) => {
        e.stopPropagation();
        router.push(url);
      }}
    >
      <ArrowBigLeft />
    </Button>
  );
};

export default BackButton;
