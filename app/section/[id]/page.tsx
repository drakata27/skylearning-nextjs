"use client";

import axios from "axios";
import React, { useEffect, useState, use } from "react";
import BASE_URL from "@/lib/config";
import { UserProps } from "@/types/user";
import { SectionProps } from "@/types/section";
import NoteItem from "@/components/NoteItem";
import { NoteProps } from "@/types/note";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Searchbox from "@/components/Searchbox"; // Import Searchbox component
import BackButton from "@/components/buttons/BackButton";
import { NotebookPenIcon, StarIcon } from "lucide-react";
import { DeckProps } from "@/types/deck";
import DeckItem from "@/components/items/DeckItem";

const SectionDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProps>();
  const [section, setSection] = useState<SectionProps>({
    id: 0,
    title: "",
    subtitle: "",
    userId: 0,
  });
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [decks, setDecks] = useState<DeckProps[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]);
  const [filteredDecks, setFilteredDecks] = useState<DeckProps[]>([]);
  const { id } = use(params);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchNotes = async () => {
    axios
      .get(`${BASE_URL}/section/${id}/note`, {
        withCredentials: true,
      })
      .then((res) => setNotes(res.data))
      .catch((e) => console.log(e));
  };
  const fetchDecks = async () => {
    axios
      .get(`${BASE_URL}/section/${id}/decks`, {
        withCredentials: true,
      })
      .then((res) => setDecks(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user`, { withCredentials: true }),
          axios.get(`${BASE_URL}/section/${id}`, {
            withCredentials: true,
          }),
        ]);

        const [noteRes, deckRes] = await Promise.all([
          axios.get(`${BASE_URL}/section/${id}/note`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/section/${id}/decks`, {
            withCredentials: true,
          }),
        ]);

        setUser(userRes.data);
        setSection(sectionsRes.data);
        setNotes(noteRes.data);
        setDecks(deckRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log("User", user?.name);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredNotes(notes);
      setFilteredDecks(decks);
    } else {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setFilteredDecks(
        decks.filter(
          (deck) =>
            deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deck.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, notes, decks]);
  return (
    <div className="container">
      <div className="space-y-3">
        <h1 className="heading">{section.title}</h1>
        <h2 className="text-gray-500">{section.subtitle}</h2>
      </div>

      <div className="mt-3">
        <div className="flex justify-between">
          <BackButton url={"/"} />

          <div className="space-x-5">
            <Button
              onClick={() => router.push(`/section/${section.id}/decks/add`)}
            >
              <StarIcon />
              Add Deck
            </Button>

            <Button onClick={() => router.push(`/section/${section.id}/add`)}>
              <NotebookPenIcon />
              Add Note
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Searchbox onSearch={setSearchQuery} />
        </div>
        <h1 className="heading mt-3">Notes</h1>
        {filteredNotes.length === 0 && <p>No notes found</p>}
        {filteredNotes.map((note, id: number) => (
          <NoteItem
            key={id}
            note={note}
            id={section.id}
            refreshNote={fetchNotes}
          />
        ))}

        <h1 className="heading">Decks</h1>
        {filteredDecks.length === 0 && <p>No decks found</p>}
        {filteredDecks.map((deck, id) => (
          <DeckItem
            key={id}
            deck={deck}
            id={section.id}
            refreshDeck={fetchDecks}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionDetail;
