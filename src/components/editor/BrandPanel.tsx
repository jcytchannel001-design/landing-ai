"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/siteTypes";

const PRIMARY_SWATCHES = [
  "#C15B3A", "#2563EB", "#16A34A", "#7C3AED",
  "#DB2777", "#EA580C", "#0891B2", "#334155",
  "#B45309", "#DC2626", "#0D9488", "#7C2D12",
];

const BG_SWATCHES = [
  { label: "Crema cálida", value: "#F5F1EC" },
  { label: "Blanco roto", value: "#FAFAF8" },
  { label: "Lino", value: "#FDF6F0" },
  { label: "Blanco puro", value: "#FFFFFF" },
  { label: "Gris suave", value: "#F8F8F8" },
  { label: "Azul helado", value: "#EFF6FF" },
];

interface BrandPanelProps {
  config: SiteConfig;
  onUpdate: (path: string, value: unknown) => void;
  onClose: () => void;
}

function Field({
  label, value, path, onUpdate, type = "text", placeholder = "",
}: {
  label: string;
  value: string;
  path: string;
  onUpdate: (path: string, value: unknown) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8A7E76" }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full text-sm px-3 py-2 rounded-xl border transition-all outline-none"
        style={{ borderColor: "#EDE8E3", color: "#1C1714", background: "#FAFAF8" }}
        onFocus={e => (e.currentTarget.style.borderColor = "#C15B3A")}
        onBlur={e => {
          e.currentTarget.style.borderColor = "#EDE8E3";
          if (e.currentTarget.value !== value) onUpdate(path, e.currentTarget.value);
        }}
      />
    </div>
  );
}

export default function BrandPanel({ config, onUpdate, onClose }: BrandPanelProps) {
  const [tab, setTab] = useState<"colors" | "info">("colors");
  const b = config.brand;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[998]"
        style={{ background: "rgba(0,0,0,0.15)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-[52px] right-0 bottom-0 z-[999] flex flex-col"
        style={{
          width: "min(360px, 100vw)",
          background: "white",
          borderLeft: "1px solid #F0EBE6",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#F0EBE6" }}>
          <div>
            <h2 className="text-sm font-bold" style={{ color: "#1C1714" }}>Identidad de marca</h2>
            <p className="text-xs mt-0.5" style={{ color: "#8A7E76" }}>Los cambios se guardan automáticamente</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "#8A7E76", background: "#F5F0ED" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#EDE8E3")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F5F0ED")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-5" style={{ borderColor: "#F0EBE6" }}>
          {(["colors", "info"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="py-3 mr-6 text-xs font-semibold transition-all border-b-2 -mb-px"
              style={{
                color: tab === t ? "#C15B3A" : "#8A7E76",
                borderColor: tab === t ? "#C15B3A" : "transparent",
              }}
            >
              {t === "colors" ? "Colores" : "Información"}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
          {tab === "colors" && (
            <>
              {/* Primary color */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#8A7E76" }}>
                  Color principal
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {PRIMARY_SWATCHES.map(sw => (
                    <button
                      key={sw}
                      onClick={() => {
                        onUpdate("brand.primaryColor", sw);
                        onUpdate("navbar.primaryColor", sw);
                      }}
                      className="w-8 h-8 rounded-full transition-all flex items-center justify-center flex-shrink-0"
                      style={{
                        background: sw,
                        boxShadow: b.primaryColor === sw
                          ? `0 0 0 2px white, 0 0 0 4px ${sw}`
                          : "none",
                        transform: b.primaryColor === sw ? "scale(1.15)" : "scale(1)",
                      }}
                      title={sw}
                    >
                      {b.primaryColor === sw && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                  {/* Custom picker */}
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full overflow-hidden border-2 cursor-pointer flex items-center justify-center"
                      style={{
                        borderColor: "#EDE8E3",
                        background: "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)",
                      }}
                      title="Color personalizado"
                    >
                      <input
                        type="color"
                        value={b.primaryColor}
                        onChange={e => {
                          onUpdate("brand.primaryColor", e.target.value);
                          onUpdate("navbar.primaryColor", e.target.value);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                    {!PRIMARY_SWATCHES.includes(b.primaryColor) && (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: b.primaryColor }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border" style={{ background: b.primaryColor, borderColor: "#EDE8E3" }} />
                  <span className="text-xs font-mono" style={{ color: "#8A7E76" }}>{b.primaryColor}</span>
                </div>
              </div>

              {/* Background color */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#8A7E76" }}>
                  Fondo de sección
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BG_SWATCHES.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => onUpdate("brand.bgColor", value)}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all"
                      style={{
                        borderColor: b.bgColor === value ? "#C15B3A" : "#EDE8E3",
                        background: "white",
                      }}
                    >
                      <div
                        className="w-full h-8 rounded-lg border"
                        style={{ background: value, borderColor: "#EDE8E3" }}
                      />
                      <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "#6B5E57" }}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark color */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#8A7E76" }}>
                  Color de texto principal
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border cursor-pointer" style={{ borderColor: "#EDE8E3" }}>
                    <div className="w-full h-full" style={{ background: b.darkColor }} />
                    <input
                      type="color"
                      value={b.darkColor}
                      onChange={e => onUpdate("brand.darkColor", e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#1C1714" }}>Color oscuro</p>
                    <p className="text-xs font-mono" style={{ color: "#8A7E76" }}>{b.darkColor}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "info" && (
            <>
              <Field label="Nombre del negocio" value={b.name} path="brand.name" onUpdate={onUpdate} />
              <Field label="Tagline / eslogan" value={b.tagline} path="brand.tagline" onUpdate={onUpdate} placeholder="Corto y memorable" />
              <Field label="Ciudad / ubicación" value={b.city} path="brand.city" onUpdate={onUpdate} placeholder="Madrid" />
              <Field label="Teléfono (solo dígitos)" value={b.phone} path="brand.phone" onUpdate={onUpdate} type="tel" placeholder="34600000000" />
              <Field label="Email" value={b.email} path="brand.email" onUpdate={onUpdate} type="email" placeholder="info@tuempresa.com" />
              <Field label="Instagram" value={b.instagram} path="brand.instagram" onUpdate={onUpdate} placeholder="@tuhandle" />
              <Field label="WhatsApp (con prefijo país)" value={b.whatsapp} path="brand.whatsapp" onUpdate={onUpdate} placeholder="34600000000" />

              <div className="pt-2 border-t" style={{ borderColor: "#F0EBE6" }}>
                <p className="text-[11px]" style={{ color: "#B0A49C" }}>
                  Los cambios en teléfono, email y WhatsApp se reflejan automáticamente en las secciones de contacto y footer.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t" style={{ borderColor: "#F0EBE6" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#16A34A" }} />
            <span className="text-xs" style={{ color: "#8A7E76" }}>Guardado automáticamente</span>
          </div>
        </div>
      </div>
    </>
  );
}
