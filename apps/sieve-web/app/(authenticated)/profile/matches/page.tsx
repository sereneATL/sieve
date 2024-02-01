'use client';
import { Spinner} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { trpc } from "@/sieve-web/app/trpc";
import { UserProfile } from "@/sieve-web/types/types";
import MatchCard from "./card";


export default function Dashboard() {
  const { data: session } = useSession();
  const [matches, setMatches] = useState<UserProfile[]>();
  const router = useRouter();


  useEffect(() => {
    if (session?.user?.email){
      trpc.getSuccessfulMatches
      .query({ email: session?.user?.email})
      .then((response) => {
        setMatches(response.data)
      });
    }
  }, [session?.user?.email])

  return (
    <>
        <div className="flex flex-col gap-4 w-full items-center">
            <h2 className="text-[#a20f0f] lg:text-3xl text-xl font-head flex flex-row gap-3 mb-2">
                my matches
                <FaHeart className="mt-1"/>
            </h2>
        {
        session?.user && matches ? 
            (
                matches.map((match) => 
                    <MatchCard data={match} key={`${match.id}${Math.random()}`}/>
                )
            ) : (
            <div className="flex flex-col gap-1 items-center justify-center w-full">
                <Spinner />
            </div>
            )
        }
        </div>
    </>
  )
}
