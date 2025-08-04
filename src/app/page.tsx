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
        <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", top: "30vh", transform: "translateY(-20%)", paddingTop: 0 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>Home Page</h1>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>kidus production present</div>
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
