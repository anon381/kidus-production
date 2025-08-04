"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const titleRef = useRef(null);
  const presentRef = useRef(null);
  const mottoRef = useRef(null);
  const videoRef = useRef(null);

  const textContainerRef = useRef(null);
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.7, opacity: 0, y: -80, x: -80 },
        { scale: 1, opacity: 1, y: 0, x: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (presentRef.current) {
      gsap.fromTo(
        presentRef.current,
        { scale: 0.7, opacity: 0, y: 80, x: 80 },
        { scale: 1, opacity: 1, y: 0, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
    if (mottoRef.current) {
      gsap.fromTo(
        mottoRef.current,
        { scale: 0.7, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }

    // Video transforms from fullscreen to inset on scroll
    if (videoRef.current) {
      gsap.set(videoRef.current, {
        width: "100%",
        height: "100vh",
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        borderRadius: 0
      });
      gsap.to(videoRef.current, {
        width: "calc(100% - 5rem)",
        height: "100vh",
        marginLeft: "2.5rem",
        marginRight: "2.5rem",
        marginTop: "1.5rem",
        borderRadius: "2.5rem",
        boxSizing: "border-box",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
        },
      });
    }

    // Animate text container padding to match video margin as you scroll
    if (textContainerRef.current) {
      gsap.set(textContainerRef.current, {
        paddingLeft: 0,
        paddingRight: 0
      });
      gsap.to(textContainerRef.current, {
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <>
      <main style={{ minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden" }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "calc(100% - 5rem)",
            height: "100vh",
            objectFit: "cover",
            zIndex: 0,
            boxSizing: "border-box",
            marginLeft: "2.5rem",
            marginRight: "2.5rem",
            marginTop: "1.5rem",
            borderRadius: "2.5rem"
          }}
        >
          <source src="/home-page-2.mp4" type="video/mp4" />
        </video>
        <div
          ref={textContainerRef}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            color: "#fff",
            textShadow: "2px 2px 8px #000",
            boxSizing: "border-box",
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: "2rem"
          }}
        >
          <div style={{ maxWidth: 700, width: "100%", marginLeft: "-0.1vw" }}>
            <div
              ref={titleRef}
              className="main-title"
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                marginBottom: "0.2rem",
                textAlign: "left",
                color: "#7ed6fb",
                whiteSpace: "pre-line",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              kidus production present
            </div>
          </div>
          <div
            ref={mottoRef}
            className="main-motto"
            style={{ fontSize: "1.2rem", fontWeight: 400, textAlign: "left", maxWidth: 600 }}
          >
            Bringing your dreams to life with creativity, passion, and innovation.
          </div>
        </div>
        {/* New section below the video and overlay */}
        <section
          style={{
            width: "100%",
            background: "#fff",
            padding: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1rem" }}>Welcome to Kidus Production</h2>
          <p style={{ color: "#333", fontSize: "1.1rem", maxWidth: 600, textAlign: "center" }}>
            This is a sample content section below the video background. You can add more information, features, or anything you want here.
          </p>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1rem" }}>Welcome to Kidus Production</h2>
          <p style={{ color: "#333", fontSize: "1.1rem", maxWidth: 600, textAlign: "center" }}>
            This is a sample content section below the video background. You can add more information, features, or anything you want here.
          </p>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1rem" }}>Welcome to Kidus Production</h2>
          <p style={{ color: "#333", fontSize: "1.1rem", maxWidth: 600, textAlign: "center" }}>
            This is a sample content section below the video background. You can add more information, features, or anything you want here.
          </p>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1rem" }}>Welcome to Kidus Production</h2>
          <p style={{ color: "#333", fontSize: "1.1rem", maxWidth: 600, textAlign: "center" }}>
            This is a sample content section below the video background. You can add more information, features, or anything you want here.
          </p>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1rem" }}>Welcome to Kidus Production</h2>
          <p style={{ color: "#333", fontSize: "1.1rem", maxWidth: 600, textAlign: "center" }}>
            This is a sample content section below the video background. You can add more information, features, or anything you want here.
          </p>
        </section>
      </main>
      <style jsx>{`
        @media (max-width: 600px) {
          .main-title {
            font-size: 2rem !important;
          }
          .main-motto {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
