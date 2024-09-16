"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const scrollToSearch = () => {
    const yOffset = -90;
    const element = document.getElementById("search");
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <BackgroundImage />
      <Overlay />
      <Content scrollToSearch={scrollToSearch} />
    </div>
  );
};

const BackgroundImage: React.FC = () => (
  <div className="absolute inset-0">
    <Image
      src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Background"
      fill
      style={{ objectFit: 'cover' }}
      priority
    />
  </div>
);

const Overlay: React.FC = () => (
  <div className="absolute inset-0 bg-black bg-opacity-50" />
);

const Content: React.FC<{ scrollToSearch: () => void }> = ({
  scrollToSearch,
}) => (
  <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
    <AnimationWrapper type="slideUp">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Find your next stay
      </h1>
    </AnimationWrapper>

    <AnimationWrapper type="slideUp" transition={{ delay: 0.2 }}>
      <p className="text-lg sm:text-xl mb-8">
        Search low prices on hotels, homes, and much more...
      </p>
    </AnimationWrapper>

    <AnimationWrapper type="slideUp" transition={{ delay: 0.4 }}>
      <Button color="primary" size="lg" onClick={scrollToSearch}>
        Explore Now
      </Button>
    </AnimationWrapper>
  </div>
);

export default HeroSection;
