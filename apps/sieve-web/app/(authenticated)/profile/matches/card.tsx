import React from "react";
import {Card, CardBody, Image, Textarea} from "@nextui-org/react";
import { UserProfile } from "@/sieve-web/types/types";

export default function MatchCard(props: {data: UserProfile, key: string}) {

  return (
    <Card
      key={props.key}
      isBlurred
      className="border-none bg-background/60 sm:bg-[#ffd8e1]/60 w-full max-w-[500px] h-auto"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-start gap-4">
            <div className="w-3/5 p-1">
              <Image
                alt="profile picture"
                className="object-cover"
                height={200}
                shadow="md"
                src={props.data.profilePicture}
                width="100%"
              />
            </div>
            <div className="flex flex-col gap-2 w-full mt-3 text-[#D48F9F] lg:text-md text-sm font-body">
              <p className="font-head font-semibold text-black lg:text-xl text-lg">{props.data.name}</p>
              <p>{props.data.email}</p>
              <div className="w-full flex flex-row gap-8">
                  <p>{props.data.age}</p>
                  <p>{props.data.gender.toLowerCase()}</p>
              </div>
              <p >
                {props.data.personalityType.toLowerCase()}
              </p>
            </div>
          </div>
        <div className="flex flex-col w-full">
            <div className="mt-3 flex gap-1 px-4 text-base">
                {(props.data.musicPreferences?.topGenres.slice(0,6)!).map((item) => (
                  <p key={item} className="rounded-[7px] bg-[#A20F0F] px-4 py-2">
                    {item}
                  </p>
                ))}
              </div>
              <Textarea
                label="Top artists"
                isDisabled
                className='mt-5 px-2 font-body'
                value={props.data.musicPreferences?.topArtists.slice(0,10).join(', ')}
              />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
