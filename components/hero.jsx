"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4 mb-10">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="px-8 border-gray-400 text-gray-600 hover:border-gray-600">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper relative">
          <div ref={imageRef} className="hero-image transition-transform duration-500 ease-in-out">
            <Image
              src="/ban.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
