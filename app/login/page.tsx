"use client";

import Oauth2Login from "@/components/Oauth2Login";
import React from "react";

const page = () => {
  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <Oauth2Login />
    </div>
  );
};

export default page;
