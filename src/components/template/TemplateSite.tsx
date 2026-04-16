"use client";

import { useState, useEffect, useRef } from "react";
import type { SiteConfig } from "@/lib/siteTypes";
import {
  Camera, Home, Plane, Video, Lightbulb, Layers, Star, Heart,
  Briefcase, Coffee, Music, Utensils, Scissors, Car, Laptop,
  Globe, ShoppingBag, Dumbbell, Leaf, Palette, ArrowRight,
  Menu, X, ZoomIn, CheckCircle2, Clock, TrendingUp, Shield,
  Award, MapPin, Quote, Send, Phone, Mail, AtSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Icon map ────────────────────────────────────────────────
const ICONS: Record<string, React.ElementType> = {
  Camera, Home, Plane, Video, Lightbulb, Layers, Star, Heart,
  Briefcase, Coffee, Music, Utensils, Scissors, Car, Laptop,
  Globe, ShoppingBag, Dumbbell, Leaf, Palette,
  CheckCircle2, Clock, TrendingUp, Shield, Award, MapPin,
};
const getIcon = (name: string): React.ElementType => ICONS[name] || Camera;

// ── Types ────────────────────────────────────────────────────
type OnUpdate = (path: string, value: unknown) => void;
interface EP { editMode: boolean; onUpdate: OnUpdate; }

// ── EditableText ─────────────────────────────────────────────
interface ETProps extends EP {
  value: string | number;
  path: string;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}
function ET({ value, path, editMode, onUpdate, className = "", style, multiline = false }: ETProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const focused = useRef(false);
  const strVal = String(value);

  useEffect(() => {
    if (ref.current && !focused.current) {
      ref.current.textContent = strVal;
    }
  }, [strVal]);

  if (!editMode) {
    return <span className={className} style={style}>{strVal}</span>;
  }

  const hoverStyle = {
    outline: "1.5px dashed transparent",
    outlineOffset: "3px",
    borderRadius: "3px",
    transition: "outline 0.1s, background 0.1s",
    cursor: "text",
    minWidth: "0.5em",
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-edit-path={path}
      className={className}
      style={{ ...style, ...hoverStyle }}
      onMouseEnter={e => { if (!focused.current) e.currentTarget.style.outline = "1.5px dashed rgba(59,130,246,0.45)"; }}
      onMouseLeave={e => { if (!focused.current) e.currentTarget.style.outline = "1.5px dashed transparent"; }}
      onFocus={e => {
        focused.current = true;
        e.currentTarget.style.outline = "2px solid rgba(59,130,246,0.8)";
        e.currentTarget.style.background = "rgba(59,130,246,0.05)";
      }}
      onBlur={e => {
        focused.current = false;
        e.currentTarget.style.outline = "1.5px dashed transparent";
        e.currentTarget.style.background = "transparent";
        const text = e.currentTarget.textContent || "";
        if (text !== strVal) {
          if (typeof value === "number") {
            const n = parseFloat(text);
            if (!isNaN(n)) onUpdate(path, n);
          } else {
            onUpdate(path, text);
          }
        }
      }}
      onKeyDown={e => {
        if (e.key === "Enter" && !multiline) { e.preventDefault(); e.currentTarget.blur(); }
        if (e.key === "Escape") { if (ref.current) ref.current.textContent = strVal; e.currentTarget.blur(); }
      }}
    />
  );
}

// ── EditableImage ────────────────────────────────────────────
interface EIProps extends EP {
  src: string;
  alt: string;
  path: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
}
function EI({ src, alt, path, editMode, onUpdate, className = "", style, loading = "lazy" }: EIProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { if (ev.target?.result) onUpdate(path, ev.target.result as string); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  if (!editMode) {
    return <img src={src} alt={alt} className={className} style={style} loading={loading} />;
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={src} alt={alt} className={className} style={style} loading={loading} />
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-200 cursor-pointer z-10"
        style={{ background: hover ? "rgba(0,0,0,0.38)" : "transparent" }}
        onClick={() => fileRef.current?.click()}
      >
        {hover && (
          <div className="flex items-center gap-2 bg-white/92 text-stone-800 text-xs font-semibold px-3 py-2 rounded-full shadow-lg">
            <Camera size={13} /> Cambiar imagen
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}

// ── WaSvg ────────────────────────────────────────────────────
function WaSvg({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function css(c: SiteConfig) {
  return { "--primary": c.brand.primaryColor, "--bg": c.brand.bgColor, "--dark": c.brand.darkColor } as React.CSSProperties;
}

function buildGoogleFontsUrl(heading: string, body: string): string {
  const enc = (s: string) => s.trim().replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${enc(heading)}:ital,wght@0,400;0,600;0,700;0,900;1,400&family=${enc(body)}:wght@400;500;600&display=swap`;
}

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── NAVBAR ───────────────────────────────────────────────────
function Navbar({ c, editMode, onUpdate, topOffset = 0 }: { c: SiteConfig; topOffset?: number } & EP) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const p = c.brand.primaryColor;
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100" : "py-5 bg-transparent"}`}
      style={{ top: topOffset }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-bold text-lg" style={{ color: c.brand.darkColor }}>
          <ET value={c.navbar.brandName} path="navbar.brandName" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {c.navbar.links.map(l => (
            <li key={l.href}>
              <a href={editMode ? undefined : l.href} className="text-sm font-medium tracking-wide transition-colors duration-200" style={{ color: "#4A3F38" }}
                onMouseEnter={e => (e.currentTarget.style.color = p)}
                onMouseLeave={e => (e.currentTarget.style.color = "#4A3F38")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <a href={editMode ? undefined : "#contacto"}>
            <Button className="text-white font-semibold text-sm px-5 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md" style={{ backgroundColor: p }}>
              <ET value={c.navbar.ctaText} path="navbar.ctaText" editMode={editMode} onUpdate={onUpdate} />
            </Button>
          </a>
        </div>
        <button className="md:hidden" style={{ color: "#4A3F38" }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-5 shadow-lg">
          <ul className="flex flex-col gap-4">
            {c.navbar.links.map(l => (
              <li key={l.href}><a href={l.href} className="text-sm font-medium" style={{ color: "#4A3F38" }} onClick={() => setOpen(false)}>{l.label}</a></li>
            ))}
            <li className="pt-2"><a href="#contacto" onClick={() => setOpen(false)}>
              <Button className="w-full text-white font-semibold rounded-full" style={{ backgroundColor: p }}>{c.navbar.ctaText}</Button>
            </a></li>
          </ul>
        </div>
      )}
    </header>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function Hero({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  const bg = c.brand.bgColor;
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, ${p}18 0%, transparent 60%)` }} />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
        <div className="pb-16 lg:pb-28">
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-sm">
            <Star size={12} fill={p} style={{ color: p }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: p }}>
              <ET value={c.hero.badge} path="hero.badge" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tight leading-[1.08] mb-6" style={{ color: c.brand.darkColor }}>
            <ET value={c.hero.headline} path="hero.headline" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />{" "}
            <span className="relative inline-block">
              <span className="shimmer-accent">
                <ET value={c.hero.accentWord} path="hero.accentWord" editMode={editMode} onUpdate={onUpdate} />
              </span>
            </span>
            {c.hero.headlineLine2 && (
              <>
                <br />
                <ET value={c.hero.headlineLine2} path="hero.headlineLine2" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />
              </>
            )}
            <br />
            <span style={{ color: p }}>
              <ET value={c.hero.headlineAccent} path="hero.headlineAccent" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-md mb-10" style={{ color: "#8A7E76" }}>
            <ET value={c.hero.subheadline} path="hero.subheadline" editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href={editMode ? undefined : "#contacto"}>
              <Button size="lg" className="text-white font-bold px-8 py-6 text-base rounded-full shadow-md hover:shadow-xl transition-all duration-300 group" style={{ backgroundColor: p }}>
                <ET value={c.hero.ctaPrimary} path="hero.ctaPrimary" editMode={editMode} onUpdate={onUpdate} />
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={editMode ? undefined : "#portfolio"}>
              <Button size="lg" variant="outline" className="px-8 py-6 text-base rounded-full font-semibold transition-all duration-300" style={{ borderColor: `${p}60`, color: p }}>
                <ET value={c.hero.ctaSecondary} path="hero.ctaSecondary" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
              </Button>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2">
              {["A", "B", "C", "+"].map((n, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white" style={{ borderColor: bg, backgroundColor: p }}>{n}</div>
              ))}
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={p} style={{ color: p }} />)}
                <span className="font-bold text-sm ml-1" style={{ color: p }}>4.9</span>
              </div>
              <p className="text-xs" style={{ color: "#8A7E76" }}>
                <ET value={c.hero.trustText} path="hero.trustText" editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
              </p>
            </div>
          </div>
        </div>
        <div className="relative lg:h-screen flex items-end pb-0 hidden lg:flex">
          <div className="absolute top-24 right-0 w-[58%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <EI src={c.hero.images[0]} alt="Hero 1" path="hero.images.0" editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="eager" />
          </div>
          <div className="absolute top-36 left-0 w-[46%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl" style={{ border: `4px solid ${bg}` }}>
            <EI src={c.hero.images[1]} alt="Hero 2" path="hero.images.1" editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="eager" />
          </div>
          <div className="absolute bottom-16 right-[8%] w-[42%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl" style={{ border: `4px solid ${bg}` }}>
            <EI src={c.hero.images[2]} alt="Hero 3" path="hero.images.2" editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute bottom-20 left-4 bg-white rounded-2xl p-4 shadow-xl border border-stone-100 z-10">
            <p className="text-xs mb-1" style={{ color: "#8A7E76" }}>
              <ET value={c.hero.statBadge.label} path="hero.statBadge.label" editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
            </p>
            <p className="text-2xl font-bold" style={{ color: p }}>
              <ET value={c.hero.statBadge.value} path="hero.statBadge.value" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </p>
            <p className="text-xs" style={{ color: "#8A7E76" }}>
              <ET value={c.hero.statBadge.sublabel} path="hero.statBadge.sublabel" editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${p}60, transparent)` }} />
      </div>
    </section>
  );
}

// ── STATS ────────────────────────────────────────────────────
function Stats({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  return (
    <section className="bg-white border-y border-stone-100 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-stone-100">
          {c.stats.map((s, i) => (
            <div key={i} className="text-center px-8 py-2">
              <div className="text-4xl md:text-5xl font-bold mb-1.5" style={{ color: p }}>
                {editMode ? (
                  <>
                    <ET value={s.value} path={`stats.${i}.value`} editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
                    <ET value={s.suffix} path={`stats.${i}.suffix`} editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
                  </>
                ) : (
                  <CountUp end={s.value} suffix={s.suffix} />
                )}
              </div>
              <p className="text-sm tracking-wide" style={{ color: "#8A7E76" }}>
                <ET value={s.label} path={`stats.${i}.label`} editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ─────────────────────────────────────────────────
function Services({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  const bg = c.brand.bgColor;
  return (
    <section id="servicios" className="py-24" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block" style={{ color: p }}>Servicios</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: c.brand.darkColor }}>
            Todo lo que necesitas para{" "}<span style={{ color: p }}>destacar</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "#8A7E76" }}>
            Servicios diseñados para impulsar tu negocio con calidad garantizada.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.services.map((s, i) => {
            const Icon = getIcon(s.iconName);
            return (
              <div key={i} className="group bg-white rounded-2xl p-7 border border-stone-100 hover:shadow-lg transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-colors" style={{ backgroundColor: `${p}18` }}>
                  <Icon size={21} style={{ color: p }} />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: c.brand.darkColor }}>
                  <ET value={s.title} path={`services.${i}.title`} editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#8A7E76" }}>
                  <ET value={s.desc} path={`services.${i}.desc`} editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
                </p>
                <div className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: p }}>
                  <ET value={s.detail} path={`services.${i}.detail`} editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <a href={editMode ? undefined : "#contacto"} className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors group" style={{ color: p }}>
            Ver todos los precios<span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── GALLERY ──────────────────────────────────────────────────
function Gallery({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const p = c.brand.primaryColor;
  const cats = c.gallery.categories;
  const filtered = active === "All" || active === "Todos" || active === cats[0]
    ? c.gallery.photos
    : c.gallery.photos.filter(ph => ph.cat === active);
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block" style={{ color: p }}>Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: c.brand.darkColor }}>
            <ET value={c.gallery.title} path="gallery.title" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />{" "}
            <span style={{ color: p }}>
              <ET value={c.gallery.subtitle} path="gallery.subtitle" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
          </h2>
        </div>
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {cats.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={active === cat ? { backgroundColor: p, color: "#fff" } : { backgroundColor: "#f5f5f4", color: "#8A7E76" }}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {filtered.map((ph, i) => (
            <div
              key={ph.src + i}
              className={`relative overflow-hidden rounded-xl group ${ph.span || ""}`}
              style={{ cursor: editMode ? "default" : "pointer" }}
              onClick={() => !editMode && setLightbox(ph.src)}
            >
              <EI
                src={ph.src}
                alt={ph.alt}
                path={`gallery.photos.${c.gallery.photos.indexOf(ph)}.src`}
                editMode={editMode}
                onUpdate={onUpdate}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {!editMode && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-center justify-center pointer-events-none">
                  <ZoomIn size={26} className="text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {!editMode && lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/30 rounded-full p-2" onClick={() => setLightbox(null)}><X size={24} /></button>
          <img src={lightbox} alt="Lightbox" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// ── WHY US ───────────────────────────────────────────────────
function WhyUs({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  const bg = c.brand.bgColor;
  return (
    <section className="py-24" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px]">
            <div className="absolute top-0 left-0 w-[62%] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <EI src={c.whyUs.images[0]} alt="Why us 1" path="whyUs.images.0" editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl" style={{ border: `4px solid ${bg}` }}>
              <EI src={c.whyUs.images[1]} alt="Why us 2" path="whyUs.images.1" editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute top-[38%] right-[4%] bg-white rounded-2xl p-5 shadow-xl border border-stone-100 z-10 w-44">
              <p className="text-xs mb-1" style={{ color: "#8A7E76" }}>
                <ET value={c.whyUs.statBadge.label} path="whyUs.statBadge.label" editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
              </p>
              <p className="text-3xl font-bold" style={{ color: p }}>
                <ET value={c.whyUs.statBadge.value} path="whyUs.statBadge.value" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
              </p>
              <p className="text-xs" style={{ color: "#8A7E76" }}>
                <ET value={c.whyUs.statBadge.sublabel} path="whyUs.statBadge.sublabel" editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
              </p>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block" style={{ color: p }}>
              <ET value={c.whyUs.badge} path="whyUs.badge" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: c.brand.darkColor }}>
              <ET value={c.whyUs.title} path="whyUs.title" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />{" "}
              <span style={{ color: p }}>
                <ET value={c.whyUs.titleAccent} path="whyUs.titleAccent" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#8A7E76" }}>
              <ET value={c.whyUs.subtitle} path="whyUs.subtitle" editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
            </p>
            <div className="flex flex-col gap-6">
              {c.whyUs.features.map((f, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center mt-0.5 shadow-sm">
                    <CheckCircle2 size={18} style={{ color: p }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: c.brand.darkColor }}>
                      <ET value={f.title} path={`whyUs.features.${i}.title`} editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#8A7E76" }}>
                      <ET value={f.desc} path={`whyUs.features.${i}.desc`} editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ──────────────────────────────────────────────────
function Process({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  const bg = c.brand.bgColor;
  return (
    <section id="proceso" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block" style={{ color: p }}>
            <ET value={c.process.badge} path="process.badge" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: c.brand.darkColor }}>
            <ET value={c.process.title} path="process.title" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />{" "}
            <span style={{ color: p }}>
              <ET value={c.process.titleAccent} path="process.titleAccent" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8A7E76" }}>
            <ET value={c.process.subtitle} path="process.subtitle" editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {c.process.steps.map((s, i) => (
            <div key={i} className="relative group rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-transparent" style={{ backgroundColor: bg }}>
              {i < c.process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-full w-5 h-px z-10" style={{ backgroundColor: `${p}40` }} />
              )}
              <div className="text-5xl font-bold mb-4 leading-none select-none" style={{ color: `${p}30` }}>0{i + 1}</div>
              <h3 className="font-semibold text-base mb-2" style={{ color: c.brand.darkColor }}>
                <ET value={s.title} path={`process.steps.${i}.title`} editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8A7E76" }}>
                <ET value={s.desc} path={`process.steps.${i}.desc`} editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 h-52 rounded-2xl overflow-hidden">
          {c.process.stripImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl">
              <EI src={src} alt={`Process ${i + 1}`} path={`process.stripImages.${i}`} editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: `${c.brand.darkColor}18` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ─────────────────────────────────────────────
function Testimonials({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  const bg = c.brand.bgColor;
  return (
    <section id="testimonios" className="py-24" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block" style={{ color: p }}>
            <ET value={c.testimonials.badge} path="testimonials.badge" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: c.brand.darkColor }}>
            <ET value={c.testimonials.title} path="testimonials.title" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />{" "}
            <span style={{ color: p }}>
              <ET value={c.testimonials.titleAccent} path="testimonials.titleAccent" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8A7E76" }}>
            <ET value={c.testimonials.subtitle} path="testimonials.subtitle" editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.testimonials.items.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-stone-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
              <Quote size={22} style={{ color: `${p}50` }} />
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={13} fill={p} style={{ color: p }} />)}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#4A3F38" }}>
                &ldquo;<ET value={t.text} path={`testimonials.items.${i}.text`} editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#4A3F38" }} />&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: p }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: c.brand.darkColor }}>
                    <ET value={t.name} path={`testimonials.items.${i}.name`} editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />
                  </p>
                  <p className="text-xs" style={{ color: "#8A7E76" }}>
                    <ET value={t.role} path={`testimonials.items.${i}.role`} editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-stone-200 shadow-sm">
            <div className="flex gap-1">{[1,2,3,4,5].map(s => <Star key={s} size={15} fill={p} style={{ color: p }} />)}</div>
            <span className="font-bold" style={{ color: c.brand.darkColor }}>
              <ET value={c.testimonials.ratingValue} path="testimonials.ratingValue" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} /> / 5
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-sm" style={{ color: "#8A7E76" }}>
              <ET value={c.testimonials.ratingCount} path="testimonials.ratingCount" editMode={editMode} onUpdate={onUpdate} style={{ color: "#8A7E76" }} /> reseñas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────
function Contact({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const [sent, setSent] = useState(false);
  const p = c.brand.primaryColor;
  const bg = c.brand.bgColor;
  const waLink = `https://wa.me/${c.contact.whatsapp}`;
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block" style={{ color: p }}>
            <ET value={c.contact.badge} path="contact.badge" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: c.brand.darkColor }}>
            <ET value={c.contact.title} path="contact.title" editMode={editMode} onUpdate={onUpdate} style={{ color: c.brand.darkColor }} />{" "}
            <span style={{ color: p }}>
              <ET value={c.contact.titleAccent} path="contact.titleAccent" editMode={editMode} onUpdate={onUpdate} style={{ color: p }} />
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8A7E76" }}>
            <ET value={c.contact.subtitle} path="contact.subtitle" editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "#8A7E76" }} />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-2xl p-8" style={{ backgroundColor: bg }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${p}18`, border: `1px solid ${p}30` }}>
                  <Send size={24} style={{ color: p }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: c.brand.darkColor }}>¡Mensaje enviado!</h3>
                <p className="text-sm" style={{ color: "#8A7E76" }}>Te contactaremos en menos de 2 horas.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (!editMode) setSent(true); }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#4A3F38" }}>Nombre</label>
                    <input required className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm" style={{ color: c.brand.darkColor }} placeholder="Tu nombre" onFocus={e => (e.currentTarget.style.borderColor = `${p}80`)} onBlur={e => (e.currentTarget.style.borderColor = "")} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#4A3F38" }}>Teléfono</label>
                    <input type="tel" className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm" style={{ color: c.brand.darkColor }} placeholder="+34 600 000 000" onFocus={e => (e.currentTarget.style.borderColor = `${p}80`)} onBlur={e => (e.currentTarget.style.borderColor = "")} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#4A3F38" }}>Email</label>
                  <input required type="email" className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none shadow-sm" style={{ color: c.brand.darkColor }} placeholder="tu@email.com" onFocus={e => (e.currentTarget.style.borderColor = `${p}80`)} onBlur={e => (e.currentTarget.style.borderColor = "")} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#4A3F38" }}>Mensaje</label>
                  <textarea rows={4} className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none shadow-sm" style={{ color: c.brand.darkColor }} placeholder="Cuéntanos tu proyecto..." onFocus={e => (e.currentTarget.style.borderColor = `${p}80`)} onBlur={e => (e.currentTarget.style.borderColor = "")} />
                </div>
                <Button type="submit" className="w-full text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg mt-2" style={{ backgroundColor: p }}>
                  <Send size={16} className="mr-2" /> Solicitar Presupuesto Gratuito
                </Button>
                <p className="text-xs text-center" style={{ color: "#8A7E76" }}>Sin compromiso · Respuesta en menos de 2 horas</p>
              </form>
            )}
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: c.brand.darkColor }}>Información de contacto</h3>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: "Teléfono", value: `+${c.contact.phone}`, href: `tel:+${c.contact.phone}` },
                  { icon: Mail, label: "Email", value: c.contact.email, href: `mailto:${c.contact.email}` },
                  { icon: MapPin, label: "Ubicación", value: c.contact.location, href: null },
                  { icon: AtSign, label: "Instagram", value: c.contact.instagram, href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${p}18`, border: `1px solid ${p}25` }}>
                      <Icon size={17} style={{ color: p }} />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: "#8A7E76" }}>{label}</p>
                      {href ? <a href={editMode ? undefined : href} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: c.brand.darkColor }}>{value}</a>
                        : <p className="text-sm font-medium" style={{ color: c.brand.darkColor }}>{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <a href={editMode ? undefined : waLink} target={editMode ? undefined : "_blank"} rel="noopener noreferrer"
                className="mt-8 flex items-center gap-3 text-white rounded-2xl px-6 py-4 font-semibold text-sm transition-all duration-300 hover:shadow-lg w-full justify-center bg-[#25D366] hover:bg-[#1DA851]">
                <WaSvg size={20} /> Escríbeme por WhatsApp
              </a>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-44">
              <EI src={c.contact.image} alt="Contact" path="contact.image" editMode={editMode} onUpdate={onUpdate} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #1C171499, transparent)" }} />
              <div className="absolute bottom-4 left-4 pointer-events-none">
                <p className="text-white/70 text-xs">¿Tienes referencias?</p>
                <p className="text-white text-sm font-semibold">Coméntalas en el mensaje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer({ c, editMode, onUpdate }: { c: SiteConfig } & EP) {
  const p = c.brand.primaryColor;
  const dark = c.brand.darkColor;
  return (
    <footer style={{ backgroundColor: dark }}>
      <div className="ticker-wrap h-24 border-b border-white/5">
        <div className="ticker-inner h-full">
          {[...c.footer.tickerPhotos, ...c.footer.tickerPhotos].map((src, i) => (
            <div key={i} className="relative w-36 h-24 flex-shrink-0 overflow-hidden mx-0.5">
              <EI
                src={src}
                alt=""
                path={`footer.tickerPhotos.${i % c.footer.tickerPhotos.length}`}
                editMode={editMode}
                onUpdate={onUpdate}
                className="w-full h-full object-cover opacity-40 hover:opacity-70 transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-bold text-xl text-white mb-1">
              <ET value={c.footer.name} path="footer.name" editMode={editMode} onUpdate={onUpdate} className="text-white" style={{ color: "white" }} />
            </p>
            <p className="text-white/35 text-sm leading-relaxed mt-4 max-w-xs">
              <ET value={c.footer.description} path="footer.description" editMode={editMode} onUpdate={onUpdate} multiline style={{ color: "rgba(255,255,255,0.35)" }} />
            </p>
            <a href={editMode ? undefined : `https://wa.me/${c.footer.whatsapp}`} target={editMode ? undefined : "_blank"} rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-white rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg bg-[#25D366] hover:bg-[#1DA851]">
              <WaSvg size={16} /> Contactar por WhatsApp
            </a>
          </div>
          <div>
            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Servicios</h4>
            <ul className="flex flex-col gap-2.5">
              {c.footer.services.map((l, i) => (
                <li key={i}>
                  <a href={editMode ? undefined : "#servicios"} className="text-white/35 text-sm hover:text-white/70 transition-colors">
                    <ET value={l} path={`footer.services.${i}`} editMode={editMode} onUpdate={onUpdate} style={{ color: "rgba(255,255,255,0.35)" }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Áreas</h4>
            <ul className="flex flex-col gap-2.5">
              {c.footer.areas.map((l, i) => (
                <li key={i}>
                  <span className="text-white/35 text-sm">
                    <ET value={l} path={`footer.areas.${i}`} editMode={editMode} onUpdate={onUpdate} style={{ color: "rgba(255,255,255,0.35)" }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} {c.footer.name}</p>
          <div className="flex gap-6">
            {["Aviso legal", "Privacidad", "Cookies"].map(l => (
              <a key={l} href="#" className="text-white/20 text-xs hover:text-white/50 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────
interface TemplateSiteProps {
  config: SiteConfig;
  editMode?: boolean;
  onUpdate?: OnUpdate;
  topOffset?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop: OnUpdate = () => {};

export default function TemplateSite({
  config,
  editMode = false,
  onUpdate = noop,
  topOffset = 0,
}: TemplateSiteProps) {
  const ep: EP = { editMode, onUpdate };
  const tid = `lt-${config.id ?? "preview"}`;
  return (
    <div id={tid} style={css(config)}>
      {config.font && (
        <style>{`
          @import url('${buildGoogleFontsUrl(config.font.heading, config.font.body)}');
          #${tid} { font-family: '${config.font.body}', system-ui, sans-serif; }
          #${tid} h1, #${tid} h2, #${tid} h3, #${tid} h4 { font-family: '${config.font.heading}', serif; }
        `}</style>
      )}
      <Navbar c={config} topOffset={topOffset} {...ep} />
      <Hero c={config} {...ep} />
      <Stats c={config} {...ep} />
      <Services c={config} {...ep} />
      <Gallery c={config} {...ep} />
      <WhyUs c={config} {...ep} />
      <Process c={config} {...ep} />
      <Testimonials c={config} {...ep} />
      <Contact c={config} {...ep} />
      <Footer c={config} {...ep} />
      <a
        href={editMode ? undefined : `https://wa.me/${config.brand.whatsapp}`}
        target={editMode ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="wa-btn"
        title="Escríbeme por WhatsApp"
        style={editMode ? { pointerEvents: "none" } : {}}
      >
        <WaSvg size={28} />
      </a>
    </div>
  );
}
