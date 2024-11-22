import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserProps } from "@/types/user";

const ProfileImage = ({ id, name, bio, avatar_url }: UserProps) => {
  return (
    <Link href={`/user/${id}`}>
      <HoverCard>
        <HoverCardTrigger>
          <Avatar className="size-10 border">
            <AvatarImage src={avatar_url} />
            <AvatarFallback>
              <User className="mt-2" />
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent>
          <h1>{name}</h1>
          <p className="text-sm text-gray-500">{bio}</p>
        </HoverCardContent>
      </HoverCard>
    </Link>
  );
};

export default ProfileImage;
