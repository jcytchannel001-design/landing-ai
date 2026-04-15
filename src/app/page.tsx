"use client";

import { useState } from "react";

const DEMOS = [
  { label: "Restaurante", color: "#B45309", desc: "La Taberna del Puerto", tagline: "Cocina de mercado en el corazón del puerto" },
  { label: "Gimnasio", color: "#16A34A", desc: "FitLife Studio", tagline: "Entrena con propósito. Vive con energía." },
  { label: "Clínica", color: "#0891B2", desc: "Clínica Dental Moreira", tagline: "Tu sonrisa, nuestra especialidad" },
  { label: "Fotografía", color: "#9333EA", desc: "Estudio Rivas", tagline: "Cada imagen cuenta tu historia" },
  { label: "Abogados", color: "#475569", desc: "García & Asociados", tagline: "Defensa legal con experiencia y rigor" },
  { label: "Peluquería", color: "#DB2777", desc: "Studio Hair Bcn", tagline: "Donde el estilo cobra vida" },
];

const STEPS = [
  {
    n: "01",
    title: "Describe tu negocio",
    desc: "Escribe 2-3 frases sobre lo que haces, dónde estás y a quién te diriges. Añade fotos si quieres.",
  },
  {
    n: "02",
    title: "Tu web se genera sola",
    desc: "En menos de 30 segundos tienes textos profesionales, estructura, servicios y testimonios adaptados a tu sector.",
  },
  {
    n: "03",
    title: "Edita y comparte",
    desc: "Haz clic en cualquier texto para modificarlo. Ajusta colores. Comparte el enlace con tu cliente al instante.",
  },
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Contenido adaptado a tu sector",
    desc: "Textos, servicios, testimonios y estructura diseñados específicamente para tu tipo de negocio. No plantillas genéricas.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    ),
    title: "Editor visual sin código",
    desc: "Haz clic en cualquier elemento para editarlo en tiempo real. Cambia textos, imágenes y colores sin tocar una línea de código.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: "Identidad de marca completa",
    desc: "Sube tus fotos, elige tu color principal y configura tus datos de contacto. La web refleja exactamente tu imagen.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    title: "Preview compartible al instante",
    desc: "Genera un enlace de preview para enviar a tu cliente. Sin publicar, sin dominio, sin configuración.",
  },
];

