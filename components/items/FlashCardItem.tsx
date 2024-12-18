"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlashCardProps } from "@/types/flashCard";
import DeleteButton from "../buttons/DeleteButton";
import axios from "axios";
import BASE_URL from "@/lib/config";
import { toast } from "sonner";
import Popup from "../Popup";

const FlashCardItem = ({
  card,
  refreshCards,
  id,
  deckId,
}: {
  card: FlashCardProps;
  refreshCards: () => Promise<void>;
  id: number;
  deckId: string;
}) => {
  const [isAnswerVisible, setAnswerVisible] = useState(false);

  const toggleAnswerVisibility = () => {
    setAnswerVisible((prev) => !prev);
  };

  const deleteCard = async () => {
    await axios.delete(
      `${BASE_URL}/section/${id}/decks/${deckId}/flashcards/${card.cardId}`,
      { withCredentials: true }
    );
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete card ${card.question}?`);
    if (confirmed) {
      await deleteCard();
      toast("Card deleted successfully!");
      refreshCards();
    }
  };

  return (
    <div
      className="flex justify-center"
      onClick={() => toggleAnswerVisibility()}
    >
      <Card className="justify-center mt-3 p-2 cursor-pointer ">
        <CardHeader>
          <CardTitle>{card.question}</CardTitle>
          {isAnswerVisible ? (
            <CardDescription>{card.answer}</CardDescription>
          ) : (
            <p className="text-gray-500">👉 Reveal Answer</p>
          )}
        </CardHeader>
        <CardFooter className="space-x-3">
          <Popup
            cardId={card.cardId}
            id={String(id)}
            deckId={deckId}
            isEditing={true}
            btnTitle="Edit"
            refreshCards={refreshCards}
            url={`${BASE_URL}/section/${id}/decks/${deckId}/flashcards/${card.cardId}/edit`}
          />

          <DeleteButton handleOnClick={handleDelete} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default FlashCardItem;
