"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function BuyButton() {
  const [loading, setLoading] = useState(false);
  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { setLoading(false); }
  };
  return (
    <button onClick={handleBuy} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 9, fontWeight: 600, fontSize: 14, color: "#080808", background: "#fff", border: "none", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
      {loading ? "Redirigiendo…" : "Conseguir esta landing — 29€"}
    </button>
  );
}
import TemplateSite from "@/components/template/TemplateSite";
import { loadConfig, persistConfig } from "@/lib/configHelpers";
import type { SiteConfig } from "@/lib/siteTypes";

function PreviewInner() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setError("ID no encontrado"); return; }

    // Try localStorage first
    const local = loadConfig(id);
    if (local) { setConfig(local); return; }

    // Fallback to server store (works when sharing URL on same session)
    fetch(`/api/config/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        persistConfig(id, data.config);
        setConfig(data.config);
      })
      .catch(() => setError("Configuración no encontrada."));
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-stone-500 mb-4">{error}</p>
          <a href="/generate" className="text-[#C15B3A] font-semibold hover:underline">← Generar nueva landing page</a>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-pulse text-stone-400 text-sm">Cargando…</div>
      </div>
    );
  }

  return (
    <div>
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-4"
        style={{ height: "44px", background: "rgba(8,8,8,0.94)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".9"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".35"/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" opacity=".65"/>
            </svg>
            <span className="text-white font-semibold text-xs">Landify</span>
          </a>
          <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.12)" }} />
          <span className="text-white/40 text-xs">Vista previa · {config.brand.name}</span>
        </div>
        <a
          href={`/editor?id=${id}`}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all text-white"
          style={{ background: "#C15B3A" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7.5 1.5l2 2-5.5 5.5H2v-2L7.5 1.5z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          Editar
        </a>
      </div>
      <div style={{ paddingTop: "44px", paddingBottom: "72px" }}>
        <TemplateSite config={config} topOffset={44} />
      </div>
      {/* Sticky bottom buy bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(8,8,8,0.96)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>¿Te gusta el resultado?</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Paga 29€ para editar y usar esta landing para tu negocio</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Volver a generar</a>
          <BuyButton />
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-pulse text-stone-400 text-sm">Cargando…</div>
      </div>
    }>
      <PreviewInner />
    </Suspense>
  );
}
