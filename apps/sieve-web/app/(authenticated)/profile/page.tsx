'use client';

import { Avatar, Button, Input, Select, SelectItem, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaHeart } from "react-icons/fa";
// import { trpc } from "@/sieve-web/app/trpc";
// import { UserProfilesRepository } from "@/server/modules/userProfiles/userProfiles.repository";

export default function Profile(): JSX.Element{

  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      // const response = await trpc.user.query({ email: session?.user?.email || ''});
      console.log(session?.user?.email)
    }
    if (session?.user?.email){
      getUser()
    }
  }, [session])

  const searchParams = useSearchParams()
 
  const edit = !!searchParams.get('edit')

  const onSubmit = () => {}
  
  return (
    <div className="w-full sm:w-2/3 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4 items-center"> 
        <h3 className="text-[#a20f0f] md:text-3xl text-md font-head">My Profile</h3>
        <Avatar
          isBordered
          isFocusable
          showFallback
          as="button"
          className="transition-transform sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
          color="secondary"
          name={session?.user?.name || ""}
          src={session?.user?.image || ""}
        />
      </div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 font-mono text-[#382a40]">
        <Input
            isDisabled
            type="name"
            label="Name"
            value={session?.user?.name ?? ''}
            className="w-full"
        />
        <Input
          isDisabled
          type="email"
          label="Email"
          value={session?.user?.email ?? ''}
          className="w-full"
        />

        <Input
          isDisabled
          type="input"
          label="Musical aura"
          value={''}
          className="w-full"
        />

        <div className="text-[#a20f0f] font-head mt-2 flex flex-row gap-2">
          <p>About me</p>
          <FaHeart className="mt-1"/>
        </div>

        <Select 
          label="Gender"
          isDisabled={!edit}
        >
          {['female', 'male'].map((gender, index) => (
            <SelectItem key={gender} value={index} className="text-[#382a40]">
              {gender}
            </SelectItem>
          ))
          }
        </Select>
        <Select 
          label="Age" 
          isDisabled={!edit}
        >
          {Array.from({ length: 63 }, (_, index) => index + 18).map((age) => (
            <SelectItem key={age} value={age} className="text-[#382a40]">
              {age.toString()}
            </SelectItem>
          ))
          }
        </Select>
        <Select 
          label="Personality type"
          isDisabled={!edit}
        >
          {['introvert', 'extrovert', 'ambivert'].map((gender, index) => (
            <SelectItem key={gender} value={index} className="text-[#382a40]">
              {gender}
            </SelectItem>
          ))
          }
        </Select>

        <div className="text-[#a20f0f] font-head mt-2 flex flex-row gap-2">
          <p>About my interests</p>
          <FaHeart className="mt-1"/>
        </div>
        <div className="flex flex-col gap-2">
          {edit && <>
            <p className="font-head text-[#e12323] text-sm flex flex-row gap-2">Speedfire round! Select all your interests!</p>
              <Select 
                label="Sports" 
                selectionMode="multiple"
                isDisabled={!edit}
              >
              {['football', 'basketball', 'tennis', 'cycling', 'running', 'swimming', 'volleyball', 'golf', 'soccer', 'martial arts', 'none'].map((sport, index) => (
                <SelectItem key={sport} value={index} className="text-[#382a40]">
                  {sport}
                </SelectItem>
              ))
              }
            </Select>
            <Select 
              label="Arts & Entertainment" 
              selectionMode="multiple"
              isDisabled={!edit}
            >
              {['painting', 'writing', 'photography', 'film/tv shows', 'music', 'theater', 'dance', 'sculpture', 'literature', 'poetry', 'none'].map((ae, index) => (
                <SelectItem key={ae} value={index} className="text-[#382a40]">
                  {ae}
                </SelectItem>
              ))
              }
            </Select>
            <Select 
              label="Outdoor Activities" 
              selectionMode="multiple"
              isDisabled={!edit}
            >
              {['hiking', 'camping', 'fishing', 'gardening', 'bird watching', 'rock climbing', 'bird watching', 'nature photography', 'backpacking', 'stargazing', 'none'].map((outdoorActivity, index) => (
                <SelectItem key={outdoorActivity} value={index} className="text-[#382a40]">
                  {outdoorActivity}
                </SelectItem>
              ))
              }
            </Select>
            <Select 
              label="Technology & Gaming" 
              selectionMode="multiple"
              isDisabled={!edit}
            >
              {['gaming', 'coding/programming', 'crypto', 'virtual reality (VR)', 'augmented reality (AR)', 'board games', 'app development', 'cybersecurity', 'robotics', 'tech gadgets', 'artificial intelligence', 'none'].map((tg, index) => (
                <SelectItem key={tg} value={index} className="text-[#382a40]">
                  {tg}
                </SelectItem>
              ))
              }
            </Select>
            <Select 
              label="Culinary Arts" 
              selectionMode="multiple"
              isDisabled={!edit}
            >
              {['cooking', 'baking', 'wine tasting', 'cafe hopping', 'grilling/barbecuing', 'food photography', 'recipe creation', 'international cuisine', 'healthy eating', 'home brewing', 'vegan/vegetarian cooking', 'none'].map((culArts, index) => (
                <SelectItem key={culArts} value={index} className="text-[#382a40]">
                  {culArts}
                </SelectItem>
              ))
              }
            </Select>
            <Select 
              label="Wellness & Fitness" 
              selectionMode="multiple"
              isDisabled={!edit}
            >
              {['yoga', 'meditation', 'running', 'crossfit', 'weightlifting', 'pilates', 'cycling', 'nutrition', 'zumba', 'mindfulness', 'none'].map((wf, index) => (
                <SelectItem key={wf} value={index} className="text-[#382a40]">
                  {wf}
                </SelectItem>
              ))
              }
            </Select>
            <Select 
              label="Other Hobbies" 
              selectionMode="multiple"
              isDisabled={!edit}
            >
              {['reading', 'journalling', 'dancing', 'travelling', 'volunteering', 'listening to music', 'none'].map((otherHobbies, index) => (
                <SelectItem key={otherHobbies} value={index} className="text-[#382a40]">
                  {otherHobbies}
                </SelectItem>
              ))
              }
            </Select>
          </>}
        </div>

        <div className="text-[#a20f0f] font-head mt-2 flex flex-row gap-2">
          <p>About my preferences</p>
          <FaHeart className="mt-1"/>
        </div>

        <Select 
          label="Romantic preferences" 
          isDisabled={!edit}
        >
          {['female', 'male', 'both'].map((gender, index) => (
            <SelectItem key={gender} value={index} className="text-[#382a40]">
              {gender}
            </SelectItem>
          ))
          }
        </Select>
        <Select 
          label="Preferred personality type"
          isDisabled={!edit}
        >
          {['introvert', 'extrovert', 'ambivert', 'no preference'].map((personality, index) => (
            <SelectItem key={personality} value={index} className="text-[#382a40]">
              {personality}
            </SelectItem>
          ))
          }
        </Select>
        <Select 
          label="I prefer someone with..."
          isDisabled={!edit}
        >
          {['similar music tastes', 'different music tastes', 'no preference'].map((musicTaste, index) => (
            <SelectItem key={musicTaste} value={index} className="text-[#382a40]">
              {musicTaste}
            </SelectItem>
          ))
          }
        </Select>
        <div className="flex flex-col gap-2">
          <p className="font-head text-[#a20f0f] text-sm mt-2 flex flex-row gap-2">Preferred age range</p>
          <div className="flex flex-row gap-4">
            <Select 
              label="Minimum" 
              isDisabled={!edit}
            >
              {Array.from({ length: 63 }, (_, index) => index + 18).map((age) => (
                <SelectItem key={age} value={age} className="text-[#382a40]">
                  {age.toString()}
                </SelectItem>
              ))
              }
            </Select>
            <p className="mt-2 text-3xl">-</p>
            <Select 
              label="Maximum" 
              isDisabled={!edit}
            >
              {Array.from({ length: 63 }, (_, index) => index + 18).map((age) => (
                <SelectItem key={age} value={age} className="text-[#382a40]">
                  {age.toString()}
                </SelectItem>
              ))
              }
            </Select>
          </div>
        </div>
      
        {!edit ||  
        <Button 
          color="primary"
          className="mt-4"  
        >
          Submit
        </Button> 
        }
      </form>
    </div>
  );
}
