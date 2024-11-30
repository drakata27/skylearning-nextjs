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
import { SectionProps } from "@/types/section";
import { Button } from "./ui/button";
import axios from "axios";
import BASE_URL from "@/lib/config";
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";

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
        console.log("Section deleted successfully!");
        console.log(res.data);
      })
      .catch((error) => console.log("Error: ", error));
  };

  const fetchSections = async () => {
    axios
      .delete(`${BASE_URL}/section`, {
        withCredentials: true,
      })
      .catch((error) => console.log("Error: ", error));
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete section ${section.title}?`
    );

    if (confirmed) {
      deleteSection();
      fetchSections();
    }
  };

  function handleOnClick(isDeleting: boolean) {
    if (isDeleting) {
      handleDelete();
    } else {
      redirect(`/section/${section.id}`);
    }
  }

  return (
    <Card className="mt-3 mb-4 cursor-pointer">
      <div onClick={() => handleOnClick(false)}>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          <CardDescription>{section.subtitle}</CardDescription>
        </CardHeader>
        <CardFooter className="space-x-3">
          <ProfileImage user={user} />
          <p>By {user.name}</p>
        </CardFooter>
      </div>
      <Button className="z-10" onClick={() => handleOnClick(true)}>
        <Trash />
      </Button>
    </Card>
  );
};

export default SectionItem;
