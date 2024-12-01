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
import { Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const SectionItem = ({
  section,
  user,
  refreshSection,
}: {
  section: SectionProps;
  user: UserProps;
  refreshSection: () => void;
}) => {
  const router = useRouter();
  const deleteSection = async () => {
    try {
      await axios.delete(`${BASE_URL}/section/${section.id}`, {
        withCredentials: true,
      });
      refreshSection();
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete section ${section.title}?`
    );

    if (confirmed) {
      deleteSection();
    }
  };

  function handleOnClick(isDeleting: boolean) {
    if (isDeleting) {
      handleDelete();
    } else {
      router.push(`/section/${section.id}`);
    }
  }

  return (
    <Card className="mt-3 p-2 mb-4 cursor-pointer">
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

      <div className="space-x-4">
        <Button onClick={() => handleOnClick(true)}>
          <Trash />
        </Button>

        <Button onClick={() => router.push(`/section/${section.id}/edit`)}>
          <Pen />
        </Button>
      </div>
    </Card>
  );
};

export default SectionItem;
