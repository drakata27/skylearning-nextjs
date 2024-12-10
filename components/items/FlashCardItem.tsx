"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { FlashCardProps } from "@/types/flashCard";
import DeleteButton from "../buttons/DeleteButton";

const FlashCardItem = ({
  card,
  refreshCards,
}: {
  card: FlashCardProps;
  refreshCards: () => Promise<void>;
}) => {
  const [isAnswerVisible, setAnswerVisible] = useState(false);

  const toggleAnswerVisibility = () => {
    setAnswerVisible((prev) => !prev);
  };

  const handleDelete = () => console.log("Delete");

  return (
    <div
      className="flex justify-center"
      onClick={() => toggleAnswerVisibility()}
    >
      <Card className="justify-center mt-3 p-2 cursor-pointer w-[80%] h-[200%]">
        <CardHeader>
          <CardTitle>{card.question}</CardTitle>
          {isAnswerVisible ? (
            <CardDescription>{card.answer}</CardDescription>
          ) : (
            <p className="text-gray-500">Reveal Answer</p>
          )}
        </CardHeader>
        <CardFooter className="space-x-3">
          <Button>Edit</Button>

          <DeleteButton handleOnClick={handleDelete} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default FlashCardItem;
