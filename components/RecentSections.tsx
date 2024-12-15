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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RecentSections;
