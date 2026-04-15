"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
      {/* Thin edit bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-4"
        style={{ height: "40px", background: "rgba(28,23,20,0.92)", backdropFilter: "blur(8px)" }}
      >
        <span className="text-white/50 text-xs">Vista previa · {config.brand.name}</span>
        <a
          href={`/editor?id=${id}`}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg transition-all text-white"
          style={{ background: "#C15B3A" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7.5 1.5l2 2-5.5 5.5H2v-2L7.5 1.5z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          Editar
        </a>
      </div>
      <div style={{ paddingTop: "40px" }}>
        <TemplateSite config={config} topOffset={40} />
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
