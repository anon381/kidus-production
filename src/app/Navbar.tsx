import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem 0", background: "transparent" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: "0.5rem 2rem",
        }}
      >
        {/* Left links */}
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
        </ul>
        {/* Center title */}
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          kidus production
        </div>
        {/* Right link */}
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
