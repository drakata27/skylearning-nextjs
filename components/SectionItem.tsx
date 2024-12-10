"use client";

import React, { useState } from "react";
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
import axios from "axios";
import BASE_URL from "@/lib/config";
import { useRouter } from "next/navigation";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import Alert from "./Alert";

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
  const [isAlertOpen, setAlertOpen] = useState(false);

  const deleteSection = async () => {
    try {
      await axios.delete(`${BASE_URL}/section/${section.id}`, {
        withCredentials: true,
      });
      refreshSection();
    } catch (e) {
      console.error("Error deleting section:", e);
    }
  };

  const handleConfirmDelete = () => {
    setAlertOpen(false);
    deleteSection();
  };

  const handleCancelDelete = () => {
    setAlertOpen(false);
  };

  const handleDeleteClick = () => {
    setAlertOpen(true);
  };

  const handleOnClick = (isDeleting: boolean) => {
    if (isDeleting) {
      handleDeleteClick();
    } else {
      router.push(`/section/${section.id}`);
    }
  };

  return (
    <>
      <Card className="mt-3 p-2 mb-4 cursor-pointer">
        <div onClick={() => handleOnClick(false)}>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{section.title}</CardTitle>
              <div className="space-x-4">
                <EditButton url={`/section/${section.id}/edit`} />
                <DeleteButton handleOnClick={() => handleOnClick(true)} />
              </div>
            </div>
            <CardDescription>{section.subtitle}</CardDescription>
          </CardHeader>
          <CardFooter className="space-x-3">
            <ProfileImage user={user} />
            <p>By {user.name}</p>
          </CardFooter>
        </div>
      </Card>
      {isAlertOpen && (
        <Alert
          open={isAlertOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title="Delete Section?"
          description={`Are you sure you want to delete section ${section.title}?`}
        />
      )}
    </>
  );
};

export default SectionItem;
