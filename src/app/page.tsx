"use client";

import { useState } from "react";

const DEMOS = [
  {
    label: "Restaurante",
    name: "La Taberna del Puerto",
    tagline: "Cocina de mercado en el corazón del puerto",
    theme: {
      bg: "#1C1209",
      primary: "#D97706",
      text: "#FEF3C7",
      muted: "rgba(254,243,199,0.5)",
      accent: "#F59E0B",
    },
    heroImg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop",
    services: ["Cocina de mercado", "Menú degustación", "Vinos selección", "Eventos privados"],
    stats: [{ v: "15", l: "años de historia" }, { v: "98%", l: "clientes satisfechos" }, { v: "2", l: "estrellas Repsol" }],
    font: "'Playfair Display', Georgia, serif",
    badge: "Restaurante · Madrid",
  },
  {
    label: "Gimnasio",
    name: "FitLife Studio",
    tagline: "Entrena con propósito. Vive con energía.",
    theme: {
      bg: "#0A0A0A",
      primary: "#84CC16",
      text: "#FFFFFF",
      muted: "rgba(255,255,255,0.5)",
      accent: "#A3E635",
    },
    heroImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&fit=crop",
    services: ["Entrenamiento personal", "Clases grupales", "Nutrición", "Zona CrossFit"],
    stats: [{ v: "+500", l: "miembros activos" }, { v: "24h", l: "acceso libre" }, { v: "20+", l: "clases semanales" }],
    font: "'Barlow Condensed', Impact, sans-serif",
    badge: "Gimnasio · Barcelona",
  },
  {
    label: "Clínica",
    name: "Dental Moreira",
    tagline: "Tu sonrisa, nuestra especialidad",
    theme: {
      bg: "#F0F9FF",
      primary: "#0284C7",
      text: "#0C4A6E",
      muted: "rgba(12,74,110,0.5)",
      accent: "#0EA5E9",
    },
    heroImg: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&q=80&fit=crop",
    services: ["Ortodoncia invisible", "Implantes dentales", "Estética dental", "Urgencias 24h"],
    stats: [{ v: "+3000", l: "pacientes" }, { v: "12", l: "años de experiencia" }, { v: "100%", l: "garantía clínica" }],
    font: "system-ui, sans-serif",
    badge: "Clínica Dental · Valencia",
  },
  {
    label: "Fotografía",
    name: "Estudio Rivas",
    tagline: "Cada imagen cuenta tu historia",
    theme: {
      bg: "#0D0D0D",
      primary: "#F5F5F5",
      text: "#FFFFFF",
      muted: "rgba(255,255,255,0.4)",
      accent: "#E5E5E5",
    },
    heroImg: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&q=80&fit=crop",
    services: ["Bodas & eventos", "Fotografía comercial", "Retratos", "Edición avanzada"],
    stats: [{ v: "+400", l: "bodas fotografiadas" }, { v: "8", l: "años de experiencia" }, { v: "5★", l: "valoración media" }],
    font: "'DM Serif Display', Georgia, serif",
    badge: "Fotografía · Sevilla",
  },
  {
    label: "Abogados",
    name: "García & Asociados",
    tagline: "Defensa legal con experiencia y rigor",
    theme: {
      bg: "#0F172A",
      primary: "#B8960C",
      text: "#F8FAFC",
      muted: "rgba(248,250,252,0.45)",
      accent: "#D4A820",
    },
    heroImg: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&fit=crop",
    services: ["Derecho laboral", "Derecho mercantil", "Familia y herencias", "Penal"],
    stats: [{ v: "+1200", l: "casos resueltos" }, { v: "20", l: "años de trayectoria" }, { v: "95%", l: "éxito en juicios" }],
    font: "'EB Garamond', Georgia, serif",
    badge: "Despacho de Abogados · Bilbao",
  },
  {
    label: "Peluquería",
    name: "Studio Hair Bcn",
    tagline: "Donde el estilo cobra vida",
    theme: {
      bg: "#FDF2F8",
      primary: "#BE185D",
      text: "#1F0A14",
      muted: "rgba(31,10,20,0.45)",
      accent: "#DB2777",
    },
    heroImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&fit=crop",
    services: ["Corte & peinado", "Coloración", "Tratamientos", "Extensiones"],
    stats: [{ v: "+800", l: "clientas fieles" }, { v: "10", l: "especialistas" }, { v: "4.9★", l: "en Google" }],
    font: "'Cormorant Garamond', Georgia, serif",
    badge: "Peluquería · Barcelona",
  },
];

