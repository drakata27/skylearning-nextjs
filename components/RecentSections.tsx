import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionItem from "./SectionItem";
import { UserProps } from "@/types/user";
import { SectionProps } from "@/types/section";
import { SectionSummary } from "./chartData/SectionSummary";

interface RecentSectionsProps {
  fetchSections: () => void;
  user: UserProps;
  sections: SectionProps[];
}

const RecentSections = ({
  fetchSections,
  sections,
  user,
}: RecentSectionsProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {sections.map((section, id: number) => (
          <CarouselItem key={id}>
            <SectionItem
              section={section}
              user={user}
              refreshSection={fetchSections}
            />
            <h1 className="heading mb-4">Summary for {section.title}</h1>
            <SectionSummary
              notesCount={section.notes!.length}
              decksCount={section.decks!.length}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RecentSections;
