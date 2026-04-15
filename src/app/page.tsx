"use client";

import { useState } from "react";

const DEMOS = [
  { label: "Restaurante", color: "#B45309", desc: "La Taberna del Puerto" },
  { label: "Gimnasio", color: "#16A34A", desc: "FitLife Studio" },
  { label: "Clínica", color: "#0891B2", desc: "Clínica Dental Moreira" },
  { label: "Fotografía", color: "#C15B3A", desc: "Estudio Rivas" },
  { label: "Abogados", color: "#334155", desc: "García & Asociados" },
  { label: "Peluquería", color: "#DB2777", desc: "Studio Hair Bcn" },
];

const FEATURES = [
  { icon: "✦", title: "IA que entiende tu negocio", desc: "Describe en 2 líneas qué haces y Claude genera textos, estructura y contenido perfectamente adaptados." },
  { icon: "⬡", title: "Editor visual onsite", desc: "Haz clic en cualquier texto o imagen para editarlo directamente. Sin código, sin paneles complicados." },
  { icon: "◈", title: "Colores e identidad propia", desc: "Cambia el color principal, el fondo y los datos de contacto con un panel lateral en segundos." },
  { icon: "↗", title: "Lista para publicar", desc: "Exporta la configuración, comparte el preview con tu cliente y publica cuando estés listo." },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeDemo, setActiveDemo] = useState(0);

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
    <div style={{ background: "#0B0906", fontFamily: "var(--font-geist-sans)", color: "white" }}>

      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span style={{ color: "#C15B3A", fontSize: 20 }}>✦</span>
          <span className="font-bold text-base tracking-tight">LandingAI</span>
        </div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="text-xs font-bold px-4 py-2 rounded-full transition-all"
          style={{ background: "#C15B3A", color: "white" }}
        >
          Empezar — 10€
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
          style={{ background: "rgba(193,91,58,0.15)", color: "#E8846A", border: "1px solid rgba(193,91,58,0.3)" }}
        >
          ✦ Powered by Claude AI · Genera en &lt;30 segundos
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          La landing page
          <br />
          de tu negocio,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #C15B3A, #E8846A, #FFB89E, #E8846A, #C15B3A)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            en segundos
          </span>
        </h1>

        <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          Describe tu negocio. La IA genera una web profesional completa —
          textos, estructura, colores — lista para editar y publicar.
          Sin código. Sin diseñador.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={handleBuy}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-60 w-full sm:w-auto justify-center"
            style={{
              background: "linear-gradient(135deg, #C15B3A 0%, #A84B2C 100%)",
              boxShadow: "0 4px 32px rgba(193,91,58,0.4)",
              color: "white",
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Redirigiendo…
              </>
            ) : (
              <>Empezar ahora — <strong>10€ acceso único</strong></>
            )}
          </button>
          <a
            href="/generate"
            className="text-sm font-medium transition-colors px-4 py-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            Ya tengo acceso →
          </a>
        </div>

        {error && (
          <p className="text-sm" style={{ color: "#F87171" }}>{error}</p>
        )}

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Pago seguro con Stripe · Acceso de por vida · Sin suscripción
        </p>
      </section>

      {/* ── DEMO PILLS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-center text-xs font-semibold tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.25)" }}>
          Funciona para cualquier tipo de negocio
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {DEMOS.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setActiveDemo(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: activeDemo === i ? d.color : "rgba(255,255,255,0.05)",
                color: activeDemo === i ? "white" : "rgba(255,255,255,0.45)",
                border: `1px solid ${activeDemo === i ? d.color : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: activeDemo === i ? "white" : d.color }} />
              {d.label}
            </button>
          ))}
        </div>

        {/* Mock browser */}
        <div
          className="rounded-2xl overflow-hidden mx-auto max-w-4xl"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex gap-1.5">
              {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div
              className="flex-1 mx-3 rounded-md px-3 py-1 text-xs text-center"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }}
            >
              landingai.app/{DEMOS[activeDemo].label.toLowerCase()}
            </div>
          </div>
          <div
            className="p-8 min-h-[320px] flex flex-col items-center justify-center gap-4 transition-all duration-500"
            style={{ background: `radial-gradient(circle at 60% 40%, ${DEMOS[activeDemo].color}12 0%, transparent 60%)` }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${DEMOS[activeDemo].color}20`, color: DEMOS[activeDemo].color, border: `1px solid ${DEMOS[activeDemo].color}40` }}
            >
              ✦ {DEMOS[activeDemo].label} · Generado con IA
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-center" style={{ color: "white", letterSpacing: "-0.02em" }}>
              {DEMOS[activeDemo].desc}
            </h2>
            <p className="text-sm text-center max-w-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Landing page profesional generada en segundos,<br />lista para publicar y personalizar.
            </p>
            <div className="flex gap-3 mt-2">
              <div className="px-5 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: DEMOS[activeDemo].color }}>
                Contactar
              </div>
              <div className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ border: `1px solid ${DEMOS[activeDemo].color}50`, color: DEMOS[activeDemo].color }}>
                Ver servicios
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Cómo funciona</p>
        <h2 className="text-4xl font-bold text-center mb-16" style={{ letterSpacing: "-0.02em" }}>
          Tres pasos. Menos de un minuto.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Describe tu negocio", desc: "2-3 frases sobre qué haces, dónde estás y a quién te diriges. Puedes añadir fotos tuyas." },
            { n: "02", title: "La IA lo genera", desc: "Claude crea textos, estructura, servicios, testimonios y diseño adaptados a tu sector." },
            { n: "03", title: "Edita y publica", desc: "Haz clic en cualquier texto para cambiarlo. Ajusta colores. Comparte el enlace con tu cliente." },
          ].map(s => (
            <div key={s.n} className="flex flex-col gap-4">
              <span className="text-5xl font-bold" style={{ color: "rgba(255,255,255,0.07)", letterSpacing: "-0.04em" }}>{s.n}</span>
              <h3 className="text-lg font-semibold" style={{ color: "white" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-2xl" style={{ color: "#C15B3A" }}>{f.icon}</span>
              <h3 className="font-semibold text-base" style={{ color: "white" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="max-w-md mx-auto px-6 py-24 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} id="precio">
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>Precio</p>
        <h2 className="text-4xl font-bold mb-12" style={{ letterSpacing: "-0.02em" }}>Sin sorpresas.</h2>

        <div
          className="rounded-3xl p-8 mb-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="text-6xl font-bold" style={{ letterSpacing: "-0.04em" }}>10</span>
            <span className="text-2xl font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>€</span>
          </div>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>Pago único · Acceso de por vida</p>

          <ul className="flex flex-col gap-3 text-left mb-8">
            {[
              "Genera landing pages ilimitadas",
              "Editor visual onsite completo",
              "Panel de identidad de marca",
              "Exportar configuración JSON",
              "Preview compartible con clientes",
              "Todos los sectores y idiomas",
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#C15B3A" }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.5 1.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #C15B3A 0%, #A84B2C 100%)",
              color: "white",
              boxShadow: "0 4px 24px rgba(193,91,58,0.4)",
            }}
          >
            {loading ? "Redirigiendo…" : "Comprar acceso — 10€"}
          </button>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Pago procesado por Stripe · Factura disponible · Sin suscripción
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 px-6 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <span style={{ color: "#C15B3A" }}>✦</span>
          <span className="text-sm font-semibold">LandingAI</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Generado con Claude AI · Powered by Anthropic
        </p>
        <a href="/generate" className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Acceder →
        </a>
      </footer>
    </div>
  );
}
