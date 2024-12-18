import { DeckProps } from "./deck";
import { NoteProps } from "./note";

export interface SectionProps {
  id: number;
  title: string;
  subtitle: string;
  userId: number;
  decks?: DeckProps[];
  notes?: NoteProps[];
}
