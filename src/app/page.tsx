import React from "react";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "80vh", overflow: "hidden" }}>
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
        <source src="https://player.vimeo.com/external/310093661.sd.mp4?s=6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e&profile_id=164" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "5rem" }}>
        <h1>Home Page</h1>
        <div>kidus production present</div>
      </div>
    </main>
  );
}
