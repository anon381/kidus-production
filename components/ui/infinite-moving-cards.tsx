"use client";

import { cn } from "../../lib/utils";
import React, { useLayoutEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    // Only duplicate if not already duplicated
    if (scrollerRef.current && scrollerRef.current.children.length === items.length) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
    }
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
    setStart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, direction, speed]);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden bg-transparent [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-[200%] shrink-0 flex-nowrap gap-4 py-4",
          start && "infinite-moving-cards-animate",
          isPaused && "[animation-play-state:paused]"
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "relative w-[420px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[#eaf6ff] px-12 py-8 md:w-[540px]"
            )}
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-base leading-[1.7] font-normal text-black">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.name}
                  </span>
                  {item.title && (
                    <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                      {item.title}
                    </span>
                  )}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
