"use client";

import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center md:flex-row h-screen bg-gradient-to-b from-bubblegum to-mono-light-100">
      <div className="flex flex-col gap-20 w-1/2 items-center">
        <Image
          isZoomed
          src="../assets/page_not_found.svg"
          alt="page not found"
        />
        <div className="flex flex-col gap-4 w-1/2 justify-center items-center">
          <p className="font-head sm:text-md md:text-lg lg:text-3xl text-sieve-dark-red">
            Page Not Found
          </p>
          <Button
            color="primary"
            size="lg"
            variant="ghost"
            startContent={<IoMdArrowBack />}
            onClick={() => router.back()}
          >
            go back
          </Button>
        </div>
      </div>
    </div>
  );
}
