import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";

interface ProfileImageProps {
  src?: string;
  id: number;
}

const ProfileImage = ({ src, id }: ProfileImageProps) => {
  return (
    <Link href={`/user/${id}`}>
      <Avatar className="size-10 border">
        <AvatarImage src={src} />
        <AvatarFallback>
          <User className="mt-2" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileImage;
