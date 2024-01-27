'use client';

import React from "react";
import NextImage from "next/image";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image, NavbarMenuItem, NavbarMenu, NavbarMenuToggle, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { redirect } from 'next/navigation'
import { signOut } from "next-auth/react"

export default function SieveNavbar() {

      return (
        <Navbar 
        isBordered
        shouldHideOnScroll >
          <div
            className="hover:cursor-pointer hover:opacity-75"
            onClick={() => redirect('/dashboard')}
          >
            <NavbarBrand>
                <Image       
                  as={NextImage}
                  src="/sieve_logo_2.png" 
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
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat" className="text-mono-light-300">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger"
                onClick={() => signOut({
                  callbackUrl: "/login",
                  redirect: true
                })}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
      );
}
