import React, { useState } from "react";

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

interface PopupProps {
  btnTitle: string;
  url: string;
  refreshCards: () => Promise<void>;
}

const Popup = ({ btnTitle, url, refreshCards }: PopupProps) => {
  const [flashCard, setFlashCard] = useState<FlashCardProps>({
    question: "",
    answer: "",
    deckId: 0,
    cardId: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlashCard({ ...flashCard, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (flashCard.question.length === 0 && flashCard.answer.length === 0) {
      toast("Flash Card question or answer is too short");
    } else {
      await createFlashCard();
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