const FAQS = [
  {
    q: "¿Qué incluye exactamente la web generada?",
    a: "Una landing page completa con sección hero, servicios, galería de fotos, proceso de trabajo, testimonios y formulario de contacto. Todo con textos profesionales adaptados a tu negocio.",
  },
  {
    q: "¿Necesito saber programar?",
    a: "No. El editor es visual: haz clic en cualquier texto para editarlo, arrastra fotos para cambiarlas, y usa el panel de colores para ajustar la identidad. Nada de código.",
  },
  {
    q: "¿Puedo usarlo para cualquier tipo de negocio?",
    a: "Sí. Restaurantes, clínicas, abogados, peluquerías, gimnasios, fotógrafos, consultoras, tiendas... Funciona para cualquier negocio local o de servicios.",
  },
  {
    q: "¿Cómo publico la web una vez terminada?",
    a: "Exportas la configuración y la web puede publicarse en cualquier servidor de Next.js (Vercel, Netlify). También puedes compartir el enlace de preview con tu cliente directamente.",
  },
  {
    q: "¿El pago es por web o es una suscripción?",
    a: "Pago único de 29€ por cada landing page generada. Sin suscripción, sin cuotas mensuales. Pagas una vez y la web es tuya para siempre.",
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeDemo, setActiveDemo] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Error al crear el pago");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        :root {
          --bg: #080808;
          --fg: #ffffff;
          --muted: rgba(255,255,255,0.38);
          --subtle: rgba(255,255,255,0.07);
          --border: rgba(255,255,255,0.08);
          --accent: #C8A97E;
          --accent-glow: rgba(200,169,126,0.18);
        }

        .page-wrap {
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .serif { font-family: 'Instrument Serif', Georgia, serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          color: #0a0a0a;
          background: var(--fg);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-primary:hover:not(:disabled) {
          background: #e8e8e8;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(255,255,255,0.12);
        }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 13px 20px;
          border-radius: 10px;
          font-weight: 500;
          font-size: 14px;
          color: var(--muted);
          background: transparent;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          text-decoration: none;
        }
        .btn-ghost:hover { color: var(--fg); border-color: rgba(255,255,255,0.2); }

        .demo-pill {
          padding: 7px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          transition: all 0.15s;
        }
        .demo-pill:hover { color: var(--fg); border-color: rgba(255,255,255,0.18); }
        .demo-pill.active { color: var(--fg); }

        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          background: none;
          border: none;
          color: var(--fg);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          gap: 16px;
        }
        .faq-icon { flex-shrink: 0; transition: transform 0.2s; }
        .faq-icon.open { transform: rotate(45deg); }
        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1);
          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }
        .faq-answer.open { max-height: 200px; padding-bottom: 20px; }

        .stat-item + .stat-item {
          border-left: 1px solid var(--border);
        }

        .check-icon {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="page-wrap" style={{ position: "relative", minHeight: "100vh" }}>
        <div className="noise" />

        {/* ── NAV ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          borderBottom: "1px solid var(--border)",
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
                <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.4"/>
                <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.4"/>
                <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.7"/>
              </svg>
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>Landify</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "var(--muted)", display: "none" }} className="sm-visible">29€ por landing</span>
              <a href="/generate" className="btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
                Ya tengo acceso →
              </a>
              <button onClick={handleBuy} disabled={loading} className="btn-primary" style={{ padding: "9px 18px", fontSize: 13, borderRadius: 8 }}>
                {loading ? "Redirigiendo…" : "Crear mi landing"}
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px 80px", textAlign: "center" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            border: "1px solid var(--border)",
            background: "var(--subtle)",
            fontSize: 12, fontWeight: 500, color: "var(--muted)",
            marginBottom: 36, letterSpacing: "0.01em"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Disponible ahora · Resultados en 30 segundos
          </div>

          <h1 className="fade-up delay-1" style={{
            fontSize: "clamp(42px, 8vw, 88px)",
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            marginBottom: 28,
            maxWidth: 900,
            margin: "0 auto 28px",
          }}>
            La web profesional
            <br />
            que tu negocio{" "}
            <span className="serif" style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #E8C97A, #F0D99C, #C8A97E, #E8C97A)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
            }}>
              necesita.
            </span>
          </h1>

          <p className="fade-up delay-2" style={{
            fontSize: 18, lineHeight: 1.7, color: "var(--muted)",
            maxWidth: 520, margin: "0 auto 44px",
            fontWeight: 400,
          }}>
            Describe tu negocio en dos frases. Obtendrás una landing page
            completa y editable lista para compartir con tu cliente.
          </p>

          <div className="fade-up delay-3" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <button onClick={handleBuy} disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                    <path d="M8 2a6 6 0 016 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Redirigiendo…
                </>
              ) : (
                <>
                  Crear mi landing
                  <span style={{ fontWeight: 700, opacity: 0.55 }}>— 29€</span>
                </>
              )}
            </button>
            <a href="/generate" className="btn-ghost">
              Ver ejemplo
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>{error}</p>
          )}

          <p className="fade-up delay-4" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", marginTop: 16 }}>
            Pago seguro con Stripe · Sin suscripción · Factura incluida
          </p>
        </section>

        {/* ── STATS STRIP ── */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{
            maxWidth: 800, margin: "0 auto", padding: "0 24px",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          }}>
            {[
              { value: "+200", label: "webs creadas" },
              { value: "< 30s", label: "tiempo de generación" },
              { value: "100%", label: "sin código" },
            ].map((s) => (
              <div key={s.label} className="stat-item" style={{ padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXAMPLES ── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", textAlign: "center", marginBottom: 14 }}>
            Ejemplos
          </p>
          <h2 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 40 }}>
            Funciona para cualquier negocio
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {DEMOS.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setActiveDemo(i)}
                className={`demo-pill${activeDemo === i ? " active" : ""}`}
                style={activeDemo === i ? { borderColor: d.color, color: d.color, background: `${d.color}12` } : {}}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Browser mockup */}
          <div style={{
            maxWidth: 860, margin: "0 auto",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}>
            {/* Browser chrome */}
            <div style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                  <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.7 }} />
                ))}
              </div>
              <div style={{
                flex: 1, margin: "0 12px", padding: "5px 12px",
                background: "rgba(255,255,255,0.05)", borderRadius: 6,
                fontSize: 11, color: "var(--muted)", textAlign: "center",
              }}>
                {DEMOS[activeDemo].desc.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "")}.com
              </div>
            </div>

            {/* Page preview */}
            <div style={{
              minHeight: 360, padding: "48px 40px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20,
              background: `radial-gradient(ellipse at 50% 0%, ${DEMOS[activeDemo].color}18 0%, transparent 65%)`,
              transition: "background 0.4s ease",
            }}>
              {/* Mock nav */}
              <div style={{ width: "100%", maxWidth: 560, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ width: 80, height: 10, borderRadius: 4, background: "rgba(255,255,255,0.12)" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  {[60,50,60].map((w, i) => <div key={i} style={{ width: w, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.07)" }} />)}
                  <div style={{ width: 70, height: 28, borderRadius: 6, background: DEMOS[activeDemo].color, opacity: 0.85 }} />
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 100,
                  fontSize: 11, fontWeight: 600, marginBottom: 16,
                  background: `${DEMOS[activeDemo].color}20`,
                  color: DEMOS[activeDemo].color,
                  border: `1px solid ${DEMOS[activeDemo].color}40`,
                }}>
                  {DEMOS[activeDemo].label}
                </div>
                <h3 style={{
                  fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.025em",
                  marginBottom: 10, color: "white",
                }}>
                  {DEMOS[activeDemo].desc}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 22 }}>
                  {DEMOS[activeDemo].tagline}
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <div style={{ padding: "10px 22px", borderRadius: 8, background: DEMOS[activeDemo].color, fontSize: 13, fontWeight: 600, color: "white" }}>
                    Contactar
                  </div>
                  <div style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${DEMOS[activeDemo].color}50`, fontSize: 13, color: DEMOS[activeDemo].color }}>
                    Ver servicios
                  </div>
                </div>
              </div>

              {/* Mock content rows */}
              <div style={{ width: "100%", maxWidth: 560, display: "flex", gap: 8, marginTop: 16 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ flex: 1, height: 52, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
            Cómo funciona
          </p>
          <h2 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 64, maxWidth: 420 }}>
            De la idea a la web en tres pasos.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{
                padding: "36px 32px",
                border: "1px solid var(--border)",
                borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : undefined,
                background: "rgba(255,255,255,0.015)",
                position: "relative",
              }}>
                <div className="serif" style={{
                  fontSize: 56, fontStyle: "italic", fontWeight: 400,
                  color: "rgba(255,255,255,0.06)",
                  lineHeight: 1, marginBottom: 20, letterSpacing: "-0.04em",
                }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
            <div style={{ gridColumn: "1/-1", paddingBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
                Qué incluye
              </p>
              <h2 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", maxWidth: 480 }}>
                Todo lo que necesitas, nada de lo que no.
              </h2>
            </div>
            {FEATURES.map((f) => (
              <div key={f.title} style={{
                padding: "32px 36px",
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.015)",
              }}>
                <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="precio" style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
                Precio
              </p>
              <h2 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Sin sorpresas.<br />
                <span className="serif" style={{ fontStyle: "italic", color: "var(--muted)", fontWeight: 400 }}>Sin suscripción.</span>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", maxWidth: 360 }}>
                Pagas una vez por cada landing que creas. La web es tuya para siempre. Sin cuotas mensuales, sin contratos.
              </p>
            </div>

            <div style={{
              border: "1px solid var(--border)",
              borderRadius: 16, padding: "40px 36px",
              background: "rgba(255,255,255,0.025)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>29</span>
                <span style={{ fontSize: 24, fontWeight: 500, color: "var(--muted)", marginBottom: 10 }}>€</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}>por landing page · pago único</p>

              <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  "Landing page completa y personalizada",
                  "Editor visual sin código",
                  "Galería, servicios, testimonios y contacto",
                  "Preview compartible con el cliente",
                  "Exportación de la configuración",
                  "Todos los sectores e idiomas",
                ].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                    <div className="check-icon">
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button onClick={handleBuy} disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "15px 24px" }}>
                {loading ? "Redirigiendo…" : "Crear mi landing — 29€"}
              </button>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 14 }}>
                Pago procesado por Stripe · Factura disponible
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
                FAQ
              </p>
              <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
                Preguntas frecuentes
              </h2>
            </div>
            <div>
              {FAQS.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <svg className={`faq-icon${openFaq === i ? " open" : ""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  <div className={`faq-answer${openFaq === i ? " open" : ""}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{
          borderTop: "1px solid var(--border)",
          background: "radial-gradient(ellipse at 50% 100%, rgba(200,169,126,0.08) 0%, transparent 65%)",
          padding: "96px 24px 112px",
          textAlign: "center",
        }}>
          <h2 className="serif" style={{
            fontSize: "clamp(36px,7vw,72px)",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            lineHeight: 1.05,
          }}>
            Tu negocio merece<br />una web que convierte.
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.7 }}>
            En 30 segundos tienes una landing profesional lista para mostrar a tu cliente.
          </p>
          <button onClick={handleBuy} disabled={loading} className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
            {loading ? "Redirigiendo…" : "Empezar ahora — 29€"}
          </button>
          {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>}
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.7"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity="0.3"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.3"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity="0.5"/>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Landify</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            © 2025 · Hecho con inteligencia artificial
          </p>
          <a href="/generate" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
            Acceder →
          </a>
        </footer>
      </div>
    </>
  );
}
