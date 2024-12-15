import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FlashCardProps } from "@/types/flashCard";
import axios from "axios";
import { toast } from "sonner";
import BASE_URL from "@/lib/config";

interface PopupProps {
  id?: string;
  deckId?: string;
  cardId?: number;
  btnTitle: string;
  url: string;
  refreshCards: () => Promise<void>;
  isEditing: boolean;
}

const Popup = ({
  btnTitle,
  url,
  refreshCards,
  isEditing,
  id,
  deckId,
  cardId,
}: PopupProps) => {
  const [flashCard, setFlashCard] = useState<FlashCardProps>({
    question: "",
    answer: "",
    deckId: 0,
    cardId: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchFlashCard = async () => {
      if (isEditing) {
        try {
          const noteRes = await axios.get(
            `${BASE_URL}/section/${id}/decks/${deckId}/flashcards/${cardId}`,
            {
              withCredentials: true,
            }
          );
          setFlashCard(noteRes.data);
        } catch (error) {
          console.error("Error fetching ntoe data:", error);
        }
      }
    };
    fetchFlashCard();
  }, [id, deckId, cardId, isEditing]);

  const createFlashCard = async () => {
    const flashCardData = {
      question: flashCard?.question as string,
      answer: flashCard?.answer as string,
    };
    try {
      axios.post(url, flashCardData, { withCredentials: true });
      toast("Flash Card has been created.");
      setIsOpen(false);
      window.location.reload();
    } catch (e) {
      console.log(`Error creating flash card: ${e}`);
      toast(`Error creating flash card: ${e}`);
    }
  };

  const updateFlashCard = async () => {
    const flashcardData = {
      question: flashCard.question,
      answer: flashCard.answer,
    };
    try {
      axios.put(
        `${BASE_URL}/section/${id}/decks/${deckId}/flashcards/${cardId}`,
        flashcardData,
        { withCredentials: true }
      );
      toast("Flashcard updated successfully");
      refreshCards();
    } catch (e) {
      console.log("Error updating flashcard", e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlashCard({ ...flashCard, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (flashCard.question.length === 0 && flashCard.answer.length === 0) {
      toast("Flash Card question or answer is too short");
    } else {
      if (isEditing) {
        await updateFlashCard();
      } else {
        await createFlashCard();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>{btnTitle}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{btnTitle} Flash Card</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <Input
            name="question"
            value={flashCard.question}
            onChange={handleInputChange}
            placeholder="question"
          />
          <Input
            name="answer"
            value={flashCard.answer}
            onChange={handleInputChange}
            placeholder="answer"
          />
          <Button>Done</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
