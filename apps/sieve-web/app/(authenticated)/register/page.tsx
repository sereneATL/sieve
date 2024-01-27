"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import { IoMdHeart } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { RiSpotifyLine } from "react-icons/ri";

export default function Dashboard(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-bubblegum to-mono-light-100">
      dashboard
    </div>
  );
}
