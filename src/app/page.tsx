"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// Typing effect hook
function useTypingEffect(text: string, inView: boolean, speed = 32) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!inView) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, inView, speed]);
  return displayed;
}
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardContainer, CardBody, CardItem } from "../../components/ui/3d-card";
import InfiniteMovingCardsDemo from "../../components/infinite-moving-cards-demo";
import AnimatedTestimonialsDemo from "../../components/animated-testimonials-demo";
import LampDemo from "../../components/lamp-demo";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const titleRef = useRef(null);
  const presentRef = useRef(null);
  const mottoRef = useRef(null);
  const videoRef = useRef(null);
  const textContainerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Card refs should be inside the component
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    // GSAP ScrollTrigger: as you scroll down, cards section slides horizontally from right to left, pinning until last card is centered
    let sectionAnim;
    let videoAnim;
    let textAnim;
    let titleAnim;
    let presentAnim;
    let mottoAnim;
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
            // Tablets: scroll until last card's right edge is visible
            const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
            scrollAmount = lastCardRight - viewportWidth + 16; // 16px buffer
            if (scrollAmount < 0) scrollAmount = 0;
          } else if (viewportWidth <= 1200) {
            // Small Laptops: scroll until last card's right edge is visible
            const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
            scrollAmount = lastCardRight - viewportWidth + 32; // 32px buffer for gap
            if (scrollAmount < 0) scrollAmount = 0;
          } else {
            // Desktops: scroll until the last card's right edge is visible
            const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
            const sectionLeft = section.offsetLeft;
            scrollAmount = (lastCardRight - sectionLeft) - viewportWidth + 32; // 32px buffer for gap
            if (scrollAmount < 0) scrollAmount = 0;
          }
          sectionAnim = gsap.to(section, {
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
      titleAnim = gsap.fromTo(
        titleRef.current,
        { scale: 0.7, opacity: 0, y: -80, x: -80 },
        { scale: 1, opacity: 1, y: 0, x: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (presentRef.current) {
      presentAnim = gsap.fromTo(
        presentRef.current,
        { scale: 0.7, opacity: 0, y: 80, x: 80 },
        { scale: 1, opacity: 1, y: 0, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
    if (mottoRef.current) {
      mottoAnim = gsap.fromTo(
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
      videoAnim = gsap.to(videoRef.current, {
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
      textAnim = gsap.to(textContainerRef.current, {
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

    // CLEANUP: kill all ScrollTriggers and tweens on unmount
    return () => {
      // Kill all ScrollTriggers
      if (ScrollTrigger && typeof ScrollTrigger.getAll === "function") {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
      // Kill all tweens for animated elements
      if (sectionAnim) gsap.killTweensOf(sectionAnim);
      if (videoAnim) gsap.killTweensOf(videoAnim);
      if (textAnim) gsap.killTweensOf(textAnim);
      if (titleAnim) gsap.killTweensOf(titleAnim);
      if (presentAnim) gsap.killTweensOf(presentAnim);
      if (mottoAnim) gsap.killTweensOf(mottoAnim);
      // Optionally, reset transforms
      const section = document.getElementById("services-cards-section");
      if (section) section.style.transform = "";
      if (videoRef.current) videoRef.current.style.transform = "";
      if (textContainerRef.current) textContainerRef.current.style.transform = "";
    };
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
              Sound that Speaks. Quality that Lasts.
            </div>
          </div>
          <div
            ref={mottoRef}
            className="main-motto"
            style={{ fontSize: "1.5rem", fontWeight: 400, textAlign: "center", maxWidth: 700, lineHeight: 1.6 }}
          >
            At Kidus Production, we bring unmatched clarity and emotion to your sound. Whether it’s mixing, mastering, recording, or sound design, we craft audio that resonates.
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
          {isDesktop ? (
            <CardContainer className="inter-var">
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
                <CardItem translateZ="50" className="flex flex-col items-center w-full">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎛️</div>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Sound Mixing</h3>
                  <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6, textAlign: "center" }}>
                    We blend your tracks to perfection — balancing vocals, instruments, and effects to create a polished, professional sound.
                  </p>
                  <img
                    src="/sound-mixing.jpg"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl mt-4"
                    alt="Sound Mixing"
                  />
                </CardItem>
              </div>
            </CardContainer>
          ) : (
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
          )}
          {/* Card 2 */}
          {isDesktop ? (
            <CardContainer className="inter-var">
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
                <CardItem translateZ="50" className="flex flex-col items-center w-full">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎚️</div>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Mastering</h3>
                  <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6, textAlign: "center" }}>
                    Final touches that make your song radio-ready — boosting clarity, loudness, and consistency across all platforms.
                  </p>
                  <img
                    src="/mastering.jpg"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl mt-4"
                    alt="Mastering"
                  />
                </CardItem>
              </div>
            </CardContainer>
          ) : (
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
          )}
          {/* Card 3 */}
          {isDesktop ? (
            <CardContainer className="inter-var">
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
                <CardItem translateZ="50" className="flex flex-col items-center w-full">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎤</div>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Recording</h3>
                  <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6, textAlign: "center" }}>
                    Capture crystal-clear vocals or instruments in a studio environment designed for creativity and quality.
                  </p>
                  <img
                    src="/recording.jpg"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl mt-4"
                    alt="Recording"
                  />
                </CardItem>
              </div>
            </CardContainer>
          ) : (
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
          )}
          {/* Card 4 */}
          {isDesktop ? (
            <CardContainer className="inter-var">
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
                <CardItem translateZ="50" className="flex flex-col items-center w-full">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎨</div>
                  <h3 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "0.7rem", color: "#3498ff" }}>Graphic Design</h3>
                  <p style={{ color: "#222", fontSize: "1.1rem", lineHeight: 1.6, textAlign: "center" }}>
                    From album covers to promo posters, we design visuals that match your sound and stand out everywhere.
                  </p>
                  <img
                    src="/design.jpg"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl mt-4"
                    alt="Graphic Design"
                  />
                </CardItem>
              </div>
            </CardContainer>
          ) : (
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
          )}
        </section>
                {/* Featured Projects / Clients */}

        <section style={{ width: "100%", background: "#f7faff", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 1200 }}>
            <InfiniteMovingCardsDemo />
          </div>
        </section>


        {/* Testimonial Section */}
        <section style={{ width: "100%", background: "#fff", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#111", fontSize: "2rem", marginBottom: "1.5rem" }}>Testimonials</h2>
          <div style={{ width: "100%", maxWidth: 1200 }}>
            {/* AnimatedTestimonialsDemo expects to be imported from components/animated-testimonials-demo */}
            <AnimatedTestimonialsDemo />
          </div>
        </section>

        {/* Lamp Demo Section */}
        <section style={{ width: "100%", background: "#0f172a", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 1200 }}>
            {/* LampDemo expects to be imported from components/lamp-demo */}
            <LampDemo />
          </div>
        </section>

       
        <section style={{ position: "relative", width: "100%", minHeight: 500, padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              minHeight: 500
            }}
          >
            <source src="/h1.mp4" type="video/mp4" />
          </video>
          <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "1.5rem", textShadow: "2px 2px 8px #000" }}>Ready to Start?</h2>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="/contact" style={{ background: "#3498ff", color: "#fff", fontWeight: 600, fontSize: "1.2rem", padding: "1rem 2.5rem", borderRadius: 32, textDecoration: "none", boxShadow: "0 2px 8px rgba(52,152,255,0.10)", transition: "background 0.2s" }}>Let’s Work Together</a>
            </div>
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
    {/* Footer Section */}
    <footer
      style={{
        width: "100%",
        background: "#0a1026",
        color: "#e5e7eb",
        padding: "4.5rem 6vw 2.5rem 6vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flexWrap: "nowrap"
      }}
    >
      <div
        className="footer-columns-row"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: 32,
          gap: 0
        }}
      >
        {/* Column 1: Navigation */}
        <div className="footer-col" style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 18, maxWidth: 260 }}>
          <span style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Pages</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <a href="/" className="footer-nav-link home-link">Home</a>
            <a href="/about" className="footer-nav-link about-link">About</a>
            <a href="/services" className="footer-nav-link services-link">Services</a>
            <a href="/projects" className="footer-nav-link projects-link">Projects</a>
            <a href="/contact" className="footer-nav-link contact-link">Contact</a>
          </div>
        </div>
        {/* Column 2: Motto */}
        <div className="footer-col" style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18, textAlign: "left", maxWidth: 340 }}>
          <span style={{ fontWeight: 700, fontSize: 22, marginBottom: 12, textAlign: "left", alignSelf: "flex-start", marginLeft: 60 }}>Our Motto</span>
          {/* Typing effect for motto */}
          {(() => {
            const mottoText = "Inspiring sound. Creative vision. Unmatched quality.\nLet’s make something unforgettable.";
            const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });
            const typed = useTypingEffect(mottoText, inView, 24);
            return (
              <span ref={ref} style={{ fontSize: 19, color: "#e5e7eb", opacity: 0.9, textAlign: "left", alignSelf: "flex-start", marginLeft: 12, minHeight: 60, whiteSpace: "pre-line", fontFamily: "inherit", letterSpacing: 0.1 }}>
                {typed}
                <span style={{ opacity: 0.7, fontWeight: 700, fontSize: 22, marginLeft: 2 }}>{typed.length < mottoText.length ? "|" : ""}</span>
              </span>
            );
          })()}
        </div>
        {/* Column 3: Social Icons */}
        <div className="footer-col" style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, maxWidth: 260 }}>
          <span className="footer-connect-label" style={{ fontWeight: 800, fontSize: 30, marginBottom: 12, textAlign: "left", width: "100%", color: "#e5e7eb", letterSpacing: 1, lineHeight: 1.1, alignSelf: "flex-start", transition: "all 0.22s" }}>Connect</span>
          <div className="footer-social-icons" style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 4, justifyContent: "center", width: "100%", alignItems: "flex-start" }}>
            {/* Telegram */}
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <a href="https://t.me/" target="_blank" rel="noopener" aria-label="Telegram" style={{ color: "#29B6F6", textShadow: "0 0 8px #29B6F6, 0 0 16px #29B6F6", fontSize: 38, transition: 'transform 0.18s' }}>
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.036 15.472l-.396 3.98c.568 0 .814-.244 1.112-.537l2.664-2.53 5.522 4.03c1.012.557 1.73.264 1.98-.936l3.592-16.82c.328-1.52-.552-2.12-1.54-1.76L1.36 9.36c-1.48.6-1.464 1.44-.252 1.824l4.6 1.44 10.68-6.72c.504-.328.96-.146.584.182l-8.664 7.84z" fill="currentColor"/></svg>
              </a>
              <span style={{ color: "#e5e7eb", fontSize: 20, fontWeight: 500, opacity: 0.92 }}>Telegram</span>
            </div>
            {/* TikTok */}
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <a href="https://tiktok.com/" target="_blank" rel="noopener" aria-label="TikTok" style={{ color: "#25F4EE", textShadow: "0 0 8px #25F4EE, 0 0 16px #FE2C55", fontSize: 38, transition: 'transform 0.18s' }}>
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 2v14.5a3.5 3.5 0 11-3.5-3.5h.5V10h-1a6 6 0 106 6V2h-2z" fill="currentColor"/><path d="M16 2v2.5a4.5 4.5 0 004.5 4.5H22V6.5h-1.5A2.5 2.5 0 0118 4.5V2h-2z" fill="currentColor"/></svg>
              </a>
              <span style={{ color: "#e5e7eb", fontSize: 20, fontWeight: 500, opacity: 0.92 }}>TikTok</span>
            </div>
            {/* Instagram */}
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" style={{ color: "#F601A9", textShadow: "0 0 8px #F601A9, 0 0 16px #FFD600", fontSize: 38, transition: 'transform 0.18s' }}>
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </a>
              <span style={{ color: "#e5e7eb", fontSize: 20, fontWeight: 500, opacity: 0.92 }}>Instagram</span>
            </div>
            {/* Twitter */}
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" style={{ color: "#1DA1F2", textShadow: "0 0 8px #1DA1F2, 0 0 16px #1DA1F2", fontSize: 38, transition: 'transform 0.18s' }}>
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.485 0-4.5 2.015-4.5 4.5 0 .353.04.697.116 1.027C7.728 9.37 4.1 7.555 1.67 4.905c-.387.664-.61 1.437-.61 2.26 0 1.56.794 2.936 2.003 3.744a4.48 4.48 0 01-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418-.377.103-.775.158-1.185.158-.29 0-.57-.028-.844-.08.57 1.78 2.23 3.08 4.19 3.12A8.98 8.98 0 012 19.54a12.67 12.67 0 006.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.18 9.18 0 0024 4.59a8.94 8.94 0 01-2.54.698z" fill="currentColor"/></svg>
              </a>
              <span style={{ color: "#e5e7eb", fontSize: 20, fontWeight: 500, opacity: 0.92 }}>Twitter</span>
            </div>
            {/* Facebook */}
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" style={{ color: "#00FFFB", textShadow: "0 0 8px #00FFFB, 0 0 16px #00FFFB", fontSize: 38, transition: 'transform 0.18s' }}>
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" fill="currentColor"/></svg>
              </a>
              <span style={{ color: "#e5e7eb", fontSize: 20, fontWeight: 500, opacity: 0.92 }}>Facebook</span>
            </div>
          </div>
        </div>
      </div>
        
      
      {/* Footer Bottom Section */}
      <div className="footer-bottom-section" style={{
        width: "100%",
        marginTop: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }}>
        <div className="footer-bottom-inner" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "calc(36% + 32px)",
          marginTop: 0,
          gap: 2
        }}>
          <div style={{ color: "#e5e7eb", fontSize: 17, opacity: 0.8, fontWeight: 400, marginBottom: 2 }}>
            &copy; 2025 All rights reserved
          </div>
          <div style={{ color: "#e5e7eb", fontSize: 16, opacity: 0.7, fontWeight: 400 }}>
            Developed by <a href="https://github.com/anon381" target="_blank" rel="noopener" style={{ color: "#7ed6fb", textDecoration: "underline", fontWeight: 500 }}>Yabets Maregn</a>
          </div>
        </div>
      </div>
    </footer>

    <style jsx>{`
      .footer-social-icons a {
        will-change: transform;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .footer-social-icons a:hover {
        transform: scale(1.25);
        z-index: 2;
      }
      .footer-connect-label {
        cursor: pointer;
        text-shadow: 0 0 12px #7ed6fb, 0 0 24px #25F4EE, 0 0 32px #7ed6fb;
        transition: all 0.22s;
      }
      .footer-connect-label:hover {
        color: #7ed6fb;
        text-shadow: 0 0 24px #7ed6fb, 0 0 48px #25F4EE, 0 0 64px #7ed6fb;
        font-size: 38px;
        letter-spacing: 2px;
        filter: brightness(1.2) drop-shadow(0 0 8px #7ed6fb);
      }
      .footer-nav-link {
        color: #e5e7eb;
        text-decoration: none;
        font-size: 20px;
        border-radius: 14px;
        padding: 5px 12px;
        transition: border-color 0.2s, box-shadow 0.18s, color 0.18s, background 0.18s;
        display: inline-block;
        width: fit-content;
        min-width: 0;
        margin-bottom: 2px;
        border: 2px solid #7ed6fb;
        box-shadow: none;
      }
      .footer-nav-link.home-link { border-color: #7ed6fb; }
      .footer-nav-link.about-link { border-color: #f601a9; }
      .footer-nav-link.services-link { border-color: #25F4EE; }
      .footer-nav-link.projects-link { border-color: #FFD600; }
      .footer-nav-link.contact-link { border-color: #29B6F6; }
      .footer-nav-link:hover {
        color: #0a1026;
        background: #7ed6fb;
        box-shadow: 0 0 16px #7ed6fb, 0 0 32px #25F4EE;
        border-color: #25F4EE;
        font-weight: 700;
        letter-spacing: 1px;
        filter: brightness(1.2) drop-shadow(0 0 8px #7ed6fb);
      }
      .footer-nav-link.about-link:hover {
        background: #f601a9;
        color: #fff;
        border-color: #f601a9;
        box-shadow: 0 0 16px #f601a9, 0 0 32px #FFD600;
      }
      .footer-nav-link.services-link:hover {
        background: #25F4EE;
        color: #fff;
        border-color: #25F4EE;
        box-shadow: 0 0 16px #25F4EE, 0 0 32px #7ed6fb;
      }
      .footer-nav-link.projects-link:hover {
        background: #FFD600;
        color: #0a1026;
        border-color: #FFD600;
        box-shadow: 0 0 16px #FFD600, 0 0 32px #f601a9;
      }
      .footer-nav-link.contact-link:hover {
        background: #29B6F6;
        color: #fff;
        border-color: #29B6F6;
        box-shadow: 0 0 16px #29B6F6, 0 0 32px #7ed6fb;
      }
      @media (max-width: 900px) {
        footer {
          padding-left: 2rem !important;
          padding-right: 2rem !important;
        }
        .footer-columns-row {
          flex-direction: column !important;
          gap: 32px !important;
        }
        .footer-col {
          min-width: 0 !important;
          max-width: 100% !important;
          width: 100% !important;
          align-items: center !important;
          text-align: center !important;
        }
        .footer-col > span,
        .footer-col > div,
        .footer-col .footer-connect-label {
          text-align: center !important;
          align-self: center !important;
        }
        .footer-bottom-section {
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          margin-top: 24px !important;
        }
        .footer-bottom-inner {
          margin-left: 0 !important;
          align-items: center !important;
          text-align: center !important;
        }
        .footer-social-icons {
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
        }
        .footer-social-icons > div {
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
        }
      }
      @media (max-width: 600px) {
        footer {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
        .footer-social-icons a {
          font-size: 28px !important;
        }
        .footer-connect-label {
          font-size: 22px !important;
        }
        .footer-columns-row {
          gap: 20px !important;
        }
        .footer-bottom-section {
          margin-top: 18px !important;
        }
      }
    `}</style>
    </>
  );
}