const STEPS = [
  { n: "01", title: "Describe tu negocio", desc: "Escribe 2-3 frases sobre lo que haces, dónde estás y a quién te diriges. Añade fotos si quieres." },
  { n: "02", title: "Tu web se genera sola", desc: "En menos de 30 segundos tienes textos, estructura, servicios y testimonios adaptados a tu sector." },
  { n: "03", title: "Edita y comparte", desc: "Haz clic en cualquier texto para modificarlo. Ajusta colores. Comparte el enlace con tu cliente." },
];

const FAQS = [
  { q: "¿Qué incluye exactamente?", a: "Una landing page completa: hero, servicios, galería, proceso, testimonios y contacto. Todo con textos profesionales adaptados a tu negocio." },
  { q: "¿Necesito saber programar?", a: "No. El editor es 100% visual: clic en cualquier texto para editarlo, arrastra fotos, ajusta colores desde un panel lateral." },
  { q: "¿Funciona para cualquier negocio?", a: "Sí. Restaurantes, clínicas, abogados, peluquerías, gimnasios, fotógrafos, consultoras... cualquier negocio local o de servicios." },
  { q: "¿Cómo publico la web?", a: "Exportas la configuración y la publicas en Vercel o Netlify (gratis). También puedes compartir el enlace de preview directamente con tu cliente." },
  { q: "¿El pago es por web o suscripción?", a: "Pago único de 29€ por landing. Sin suscripción, sin cuotas. Pagas una vez y la web es tuya para siempre." },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeDemo, setActiveDemo] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

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

  const demo = DEMOS[activeDemo];
  const previewDemo = DEMOS[previewIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:wght@400;700&family=Barlow+Condensed:wght@700;900&family=DM+Serif+Display:ital@1&family=EB+Garamond:ital,wght@0,400;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
        :root {
          --bg: #080808; --fg: #fff;
          --muted: rgba(255,255,255,0.38);
          --border: rgba(255,255,255,0.08);
          --subtle: rgba(255,255,255,0.04);
        }
        *{box-sizing:border-box;margin:0;padding:0}
        .pw{background:var(--bg);color:var(--fg);font-family:var(--font-geist-sans),system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .serif{font-family:'Instrument Serif',Georgia,serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .fu{animation:fadeUp 0.7s cubic-bezier(.16,1,.3,1) both}
        .d1{animation-delay:.08s}.d2{animation-delay:.16s}.d3{animation-delay:.24s}.d4{animation-delay:.32s}
        .btn-w{display:inline-flex;align-items:center;gap:9px;padding:13px 26px;border-radius:9px;font-weight:600;font-size:15px;color:#080808;background:#fff;border:none;cursor:pointer;transition:all .15s;white-space:nowrap}
        .btn-w:hover:not(:disabled){background:#e8e8e8;transform:translateY(-1px);box-shadow:0 8px 32px rgba(255,255,255,.1)}
        .btn-w:disabled{opacity:.5;cursor:not-allowed}
        .btn-o{display:inline-flex;align-items:center;gap:6px;padding:12px 20px;border-radius:9px;font-weight:500;font-size:14px;color:var(--muted);background:transparent;border:1px solid var(--border);cursor:pointer;transition:all .15s;text-decoration:none}
        .btn-o:hover{color:var(--fg);border-color:rgba(255,255,255,.22)}
        .pill{padding:7px 15px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--muted);transition:all .15s}
        .pill:hover{color:var(--fg);border-color:rgba(255,255,255,.2)}
        .stat-sep+.stat-sep{border-left:1px solid var(--border)}
        .faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:21px 0;background:none;border:none;color:var(--fg);font-size:15px;font-weight:500;cursor:pointer;text-align:left;gap:16px}
        .faq-a{overflow:hidden;max-height:0;transition:max-height .3s cubic-bezier(.4,0,.2,1);color:var(--muted);font-size:14px;line-height:1.75}
        .faq-a.open{max-height:180px;padding-bottom:20px}
        .faq-icon{flex-shrink:0;transition:transform .2s}
        .faq-icon.r{transform:rotate(45deg)}
        .modal-overlay{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);animation:fadeIn .2s ease}
        .modal-inner{position:fixed;inset:0;z-index:101;overflow-y:auto}
        .preview-page{min-height:100vh;font-family:var(--font-geist-sans),system-ui,sans-serif}
        @media(max-width:768px){
          .hide-mobile{display:none!important}
          .grid-2{grid-template-columns:1fr!important}
          .grid-3{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){
          .hide-desktop{display:none!important}
        }
      `}</style>

      <div className="pw">

        {/* ── NAV ── */}
        <nav style={{ position:"sticky",top:0,zIndex:50,borderBottom:"1px solid var(--border)",background:"rgba(8,8,8,.88)",backdropFilter:"blur(16px)" }}>
          <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
            <div style={{ display:"flex",alignItems:"center",gap:9 }}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".9"/>
                <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
                <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
                <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".65"/>
              </svg>
              <span style={{ fontWeight:700,fontSize:15,letterSpacing:"-.02em" }}>Landify</span>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <a href="/generate" className="btn-o" style={{ padding:"8px 14px",fontSize:13 }}>Ya tengo acceso →</a>
              <button onClick={handleBuy} disabled={loading} className="btn-w" style={{ padding:"9px 18px",fontSize:13,borderRadius:8 }}>
                {loading ? "Redirigiendo…" : "Crear mi landing"}
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ maxWidth:1100,margin:"0 auto",padding:"96px 24px 80px",textAlign:"center" }}>
          <div className="fu" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:100,border:"1px solid var(--border)",background:"var(--subtle)",fontSize:12,fontWeight:500,color:"var(--muted)",marginBottom:36 }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block" }}/>
            Disponible ahora · Resultados en 30 segundos
          </div>
          <h1 className="fu d1" style={{ fontSize:"clamp(42px,8vw,88px)",fontWeight:700,lineHeight:1.02,letterSpacing:"-.04em",marginBottom:28,maxWidth:900,marginLeft:"auto",marginRight:"auto" }}>
            La web profesional<br/>que tu negocio{" "}
            <span className="serif" style={{ fontStyle:"italic",background:"linear-gradient(90deg,#E8C97A,#F0D99C,#C8A97E,#E8C97A)",backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 5s linear infinite" }}>
              necesita.
            </span>
          </h1>
          <p className="fu d2" style={{ fontSize:18,lineHeight:1.7,color:"var(--muted)",maxWidth:520,margin:"0 auto 44px" }}>
            Describe tu negocio en dos frases. Obtendrás una landing page completa y editable lista para compartir con tu cliente.
          </p>
          <div className="fu d3" style={{ display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:12,marginBottom:20 }}>
            <button onClick={handleBuy} disabled={loading} className="btn-w">
              {loading ? (<><svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(0,0,0,.2)" strokeWidth="2"/><path d="M8 2a6 6 0 016 6" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>Redirigiendo…</>) : (<>Crear mi landing <span style={{ fontWeight:700,opacity:.5 }}>— 29€</span></>)}
            </button>
            <button onClick={() => { setPreviewIndex(0); setPreviewOpen(true); }} className="btn-o">
              Ver ejemplo gratis
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
            </button>
          </div>
          {error && <p style={{ color:"#f87171",fontSize:13,marginTop:8 }}>{error}</p>}
          <p className="fu d4" style={{ fontSize:12,color:"rgba(255,255,255,.18)",marginTop:16 }}>Pago seguro con Stripe · Sin suscripción · Factura incluida</p>
        </section>

        {/* ── STATS ── */}
        <div style={{ borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)" }}>
          <div style={{ maxWidth:800,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"repeat(3,1fr)" }}>
            {[{v:"+200",l:"webs creadas"},{v:"< 30s",l:"tiempo de generación"},{v:"100%",l:"sin código"}].map(s=>(
              <div key={s.l} className="stat-sep" style={{ padding:"28px 24px",textAlign:"center" }}>
                <div style={{ fontSize:"clamp(22px,4vw,32px)",fontWeight:700,letterSpacing:"-.03em",marginBottom:4 }}>{s.v}</div>
                <div style={{ fontSize:13,color:"var(--muted)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXAMPLES ── */}
        <section style={{ maxWidth:1100,margin:"0 auto",padding:"96px 24px" }}>
          <p style={{ fontSize:11,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",textAlign:"center",marginBottom:14 }}>Ejemplos reales</p>
          <h2 style={{ fontSize:"clamp(28px,5vw,44px)",fontWeight:700,letterSpacing:"-.03em",textAlign:"center",marginBottom:40 }}>
            Funciona para cualquier negocio
          </h2>

          {/* Pills */}
          <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8,marginBottom:32 }}>
            {DEMOS.map((d,i)=>(
              <button key={d.label} onClick={()=>setActiveDemo(i)} className="pill"
                style={activeDemo===i?{borderColor:d.theme.primary,color:d.theme.primary,background:`${d.theme.primary}14`}:{}}>
                {d.label}
              </button>
            ))}
          </div>

          {/* Browser mockup */}
          <div style={{ maxWidth:900,margin:"0 auto",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",background:"rgba(255,255,255,.02)" }}>
            {/* Chrome bar */}
            <div style={{ padding:"11px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.02)" }}>
              <div style={{ display:"flex",gap:5 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:.75 }}/>)}
              </div>
              <div style={{ flex:1,margin:"0 12px",padding:"4px 12px",background:"rgba(255,255,255,.05)",borderRadius:6,fontSize:11,color:"var(--muted)",textAlign:"center" }}>
                {demo.name.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}.com
              </div>
            </div>

            {/* Preview content */}
            <div style={{ background:demo.theme.bg,transition:"background .4s ease",minHeight:440 }}>
              {/* Mock nav */}
              <div style={{ padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${demo.theme.primary}20` }}>
                <div style={{ fontWeight:700,fontSize:15,color:demo.theme.text,fontFamily:demo.font }}>
                  {demo.name}
                </div>
                <div style={{ display:"flex",gap:8,alignItems:"center" }} className="hide-mobile">
                  {["Servicios","Sobre mí","Contacto"].map(l=>(
                    <span key={l} style={{ fontSize:12,color:demo.theme.muted }}>{l}</span>
                  ))}
                  <div style={{ padding:"6px 14px",borderRadius:6,background:demo.theme.primary,fontSize:12,fontWeight:600,color:demo.theme.bg==="#F0F9FF"?"#fff":demo.theme.bg }}>
                    Contactar
                  </div>
                </div>
              </div>

              {/* Hero with real image */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:260 }} className="grid-2">
                <div style={{ padding:"36px 28px",display:"flex",flexDirection:"column",justifyContent:"center",gap:14 }}>
                  <div style={{ display:"inline-block",padding:"3px 10px",borderRadius:100,fontSize:10,fontWeight:600,background:`${demo.theme.primary}25`,color:demo.theme.accent,border:`1px solid ${demo.theme.primary}35`,width:"fit-content" }}>
                    {demo.badge}
                  </div>
                  <h3 style={{ fontSize:"clamp(18px,3vw,26px)",fontWeight:700,lineHeight:1.15,color:demo.theme.text,fontFamily:demo.font,letterSpacing:"-.02em" }}>
                    {demo.name}
                  </h3>
                  <p style={{ fontSize:13,color:demo.theme.muted,lineHeight:1.6 }}>{demo.tagline}</p>
                  <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                    <div style={{ padding:"8px 16px",borderRadius:7,background:demo.theme.primary,fontSize:12,fontWeight:600,color:demo.theme.bg==="#F0F9FF"?"#fff":demo.theme.bg }}>
                      Ver servicios
                    </div>
                    <div style={{ padding:"8px 16px",borderRadius:7,border:`1px solid ${demo.theme.primary}50`,fontSize:12,color:demo.theme.accent }}>
                      Contactar
                    </div>
                  </div>
                </div>
                <div style={{ position:"relative",overflow:"hidden",minHeight:200 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={demo.heroImg}
                    alt={demo.name}
                    style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",filter:"brightness(.9)" }}
                  />
                  <div style={{ position:"absolute",inset:0,background:`linear-gradient(to right, ${demo.theme.bg} 0%, transparent 40%)` }}/>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderTop:`1px solid ${demo.theme.primary}20`,borderBottom:`1px solid ${demo.theme.primary}20` }}>
                {demo.stats.map(s=>(
                  <div key={s.l} style={{ padding:"14px 16px",textAlign:"center",borderRight:`1px solid ${demo.theme.primary}15` }}>
                    <div style={{ fontSize:20,fontWeight:700,color:demo.theme.primary,fontFamily:demo.font }}>{s.v}</div>
                    <div style={{ fontSize:10,color:demo.theme.muted,marginTop:2 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div style={{ padding:"20px 28px" }}>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }} className="grid-2">
                  {demo.services.map(s=>(
                    <div key={s} style={{ padding:"12px 14px",borderRadius:8,border:`1px solid ${demo.theme.primary}25`,background:`${demo.theme.primary}08` }}>
                      <div style={{ fontSize:11,fontWeight:600,color:demo.theme.text }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview CTA bar */}
            <div style={{ padding:"12px 20px",background:"rgba(255,255,255,.03)",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10 }}>
              <span style={{ fontSize:13,color:"var(--muted)" }}>
                ¿Te gusta este estilo?{" "}
                <span style={{ color:"var(--fg)" }}>Así quedará tu web.</span>
              </span>
              <div style={{ display:"flex",gap:8 }}>
                <button onClick={()=>{ setPreviewIndex(activeDemo); setPreviewOpen(true); }} className="btn-o" style={{ padding:"7px 14px",fontSize:12 }}>
                  Ver página completa
                </button>
                <button onClick={handleBuy} disabled={loading} className="btn-w" style={{ padding:"7px 16px",fontSize:12,borderRadius:7 }}>
                  Crear la mía — 29€
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ borderTop:"1px solid var(--border)",maxWidth:1100,margin:"0 auto",padding:"96px 24px" }}>
          <p style={{ fontSize:11,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:14 }}>Cómo funciona</p>
          <h2 style={{ fontSize:"clamp(28px,5vw,44px)",fontWeight:700,letterSpacing:"-.03em",marginBottom:64,maxWidth:420 }}>De la idea a la web en tres pasos.</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1 }} className="grid-3">
            {STEPS.map((s,i)=>(
              <div key={s.n} style={{ padding:"36px 32px",border:"1px solid var(--border)",borderRadius:i===0?"12px 0 0 12px":i===2?"0 12px 12px 0":undefined,background:"var(--subtle)" }}>
                <div className="serif" style={{ fontSize:56,fontStyle:"italic",fontWeight:400,color:"rgba(255,255,255,.06)",lineHeight:1,marginBottom:20,letterSpacing:"-.04em" }}>{s.n}</div>
                <h3 style={{ fontSize:17,fontWeight:600,marginBottom:10,letterSpacing:"-.01em" }}>{s.title}</h3>
                <p style={{ fontSize:14,lineHeight:1.7,color:"var(--muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="precio" style={{ borderTop:"1px solid var(--border)",maxWidth:1100,margin:"0 auto",padding:"96px 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center" }} className="grid-2">
            <div>
              <p style={{ fontSize:11,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:14 }}>Precio</p>
              <h2 style={{ fontSize:"clamp(28px,5vw,44px)",fontWeight:700,letterSpacing:"-.03em",marginBottom:20 }}>
                Sin sorpresas.<br/>
                <span className="serif" style={{ fontStyle:"italic",color:"var(--muted)",fontWeight:400 }}>Sin suscripción.</span>
              </h2>
              <p style={{ fontSize:15,lineHeight:1.75,color:"var(--muted)",maxWidth:360 }}>
                Pagas una vez por cada landing que creas. Sin cuotas mensuales, sin contratos. La web es tuya para siempre.
              </p>
            </div>
            <div style={{ border:"1px solid var(--border)",borderRadius:16,padding:"40px 36px",background:"var(--subtle)" }}>
              <div style={{ display:"flex",alignItems:"flex-end",gap:4,marginBottom:4 }}>
                <span style={{ fontSize:64,fontWeight:700,letterSpacing:"-.04em",lineHeight:1 }}>29</span>
                <span style={{ fontSize:24,fontWeight:500,color:"var(--muted)",marginBottom:10 }}>€</span>
              </div>
              <p style={{ fontSize:13,color:"var(--muted)",marginBottom:28 }}>por landing page · pago único</p>
              <ul style={{ display:"flex",flexDirection:"column",gap:11,marginBottom:28 }}>
                {["Landing page completa y personalizada","Editor visual sin código","Galería, servicios, testimonios y contacto","Preview compartible con el cliente","Exportación de la configuración","Todos los sectores e idiomas"].map(item=>(
                  <li key={item} style={{ display:"flex",alignItems:"center",gap:10,fontSize:14,color:"rgba(255,255,255,.7)" }}>
                    <div style={{ width:17,height:17,borderRadius:"50%",background:"rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <svg width="9" height="9" fill="none" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={handleBuy} disabled={loading} className="btn-w" style={{ width:"100%",justifyContent:"center",padding:"15px 24px" }}>
                {loading ? "Redirigiendo…" : "Crear mi landing — 29€"}
              </button>
              <p style={{ fontSize:12,color:"rgba(255,255,255,.18)",textAlign:"center",marginTop:14 }}>Pago procesado por Stripe · Factura disponible</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ borderTop:"1px solid var(--border)",maxWidth:1100,margin:"0 auto",padding:"96px 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:64 }} className="grid-2">
            <div>
              <p style={{ fontSize:11,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:14 }}>FAQ</p>
              <h2 style={{ fontSize:"clamp(24px,4vw,36px)",fontWeight:700,letterSpacing:"-.03em" }}>Preguntas frecuentes</h2>
            </div>
            <div>
              {FAQS.map((faq,i)=>(
                <div key={i} style={{ borderBottom:"1px solid var(--border)" }}>
                  <button className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                    <span>{faq.q}</span>
                    <svg className={`faq-icon${openFaq===i?" r":""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                  </button>
                  <div className={`faq-a${openFaq===i?" open":""}`}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ borderTop:"1px solid var(--border)",background:"radial-gradient(ellipse at 50% 100%, rgba(200,169,126,.08) 0%, transparent 65%)",padding:"96px 24px 112px",textAlign:"center" }}>
          <h2 className="serif" style={{ fontSize:"clamp(36px,7vw,72px)",fontStyle:"italic",fontWeight:400,letterSpacing:"-.03em",marginBottom:20,lineHeight:1.05 }}>
            Tu negocio merece<br/>una web que convierte.
          </h2>
          <p style={{ fontSize:16,color:"var(--muted)",maxWidth:420,margin:"0 auto 36px",lineHeight:1.7 }}>
            En 30 segundos tienes una landing profesional lista para mostrar a tu cliente.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center" }}>
            <button onClick={handleBuy} disabled={loading} className="btn-w" style={{ fontSize:16,padding:"16px 36px" }}>
              {loading ? "Redirigiendo…" : "Empezar ahora — 29€"}
            </button>
            <button onClick={()=>{ setPreviewIndex(0); setPreviewOpen(true); }} className="btn-o" style={{ fontSize:15,padding:"15px 28px" }}>
              Ver ejemplo gratis
            </button>
          </div>
          {error && <p style={{ color:"#f87171",fontSize:13,marginTop:12 }}>{error}</p>}
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop:"1px solid var(--border)",padding:"28px 24px",maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".7"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".3"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".3"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".5"/>
            </svg>
            <span style={{ fontSize:13,fontWeight:600 }}>Landify</span>
          </div>
          <p style={{ fontSize:12,color:"rgba(255,255,255,.2)" }}>© 2025 · Hecho con inteligencia artificial</p>
          <a href="/generate" style={{ fontSize:12,color:"rgba(255,255,255,.25)",textDecoration:"none" }}>Acceder →</a>
        </footer>
      </div>

      {/* ══ FULL PREVIEW MODAL ══ */}
      {previewOpen && (
        <>
          <div className="modal-overlay" onClick={()=>setPreviewOpen(false)}/>
          <div className="modal-inner">
            {/* Sticky top bar */}
            <div style={{ position:"sticky",top:0,zIndex:200,background:"rgba(8,8,8,.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <button onClick={()=>setPreviewOpen(false)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--muted)",display:"flex",alignItems:"center",gap:6,fontSize:13 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                  Cerrar
                </button>
                <span style={{ width:1,height:16,background:"var(--border)" }}/>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {DEMOS.map((d,i)=>(
                    <button key={d.label} onClick={()=>setPreviewIndex(i)} style={{ padding:"4px 12px",borderRadius:100,fontSize:12,fontWeight:500,cursor:"pointer",border:`1px solid ${previewIndex===i?d.theme.primary:"var(--border)"}`,background:previewIndex===i?`${d.theme.primary}18`:"transparent",color:previewIndex===i?d.theme.primary:"var(--muted)",transition:"all .15s" }}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:13,color:"var(--muted)" }} className="hide-mobile">¿Te convence este estilo?</span>
                <button onClick={handleBuy} disabled={loading} className="btn-w" style={{ padding:"8px 18px",fontSize:13,borderRadius:8 }}>
                  {loading ? "Redirigiendo…" : "Crear la mía — 29€"}
                </button>
              </div>
            </div>

            {/* Preview page */}
            <FullPreview demo={previewDemo} onBuy={handleBuy} loading={loading}/>
          </div>
        </>
      )}
    </>
  );
}

function FullPreview({ demo, onBuy, loading }: { demo: typeof DEMOS[0]; onBuy: ()=>void; loading: boolean }) {
  const t = demo.theme;
  const isDark = t.bg.startsWith("#0") || t.bg.startsWith("#1");

  return (
    <div style={{ background:t.bg,fontFamily:demo.font,color:t.text,minHeight:"100vh" }}>

      {/* Nav */}
      <div style={{ padding:"16px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${t.primary}20`,position:"sticky",top:57,zIndex:10,background:t.bg }}>
        <span style={{ fontWeight:700,fontSize:18,color:t.text }}>{demo.name}</span>
        <div style={{ display:"flex",gap:16,alignItems:"center" }}>
          {["Servicios","Portfolio","Contacto"].map(l=><span key={l} style={{ fontSize:14,color:t.muted,cursor:"pointer" }}>{l}</span>)}
          <div style={{ padding:"9px 20px",borderRadius:8,background:t.primary,fontSize:14,fontWeight:600,color:isDark?"#fff":"#fff",cursor:"pointer" }}>
            Pedir cita
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:500,position:"relative",overflow:"hidden" }}>
        <div style={{ padding:"64px 48px",display:"flex",flexDirection:"column",justifyContent:"center",gap:20,zIndex:2 }}>
          <div style={{ display:"inline-block",padding:"4px 12px",borderRadius:100,fontSize:11,fontWeight:600,background:`${t.primary}22`,color:t.accent,border:`1px solid ${t.primary}35`,width:"fit-content",letterSpacing:".05em",textTransform:"uppercase" }}>
            {demo.badge}
          </div>
          <h1 style={{ fontSize:"clamp(28px,4vw,52px)",fontWeight:700,lineHeight:1.1,color:t.text,letterSpacing:"-.025em" }}>
            {demo.name}
          </h1>
          <p style={{ fontSize:18,color:t.muted,lineHeight:1.65,maxWidth:420 }}>{demo.tagline}</p>
          <p style={{ fontSize:15,color:t.muted,lineHeight:1.7,maxWidth:420 }}>
            Ofrecemos un servicio profesional adaptado a tus necesidades. Con años de experiencia y un equipo apasionado, garantizamos resultados excepcionales.
          </p>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginTop:8 }}>
            <div style={{ padding:"13px 28px",borderRadius:9,background:t.primary,fontSize:15,fontWeight:600,color:"#fff",cursor:"pointer" }}>
              Ver servicios
            </div>
            <div style={{ padding:"13px 28px",borderRadius:9,border:`1px solid ${t.primary}50`,fontSize:15,color:t.accent,cursor:"pointer" }}>
              Contactar
            </div>
          </div>
        </div>
        <div style={{ position:"relative",overflow:"hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={demo.heroImg} alt={demo.name} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }}/>
          <div style={{ position:"absolute",inset:0,background:`linear-gradient(to right, ${t.bg} 0%, transparent 35%)` }}/>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderTop:`1px solid ${t.primary}20`,borderBottom:`1px solid ${t.primary}20` }}>
        {demo.stats.map(s=>(
          <div key={s.l} style={{ padding:"28px 24px",textAlign:"center",borderRight:`1px solid ${t.primary}15` }}>
            <div style={{ fontSize:36,fontWeight:700,color:t.primary,fontFamily:demo.font,letterSpacing:"-.02em" }}>{s.v}</div>
            <div style={{ fontSize:13,color:t.muted,marginTop:4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Services */}
      <div style={{ padding:"72px 48px" }}>
        <p style={{ fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:t.muted,marginBottom:12 }}>Servicios</p>
        <h2 style={{ fontSize:"clamp(24px,4vw,40px)",fontWeight:700,letterSpacing:"-.025em",marginBottom:40,color:t.text }}>
          Lo que ofrecemos
        </h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>
          {demo.services.map((s,i)=>(
            <div key={s} style={{ padding:"28px 28px",borderRadius:12,border:`1px solid ${t.primary}25`,background:`${t.primary}06`,display:"flex",flexDirection:"column",gap:10 }}>
              <div style={{ width:40,height:40,borderRadius:10,background:t.primary,display:"flex",alignItems:"center",justifyContent:"center",opacity:.85 }}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                  {i===0&&<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>}
                  {i===1&&<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>}
                  {i===2&&<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>}
                  {i===3&&<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>}
                </svg>
              </div>
              <h3 style={{ fontSize:16,fontWeight:600,color:t.text }}>{s}</h3>
              <p style={{ fontSize:13,color:t.muted,lineHeight:1.65 }}>
                Servicio profesional con atención personalizada y resultados garantizados para tu negocio.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding:"64px 48px",background:`${t.primary}08`,borderTop:`1px solid ${t.primary}15` }}>
        <p style={{ fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:t.muted,marginBottom:12 }}>Testimonios</p>
        <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)",fontWeight:700,letterSpacing:"-.02em",marginBottom:36,color:t.text }}>
          Lo que dicen nuestros clientes
        </h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
          {[
            { n:"María García", r:"Cliente desde 2022", t:"Increíble servicio. Superaron todas mis expectativas y el resultado fue exactamente lo que necesitaba." },
            { n:"Carlos López", r:"Propietario", t:"Profesionales de primer nivel. Lo recomiendo sin dudarlo a cualquier persona que busque calidad." },
            { n:"Ana Martínez", r:"Cliente habitual", t:"Llevan años siendo mi elección. Siempre atentos, siempre perfectos. No cambiaría nada." },
          ].map(tm=>(
            <div key={tm.n} style={{ padding:"24px",borderRadius:12,border:`1px solid ${t.primary}20`,background:t.bg }}>
              <div style={{ display:"flex",gap:2,marginBottom:12 }}>
                {[1,2,3,4,5].map(i=><span key={i} style={{ color:t.primary,fontSize:14 }}>★</span>)}
              </div>
              <p style={{ fontSize:14,lineHeight:1.7,color:t.muted,marginBottom:16 }}>&ldquo;{tm.t}&rdquo;</p>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:36,height:36,borderRadius:"50%",background:t.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff" }}>
                  {tm.n[0]}
                </div>
                <div>
                  <div style={{ fontSize:13,fontWeight:600,color:t.text }}>{tm.n}</div>
                  <div style={{ fontSize:11,color:t.muted }}>{tm.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:"72px 48px",textAlign:"center",borderTop:`1px solid ${t.primary}15` }}>
        <h2 style={{ fontSize:"clamp(24px,4vw,44px)",fontWeight:700,letterSpacing:"-.025em",color:t.text,marginBottom:16 }}>
          ¿Listo para empezar?
        </h2>
        <p style={{ fontSize:16,color:t.muted,marginBottom:32 }}>Contáctanos hoy y te respondemos en menos de 2 horas.</p>
        <div style={{ padding:"15px 36px",borderRadius:10,background:t.primary,fontSize:16,fontWeight:600,color:"#fff",display:"inline-block",cursor:"pointer" }}>
          Contactar ahora
        </div>
      </div>

      {/* Bottom buy bar */}
      <div style={{ position:"sticky",bottom:0,background:"rgba(8,8,8,.96)",backdropFilter:"blur(12px)",borderTop:"1px solid var(--border)",padding:"16px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap" }}>
        <div>
          <div style={{ fontWeight:600,fontSize:15,color:"#fff" }}>¿Te gusta este resultado?</div>
          <div style={{ fontSize:13,color:"var(--muted)" }}>Crea la web de tu negocio con este nivel de calidad</div>
        </div>
        <button onClick={onBuy} disabled={loading} className="btn-w" style={{ padding:"13px 28px",fontSize:15,borderRadius:9 }}>
          {loading ? "Redirigiendo…" : "Crear la mía — 29€"}
        </button>
      </div>
    </div>
  );
}
