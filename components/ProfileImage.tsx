import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserProps } from "@/types/user";
import { redirect } from "next/navigation";

const ProfileImage = ({ user }: { user: UserProps }) => {
  function redirectToProfile() {
    redirect(`/user/${user.id ? user.id : user.sub}`);
  }
  return (
    <div className="cursor-pointer" onClick={redirectToProfile}>
      <HoverCard>
        <HoverCardTrigger>
          <Avatar className="size-10 border">
            <AvatarImage
              src={user.avatar_url ? user.avatar_url : user.picture}
            />
            <AvatarFallback>
              <User className="mt-2" />
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent>
          <h1>{user.name}</h1>
          <h1>{user.email ? user.email : ""}</h1>
          <p className="text-sm text-gray-500">{user.bio}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ProfileImage;
