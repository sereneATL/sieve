'use client';
import { Spinner} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { trpc } from "@/sieve-web/app/trpc";
import { UserProfile } from "@/sieve-web/types/types";
import MatchCard from "./card";
import { toast } from "react-toastify";


export default function Page() {
  const { data: session } = useSession();
  const [matches, setMatches] = useState<UserProfile[]>();

  useEffect(() => {
    if (session?.user?.email){
      trpc.getSuccessfulMatches
      .query({ email: session?.user?.email})
      .then((response) => {
        setMatches(response.data)
      }).catch((error) => {
        toast.error(error.message)
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
        session?.user ? ( matches?.length ? 
                matches.map((match) => 
                    <MatchCard data={match} key={`${match.id}${Math.random()}`}/>
                )
             : 
             <div className="flex flex-col pt-20 text-[#a20f0f] font-head gap-2 items-center">
                <div>no successful matches yet</div>
                <div>keep swiping!</div>
                <FaHeart className="mt-1"/>
            </div>
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
