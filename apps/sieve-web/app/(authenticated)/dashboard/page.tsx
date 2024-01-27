"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import { IoMdHeart } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { RiSpotifyLine } from "react-icons/ri";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="xl:m-16 sm:m-10 mt-6 flex items-center ">
      <div className="bg-mono-light-100 sm:rounded-xl w-full p-20">
        dashboard
      </div>
    </div>
  );
}
