"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { FaGlobe } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { code: "en", name: "English" },
    { code: "id", name: "Indonesia" },
  ];

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <Image
            src="/images/sleep.svg"
            width={80}
            height={20}
            alt="AirbnbClone Logo"
            className="h-8 ml-[-20px]"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Partnership</Link>
        </NavbarItem>
        <NavbarItem>
          <Popover placement="bottom" showArrow key="blur" backdrop="blur">
            <PopoverTrigger>
              <Button isIconOnly variant="light" aria-label="Language">
                <FaGlobe />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <h3 className="text-sm font-bold mb-2">Select Language</h3>
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    color={selectedLanguage === lang.name ? "primary" : "default"}
                    variant="light"
                    fullWidth
                    className="justify-start mb-1"
                    onClick={() => setSelectedLanguage(lang.name)}
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
