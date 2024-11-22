import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProps } from "@/types/user";
import ProfileImage from "./ProfileImage";
import Link from "next/link";

interface SectionItemProps {
  title: string;
  subtitle: string;
  user: UserProps;
  id: number;
}

const SectionItem = ({ title, subtitle, user, id }: SectionItemProps) => {
  return (
    <Link href={`/${id}`}>
      <Card className="mt-3 mb-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="space-x-3">
          <ProfileImage src={user?.avatar_url} id={user.id} />
          <p>By {user.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SectionItem;
