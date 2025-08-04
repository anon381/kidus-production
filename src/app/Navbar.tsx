"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when a link is clicked (mobile only)
  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <nav
      style={{
        padding: "1.5rem 0",
        background: "transparent",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1250px",
          margin: "0 auto",
          background: "rgba(30,30,30,0.6)",
          borderRadius: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: "1.25rem 2.5rem",
        }}
      >
        {/* Left links */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              gap: "1rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              color: "#fff",
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
        )}

        {/* Center title */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            color: "#fff",
          }}
        >
          kidus production
        </div>

        {/* Right link / Menu button */}
        {isMobile ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        ) : (
          <ul
            style={{
              display: "flex",
              gap: "1rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              color: "#fff",
            }}
          >
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && isOpen && (
        <div
          style={{
            background: "rgba(30,30,30,0.9)",
            padding: "1rem",
            borderRadius: "1rem",
            marginTop: "0.5rem",
            maxWidth: "1250px",
            margin: "0 auto",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              color: "#fff",
            }}
          >
            <li>
              <Link href="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={handleLinkClick}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/gallery" onClick={handleLinkClick}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
