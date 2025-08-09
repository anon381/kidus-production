"use client";
import React, { useEffect, useState, useMemo } from "react";

/**
 * Global client-side loader overlay. It stays in the DOM (to avoid SSR/CSR tree mismatch)
 * and simply fades out + disables pointer events once the full window load event fires.
 * If the page is already loaded (cached / fast), it skips immediately (with a tiny rAF to avoid flash).
 */
export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  // Split brand text into characters for staggered animation (stable across SSR/CSR)
  const brandChars = useMemo(() => "Kidus Production".split(""), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If DOM is already parsed (interactive or complete), proceed immediately next frame.
    if (document.readyState !== "loading") {
      requestAnimationFrame(() => setLoaded(true));
      return;
    }

    const onDomContentLoaded = () => setLoaded(true);
    document.addEventListener("DOMContentLoaded", onDomContentLoaded, { once: true });

    // Fallback: in case DOMContentLoaded stalls (rare) or some script delays, force hide after 2500ms.
    const fallback = setTimeout(() => setLoaded(true), 2500);

    return () => {
      document.removeEventListener("DOMContentLoaded", onDomContentLoaded);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Overlay kept mounted always to keep markup consistent between SSR and client */}
      <div
        data-global-loader
        data-loaded={loaded ? "true" : "false"}
        aria-busy={!loaded}
        aria-live="polite"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, #0f172a, #020617)",
          zIndex: 9999,
          transition: "opacity .6s ease .15s, visibility 0s linear .9s",
          opacity: loaded ? 0 : 1,
          visibility: loaded ? "hidden" : "visible",
          pointerEvents: loaded ? "none" : "auto",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
          color: "#7ed6fb"
        }}
      >
        {/* Animated gradient / glow layers */}
        <div className="loader-bg" aria-hidden="true" />
        <div className="loader-noise" aria-hidden="true" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, position: "relative", zIndex: 2 }}>
          <div className="brand" style={{ fontSize: 54, fontWeight: 700, letterSpacing: 2, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            {brandChars.map((c, i) => (
              <span key={i} className="brand-ch" style={{ '--i': i } as any}>{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
            <div className="orbit" aria-hidden="true" />
          </div>
          <div style={{ fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#94a3b8", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="dot-pulse" /> Preparing experience
          </div>
          <div className="progress-shell" aria-hidden="true">
            <div className="progress-bar" />
          </div>
        </div>
        <style jsx>{`
          @keyframes spinFade { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes pulseDot { 0%,100% { transform: scale(1); opacity: .9;} 50% { transform: scale(.4); opacity:.35;} }
          @keyframes gradientMove { 0% { transform: translate(-40%, -40%) scale(1); } 50% { transform: translate(-35%, -45%) scale(1.15);} 100% { transform: translate(-40%, -40%) scale(1);} }
          @keyframes noiseShift { 0% { transform: translate3d(0,0,0);} 100% { transform: translate3d(-50%, -50%,0);} }
          @keyframes brandIn { 0% { opacity:0; transform: translateY(40px) scale(.95) rotateX(25deg); filter: blur(6px);} 60% { filter: blur(1px);} 100% { opacity:1; transform: translateY(0) scale(1) rotateX(0); filter: blur(0);} }
          @keyframes orbit { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
            @keyframes progress { 0% { transform: scaleX(0); } 60% { transform: scaleX(1); } 100% { transform: scaleX(1); } }
          @keyframes glowPulse { 0%,100% { opacity:.55;} 50% { opacity:.9;} }
          @keyframes dotPulseAnim { 0%, 80%, 100% { transform: scale(.6); opacity:.4;} 40% { transform: scale(1); opacity:1;} }

          [data-global-loader] { position: fixed; }
          .loader-bg { position:absolute; inset:-40%; background: radial-gradient(circle at 30% 30%, rgba(56,189,248,0.20), transparent 55%), radial-gradient(circle at 70% 70%, rgba(14,165,233,0.25), transparent 60%), radial-gradient(circle at 50% 50%, rgba(126,214,251,0.15), transparent 55%); filter: blur(70px); animation: gradientMove 9s ease-in-out infinite; }
          .loader-noise { position:absolute; inset:0; background: repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 3px, transparent 3px 6px); mix-blend-mode: overlay; opacity:.18; animation: noiseShift 6s linear infinite; }
          .brand-ch { display:inline-block; opacity:0; animation: brandIn .9s cubic-bezier(.65,.05,.36,1) forwards; animation-delay: calc(var(--i) * 35ms); }
          .progress-shell { width:240px; height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; position:relative; box-shadow:0 0 0 1px rgba(255,255,255,0.05),0 0 18px -4px #38bdf8; }
          .progress-bar { width:100%; height:100%; background:linear-gradient(90deg,#38bdf8,#0ea5e9,#38bdf8); background-size:220% 100%; animation: progress 1.8s ease-in-out infinite, glowPulse 3s ease-in-out infinite; transform-origin:left; }
          [data-global-loader][data-loaded="true"] .progress-bar { animation-play-state: paused; }
          .orbit { position:absolute; width:150px; height:150px; border:2px dashed rgba(126,214,251,0.15); border-radius:50%; animation: orbit 12s linear infinite; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
          .dot-pulse { width:10px; height:10px; border-radius:50%; background:#38bdf8; box-shadow:0 0 10px 2px #38bdf8; animation: dotPulseAnim 1.2s ease-in-out infinite; }
        `}</style>
      </div>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ position: "relative", width: 96, height: 96 }}>
      {/* Outer ring */}
      <div style={{
        position: "absolute",
        inset: 0,
        border: "6px solid rgba(255,255,255,0.08)",
        borderTopColor: "#7ed6fb",
        borderRadius: "50%",
        animation: "spinFade 1.2s linear infinite"
      }} />
      {/* Inner pulsing dots */}
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 16,
          height: 16,
          margin: -8,
          borderRadius: "50%",
          background: i % 2 === 0 ? "#38bdf8" : "#0ea5e9",
          transformOrigin: "40px 40px",
          animation: `pulseDot 1.2s ease-in-out ${i * 0.15}s infinite`,
          filter: "drop-shadow(0 0 6px #38bdf8)"
        }} />
      ))}
    </div>
  );
}
