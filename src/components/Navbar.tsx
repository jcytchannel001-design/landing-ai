"use client";
import { useState, useEffect } from "react";
import { LogoFull } from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#servicios",   label: "Servicios" },
  { href: "#portfolio",   label: "Portfolio" },
  { href: "#proceso",     label: "Proceso" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto",    label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" aria-label="Inicio">
          <LogoFull size={34} dark={false} />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-[#4A3F38] hover:text-[#C15B3A] transition-colors duration-200 tracking-wide font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href="#contacto">
            <Button className="bg-[#C15B3A] hover:bg-[#9E4428] text-white font-semibold text-sm px-5 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
              Solicitar Presupuesto
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#4A3F38] hover:text-[#C15B3A] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-5 shadow-lg">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[#4A3F38] hover:text-[#C15B3A] transition-colors text-sm tracking-wide font-medium block py-1"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#contacto" onClick={() => setOpen(false)}>
                <Button className="w-full bg-[#C15B3A] hover:bg-[#9E4428] text-white font-semibold rounded-full">
                  Solicitar Presupuesto
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
