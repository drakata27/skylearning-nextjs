"use client";

import { SkeletonCard } from "@/components/SkeletonCard";
import UserInfo from "@/components/UserInfo";
import BASE_URL from "@/lib/config";
import { UserProps } from "@/types/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<UserProps>({
    id: 0,
    avatar_url: "",
    name: "",
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/user`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((error) => console.log("Error: ", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Profile</h1>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <UserInfo
          id={user.id}
          name={user.name}
          avatar_url={user.avatar_url}
          bio={user.bio}
          followers={user.followers}
          following={user.following}
          location={user.location}
        />
      )}
    </div>
  );
};

export default Profile;
