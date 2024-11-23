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

const UserInfo = ({ user }: { user: UserProps }) => {
  return (
    <Card className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <CardHeader>
        <CardTitle className="flex mb-5 ">
          <div className="flex-1">
            <Avatar className="size-20 border mr-4">
              <AvatarImage
                src={user.avatar_url ? user.avatar_url : user.picture}
              />
              <AvatarFallback>
                <User className="mt-2" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-5 flex-1 items-">
            <h2>{user.name}</h2>
            <h2 className="font-normal">
              Email: {user.email ? user.email : "Hidden"}
            </h2>

            {user.followers ? (
              <div className="flex  space-x-5">
                <div className="flex-col space-y-2">
                  <p className="text-center font-normal">Followers</p>
                  <p className="text-center text-sm text-gray-400">
                    {user.followers}
                  </p>
                </div>

                <div className="flex-col space-y-2">
                  <p className="text-center font-normal">Following</p>
                  <p className="text-center text-sm text-gray-400">
                    {user.following}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </CardTitle>
        <CardDescription>{user.bio ? user.bio : "No Bio"}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="flex">
          <PinIcon />
          {user.location ? user.location : "No location specified"}
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;
