"use client";

import BackButton from "@/components/buttons/BackButton";
import FlashCardItem from "@/components/items/FlashCardItem";
import BASE_URL from "@/lib/config";
import { DeckProps } from "@/types/deck";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FlashCardProps } from "@/types/flashCard";
import { toast } from "sonner";
import Popup from "@/components/Popup";

const DeckDetails = ({
  params,
}: {
  params: Promise<{ id: string; deckId: string }>;
}) => {
  const { id, deckId } = use(params);
  const [deck, setDeck] = useState<DeckProps>();
  const [flashCards, setFlashCards] = useState<FlashCardProps[]>([]);

  const refreshCards = async () => {
    axios
      .get(`${BASE_URL}/section/${id}/decks/${deckId}/flashcards`, {
        withCredentials: true,
      })
      .then((res) => setFlashCards(res.data))
      .catch((e) => {
        console.log(e);
        toast(`Error fetching flash card: ${e}`);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deckRes, cardRes] = await Promise.all([
          axios.get(`${BASE_URL}/section/${id}/decks/${deckId}`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/section/${id}/decks/${deckId}/flashcards`, {
            withCredentials: true,
          }),
        ]);

        setDeck(deckRes.data);
        setFlashCards(cardRes.data);
      } catch (e) {
        console.log(e);
        toast("Error fetching data");
      }
    };
    fetchData();
  }, [id, deckId]);

  return (
    <div className="mb-5 ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1 className="heading">{deck?.name}</h1>
      <h2 className="text-gray-500">{deck?.description}</h2>
      <div className="flex justify-between mt-5">
        <BackButton url={`/section/${id}`} />
        <Popup
          refreshCards={refreshCards}
          btnTitle="Add"
          url={`${BASE_URL}/section/${id}/decks/${deckId}/flashcards`}
        />
      </div>
      <div className="flex justify-center mb-[200px]">
        <Carousel>
          <CarouselContent>
            {flashCards.map((card, id) => (
              <CarouselItem key={id}>
                <FlashCardItem card={card} refreshCards={refreshCards} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default DeckDetails;
