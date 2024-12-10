import BASE_URL from "@/lib/config";
import Image from "next/image";
import React from "react";

const GoogleIcon = () => {
  return (
    <Image
      className="hover:cursor-pointer"
      src="/images/google-logo.webp"
      alt="google logo"
      width={30}
      height={30}
      onClick={() =>
        (window.location.href = `${BASE_URL}/oauth2/authorization/google`)
      }
    />
  );
};

export default GoogleIcon;
