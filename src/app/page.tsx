"use client";
import React from "react";

export default function Home() {
  React.useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <>
      <main style={{ position: "relative", width: "100%", height: "100vh", minHeight: "100vh", overflow: "hidden", margin: 0, padding: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/home-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "left", left: 0, top: "38vh", transform: "translateY(-20%)", paddingTop: 0, maxWidth: 600, paddingLeft: "5vw" }}>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#00FFFF", textShadow: "2px 2px 8px #000", marginBottom: "1.5rem" }}>kidus production present</div>
          <div style={{ fontSize: "1.2rem", color: "#fff", textShadow: "1px 1px 6px #000", marginBottom: "1.2rem", textAlign: "left" }}>
            Bringing your dreams to life with creativity, passion, and innovation. Let us help you make your vision a reality.            We turn ideas into reality, delivering excellence in every project. Your story, our production.

          </div>
          
        </div>
      </main>
      <section style={{ background: "#181818", minHeight: "100vh", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} style={{ background: "#222", color: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: 300, padding: "2rem", textAlign: "center" }}>
              <h2>Card {n}</h2>
              <p>This is some content for card {n}.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
