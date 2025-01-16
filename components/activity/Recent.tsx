"use client";

import BASE_URL from "@/lib/config";
import { NoteProps } from "@/types/note";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteItem from "../NoteItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Recent = () => {
  const [notes, setNotes] = useState<NoteProps[]>();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/latest-notes`, { withCredentials: true })
      .then((res) => setNotes(res.data))
      .catch((e) => console.log(e));
  }, []);

  const fetchRecentNotes = async () => {
    axios
      .get(`${BASE_URL}/latest-notes`, {
        withCredentials: true,
      })
      .then((res) => setNotes(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1 className="heading">Recent Notes</h1>
      <Carousel>
        <CarouselContent>
          {notes?.map((note, id: number) => (
            <CarouselItem key={id}>
              <NoteItem
                note={note}
                refreshNote={fetchRecentNotes}
                isRecent={true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Recent;
