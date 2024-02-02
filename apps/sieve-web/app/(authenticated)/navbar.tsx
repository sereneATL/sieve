"use client";

import React from "react";
import NextImage from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Image,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SieveNavbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Navbar isBordered shouldHideOnScroll>
      <div
        className="hover:cursor-pointer hover:opacity-75"
        onClick={() => router.push("/dashboard")}
      >
        <NavbarBrand>
          <Image
            as={NextImage}
            src="/assets/sieve_logo_2.png"
            alt="Sieve Logo"
            width={160}
            height={100}
          />
        </NavbarBrand>
      </div>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              showFallback
              as="button"
              className="transition-transform"
              color="secondary"
              name={session?.user?.name || ""}
              size="sm"
              src={session?.user?.image || ""}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="text-[#382a40]"
          >
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              onClick={() => router.push("/profile")}
              textValue="profile"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="matches"
              onClick={() => router.push("/profile/matches")}
            >
              My Matches
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                  redirect: true,
                })
              }
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
