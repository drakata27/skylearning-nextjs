import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { StarIcon } from "lucide-react";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import { DeckProps } from "@/types/deck";
import { useRouter } from "next/navigation";
import axios from "axios";
import BASE_URL from "@/lib/config";

const DeckItem = ({
  deck,
  refreshDeck,
  id,
}: {
  deck: DeckProps;
  refreshDeck: () => void;
  id: number;
}) => {
  const router = useRouter();

  const deleteDeck = async () => {
    try {
      await axios.delete(`${BASE_URL}/section/${id}/decks/${deck.deckId}`, {
        withCredentials: true,
      });
      refreshDeck();
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete deck ${deck.name}?`
    );

    if (confirmed) {
      deleteDeck();
    }
  };

  function handleOnClick(isDeleting: boolean) {
    if (isDeleting) {
      handleDelete();
    } else {
      router.push(`/section/${id}/decks/${deck.deckId}`);
    }
  }

  return (
    <Card className="mt-3 p-2 mb-4 cursor-pointer">
      <div onClick={() => handleOnClick(false)}>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{deck.name}</CardTitle>
            <div className="space-x-4">
              <EditButton url={`/section/${id}/decks/${deck.deckId}/edit`} />
              <DeleteButton handleOnClick={handleOnClick} />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="space-x-3">
          <StarIcon />
        </CardFooter>
      </div>
    </Card>
  );
};

export default DeckItem;
