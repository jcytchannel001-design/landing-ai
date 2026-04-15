"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!sessionId) return;
    localStorage.setItem("landing_access_token", sessionId);
    // Animate steps then redirect
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1400);
    const t3 = setTimeout(() => setStep(3), 2200);
    const t4 = setTimeout(() => { window.location.href = "/generate"; }, 3400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [sessionId]);

  const steps = [
    "Pago verificado",
    "Acceso activado",
    "Abriendo el generador…",
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#0B0906", fontFamily: "var(--font-geist-sans)" }}
    >
      {/* Ring animation */}
      <div className="relative w-24 h-24 mb-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle cx="48" cy="48" r="44" fill="none" stroke="#C15B3A" strokeWidth="4"
            strokeDasharray="276" strokeDashoffset={step >= 1 ? "0" : "276"}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)", transformOrigin: "center", transform: "rotate(-90deg)" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {step >= 1 ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l8 8 12-14" stroke="#C15B3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 40, strokeDashoffset: step >= 1 ? 0 : 40, transition: "stroke-dashoffset 0.5s ease 0.4s" }} />
            </svg>
          ) : (
            <div className="w-3 h-3 rounded-full" style={{ background: "#C15B3A", opacity: 0.4 }} />
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold text-white mb-2 text-center">
        ¡Pago completado!
      </h1>
      <p className="text-sm mb-10 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
        Tu acceso queda activado en este dispositivo
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {steps.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: step > i ? 1 : 0.25 }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{ background: step > i ? "#C15B3A" : "rgba(255,255,255,0.08)" }}
            >
              {step > i && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium" style={{ color: step > i ? "white" : "rgba(255,255,255,0.3)" }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#0B0906" }} />}>
      <SuccessInner />
    </Suspense>
  );
}
