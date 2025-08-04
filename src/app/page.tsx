"use client";
import React, { useEffect, useState } from "react";


export default function Home() {
  const [fullscreen, setFullscreen] = useState(true);
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    const timer = setTimeout(() => setFullscreen(false), 2000);
    return () => {
      document.body.style.overflowX = "";
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <main style={{ position: "relative", width: "100%", height: "100vh", minHeight: "100vh", overflow: "hidden", margin: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: fullscreen ? "fixed" : "relative",
            top: fullscreen ? 0 : undefined,
            left: fullscreen ? 0 : undefined,
            width: fullscreen ? "100vw" : "98vw",
            height: fullscreen ? "100vh" : "97vh",
            maxWidth: fullscreen ? "100vw" : "1900px",
            margin: fullscreen ? 0 : "0 auto",
            paddingRight: fullscreen ? 0 : "1vw",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "all 3s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: fullscreen ? 0 : "3rem",
              boxShadow: fullscreen ? "none" : "0 4px 32px rgba(0,0,0,0.25)",
              display: "block",
              transition: "all 2s cubic-bezier(0.77,0,0.175,1)",
            }}
          >
            <source src="/home-page-2.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ position: "absolute", zIndex: 1, color: "#fff", textAlign: "left", left: 0, top: "38vh", transform: "translateY(-20%)", paddingTop: 0, maxWidth: 600, paddingLeft: "5vw" }}>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#00FFFF", textShadow: "2px 2px 8px #000", marginBottom: "1.5rem" }}>kidus production present</div>
          <div style={{ fontSize: "1.2rem", color: "#fff", textShadow: "1px 1px 6px #000", marginBottom: "1.2rem", textAlign: "left" }}>
            Bringing your dreams to life with creativity, passion, and innovation. Let us help you make your vision a reality.            We turn ideas into reality, delivering excellence in every project. Your story, our production.

          </div>
          
        </div>
      </main>
      <section style={{ background: "#fff", minHeight: "100vh", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} style={{ background: "#f5f5f5", color: "#111", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", width: 300, padding: "2rem", textAlign: "center" }}>
              <h2>Card {n}</h2>
              <p>This is some content for card {n}.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
