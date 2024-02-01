'use client';
import { Button, Image, Spinner} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { trpc } from "@/sieve-web/app/trpc";


export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email){
      trpc.user
      .query({ email: session?.user?.email})
      .then((response) => {
        if ('error' in response ) router.push('/profile?edit=true')
      });
    }
  }, [session?.user?.email, router])

  return (
    session?.user ? 
    <>
        <div className="flex flex-col gap-20 sm:w-1/2 w-full items-center">
          <Image
            isZoomed
            src="../assets/filter_pic.svg"
            alt="filter matches"
            className="rounded"
          />
          <div className="flex flex-col gap-4 w-1/2 justify-center items-center">
            <Button
              color="primary"
              size="lg"
              endContent={<FaHeart />}
              onClick={() => router.push('/discover')}
            >
              start sifting your matches
            </Button>
          </div>
        </div>
    </> : <>
      <div className="flex flex-col gap-1 items-center justify-center w-full">
        <Spinner />
      </div>
    </>
  );
}
