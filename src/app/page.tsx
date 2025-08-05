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
    // GSAP ScrollTrigger: as you scroll down, cards section slides horizontally from right to left, pinning until last card is centered
    if (typeof window !== "undefined") {
      const section = document.getElementById("services-cards-section");
      if (section) {
        const cards = section.querySelectorAll('[data-card]');
        if (cards.length > 0) {
          const lastCard = cards[cards.length - 1] as HTMLElement;
          const viewportWidth = window.innerWidth;
          let scrollAmount;
          if (viewportWidth <= 600) {
            // Phones: scroll only until the last card's right edge is visible
            const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
            const sectionLeft = section.offsetLeft;
            scrollAmount = (lastCardRight - sectionLeft) - viewportWidth + 16; // 16px buffer
            if (scrollAmount < 0) scrollAmount = 0;
          } else if (viewportWidth <= 900) {
            // Tablets: scroll until last card is centered
            const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
            scrollAmount = lastCardCenter - viewportWidth / 2;
            if (scrollAmount < 0) scrollAmount = 0;
          } else if (viewportWidth <= 1200) {
            // Small Laptops: scroll until last card is centered
            const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
            scrollAmount = lastCardCenter - viewportWidth / 2;
            if (scrollAmount < 0) scrollAmount = 0;
          } else {
            // Desktops: scroll until the last card's right edge is visible
            const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
            const sectionLeft = section.offsetLeft;
            scrollAmount = (lastCardRight - sectionLeft) - viewportWidth + 32; // 32px buffer for gap
            if (scrollAmount < 0) scrollAmount = 0;
          }
          gsap.to(section, {
            x: () => `-${scrollAmount}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollAmount}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true
            },
          });
        }
      }
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
   
        {/* Services Cards Section */}
        <section
          id="services-cards-section"
          style={{
            width: "fit-content",
            minWidth: "100vw",
            background: "#fff",
            padding: "3rem 0",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: "3.5rem",
            willChange: "transform"
          }}
        >
          {/* Card 1 */}
          <div
            ref={cardRefs[0]}
            data-card
            style={{
              flex: "1 1 1100px",
              maxWidth: 1200,
              minWidth: 800,
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
            <div style={{ width: 650, height: 300, maxWidth: "100%", maxHeight: "100%", padding: 16, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img 
                src="/sound-mixing.jpg" 
                alt="Sound Mixing"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 16px 0 rgba(52,152,255,0.10)"
                }}
              />
            </div>
          </div>
          {/* Card 2 */}
          <div
            ref={cardRefs[1]}
            data-card
            style={{
              flex: "1 1 1100px",
              maxWidth: 1200,
              minWidth: 800,
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
            <div style={{ width: 650, height: 300, maxWidth: "100%", maxHeight: "100%", padding: 16, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img 
                src="/mastering.jpg" 
                alt="Mastering"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 16px 0 rgba(52,152,255,0.10)"
                }}
              />
            </div>
          </div>
          {/* Card 3 */}
          <div
            ref={cardRefs[2]}
            data-card
            style={{
              flex: "1 1 1100px",
              maxWidth: 1200,
              minWidth: 800,
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
            <div style={{ width: 650, height: 300, maxWidth: "100%", maxHeight: "100%", padding: 16, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img 
                src="/recording.jpg" 
                alt="Recording"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 16px 0 rgba(52,152,255,0.10)"
                }}
              />
            </div>
          </div>
          {/* Card 4 */}
          <div
            ref={cardRefs[3]}
            data-card
            style={{
              flex: "1 1 1100px",
              maxWidth: 1200,
              minWidth: 800,
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
            <div style={{ width: 650, height: 300, maxWidth: "100%", maxHeight: "100%", padding: 16, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img 
                src="/design.jpg" 
                alt="Graphic Design"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 16px 0 rgba(52,152,255,0.10)"
                }}
              />
            </div>
          </div>
        </section>
        <section style={{ width: "100%", background: "#f7faff", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1.5rem" }}>Featured Projects / Clients</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: 1200 }}>
             {/* Add more as needed */}
          </div>
        </section>
   

        {/* Why Choose Us Section */}
        <section style={{ width: "100%", background: "#fff", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1.5rem" }}>Why Choose Us?</h2>
          <ul style={{ color: "#222", fontSize: "1.2rem", maxWidth: 700, margin: 0, padding: 0, listStyle: "none" }}>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Industry-standard equipment</li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Experienced team</li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Affordable packages</li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center" }}><span style={{ color: "#3498ff", fontSize: "1.5rem", marginRight: 10 }}>✔️</span>Fast turnaround & personal support</li>
          </ul>
        </section>
        {/* Quick Contact CTA Section */}
        <section style={{ width: "100%", background: "#f7faff", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1.5rem" }}>Ready to Start?</h2>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="/contact" style={{ background: "#3498ff", color: "#fff", fontWeight: 600, fontSize: "1.2rem", padding: "1rem 2.5rem", borderRadius: 32, textDecoration: "none", boxShadow: "0 2px 8px rgba(52,152,255,0.10)", transition: "background 0.2s" }}>Let’s Work Together</a>
          </div>
        </section>
      </main>
      <style jsx>{`
        @media (max-width: 900px) {
          [data-card] {
            min-width: 95vw !important;
            max-width: 95vw !important;
            padding: 2rem 0.7rem 2rem 0.7rem !important;
            min-height: 420px !important;
          }
          [data-card] h3 {
            font-size: 1.3rem !important;
          }
          [data-card] p, [data-card] div {
            font-size: 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .main-title {
            font-size: 2rem !important;
          }
          .main-motto {
            font-size: 1rem !important;
          }
          #services-cards-section {
            padding-bottom: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
