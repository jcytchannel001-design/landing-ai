"use client";

import { useState, useRef, useEffect } from "react";
import type { SiteConfig } from "@/lib/siteTypes";

interface Message {
  role: "user" | "assistant";
  text: string;
  images?: string[];
}

interface Props {
  config: SiteConfig;
  onUpdate: (updated: SiteConfig) => void;
}

export default function AiChat({ config, onUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hola 👋 Soy tu asistente de Landify. Dime qué quieres cambiar en tu landing — texto, colores, secciones — o sube fotos para actualizar la galería." },
  ]);
  const [input, setInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text && images.length === 0) return;
    if (loading) return;

    const userMsg: Message = { role: "user", text, images };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setImages([]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, images, config }),
      });
      const data = await res.json() as { updatedConfig: SiteConfig | null; message: string; error?: string };

      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: "assistant", text: data.message }]);
      if (data.updatedConfig) {
        onUpdate(data.updatedConfig);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Lo siento, ha habido un error. Inténtalo de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 3).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) setImages(prev => [...prev, e.target!.result as string].slice(0, 3));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 998,
          width: 52, height: 52, borderRadius: "50%",
          background: open ? "#1C1C1E" : "#C15B3A",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "all .2s",
        }}
        title="Asistente IA"
      >
        {open ? (
          <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 88, right: 24, zIndex: 997,
          width: 360, height: 520,
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          display: "flex", flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          overflow: "hidden",
          animation: "chatSlideUp .2s cubic-bezier(.16,1,.3,1)",
        }}>
          <style>{`
            @keyframes chatSlideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
            .chat-msg { padding: 10px 14px; border-radius: 10px; font-size: 13px; line-height: 1.55; max-width: 88%; word-break: break-word; }
            .chat-msg.user { background: #C15B3A; color: white; align-self: flex-end; border-bottom-right-radius: 3px; }
            .chat-msg.assistant { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.85); align-self: flex-start; border-bottom-left-radius: 3px; }
            .chat-input:focus { outline: none; }
            .chat-input::placeholder { color: rgba(255,255,255,0.25); }
          `}</style>

          {/* Header */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C15B3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Asistente Landify</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Modifica tu landing hablando</div>
              </div>
            </div>
            <button
              onClick={() => setShowDeploy(true)}
              style={{ padding: "5px 10px", borderRadius: 7, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
            >
              🌐 Publicar web
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.images && m.images.length > 0 && (
                  <div style={{ display: "flex", gap: 4, marginBottom: 6, flexWrap: "wrap" }}>
                    {m.images.map((img, j) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={j} src={img} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                    ))}
                  </div>
                )}
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant" style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)", animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }}/>
                ))}
                <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Image previews */}
          {images.length > 0 && (
            <div style={{ padding: "8px 14px 0", display: "flex", gap: 6 }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)" }}/>
                  <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} style={{ position: "absolute", top: -5, right: -5, width: 16, height: 16, borderRadius: "50%", background: "#333", border: "none", color: "white", fontSize: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8, alignItems: "flex-end" }}>
            <button onClick={() => fileRef.current?.click()} style={{ padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", flexShrink: 0, display: "flex" }}>
              <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleImages(e.target.files)}/>
            <textarea
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Escribe un cambio… (Enter para enviar)"
              rows={1}
              style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 12px", color: "white", fontSize: 13, fontFamily: "inherit", resize: "none", lineHeight: 1.5, maxHeight: 80, overflowY: "auto" }}
            />
            <button
              onClick={handleSend}
              disabled={loading || (!input.trim() && images.length === 0)}
              style={{ padding: 9, borderRadius: 9, background: loading ? "rgba(255,255,255,0.08)" : "#C15B3A", border: "none", cursor: "pointer", flexShrink: 0, display: "flex", transition: "background .15s" }}
            >
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Deploy modal */}
      {showDeploy && (
        <DeployGuide onClose={() => setShowDeploy(false)} />
      )}
    </>
  );
}

function DeployGuide({ onClose }: { onClose: () => void }) {
  const steps = [
    {
      n: "1",
      title: "Exporta la configuración",
      desc: "En la barra superior del editor, haz clic en «Exportar». Se descargará un archivo JSON con toda la configuración de tu landing.",
    },
    {
      n: "2",
      title: "Crea una cuenta en Vercel",
      desc: "Ve a vercel.com y regístrate gratis. Conecta tu cuenta de GitHub (o crea una en github.com). Solo tarda 2 minutos.",
    },
    {
      n: "3",
      title: "Importa el proyecto",
      desc: "En Vercel, haz clic en «Add New Project» → Import Git Repository. Si no tienes el código, puedes usar nuestro template de GitHub como base.",
    },
    {
      n: "4",
      title: "Sube tu configuración JSON",
      desc: "Reemplaza el archivo de configuración en el repositorio con el JSON que exportaste. Vercel redesplegará automáticamente.",
    },
    {
      n: "5",
      title: "Conecta tu dominio",
      desc: "En Vercel → tu proyecto → Settings → Domains → Add Domain. Escribe tu dominio (ej: minegocio.com). Vercel te dará dos registros DNS.",
    },
    {
      n: "6",
      title: "Configura los DNS",
      desc: "En tu proveedor de dominio (GoDaddy, Namecheap, Google Domains…) ve a la configuración DNS y añade los registros que te dio Vercel. En 5-10 minutos tu web estará live.",
    },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", padding: "28px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 4 }}>Trasladar al dominio</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Guía paso a paso para publicar tu landing</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 4 }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map(step => (
            <div key={step.n} style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C15B3A", color: "white", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{step.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: "16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>Proveedores de dominio recomendados</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            namecheap.com (€8/año) · porkbun.com (€8/año) · cloudflare.com (al coste, sin margen) · godaddy.com · google.com/domains
          </div>
        </div>

        <div style={{ marginTop: 12, padding: "14px 16px", background: "rgba(193,91,58,0.1)", borderRadius: 10, border: "1px solid rgba(193,91,58,0.25)" }}>
          <div style={{ fontSize: 13, color: "#E8846A", lineHeight: 1.65 }}>
            💡 <strong>Tip:</strong> Vercel es gratuito para proyectos personales y pequeños negocios. SSL/HTTPS incluido automáticamente.
          </div>
        </div>

        <button onClick={onClose} style={{ width: "100%", marginTop: 20, padding: "12px", borderRadius: 10, background: "white", color: "#111", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>
          Entendido
        </button>
      </div>
    </div>
  );
}
