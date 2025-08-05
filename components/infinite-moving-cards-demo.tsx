"use client";

import React from "react";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
      <h2
        className="text-3xl font-bold mb-1"
        style={{
          color: '#3498ff',
          textShadow: '0 2px 8px #eaf6ff',
        }}
      >
        Featured Projects / Clients
      </h2>
      <div className="text-base text-black mb-4" style={{textShadow: '0 1px 4px #eaf6ff'}}>
        These are some of our projects and clients we have worked with.
      </div>

      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "We had the privilege to work on the full sound system installation and live audio engineering for JSL Church. Their team was a pleasure to collaborate with, and the results were outstanding.",
    name: "JSL Church",
    title: "Audio System Installation",
  },
  {
    quote:
      "Our studio handled the mixing, mastering, and event sound for Ketena 2 Muluwengel Church. The project was a great success and the feedback from the congregation was amazing.",
    name: "Ketena 2 Muluwengel Church",
    title: "Audio Mixing & Mastering",
  },
  {
    quote:
      "We provided audio production and technical support for The An. Their events always push us to deliver our best work!",
    name: "The An",
    title: "Audio Production & Support",
  },
  {
    quote:
      "From system upgrades to live event support, we’ve worked with many organizations to elevate their sound experience. We’re proud to have partnered with so many dedicated teams.",
    name: "Various Churches & Companies",
    title: "Audio System Upgrades",
  },
  {
    quote:
      "Our portfolio includes projects for schools, churches, and businesses across the region. Every project is a new opportunity to deliver quality sound.",
    name: "And More...",
    title: "Diverse Audio Solutions",
  },
];
