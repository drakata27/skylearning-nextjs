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
import { SectionProps } from "@/types/section";

const SectionItem = ({
  section,
  user,
}: {
  section: SectionProps;
  user: UserProps;
}) => {
  return (
    <Link href={`/section/${section.id}`}>
      <Card className="mt-3 mb-4">
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          <CardDescription>{section.subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="space-x-3">
          <ProfileImage user={user} />
          <p>By {user.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SectionItem;
