"use client";

import { useState } from "react";

interface EditorBarProps {
  editMode: boolean;
  onToggleEdit: () => void;
  onBrandClick: () => void;
  onExport: () => void;
  previewId: string;
  brandName: string;
}

export default function EditorBar({
  editMode,
  onToggleEdit,
  onBrandClick,
  onExport,
  previewId,
  brandName,
}: EditorBarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/preview?id=${previewId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 gap-3"
      style={{
        height: "52px",
        background: "white",
        borderBottom: "1px solid #F0EBE6",
        boxShadow: "0 1px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Left ── */}
      <div className="flex items-center gap-3 min-w-0">
        <a
          href="/generate"
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
          style={{ color: "#8A7E76", background: "#F5F0ED" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#EDE8E3")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F5F0ED")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Nueva
        </a>
        <div className="hidden sm:flex items-center gap-1.5 min-w-0">
          <span className="flex-shrink-0" style={{ color: "#C15B3A" }}>✦</span>
          <span className="text-sm font-semibold truncate" style={{ color: "#1C1714" }}>{brandName}</span>
        </div>
      </div>

      {/* ── Center — Edit/Preview toggle ── */}
      <div
        className="flex items-center gap-0.5 p-1 rounded-xl flex-shrink-0"
        style={{ background: "#F5F0ED" }}
      >
        <button
          onClick={() => editMode && onToggleEdit()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={
            !editMode
              ? { background: "white", color: "#1C1714", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }
              : { color: "#8A7E76" }
          }
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="5.5" cy="5.5" r="1.8" fill="currentColor" />
          </svg>
          Vista previa
        </button>
        <button
          onClick={() => !editMode && onToggleEdit()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={
            editMode
              ? { background: "white", color: "#1C1714", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }
              : { color: "#8A7E76" }
          }
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7.5 1.5l2 2-5.5 5.5H2v-2L7.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          Editar
        </button>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onBrandClick}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border"
          style={{ color: "#4A3F38", borderColor: "#EDE8E3", background: "white" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FAFAF8")}
          onMouseLeave={e => (e.currentTarget.style.background = "white")}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="3" fill="currentColor" opacity="0.35" />
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Marca
        </button>

        {/* Mobile brand button */}
        <button
          onClick={onBrandClick}
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg border transition-all"
          style={{ color: "#4A3F38", borderColor: "#EDE8E3", background: "white" }}
          title="Configurar marca"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="3" fill="currentColor" opacity="0.35" />
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border"
          style={{
            color: copied ? "#16A34A" : "#4A3F38",
            borderColor: copied ? "#86EFAC" : "#EDE8E3",
            background: copied ? "#F0FDF4" : "white",
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Copiado</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 1H3a1 1 0 00-1 1v7M5 3h4a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Compartir</span>
            </>
          )}
        </button>

        <button
          onClick={onExport}
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border"
          style={{ color: "#4A3F38", borderColor: "#EDE8E3", background: "white" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FAFAF8")}
          onMouseLeave={e => (e.currentTarget.style.background = "white")}
          title="Descargar configuración JSON"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v7M3 5l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Exportar
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-lg text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #C15B3A 0%, #A84B2C 100%)",
            boxShadow: "0 2px 10px rgba(193,91,58,0.35)",
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(193,91,58,0.5)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(193,91,58,0.35)")}
        >
          ✦ Publicar
        </button>
      </div>
    </div>
  );
}
