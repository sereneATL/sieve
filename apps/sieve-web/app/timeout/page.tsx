"use client";

import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center md:flex-row h-screen bg-gradient-to-b from-[#ffd8e1] to-white">
      <div className="flex flex-col gap-20 w-1/2 items-center">
        <Image
          isZoomed
          src="../assets/timeout.svg"
          alt="page not found"
        />
        <div className="flex flex-col gap-4 w-1/2 justify-center items-center">
          <p className="font-head text-md md:text-lg lg:text-3xl font-semibold text-[#a20f0f]">
            session timeout
          </p>
          <p className="font-head text-sm md:text-md lg:text-2xl text-[#a20f0f]">
            please sign in again
          </p>
          <Button
            color="primary"
            size="lg"
            variant="ghost"
            className="font-body"
            startContent={<IoMdArrowBack />}
            onClick={() => router.push('/login')}
          >
            sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
