import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { UserProps } from "@/types/user";
import { PinIcon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserInfo = ({
  name,
  avatar_url,
  bio,
  followers,
  following,
  location,
}: UserProps) => {
  return (
    <Card className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <CardHeader>
        <CardTitle className="flex mb-5 ">
          <div className="flex-1">
            <Avatar className="size-20 border mr-4">
              <AvatarImage src={avatar_url} />
              <AvatarFallback>
                <User className="mt-2" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-5 flex-1 items-">
            <h2>{name}</h2>
            <div className="flex  space-x-5">
              <div className="flex-col space-y-2">
                <p className="text-center font-normal">Followers</p>
                <p className="text-center text-sm text-gray-400">{followers}</p>
              </div>

              <div className="flex-col space-y-2">
                <p className="text-center font-normal">Following</p>
                <p className="text-center text-sm text-gray-400">{following}</p>
              </div>
            </div>
          </div>
        </CardTitle>
        <CardDescription>{bio}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="flex">
          <PinIcon />
          {location}
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;
