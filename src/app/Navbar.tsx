import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1.5rem 0",
        background: "transparent",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div // to be edited
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1250px",
          margin: "0 auto",
          background: "rgba(30,30,30,0.6)", // dark grey with transparency
          borderRadius: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: "1.25rem 2.5rem",
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
        {/* Center title (shifted left) */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            marginLeft: "-80px",
            color: "#fff",
          }}
        >
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
