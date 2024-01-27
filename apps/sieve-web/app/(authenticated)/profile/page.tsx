'use client';

import { Avatar, Button, Input, Select, SelectItem, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaHeart } from "react-icons/fa";


export default function Profile(): JSX.Element {

  const { data: session } = useSession();

  const searchParams = useSearchParams()
 
  const edit = !!searchParams.get('edit')

  const onSubmit = () => {}
  
  return (
    <div className="w-full sm:w-2/3 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4 items-center"> 
        <h3 className="text-sieve-dark-red md:text-3xl text-md font-head">My Profile</h3>
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
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 font-mono text-mono-light-300">
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

        <div className="text-sieve-dark-red font-head mt-2 flex flex-row gap-2">
          <p>About you</p>
          <FaHeart className="mt-1"/>
        </div>

        <Select 
          label="Gender"
          isDisabled={!edit}
        >
          {['female', 'male'].map((gender, index) => (
            <SelectItem key={gender} value={index} className="text-mono-light-300">
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
            <SelectItem key={age} value={age} className="text-mono-light-300">
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
            <SelectItem key={gender} value={index} className="text-mono-light-300">
              {gender}
            </SelectItem>
          ))
          }
        </Select>

        <div className="text-sieve-dark-red font-head mt-2 flex flex-row gap-2">
          <p>About your preferences</p>
          <FaHeart className="mt-1"/>
        </div>

        <Select 
          label="Romantic preferences" 
          isDisabled={!edit}
        >
          {['female', 'male', 'both'].map((gender, index) => (
            <SelectItem key={gender} value={index} className="text-mono-light-300">
              {gender}
            </SelectItem>
          ))
          }
        </Select>
        <div className="flex flex-col gap-2">
          <p className="text-sieve-dark-red text-sm mt-2 flex flex-row gap-2">Preferred age range</p>
          <div className="flex flex-row gap-4">
            <Select 
              label="Minimum" 
              isDisabled={!edit}
            >
              {Array.from({ length: 63 }, (_, index) => index + 18).map((age) => (
                <SelectItem key={age} value={age} className="text-mono-light-300">
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
                <SelectItem key={age} value={age} className="text-mono-light-300">
                  {age.toString()}
                </SelectItem>
              ))
              }
            </Select>
          </div>
        </div>
        <Select 
          label="Preferred personality type"
          isDisabled={!edit}
        >
          {['introvert', 'extrovert', 'ambivert', 'no preference'].map((gender, index) => (
            <SelectItem key={gender} value={index} className="text-mono-light-300">
              {gender}
            </SelectItem>
          ))
          }
        </Select>
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
