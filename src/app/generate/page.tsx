"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SWATCHES = [
  "#C15B3A", "#2563EB", "#16A34A", "#7C3AED",
  "#DB2777", "#EA580C", "#0891B2", "#334155",
];

const STEPS = [
  "Analizando tu negocio",
  "Diseñando estructura",
  "Generando contenido",
  "Finalizando detalles",
];

function LoadingOverlay() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(250,250,248,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 max-w-sm w-full mx-4" style={{ border: "1px solid #F0EBE6" }}>
        {/* Animated ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#F0EBE6" strokeWidth="4" />
            <circle cx="40" cy="40" r="36" fill="none" stroke="#C15B3A" strokeWidth="4"
              strokeDasharray="60 166" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 28 }}>✦</span>
        </div>

        <div className="text-center">
          <p className="font-semibold text-lg" style={{ color: "#1C1714", fontFamily: "var(--font-geist-sans)" }}>
            Creando tu landing page…
          </p>
          <p className="text-sm mt-1" style={{ color: "#A0958C" }}>Esto puede tardar unos segundos</p>
        </div>

        <div className="w-full flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3 transition-all duration-500"
              style={{ opacity: i <= activeStep ? 1 : 0.3 }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                style={{
                  background: i < activeStep ? "#C15B3A" : i === activeStep ? "#FDF0EB" : "#F5F0ED",
                  border: i === activeStep ? "1.5px solid #C15B3A" : "none",
                }}>
                {i < activeStep ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === activeStep ? (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C15B3A" }} />
                ) : null}
              </div>
              <span className="text-sm font-medium transition-colors duration-500"
                style={{ color: i <= activeStep ? "#1C1714" : "#C5B9B3" }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [color, setColor] = useState("#C15B3A");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Access gate: check payment token
  useEffect(() => {
    const token = localStorage.getItem("landing_access_token");
    if (!token) {
      // In dev (no Stripe key configured) allow access anyway
      fetch("/api/check-access?session_id=dev")
        .then(r => r.json())
        .then(d => { if (d.valid) setAccessToken("dev"); else window.location.href = "/"; })
        .catch(() => window.location.href = "/");
      return;
    }
    setAccessToken(token);
  }, []);

  const readFilesAsBase64 = (files: FileList | File[]): Promise<string[]> => {
    const arr = Array.from(files).filter(f => f.type.startsWith("image/")).slice(0, 5 - images.length);
    return Promise.all(arr.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    })));
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const newImgs = await readFilesAsBase64(files);
    setImages(prev => [...prev, ...newImgs].slice(0, 5));
  }, [images.length]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    await handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleSubmit = async () => {
    if (!prompt.trim()) { setError("Por favor describe tu negocio."); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), images, primaryColor: color, sessionId: accessToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al generar");
      localStorage.setItem(`site-config-${data.id}`, JSON.stringify(data.config));
      window.location.href = `/editor?id=${data.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="min-h-screen" style={{ background: "#FAFAF8", fontFamily: "var(--font-geist-sans)" }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 max-w-4xl mx-auto">
          <a href="/" className="text-sm font-semibold tracking-wide" style={{ color: "#1C1714" }}>← Volver</a>
          <div className="flex items-center gap-2">
            <span style={{ color: "#C15B3A", fontSize: 18 }}>✦</span>
            <span className="text-sm font-medium" style={{ color: "#8A7E76" }}>Landing Generator</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 pb-20">
          {/* Hero */}
          <div className="text-center pt-10 pb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border shadow-sm" style={{ borderColor: "#F0EBE6" }}>
              <span style={{ color: "#C15B3A", fontSize: 12 }}>✦</span>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#C15B3A" }}>Powered by Claude AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: "#1C1714", letterSpacing: "-0.02em" }}>
              Tu landing page,<br />
              <span style={{ color: "#C15B3A" }}>lista en segundos</span>
            </h1>
            <p className="text-lg" style={{ color: "#8A7E76", maxWidth: 440, margin: "0 auto" }}>
              Describe tu negocio y deja que la IA construya una landing profesional a tu medida.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-7" style={{ border: "1px solid #F0EBE6" }}>

            {/* Textarea */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1714" }}>
                Describe tu negocio
              </label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ej: Soy fotógrafo inmobiliario en Madrid con 8 años de experiencia. Ofrezco fotografía de viviendas, locales comerciales y fotografía aérea con dron. Mis clientes son inmobiliarias y particulares que quieren vender más rápido..."
                rows={5}
                className="w-full resize-none outline-none text-sm leading-relaxed p-4 rounded-xl transition-all duration-200"
                style={{
                  background: "#FAFAF8",
                  border: "1.5px solid #EDE8E3",
                  color: "#1C1714",
                  fontFamily: "inherit",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "#C15B3A"}
                onBlur={e => e.currentTarget.style.borderColor = "#EDE8E3"}
              />
              <p className="text-xs mt-2" style={{ color: "#B0A49C" }}>
                Incluye tu nombre, ciudad, servicios que ofreces y a quién te diriges.
              </p>
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1C1714" }}>
                Fotos de referencia <span className="font-normal" style={{ color: "#B0A49C" }}>(opcional, máx. 5)</span>
              </label>

              {/* Drop zone */}
              {images.length < 5 && (
                <div
                  className="rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
                  style={{ borderColor: dragging ? "#C15B3A" : "#E5DED9", background: dragging ? "#FDF5F2" : "#FAFAF8" }}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F5EDE8" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 13V4M10 4L7 7M10 4l3 3" stroke="#C15B3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#C15B3A" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#6B5E57" }}>
                    {dragging ? "Suelta las fotos aquí" : "Arrastra fotos o haz clic para seleccionar"}
                  </span>
                  <span className="text-xs" style={{ color: "#B0A49C" }}>JPG, PNG, WebP</span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => e.target.files && handleFiles(e.target.files)}
              />

              {/* Thumbnails */}
              {images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {images.map((src, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden group" style={{ border: "1px solid #EDE8E3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.45)" }}
                        onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Color picker */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "#1C1714" }}>
                Color de marca
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {SWATCHES.map(sw => (
                  <button
                    key={sw}
                    className="w-8 h-8 rounded-full transition-all duration-150 flex items-center justify-center"
                    style={{
                      background: sw,
                      boxShadow: color === sw ? `0 0 0 3px white, 0 0 0 5px ${sw}` : "none",
                      transform: color === sw ? "scale(1.15)" : "scale(1)",
                    }}
                    onClick={() => setColor(sw)}
                  >
                    {color === sw && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
                {/* Custom */}
                <div className="relative w-8 h-8">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer"
                    style={{ borderColor: "#EDE8E3", background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}>
                    <input
                      type="color"
                      value={color}
                      onChange={e => setColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      title="Color personalizado"
                    />
                  </div>
                  {!SWATCHES.includes(color) && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style={{ background: color }} />
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ background: color, border: "1px solid #EDE8E3" }} />
                <span className="text-xs font-mono" style={{ color: "#8A7E76" }}>{color}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl p-3 flex items-center gap-2" style={{ background: "#FEF2F2", border: "1px solid #FCA5A5" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-sm" style={{ color: "#DC2626" }}>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60"
              style={{
                background: loading ? "#C15B3A" : "linear-gradient(135deg, #C15B3A 0%, #A84B2C 100%)",
                boxShadow: loading ? "none" : "0 4px 24px rgba(193,91,58,0.35)",
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Generando…
                </>
              ) : (
                <>
                  Generar mi landing page
                  <span className="text-lg">→</span>
                </>
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "#C5B9B3" }}>
              El proceso tarda entre 15 y 30 segundos · Powered by Claude AI
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs mt-8" style={{ color: "#C5B9B3" }}>
            La página generada es un punto de partida. Puedes personalizarla a tu gusto.
          </p>
        </div>
      </div>
    </>
  );
}
