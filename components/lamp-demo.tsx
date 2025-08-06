"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "../components/ui/lamp";

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
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
       Why Hire Me
       <br/>
              <br/>
      

        <ul style={{ color: "#ff", fontSize: "1.2rem", maxWidth: 700, margin: 0, padding: 0, listStyle: "none" }}>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Industry-standard equipment</li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Experienced team</li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Affordable packages</li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Fast turnaround & personal support</li>
            
          </ul>
      </motion.h1>
      
    </LampContainer>
  );
}
