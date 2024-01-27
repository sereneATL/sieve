"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import { IoMdHeart } from "react-icons/io";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RiSpotifyLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {Spinner} from "@nextui-org/react";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    console.log(status)
    if (status === "authenticated") router.replace("/dashboard");
  }, [status])

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center md:flex-row h-screen bg-gradient-to-b from-bubblegum to-mono-light-100">
      ({status === 'unauthenticated' ? (<>
      <div className="flex flex-col gap-1 items-center justify-center lg:w-full w-1/2 m-20 sm:m-10">
        <Image
          src="/assets/sieve_logo_2.png"
          alt="Sieve Logo"
          width={400}
          height={100}
        />
        <p className="text-sieve-dark-red font-head text-xs sm:text-sm md:text-lg m-2">
          sifting musical connections
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-6 sm:w-4/5 w-full p-10 bg-mono-light-100 font-body rounded-lg">
          <h1 className="flex flex-col gap-4 text-2xl font-bold text-sieve-dark-red font-head">
            Welcome to Sieve!
            <IoMdHeart />
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-mono-light-300">start sifting now</p>
            <div className="flex flex-row gap-1 text-sieve-red mt-2">
              find your perfect match based on musical vibes
            </div>
          </div>
          <form className="mt-4">
            <Button
              size="lg"
              color="primary"
              className="text-mono-light-100 w-full font-body"
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);
                signIn("spotify", {
                  callbackUrl: "/dashboard",
                  redirect: true,
                });
              }}
              startContent={<RiSpotifyLine className="h-7 w-7" />}
            >
              continue with spotify
            </Button>
          </form>
        </div>
      </div>
      </>
      ) :
      <div className="flex flex-col gap-1 items-center justify-center w-full">
        <Spinner />
      </div>})
    </div> 
  );
}
