"use client";
import { Button } from "@nextui-org/react";
import { SetStateAction } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export type SwipeButtonProps = {
  exit: (value: SetStateAction<number>) => void;
  removeCard: (id: number, action: "accept" | "reject") => void;
  id: number;
};

export default function SwipeButton({
  exit,
  removeCard,
  id,
}: SwipeButtonProps) {
  const handleSwipe = (action: "accept" | "reject") => {
    if (action === "reject") {
      exit(-200);
    } else if (action === "accept") {
      exit(200);
    }
    removeCard(id, action);
  };
  return (
    <div className="flex flex-row gap-[180px] absolute top-[580px]">
      <Button
        isIconOnly
        onClick={() => handleSwipe("reject")}
        color="default"
        className="w-16 h-16"
      >
        <MdOutlineCancel className="w-7 h-7" />
      </Button>
      <Button
        isIconOnly
        onClick={() => handleSwipe("accept")}
        className="bg-[#E12323] w-16 h-16 text-white"
      >
        <FaHeart className="w-6 h-6" />
      </Button>
    </div>
  );
}
