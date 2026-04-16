"use client";

import { useState, useRef } from "react";

// ─── Demo data — 6 completely different visual structures ─────────────────────
const DEMOS = [
  {
    id: "restaurante",
    label: "Restaurante",
    name: "La Taberna del Puerto",
    tagline: "Cocina de mercado frente al mar",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop",
    primary: "#C2570A",
    bg: "#120A03",
    text: "#FEF3C7",
    muted: "rgba(254,243,199,0.5)",
  },
  {
    id: "gimnasio",
    label: "Gimnasio",
    name: "FitLife Studio",
    tagline: "Entrena sin límites",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&fit=crop",
    primary: "#84CC16",
    bg: "#060606",
    text: "#FFFFFF",
    muted: "rgba(255,255,255,0.45)",
  },
  {
    id: "clinica",
    label: "Clínica",
    name: "Dental Moreira",
    tagline: "Tu sonrisa, nuestra especialidad",
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&q=80&fit=crop",
    primary: "#0284C7",
    bg: "#F0F9FF",
    text: "#0C4A6E",
    muted: "rgba(12,74,110,0.5)",
  },
  {
    id: "fotografia",
    label: "Fotografía",
    name: "Estudio Rivas",
    tagline: "Cada imagen cuenta tu historia",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80&fit=crop",
    primary: "#FAFAFA",
    bg: "#0A0A0A",
    text: "#FFFFFF",
    muted: "rgba(255,255,255,0.38)",
  },
  {
    id: "abogados",
    label: "Abogados",
    name: "García & Asociados",
    tagline: "Defensa legal con rigor y experiencia",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&fit=crop",
    primary: "#C9A84C",
    bg: "#0D1017",
    text: "#F1F0EC",
    muted: "rgba(241,240,236,0.45)",
  },
  {
    id: "peluqueria",
    label: "Peluquería",
    name: "Studio Hair Bcn",
    tagline: "Donde el estilo cobra vida",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&fit=crop",
    primary: "#BE185D",
    bg: "#FFF5F9",
    text: "#1A0510",
    muted: "rgba(26,5,16,0.45)",
  },
];

// ─── 6 unique renderer components ────────────────────────────────────────────

