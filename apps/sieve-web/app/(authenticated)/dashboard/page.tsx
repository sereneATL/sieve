'use client';
import { Button, Image} from "@nextui-org/react";
import { redirect } from 'next/navigation'
import { FaHeart } from "react-icons/fa";

export default function Dashboard() {
  

  return (
    <div className="flex flex-col gap-20 sm:w-1/2 w-full items-center">
      <Image
        isZoomed
        src="../assets/filter_pic.svg"
        alt="page not found"
      />
      <div className="flex flex-col gap-4 w-1/2 justify-center items-center">
        <Button
          color="primary"
          size="lg"
          endContent={<FaHeart />}
          onClick={() => redirect('/discover')}
        >
          start sifting your matches
        </Button>
      </div>
    </div>
  );
}
