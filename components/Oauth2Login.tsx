"use client";

import BASE_URL from "@/lib/config";
import { Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import GoogleIcon from "./GoogleIcon";
import { UserProps } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";

const Oauth2Login = () => {
  const [user, setUser] = useState<UserProps>();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        if (user) {
          router.push("/");
        }
      })
      .catch((e) => console.log("Error fetching user", e));
  }, [router, user]);

  if (user === undefined) return <div>Loading...</div>;

  return (
    <div className="rounded-xl">
      <h1 className="heading">Please login</h1>
      <div className="flex justify-start mt-4 space-x-5">
        <Github
          className="hover:cursor-pointer"
          onClick={() =>
            (window.location.href = `${BASE_URL}/oauth2/authorization/github`)
          }
        />

        <GoogleIcon />
      </div>
    </div>
  );
};

export default Oauth2Login;
