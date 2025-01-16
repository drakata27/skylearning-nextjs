"use client";

import BASE_URL from "@/lib/config";
import { Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import GoogleIcon from "./GoogleIcon";
import { UserProps } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Oauth2Login = () => {
  const [user, setUser] = useState<UserProps>();
  const [visible, setVisible] = useState(false);
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
      .catch((e) => {
        console.log("Error fetching user", e);
        return;
      });
  }, [router, user]);

  if (user === undefined) return <div>Loading...</div>;

  return (
    <Card className="flex flex-col items-center justify-center ">
      <form className="space-y-4 mt-5 flex flex-col items-center justify-center">
        <Input placeholder="Email" />
        <Input placeholder="Password" type={visible ? "text" : "password"} />

        <div className="flex space-x-2">
          <p>Show password</p>
          <input type="checkbox" onClick={() => setVisible(() => !visible)} />
        </div>
        <Button onSubmit={() => alert("Not implemented yet!")}>Login</Button>
      </form>
      <CardHeader>
        <h1 className="heading">Or</h1>
      </CardHeader>
      <CardContent className="flex justify-center space-x-5">
        <CardContent>
          <Github
            className="hover:cursor-pointer"
            onClick={() =>
              (window.location.href = `${BASE_URL}/oauth2/authorization/github`)
            }
          />
        </CardContent>

        <CardContent>
          <GoogleIcon />
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Oauth2Login;
