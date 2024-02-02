"use client";
import { Spinner } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { trpc } from "@/sieve-web/app/trpc";
import { CardData, UserProfile } from "../../../types/types";
import { AnimatePresence } from "framer-motion";
import Card from "./card";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile>();
  const [cards, setCards] = useState<CardData[]>([]);
  const [cardsLeft, setCardsLeft] = useState<boolean>(true);
  const [cardsShown, setCardsShown] = useState<number[]>([]);
  const router = useRouter();

  const getMatches = (email: string) => {
    trpc.possibleMatches
      .query({ email })
      .then((response) => {
        if (cards.length === 0 && response.data.length) {
          const validCards = response.data.filter(
            (card) => !cardsShown.includes(card.id),
          ) as CardData[];
          console.log(validCards);
          setCards(cards.concat(validCards));
        } else {
          setCardsLeft(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (session?.user?.email && cards.length === 0) {
      trpc.user
        .query({ email: session?.user?.email })
        .then((response) => {
          if ("error" in response) router.push("/profile?edit=true");
        })
        .catch((error) => {
          toast.error(error.message);
        });
      if (session?.accessToken) {
        trpc.user
          .query({ email: session.user.email })
          .then((response) => {
            if ("data" in response) {
              setProfile(response.data as UserProfile);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
        getMatches(session?.user?.email);
      } else {
        signOut({
          callbackUrl: "/timeout",
          redirect: true,
        });
      }
    }
  }, [session?.user?.email, session?.accessToken]);

  const removeCard = (id: number, action: "accept" | "reject") => {
    setCardsShown((prev) => prev.concat(id));
    setCards((prev) => prev.slice(1));
    const input = {
      user1Id: profile!.id,
      user2Id: cards[0].id,
      matchScore: cards[0].matchScore,
    };

    if (action === "accept") {
      trpc.acceptMatch
        .mutate(input)
        .then(({ data }) => {
          if (data.matchStatus === "ACCEPTED")
            toast.success("you have a successful match!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      trpc.rejectMatch.mutate(input).catch((error) => {
        toast.error(error.message);
      });
    }
  };

  useEffect(() => {
    if (cardsLeft && cards.length === 0 && session?.user?.email) {
      getMatches(session?.user?.email);
    }
  }, [cards, cardsLeft, session?.user?.email, cards.length]);

  return (
    <>
      <div className="flex flex-col gap-20 w-full items-center">
        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className="text-[#a20f0f] lg:text-3xl text-xl font-head">
            swipe to sieve
          </h2>
          {session?.accessToken && cards ? (
            <div className="relative flex h-[680px] w-full items-center justify-center overflow-clip">
              <AnimatePresence>
                {cards && cardsLeft ? (
                  cards.map((card, index) => (
                    <Card
                      key={card.id + `${Math.random()}`}
                      data={card}
                      active={index === 0}
                      removeCard={removeCard}
                    />
                  ))
                ) : (
                  <div className="flex flex-col text-[#a20f0f] pb-[200px] font-head gap-2 items-center transition delay-300 duration-300 ease-in-out">
                    <div>no more matches left :&#40;</div>
                    <div>excessive swiping can be bad for you</div>
                    <div>come back tomorrow</div>
                    <FaHeart className="mt-1" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col pt-30 gap-1 items-center justify-center w-full">
              <Spinner size="lg" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