function DemoRestaurante({ d }: { d: typeof DEMOS[0] }) {
  return (
    <div style={{ background: d.bg, fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      {/* Full-bleed image hero with text overlay */}
      <div style={{ position: "relative", height: 220 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.45)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${d.bg} 0%, transparent 60%)` }} />
        {/* Nav overlay */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: d.primary, fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{d.name}</span>
          <div style={{ display: "flex", gap: 12 }}>
            {["Carta","Reservas","Contacto"].map(l => <span key={l} style={{ color: "rgba(255,255,255,.6)", fontSize: 10 }}>{l}</span>)}
          </div>
        </div>
        {/* Hero text */}
        <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <div style={{ fontSize: 8, letterSpacing: ".15em", textTransform: "uppercase", color: d.primary, marginBottom: 6 }}>Abierto desde 1998</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 8 }}>{d.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{d.tagline}</div>
        </div>
      </div>
      {/* Horizontal dish cards */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontSize: 8, letterSpacing: ".15em", textTransform: "uppercase", color: d.primary, marginBottom: 12 }}>Nuestros platos</div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {["Arroz caldoso","Pulpo a la brasa","Lubina salvaje","Tataki de atún"].map((p, i) => (
            <div key={p} style={{ flexShrink: 0, width: 100, borderRadius: 8, overflow: "hidden", border: `1px solid ${d.primary}30`, background: `${d.primary}10` }}>
              <div style={{ height: 55, background: `${d.primary}${18 + i * 8}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 18 }}>🍽</span>
              </div>
              <div style={{ padding: "8px 8px", fontSize: 9, color: d.text }}>{p}</div>
              <div style={{ padding: "0 8px 8px", fontSize: 9, color: d.primary, fontWeight: 700 }}>{12 + i * 3}€</div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats bar */}
      <div style={{ display: "flex", borderTop: `1px solid ${d.primary}25`, margin: "0 20px" }}>
        {[{v:"15",l:"años"},{v:"98%",l:"satisfacción"},{v:"2",l:"estrellas Repsol"}].map(s => (
          <div key={s.l} style={{ flex: 1, padding: "10px 0", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: d.primary }}>{s.v}</div>
            <div style={{ fontSize: 8, color: d.muted }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoGimnasio({ d }: { d: typeof DEMOS[0] }) {
  return (
    <div style={{ background: d.bg, fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      {/* Full-bleed image hero with overlay */}
      <div style={{ position: "relative", height: 200 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(.45) contrast(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${d.bg} 0%, ${d.bg}90 30%, transparent 70%)` }} />
        {/* Nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 900, fontSize: 13, color: d.text, letterSpacing: ".06em", textTransform: "uppercase" }}>{d.name}</span>
          <div style={{ padding: "5px 12px", background: d.primary, fontSize: 9, fontWeight: 800, color: "#060606", borderRadius: 4, letterSpacing: ".05em" }}>ÚNETE</div>
        </div>
        {/* Hero text overlay */}
        <div style={{ position: "absolute", bottom: 20, left: 18, right: "40%" }}>
          <div style={{ fontSize: 8, letterSpacing: ".2em", color: d.primary, textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>Barcelona · 24h</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: d.text, lineHeight: 1.05, letterSpacing: "-.02em", textTransform: "uppercase" }}>
            ENTRENA<br/>SIN LÍMITES
          </div>
        </div>
      </div>
      {/* Metric strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: `2px solid ${d.primary}`, background: d.bg }}>
        {[{v:"+500",l:"Miembros"},{v:"24h",l:"Acceso libre"},{v:"20+",l:"Clases/semana"}].map((m, i) => (
          <div key={m.l} style={{ padding: "12px 0", textAlign: "center", borderRight: i < 2 ? `1px solid rgba(255,255,255,.08)` : "none" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: d.primary, letterSpacing: "-.02em" }}>{m.v}</div>
            <div style={{ fontSize: 9, color: d.muted, marginTop: 2, fontWeight: 500 }}>{m.l}</div>
          </div>
        ))}
      </div>
      {/* Services grid */}
      <div style={{ padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
        {["Entrenamiento personal","Clases grupales","Box & CrossFit","Nutrición deportiva"].map(s => (
          <div key={s} style={{ padding: "9px 12px", border: `1px solid ${d.primary}28`, borderRadius: 6, fontSize: 10, color: d.muted, fontWeight: 500, background: `${d.primary}06` }}>
            <span style={{ color: d.primary, marginRight: 5 }}>▸</span>{s}
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoClinica({ d }: { d: typeof DEMOS[0] }) {
  return (
    <div style={{ background: d.bg, fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      {/* Centered clean nav */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${d.primary}20` }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: d.text }}>{d.name}</span>
        <div style={{ padding: "6px 14px", borderRadius: 6, background: d.primary, fontSize: 10, fontWeight: 600, color: "#fff" }}>Pedir cita</div>
      </div>
      {/* Centered hero — no image */}
      <div style={{ padding: "24px 20px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", gap: 6, padding: "4px 12px", borderRadius: 100, background: `${d.primary}18`, border: `1px solid ${d.primary}35`, marginBottom: 12 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: d.primary, letterSpacing: ".05em" }}>✓ Clínica acreditada · Valencia</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: d.text, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-.01em" }}>
          Tu sonrisa perfecta<br/>empieza aquí
        </div>
        <div style={{ fontSize: 11, color: d.muted, maxWidth: 260, margin: "0 auto 16px" }}>{d.tagline}</div>
        {/* Trust badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          {["ISO 9001","Garantía clínica","+3000 pacientes"].map(b => (
            <div key={b} style={{ padding: "4px 10px", borderRadius: 100, border: `1px solid ${d.primary}30`, fontSize: 9, color: d.primary }}>{b}</div>
          ))}
        </div>
      </div>
      {/* Icon service grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: `${d.primary}15`, borderTop: `1px solid ${d.primary}20` }}>
        {[{icon:"🦷",label:"Ortodoncia"},{icon:"✨",label:"Estética"},{icon:"🔬",label:"Implantes"},{icon:"🚑",label:"Urgencias"}].map(s => (
          <div key={s.label} style={{ background: d.bg, padding: "14px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: d.text }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Booking CTA */}
      <div style={{ padding: "14px 20px", background: d.primary, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Primera consulta gratuita</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)" }}>Te llamamos en menos de 2 horas</div>
        </div>
        <div style={{ padding: "6px 14px", borderRadius: 6, background: "#fff", fontSize: 10, fontWeight: 700, color: d.primary }}>Reservar</div>
      </div>
    </div>
  );
}

function DemoFotografia({ d }: { d: typeof DEMOS[0] }) {
  // Photo-mosaic dominant layout
  const imgs = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=70&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=70&fit=crop",
    "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=300&q=70&fit=crop",
    "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=300&q=70&fit=crop",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&q=70&fit=crop",
  ];
  return (
    <div style={{ background: d.bg, fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      {/* Minimal top nav */}
      <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 400, fontSize: 14, color: d.text, fontStyle: "italic", letterSpacing: ".05em" }}>{d.name}</span>
        <div style={{ display: "flex", gap: 14 }}>
          {["Portfolio","Servicios","Contacto"].map(l => <span key={l} style={{ fontSize: 9, color: d.muted, letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</span>)}
        </div>
      </div>
      {/* Mosaic grid — the hero */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "120px 90px", gap: 2, padding: "0 0 0 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[0]} alt="" style={{ gridRow: "1/3", width: "100%", height: "100%", objectFit: "cover" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[3]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[4]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Bottom editorial strip */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid rgba(255,255,255,.1)` }}>
        <div>
          <div style={{ fontSize: 14, fontStyle: "italic", color: d.text }}>{d.tagline}</div>
          <div style={{ fontSize: 9, color: d.muted, marginTop: 3, letterSpacing: ".1em", textTransform: "uppercase" }}>Sevilla · Bodas · Eventos · Comercial</div>
        </div>
        <div style={{ padding: "8px 16px", border: "1px solid rgba(255,255,255,.25)", fontSize: 10, color: d.text, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Ver portfolio
        </div>
      </div>
    </div>
  );
}

function DemoAbogados({ d }: { d: typeof DEMOS[0] }) {
  return (
    <div style={{ background: d.bg, fontFamily: "'EB Garamond', 'Georgia', serif", overflow: "hidden" }}>
      {/* Header with gold rule */}
      <div style={{ padding: "14px 24px", borderBottom: `1px solid ${d.primary}40`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: d.primary, letterSpacing: ".08em" }}>GARCÍA & ASOCIADOS</div>
          <div style={{ fontSize: 8, color: d.muted, letterSpacing: ".12em", textTransform: "uppercase" }}>Abogados · Fundado en 1992</div>
        </div>
        <div style={{ padding: "6px 14px", border: `1px solid ${d.primary}60`, fontSize: 9, color: d.primary, letterSpacing: ".1em" }}>CONSULTA GRATUITA</div>
      </div>
      {/* 2-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 0 }}>
        <div style={{ padding: "20px 24px", borderRight: `1px solid ${d.primary}25` }}>
          <div style={{ width: 32, height: 1, background: d.primary, marginBottom: 12 }} />
          <div style={{ fontSize: 19, lineHeight: 1.25, color: d.text, marginBottom: 14 }}>
            Protegemos sus derechos con <em style={{ color: d.primary }}>experiencia</em> y rigor jurídico
          </div>
          <div style={{ width: "100%", height: 1, background: `${d.primary}30`, margin: "14px 0" }} />
          {/* Quote */}
          <div style={{ fontSize: 10, fontStyle: "italic", color: d.muted, lineHeight: 1.6, borderLeft: `2px solid ${d.primary}`, paddingLeft: 10 }}>
            "Más de 1200 casos resueltos con éxito. Defensa legal que marca la diferencia."
          </div>
        </div>
        <div style={{ padding: "20px 20px" }}>
          <div style={{ fontSize: 8, letterSpacing: ".12em", textTransform: "uppercase", color: d.primary, marginBottom: 12 }}>Áreas de práctica</div>
          {["Derecho laboral","Derecho mercantil","Familia y herencias","Derecho penal","Inmobiliario"].map((s, i) => (
            <div key={s} style={{ padding: "8px 0", borderBottom: `1px solid ${d.primary}18`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: d.text }}>{s}</span>
              <span style={{ fontSize: 8, color: d.primary }}>{"I".repeat(i % 3 + 1)}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Stats footer */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: `${d.primary}10`, borderTop: `1px solid ${d.primary}25` }}>
        {[{v:"95%",l:"Éxito en juicios"},{v:"+1200",l:"Casos resueltos"},{v:"30",l:"Años de trayectoria"}].map(s => (
          <div key={s.l} style={{ padding: "10px 0", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: d.primary }}>{s.v}</div>
            <div style={{ fontSize: 8, color: d.muted, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoPeluqueria({ d }: { d: typeof DEMOS[0] }) {
  return (
    <div style={{ background: d.bg, fontFamily: "'Cormorant Garamond', 'Georgia', serif", overflow: "hidden" }}>
      {/* Magazine split: top image with diagonal overlay */}
      <div style={{ position: "relative", height: 180 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "brightness(.75) saturate(1.1)" }} />
        {/* Diagonal text panel */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: `linear-gradient(to top, ${d.bg} 30%, transparent 100%)`,
          padding: "30px 22px 14px",
        }}>
          <div style={{ fontSize: 8, letterSpacing: ".2em", textTransform: "uppercase", color: d.primary, marginBottom: 6 }}>Studio · Barcelona</div>
          <div style={{ fontSize: 26, fontStyle: "italic", color: d.text, lineHeight: 1.05 }}>{d.name}</div>
        </div>
        {/* Top nav */}
        <div style={{ position: "absolute", top: 12, right: 16 }}>
          <div style={{ padding: "6px 14px", background: d.primary, borderRadius: 4, fontSize: 9, fontWeight: 700, color: "#fff" }}>Reservar cita</div>
        </div>
      </div>
      {/* Tagline + service pills */}
      <div style={{ padding: "12px 20px" }}>
        <div style={{ fontSize: 12, fontStyle: "italic", color: d.muted, marginBottom: 12 }}>{d.tagline}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Corte & Peinado","Coloración","Tratamientos","Extensiones","Alisado","Mechas"].map(s => (
            <div key={s} style={{ padding: "5px 12px", borderRadius: 100, border: `1px solid ${d.primary}50`, fontSize: 9, color: d.text }}>{s}</div>
          ))}
        </div>
      </div>
      {/* Team / social proof */}
      <div style={{ padding: "10px 20px 14px", borderTop: `1px solid ${d.primary}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: -6 }}>
          {["BE","MR","CL","AN"].map((i, idx) => (
            <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: `${d.primary}${60 + idx * 15}`, border: `2px solid ${d.bg}`, marginLeft: idx > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>{i}</div>
          ))}
          <span style={{ fontSize: 9, color: d.muted, marginLeft: 8 }}>10 especialistas</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 10, color: d.primary }}>★</span>)}
          <span style={{ fontSize: 9, color: d.muted, marginLeft: 4 }}>4.9 · Google</span>
        </div>
      </div>
    </div>
  );
}

const DEMO_RENDERERS = [DemoRestaurante, DemoGimnasio, DemoClinica, DemoFotografia, DemoAbogados, DemoPeluqueria];

// ─── Main page ────────────────────────────────────────────────────────────────

// Color is auto-determined by the AI based on business type

export default function HomePage() {
  const [buyLoading, setBuyLoading] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [activeDemo, setActiveDemo] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleBuy = async () => {
    setBuyLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Error al crear el pago");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setBuyLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) { setError("Describe tu negocio primero"); return; }
    setGenLoading(true);
    setError("");
    setGenStep(0);
    const steps = [400, 900, 1700, 2800];
    steps.forEach((ms, i) => setTimeout(() => setGenStep(i + 1), ms));
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, images }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      localStorage.setItem(`site-config-${data.id}`, JSON.stringify(data.config));
      window.location.href = `/preview?id=${data.id}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error generando la landing");
      setGenLoading(false);
    }
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 5 - images.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) setImages(prev => [...prev, e.target!.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  };

  const DemoRenderer = DEMO_RENDERERS[activeDemo];

  const STEPS_GEN = ["Analizando tu negocio","Diseñando estructura","Generando contenido","Finalizando detalles"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        *{box-sizing:border-box}
        :root{--bg:#080808;--fg:#fff;--muted:rgba(255,255,255,.38);--border:rgba(255,255,255,.08);--subtle:rgba(255,255,255,.04)}
        body{background:var(--bg);color:var(--fg);font-family:var(--font-geist-sans),system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .serif{font-family:'Instrument Serif',Georgia,serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .fu{animation:fadeUp .65s cubic-bezier(.16,1,.3,1) both}
        .d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}
        .btn-w{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:9px;font-weight:600;font-size:15px;color:#080808;background:#fff;border:none;cursor:pointer;transition:all .15s;white-space:nowrap}
        .btn-w:hover:not(:disabled){background:#e8e8e8;transform:translateY(-1px)}
        .btn-w:disabled{opacity:.5;cursor:not-allowed}
        .btn-o{display:inline-flex;align-items:center;gap:6px;padding:11px 18px;border-radius:9px;font-weight:500;font-size:14px;color:var(--muted);background:transparent;border:1px solid var(--border);cursor:pointer;transition:all .15s;text-decoration:none}
        .btn-o:hover{color:var(--fg);border-color:rgba(255,255,255,.22)}
        .pill{padding:6px 14px;border-radius:100px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--muted);transition:all .15s;font-family:inherit}
        .pill:hover{color:var(--fg)}
        .faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:20px 0;background:none;border:none;color:var(--fg);font-size:15px;font-weight:500;cursor:pointer;text-align:left;gap:16px;font-family:inherit}
        .faq-a{overflow:hidden;max-height:0;transition:max-height .28s ease;color:var(--muted);font-size:14px;line-height:1.75}
        .faq-a.open{max-height:160px;padding-bottom:18px}
        .faq-ico{flex-shrink:0;transition:transform .2s}
        .faq-ico.r{transform:rotate(45deg)}
        .swatch{width:26px;height:26px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform .12s}
        .swatch:hover{transform:scale(1.15)}
        .swatch.sel{outline:2px solid #fff;outline-offset:2px}
        .gen-overlay{position:fixed;inset:0;z-index:200;background:rgba(8,8,8,.92);backdrop-filter:blur(12px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;animation:fadeIn .2s ease}
        @media(max-width:768px){.hide-m{display:none!important}.grid2{grid-template-columns:1fr!important}.grid3{grid-template-columns:1fr!important}}
      `}</style>

      {/* ── GENERATING OVERLAY ── */}
      {genLoading && (
        <div className="gen-overlay">
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <svg style={{ position: "absolute", inset: 0, animation: "spin 1.2s linear infinite" }} viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,.08)" strokeWidth="3"/>
              <path d="M40 6a34 34 0 0134 34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".9"/>
                <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
                <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
                <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".65"/>
              </svg>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>Creando tu landing page…</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Esto tarda unos 20-30 segundos</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 260 }}>
            {STEPS_GEN.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, opacity: genStep > i ? 1 : 0.25, transition: "opacity .4s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: genStep > i ? "#fff" : "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .3s" }}>
                  {genStep > i && <svg width="9" height="9" fill="none" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#080808" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: 13, color: genStep > i ? "#fff" : "var(--muted)", transition: "color .3s" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--border)", background: "rgba(8,8,8,.88)", backdropFilter: "blur(16px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".9"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".65"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-.02em" }}>Landify</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/generate" className="btn-o hide-m" style={{ padding: "7px 14px", fontSize: 13 }}>Ya generé una landing →</a>
            <button onClick={handleBuy} disabled={buyLoading} className="btn-w" style={{ padding: "8px 18px", fontSize: 13, borderRadius: 8 }}>
              {buyLoading ? "Redirigiendo…" : "Comprar acceso — 29€"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO + FORM ── */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
        <h1 className="fu" style={{ fontSize: "clamp(42px,8vw,88px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.04em", marginBottom: 20 }}>
          La landing page<br/>
          de tu negocio,{" "}
          <span className="serif" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-.01em" }}>
            en segundos
          </span>
        </h1>
        <p className="fu d1" style={{ fontSize: 17, color: "var(--muted)", marginBottom: 44, lineHeight: 1.7, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          Descríbenos tu negocio. Generamos la landing gratis.<br/>Págala solo si te convence — 29€ pago único.
        </p>

        {/* ─ THE FORM ─ */}
        <div className="fu d2" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 18, overflow: "hidden", textAlign: "left", boxShadow: "0 0 0 1px rgba(255,255,255,.04), 0 24px 64px rgba(0,0,0,.4)" }}>
          {/* Label bar */}
          <div style={{ padding: "14px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.3)", letterSpacing: ".04em", textTransform: "uppercase" }}>Describe tu negocio</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.18)" }}>{prompt.length}/600</span>
          </div>
          {/* Textarea */}
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value.slice(0, 600))}
            placeholder="Ej: Somos una clínica dental en Valencia especializada en ortodoncia invisible. Atendemos familias y adultos que buscan resultados rápidos y discretos..."
            rows={5}
            style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: 16, color: "#fff", lineHeight: 1.7, fontFamily: "inherit", padding: "12px 20px 16px" }}
          />
          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
          {/* Bottom controls */}
          <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Image upload */}
              <button
                onClick={() => fileRef.current?.click()}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                {images.length > 0 ? `${images.length} foto${images.length > 1 ? "s" : ""} adjunta${images.length > 1 ? "s" : ""}` : "Adjuntar fotos"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleImages(e.target.files)} />
              {images.length > 0 && (
                <button onClick={() => setImages([])} style={{ fontSize: 12, color: "rgba(255,255,255,.3)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>× Quitar</button>
              )}
            </div>
            {/* Generate */}
            <button onClick={handleGenerate} disabled={genLoading || !prompt.trim()} className="btn-w" style={{ borderRadius: 9, padding: "10px 22px", fontSize: 14 }}>
              {genLoading ? "Generando…" : "Generar mi landing →"}
            </button>
          </div>
          {error && <div style={{ padding: "0 20px 14px", color: "#f87171", fontSize: 13 }}>{error}</div>}
        </div>

        <p className="fu d3" style={{ fontSize: 12, color: "rgba(255,255,255,.18)", marginTop: 16 }}>
          Sin tarjeta · Generación gratuita · Pagas solo si te gusta
        </p>
      </section>

      {/* ── EXAMPLES ── */}
      <section style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", textAlign: "center", marginBottom: 12 }}>Ejemplos</p>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, letterSpacing: "-.03em", textAlign: "center", marginBottom: 8 }}>
          Cada negocio, un estilo propio
        </h2>
        <p style={{ fontSize: 14, color: "var(--muted)", textAlign: "center", marginBottom: 36 }}>No hay dos landings iguales. La IA adapta estructura, tipografía y contenido al sector.</p>

        {/* Selector pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          {DEMOS.map((d, i) => (
            <button key={d.id} onClick={() => setActiveDemo(i)} className="pill"
              style={activeDemo === i ? { borderColor: d.primary, color: d.primary, background: `${d.primary}14` } : {}}>
              {d.label}
            </button>
          ))}
        </div>

        {/* Browser chrome + demo */}
        <div style={{ maxWidth: 860, margin: "0 auto", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.02)" }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: .7 }}/>)}
            </div>
            <div style={{ flex: 1, margin: "0 12px", padding: "4px 12px", background: "rgba(255,255,255,.05)", borderRadius: 5, fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
              {DEMOS[activeDemo].name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}.com
            </div>
          </div>
          <DemoRenderer d={DEMOS[activeDemo]} />
          {/* CTA bar */}
          <div style={{ padding: "12px 20px", background: "rgba(255,255,255,.025)", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>¿Así de buena quieres tu web? <span style={{ color: "var(--fg)" }}>Pruébalo gratis.</span></span>
            <button onClick={() => { setPrompt(""); document.querySelector("textarea")?.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn-w" style={{ padding: "7px 18px", fontSize: 13, borderRadius: 8 }}>
              Crear la mía gratis →
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Cómo funciona</p>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, letterSpacing: "-.03em", marginBottom: 52, maxWidth: 400 }}>Simple. Rápido. Sin riesgo.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }} className="grid3">
          {[
            { n: "01", title: "Describe tu negocio", desc: "Escribe 2-3 frases sobre lo que haces. Añade fotos si quieres. Sin formularios complicados." },
            { n: "02", title: "Ves el resultado al instante", desc: "En 30 segundos tienes una landing completa: textos, servicios, galería y contacto adaptados a tu sector." },
            { n: "03", title: "Págala solo si te convence", desc: "Revisa la web. Edita lo que quieras. Si te gusta, paga 29€ y es tuya para siempre." },
          ].map((s, i) => (
            <div key={s.n} style={{ padding: "32px 30px", border: "1px solid var(--border)", borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : undefined, background: "var(--subtle)" }}>
              <div className="serif" style={{ fontSize: 52, fontStyle: "italic", color: "rgba(255,255,255,.05)", lineHeight: 1, marginBottom: 18, letterSpacing: "-.04em" }}>{s.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="precio" style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid2">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Precio</p>
            <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, letterSpacing: "-.03em", marginBottom: 16 }}>
              Genera gratis.<br/>
              <span className="serif" style={{ fontStyle: "italic", color: "var(--muted)", fontWeight: 400 }}>Paga si te gusta.</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", maxWidth: 340 }}>
              No hay suscripciones. No hay riesgo. Generates tu landing, la ves, la personalizas, y solo pagas si te convence.
            </p>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "36px 32px", background: "var(--subtle)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 60, fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1 }}>29</span>
              <span style={{ fontSize: 22, fontWeight: 500, color: "var(--muted)", marginBottom: 9 }}>€</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>pago único · por landing page</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {["Generación gratuita — ves antes de pagar","Editor visual completo sin código","Textos y estructura adaptados a tu sector","Galería, servicios, testimonios y contacto","Preview compartible con tu cliente","Todos los idiomas y sectores"].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "rgba(255,255,255,.7)" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="8" height="8" fill="none" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={handleBuy} disabled={buyLoading} className="btn-w" style={{ width: "100%", justifyContent: "center", padding: "14px", borderRadius: 10 }}>
              {buyLoading ? "Redirigiendo…" : "Comprar acceso — 29€"}
            </button>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.18)", textAlign: "center", marginTop: 12 }}>Stripe · Sin suscripción · Factura disponible</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ borderTop: "1px solid var(--border)", maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }} className="grid2">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, letterSpacing: "-.03em" }}>Preguntas frecuentes</h2>
          </div>
          <div>
            {[
              { q: "¿De verdad puedo ver la web antes de pagar?", a: "Sí. La generación es completamente gratuita. Ves el resultado completo antes de decidir si pagas." },
              { q: "¿Qué pasa si no me gusta el resultado?", a: "No pagas nada. Si el resultado no te convence, no hay ningún cargo. Puedes volver a intentarlo con una descripción diferente." },
              { q: "¿Funciona para cualquier tipo de negocio?", a: "Sí. Restaurantes, clínicas, abogados, gimnasios, peluquerías, fotógrafos, consultoras... cualquier negocio local o de servicios." },
              { q: "¿Qué incluye el pago de 29€?", a: "Acceso al editor visual completo para personalizar todos los textos, imágenes y colores. También el preview compartible con tu cliente y la exportación de la configuración." },
              { q: "¿Cómo se publica la web?", a: "Exportas la configuración y la publicas en Vercel o Netlify (ambos gratuitos para proyectos pequeños). También puedes compartir el enlace de preview directamente." },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg className={`faq-ico${openFaq === i ? " r" : ""}`} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                  </svg>
                </button>
                <div className={`faq-a${openFaq === i ? " open" : ""}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ borderTop: "1px solid var(--border)", background: "radial-gradient(ellipse at 50% 100%, rgba(200,169,126,.07) 0%, transparent 60%)", padding: "80px 24px 100px", textAlign: "center" }}>
        <h2 className="serif" style={{ fontSize: "clamp(32px,6vw,64px)", fontStyle: "italic", fontWeight: 400, letterSpacing: "-.03em", marginBottom: 18, lineHeight: 1.06 }}>
          Pruébalo ahora.<br/>Es gratis.
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Describe tu negocio y en 30 segundos ves tu landing. Sin tarjeta de crédito.
        </p>
        <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => document.querySelector("textarea")?.focus(), 600); }} className="btn-w" style={{ fontSize: 16, padding: "15px 34px" }}>
          Generar mi landing gratis →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".7"/>
            <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".3"/>
            <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".3"/>
            <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".5"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Landify</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>© 2025 Landify</p>
        <a href="/generate" style={{ fontSize: 12, color: "rgba(255,255,255,.25)", textDecoration: "none" }}>Acceder →</a>
      </footer>
    </>
  );
}
