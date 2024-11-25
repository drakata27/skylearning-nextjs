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
import { Button } from "./ui/button";
import axios from "axios";
import BASE_URL from "@/lib/config";
import { Trash } from "lucide-react";

const SectionItem = ({
  section,
  user,
}: {
  section: SectionProps;
  user: UserProps;
}) => {
  const deleteSection = async () => {
    axios
      .delete(`${BASE_URL}/section/${section.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "PUT, POST, GET, DELETE, PATCH, OPTIONS"
        );
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    // <Link href={`/section/${section.id}`}>
    <Card className="mt-3 mb-4">
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
        <CardDescription>{section.subtitle}</CardDescription>
      </CardHeader>
      <CardFooter className="space-x-3">
        <ProfileImage user={user} />
        <p>By {user.name}</p>
      </CardFooter>
      <Button onClick={deleteSection}>
        <Trash />
      </Button>
    </Card>
    // </Link>
  );
};

export default SectionItem;
