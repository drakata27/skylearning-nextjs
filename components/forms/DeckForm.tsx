"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import axios from "axios";
import BASE_URL from "@/lib/config";
import { useRouter } from "next/navigation";
import { DeckProps } from "@/types/deck";

const DeckForm = ({
  isEditing = false,
  id,
  deckId,
  userId,
}: {
  isEditing: boolean;
  id: string;
  deckId?: string;
  userId: number;
}) => {
  const router = useRouter();

  const [deck, setDeck] = useState<DeckProps>({
    deckId: 0,
    name: "",
    description: "",
    section_id: 0,
  });

  useEffect(() => {
    const fetchDeck = async () => {
      if (isEditing) {
        try {
          const deckRes = await axios.get(
            `${BASE_URL}/section/${id}/decks/${deckId}`,
            {
              withCredentials: true,
            }
          );
          setDeck(deckRes.data);
        } catch (error) {
          console.error("Error fetching deck data:", error);
        }
      }
    };

    fetchDeck();
  }, [id, deckId, isEditing]);

  const createDeck = async () => {
    const deckData = {
      name: deck.name as string,
      description: deck.description as string,
      section_id: id,
      userId: userId,
    };

    try {
      await axios.post(`${BASE_URL}/section/${id}/decks`, deckData, {
        withCredentials: true,
      });
      console.log(deckData);

      router.push(`/section/${id}`);
    } catch (e) {
      console.log(deckData);
      window.alert(`Please check your content: ${e}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeck({ ...deck, [name]: value });
  };

  const updateDeck = async () => {
    const deckData = {
      name: deck.name as string,
      content: deck.description as string,
      section_id: id,
    };

    try {
      await axios.put(`${BASE_URL}/section/${id}/decks/${deckId}`, deckData, {
        withCredentials: true,
      });
      router.push(`/section/${id}/decks/${deckId}`);
    } catch (e) {
      window.alert(`Error updating deck: ${e}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (deck.name.length === 0 && deck.description.length === 0) {
      alert("Deck title and content cannot be empty");
    } else {
      if (isEditing) {
        await updateDeck();
      } else {
        await createDeck();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border mt-5 space-y-4 p-5"
    >
      <Input
        name="name"
        value={deck.name}
        onChange={handleInputChange}
        placeholder="Add name..."
      />
      <Input
        name="description"
        value={deck.description}
        onChange={handleInputChange}
        placeholder="Describe your deck..."
      />

      <Button type="submit">
        {isEditing ? "Save" : "Add"} <Send />
      </Button>
    </form>
  );
};

export default DeckForm;
