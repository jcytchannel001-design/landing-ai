"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TemplateSite from "@/components/template/TemplateSite";
import EditorBar from "@/components/editor/EditorBar";
import BrandPanel from "@/components/editor/BrandPanel";
import { loadConfig, persistConfig, updatePath } from "@/lib/configHelpers";
import type { SiteConfig } from "@/lib/siteTypes";

const EDITOR_BAR_H = 52;

function EditorInner() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  // Load config: localStorage first, then server
  useEffect(() => {
    if (!id) { setError("ID no encontrado"); return; }

    const local = loadConfig(id);
    if (local) { setConfig(local); return; }

    // Fallback to server store
    fetch(`/api/config/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        persistConfig(id, data.config);
        setConfig(data.config);
      })
      .catch(() => setError("Configuración no encontrada. Por favor genera una nueva."));
  }, [id]);

  const handleUpdate = useCallback((path: string, value: unknown) => {
    setConfig(prev => {
      if (!prev) return prev;
      const updated = updatePath(prev, path, value);
      persistConfig(id, updated);
      return updated;
    });
    // Flash saved indicator
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }, [id]);

  const handleExport = useCallback(() => {
    if (!config) return;
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.brand.name.toLowerCase().replace(/\s+/g, "-")}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [config]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
        <div className="text-center px-6">
          <p className="text-sm mb-4" style={{ color: "#8A7E76" }}>{error}</p>
          <a href="/generate" className="text-sm font-semibold hover:underline" style={{ color: "#C15B3A" }}>
            ← Generar nueva landing page
          </a>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#F0EBE6" strokeWidth="3" />
            <path d="M14 2a12 12 0 0112 12" stroke="#C15B3A" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-sm" style={{ color: "#8A7E76" }}>Cargando editor…</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-geist-sans)" }}>
      <EditorBar
        editMode={editMode}
        onToggleEdit={() => setEditMode(e => !e)}
        onBrandClick={() => setShowBrand(b => !b)}
        onExport={handleExport}
        previewId={id}
        brandName={config.brand.name}
      />

      {showBrand && (
        <BrandPanel
          config={config}
          onUpdate={handleUpdate}
          onClose={() => setShowBrand(false)}
        />
      )}

      {/* Site rendered below editor bar */}
      <div style={{ paddingTop: EDITOR_BAR_H }}>
        <TemplateSite
          config={config}
          editMode={editMode}
          onUpdate={handleUpdate}
          topOffset={EDITOR_BAR_H}
        />
      </div>

      {/* Edit mode hint tooltip */}
      {editMode && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white"
          style={{
            background: "rgba(28,23,20,0.88)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            pointerEvents: "none",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.5 1.5l2 2-6 6H2.5v-2l6-6z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          Haz clic en cualquier texto o imagen para editar
        </div>
      )}

      {/* Auto-saved flash */}
      {savedFlash && (
        <div
          className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
          style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #86EFAC" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Guardado
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
        <div className="animate-pulse text-sm" style={{ color: "#8A7E76" }}>Cargando…</div>
      </div>
    }>
      <EditorInner />
    </Suspense>
  );
}
