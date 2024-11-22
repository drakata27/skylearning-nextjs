import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionItemProps {
  title: string;
  subtitle: string;
  user: string;
}

const SectionItem = ({ title, subtitle, user }: SectionItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p>By {user}</p>
      </CardFooter>
    </Card>
  );
};

export default SectionItem;
