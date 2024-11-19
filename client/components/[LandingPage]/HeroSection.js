"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <div className="h-[90vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-semibold text-6xl md:text-7xl">
            One <span className="text-primary">App</span> <br />
            <span>Endless</span>
          </h1>
          <div className="font-semibold text-6xl md:text-7xl">
            <Typewriter
              className=""
              options={{
                strings: [
                  `<span style="color: #FF7F50;">Productivity.<span/>`,
                  `<span style="color: #FF7F50;">Efficiency.<span/>`,
                  `<span style="color: #FF7F50;">Growth.<span/>`,
                ],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 100,
                cursorClassName: "text-primary",
              }}
            />
          </div>
          <Link href={"/dashboard"}>
            <div className="mt-20">
              <button className="px-12 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 hover:scale-110 transition-all duration-150">
                Get Started
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
