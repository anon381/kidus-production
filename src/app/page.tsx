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
  // Card refs must be inside the component
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    // GSAP animation for cards: slide in horizontally, then move up as section scrolls out
    if (typeof window !== "undefined" && cardRefs[0].current) {
      cardRefs.forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { x: i % 2 === 0 ? -120 : 120, opacity: 0, y: 0 },
          {
            x: 0,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "+=200",
              toggleActions: "play none none reverse",
            },
          }
        );
        // Move up as section scrolls out
        gsap.to(ref.current, {
          y: -100,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 40%",
            end: "top 10%",
            scrub: true,
          },
        });
      });
    }
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
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textShadow: "2px 2px 8px #000",
            boxSizing: "border-box",
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0
          }}
        >
          <div style={{ maxWidth: 700, width: "100%", marginLeft: 0 }}>
            <div
              ref={titleRef}
              className="main-title"
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                marginBottom: "0.2rem",
                textAlign: "center",
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
            style={{ fontSize: "2rem", fontWeight: 400, textAlign: "center", maxWidth: 600 }}
          >
            Crafting Sound & Vision <br />Audio Meets Art
          </div>
        </div>
        {/* New section below the video and overlay */}
        {/* <section
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
        </section> */}
        {/* Services Cards Section */}
        <section
          style={{
            width: "100%",
            background: "#fff",
            padding: "3rem 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Card 1 */}
          <div
            ref={cardRefs[0]}
            style={{
              flex: "1 1 480px",
              maxWidth: 520,
              minWidth: 320,
              minHeight: 620,
              background: "#f7faff",
              borderRadius: "2.5rem",
              boxShadow: "0 8px 32px 0 rgba(52,152,255,0.12)",
              padding: "3.5rem 2.5rem 3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎛️</div>
            <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Sound Mixing</h3>
            <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6 }}>
              We blend your tracks to perfection — balancing vocals, instruments, and effects to create a polished, professional sound.
            </p>
          </div>
          {/* Card 2 */}
          <div
            ref={cardRefs[1]}
            style={{
              flex: "1 1 480px",
              maxWidth: 520,
              minWidth: 320,
              minHeight: 420,
              background: "#f7faff",
              borderRadius: "2.5rem",
              boxShadow: "0 8px 32px 0 rgba(52,152,255,0.12)",
              padding: "3.5rem 2.5rem 3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎚️</div>
            <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Mastering</h3>
            <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Final touches that make your song radio-ready — boosting clarity, loudness, and consistency across all platforms.
            </p>
          </div>
          {/* Card 3 */}
          <div
            ref={cardRefs[2]}
            style={{
              flex: "1 1 480px",
              maxWidth: 520,
              minWidth: 320,
              minHeight: 420,
              background: "#f7faff",
              borderRadius: "2.5rem",
              boxShadow: "0 8px 32px 0 rgba(52,152,255,0.12)",
              padding: "3.5rem 2.5rem 3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎤</div>
            <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Recording</h3>
            <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Capture crystal-clear vocals or instruments in a studio environment designed for creativity and quality.
            </p>
          </div>
          {/* Card 4 */}
          <div
            ref={cardRefs[3]}
            style={{
              flex: "1 1 480px",
              maxWidth: 520,
              minWidth: 320,
              minHeight: 420,
              background: "#f7faff",
              borderRadius: "2.5rem",
              boxShadow: "0 8px 32px 0 rgba(52,152,255,0.12)",
              padding: "3.5rem 2.5rem 3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎨</div>
            <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Graphic Design</h3>
            <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6 }}>
              From album covers to promo posters, we design visuals that match your sound and stand out everywhere.
            </p>
          </div>
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
