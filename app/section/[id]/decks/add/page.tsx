import DeckForm from "@/components/forms/DeckForm";
import React, { use } from "react";

const DeckAdd = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div className="container">
      <h1>Add Deck</h1>

      <DeckForm id={id} isEditing={false} />
    </div>
  );
};

export default DeckAdd;
