"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-50 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center mx-auto text-5xl font-bold tracking-tight text-transparent md:text-8xl max-w-3xl"
      >
        Why Hire Me
      </motion.h1>
      
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(480); // default 30rem

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [children]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: contentWidth * 0.5 }}
          whileInView={{ opacity: 1, width: contentWidth }}
          transition={{
            delay: 0.1,
            duration: 4,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: contentWidth * 0.5 }}
          whileInView={{ opacity: 1, width: contentWidth }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 -translate-y-1/2 rounded-full bg-cyan-500 opacity-30 blur-3xl" style={{ width: contentWidth * 0.93 }}></div>
        <motion.div
          initial={{ width: contentWidth * 0.27 }}
          whileInView={{ width: contentWidth * 0.53 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-cyan-400 opacity-20 blur-2xl"
          style={{ width: contentWidth * 0.4 }}
        ></motion.div>
        <motion.div
          initial={{ width: contentWidth * 0.35 }}
          whileInView={{ width: contentWidth * 0.7 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-cyan-400 left-1/2 -translate-x-1/2"
          style={{ width: contentWidth * 0.7 }}
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>

      <div className="relative z-50 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 px-5 w-full lg:-translate-y-44" ref={contentRef}>
        {/* Left: Lamp animation and text */}
        <div className="flex flex-col justify-center items-center w-full lg:w-[60%] mx-auto text-center min-h-[300px]">
          {children}
        </div>
        {/* Right: Cards-vertical list */}
        <ul
          style={{ color: '#fff', fontSize: '1.2rem', maxWidth: 700, margin: 0, padding: 0, listStyle: 'none' }}
          className="flex flex-col gap-6 w-full max-w-xl lg:w-[40%] items-center mx-auto"
        >
          {[
            { text: 'Industry-standard equipment' },
            { text: 'Experienced team' },
            { text: 'Affordable packages' },
            { text: 'Fast turnaround & personal support' },
          ].map((item, idx) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + idx * 0.15,
                duration: 0.8,
                ease: 'easeInOut',
              }}
              style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}
              className="bg-slate-900 rounded-xl shadow px-5 py-4 min-w-[220px] max-w-xs w-full border border-slate-800"
            >
              <span style={{ color: '#3498ff', fontSize: '1.5rem', marginRight: 10 }}>✔️</span>{item.text}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
