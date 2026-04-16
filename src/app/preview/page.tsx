"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TemplateSite from "@/components/template/TemplateSite";
import { loadConfig, persistConfig } from "@/lib/configHelpers";
import type { SiteConfig } from "@/lib/siteTypes";

interface ChatMsg {
  role: "user" | "assistant";
  text: string;
  images?: string[];
}

const SHIMMER = {
  background: "linear-gradient(90deg,#E8C97A,#F0D99C,#C8A97E,#E8C97A)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  animation: "shimmer 5s linear infinite",
  display: "inline-block",
};

function PreviewInner() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Chat
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", text: "¡Tu landing está lista! Dime qué cambiar — textos, colores, secciones, fotos — y lo actualizo al instante." },
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [buyLoading, setBuyLoading] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!id) { setError("ID no encontrado"); return; }
    const local = loadConfig(id);
    if (local) { setConfig(local); return; }
    fetch(`/api/config/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { persistConfig(id, data.config); setConfig(data.config); })
      .catch(() => setError("Configuración no encontrada."));
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text && images.length === 0) return;
    if (chatLoading || !config) return;

    const userMsg: ChatMsg = { role: "user", text, images: [...images] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setImages([]);
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, images: userMsg.images, config }),
      });
      const data = await res.json() as { updatedConfig: SiteConfig | null; message: string; error?: string };
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: "assistant", text: data.message }]);
      if (data.updatedConfig) {
        const updated = { ...data.updatedConfig, id };
        setConfig(updated);
        persistConfig(id, updated);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Error procesando tu solicitud. Inténtalo de nuevo." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleBuy = async () => {
    setBuyLoading(true);
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { setBuyLoading(false); }
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

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 16, fontSize: 14 }}>{error}</p>
          <a href="/" style={{ color: "#E8C97A", fontSize: 14, fontWeight: 600 }}>← Volver a generar</a>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
        <svg style={{ animation: "spin 1s linear infinite" }} width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,.1)" strokeWidth="2.5"/>
          <path d="M14 2a12 12 0 0112 12" stroke="#E8C97A" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // ── Chat panel (shared between desktop and mobile sheet) ───────────────────
  const ChatPanel = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0A0A0A" }}>
      <style>{`
        @keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .cmsg{padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.6;max-width:92%;word-break:break-word;animation:slideUp .18s ease both}
        .cmsg-u{background:#C15B3A;color:#fff;align-self:flex-end;border-bottom-right-radius:3px}
        .cmsg-a{background:rgba(255,255,255,.07);color:rgba(255,255,255,.85);align-self:flex-start;border-bottom-left-radius:3px}
        .cinput{background:transparent;border:none;outline:none;resize:none;color:#fff;font-size:13px;line-height:1.6;font-family:inherit;flex:1;min-height:18px;max-height:100px}
        .cinput::placeholder{color:rgba(255,255,255,.25)}
        .cbtn:hover{opacity:.85}
        .cbtn:disabled{opacity:.4;cursor:not-allowed}
        .pay-btn{width:100%;padding:13px;border-radius:10px;font-weight:700;font-size:15px;color:#0A0A0A;background:linear-gradient(135deg,#E8C97A,#C8A97E);border:none;cursor:pointer;transition:opacity .15s;letter-spacing:-.01em}
        .pay-btn:hover:not(:disabled){opacity:.92}
        .pay-btn:disabled{opacity:.5;cursor:not-allowed}
      `}</style>

      {/* Header */}
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".9"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".65"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", letterSpacing: ".04em" }}>LANDIFY</span>
          </div>
          <a href="/" style={{ fontSize: 11, color: "rgba(255,255,255,.25)", textDecoration: "none" }}>← Nueva landing</a>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2, letterSpacing: "-.02em" }}>{config.brand.name}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>Modifica lo que quieras antes de publicar</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} className={`cmsg ${m.role === "user" ? "cmsg-u" : "cmsg-a"}`}>
            {m.images && m.images.length > 0 && (
              <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                {m.images.map((img, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={j} src={img} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} />
                ))}
              </div>
            )}
            {m.text}
          </div>
        ))}
        {chatLoading && (
          <div className="cmsg cmsg-a" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,.35)", animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }}/>
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:.25}50%{opacity:1}}`}</style>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Image previews queue */}
      {images.length > 0 && (
        <div style={{ padding: "6px 14px 0", display: "flex", gap: 6, flexShrink: 0 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" style={{ width: 38, height: 38, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(255,255,255,.12)" }}/>
              <button onClick={() => setImages(p => p.filter((_, j) => j !== i))} style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: "#333", border: "none", color: "white", fontSize: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
        <button onClick={() => fileRef.current?.click()} style={{ padding: 8, borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", cursor: "pointer", flexShrink: 0, display: "flex" }}>
          <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleImages(e.target.files)} />
        <div style={{ flex: 1, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "flex-end" }}>
          <textarea
            ref={textareaRef}
            className="cinput"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Cambia el color principal a verde… (Enter para enviar)"
            rows={1}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={chatLoading || (!input.trim() && images.length === 0)}
          className="cbtn"
          style={{ padding: 9, borderRadius: 9, background: chatLoading ? "rgba(255,255,255,.06)" : "#C15B3A", border: "none", cursor: "pointer", flexShrink: 0, display: "flex", transition: "background .15s" }}
        >
          <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
        </button>
      </div>

      {/* Pay section */}
      <div style={{ padding: "14px 16px 20px", borderTop: "1px solid rgba(255,255,255,.07)", flexShrink: 0 }}>
        <button onClick={handleBuy} disabled={buyLoading} className="pay-btn">
          {buyLoading ? "Redirigiendo…" : "Publicar esta landing — 29€"}
        </button>
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.25)", lineHeight: 1.5 }}>
          Pago único · Acceso completo al editor · Sin suscripción
        </div>
      </div>
    </div>
  );

  // ── Desktop split layout ───────────────────────────────────────────────────
  // Note: transform: translateZ(0) creates a containing block for the
  // TemplateSite's position:fixed navbar so it stays within the left panel
  return (
    <>
      <style>{`
        @keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideUpSheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
        *{box-sizing:border-box}
      `}</style>

      {/* ─── DESKTOP ──────────────────────────────────────────── */}
      <div className="hidden md:flex" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Left: landing preview */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            // Creates a containing block for the TemplateSite fixed navbar:
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        >
          <TemplateSite config={config} />
        </div>

        {/* Right: chat panel */}
        <div style={{ width: 380, flexShrink: 0, height: "100vh", borderLeft: "1px solid rgba(255,255,255,.06)" }}>
          {ChatPanel}
        </div>
      </div>

      {/* ─── MOBILE ───────────────────────────────────────────── */}
      <div className="md:hidden" style={{ minHeight: "100vh" }}>
        {/* Landing renders full-width */}
        <div style={{ paddingBottom: 72 }}>
          <TemplateSite config={config} />
        </div>

        {/* Sticky bottom bar */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(10,10,10,.97)", backdropFilter: "blur(14px)", borderTop: "1px solid rgba(255,255,255,.08)", padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => setMobileChat(true)}
            style={{ flex: 1, padding: "11px 16px", borderRadius: 9, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
          >
            ✏️ Modificar con IA…
          </button>
          <button onClick={handleBuy} disabled={buyLoading} className="pay-btn" style={{ width: "auto", padding: "11px 18px", fontSize: 13, borderRadius: 9, whiteSpace: "nowrap" }}>
            {buyLoading ? "…" : "Publicar — 29€"}
          </button>
        </div>

        {/* Mobile chat sheet */}
        {mobileChat && (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)" }} onClick={() => setMobileChat(false)} />
            <div style={{ height: "80vh", animation: "slideUpSheet .25s cubic-bezier(.16,1,.3,1)" }}>
              {ChatPanel}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
        <div style={{ color: "rgba(255,255,255,.3)", fontSize: 14 }}>Cargando…</div>
      </div>
    }>
      <PreviewInner />
    </Suspense>
  );
}
