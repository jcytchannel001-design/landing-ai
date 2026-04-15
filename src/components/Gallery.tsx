"use client";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

// All 20 photos — ALL are interiors, categorised by room type
const photos = [
  { src: "/fotos/foto1.jpg",  alt: "Salón minimalista nórdico",               cat: "Salones",     span: "col-span-2 row-span-2" },
  { src: "/fotos/foto2.jpg",  alt: "Salón dúplex con escalera de cristal",    cat: "Salones",     span: "" },
  { src: "/fotos/foto3.jpg",  alt: "Salón dúplex moderno",                    cat: "Salones",     span: "" },
  { src: "/fotos/foto4.jpg",  alt: "Cocina americana open-concept",           cat: "Cocinas",     span: "col-span-2" },
  { src: "/fotos/foto5.jpg",  alt: "Salón en tonos crema con sillones",       cat: "Salones",     span: "" },
  { src: "/fotos/foto6.jpg",  alt: "Cocina-salón con isla de mármol",         cat: "Cocinas",     span: "" },
  { src: "/fotos/foto7.jpg",  alt: "Salón con pared de madera y chimenea",    cat: "Salones",     span: "col-span-2" },
  { src: "/fotos/foto8.jpg",  alt: "Recibidor con mueble nórdico y flores",   cat: "Salones",     span: "" },
  { src: "/fotos/foto9.jpg",  alt: "Baño con orquídeas y ventana",            cat: "Baños",       span: "" },
  { src: "/fotos/foto10.jpg", alt: "Baño doble lavabo con papel tropical",    cat: "Baños",       span: "col-span-2 row-span-2" },
  { src: "/fotos/foto11.jpg", alt: "Comedor con terraza al fondo",            cat: "Salones",     span: "" },
  { src: "/fotos/foto12.jpg", alt: "Baño de mármol con paredes teal",         cat: "Baños",       span: "" },
  { src: "/fotos/foto13.jpg", alt: "Cocina de madera con suelo espiga",       cat: "Cocinas",     span: "col-span-2" },
  { src: "/fotos/foto14.jpg", alt: "Salón ático con vigas blancas",           cat: "Salones",     span: "" },
  { src: "/fotos/foto15.jpg", alt: "Comedor con lámpara dorada y columna",    cat: "Salones",     span: "" },
  { src: "/fotos/foto16.jpg", alt: "Dormitorio suite con balcón",             cat: "Dormitorios", span: "col-span-2" },
  { src: "/fotos/foto17.jpg", alt: "Salón comedor con araña dorada",          cat: "Salones",     span: "" },
  { src: "/fotos/foto18.jpg", alt: "Salón con estantería de madera",          cat: "Salones",     span: "" },
  { src: "/fotos/foto19.jpg", alt: "Zona de trabajo con espejo redondo",      cat: "Dormitorios", span: "col-span-2" },
  { src: "/fotos/foto20.jpg", alt: "Salón moderno minimalista",               cat: "Salones",     span: "" },
];

const categories = ["Todos", "Salones", "Cocinas", "Baños", "Dormitorios"];

export default function Gallery() {
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "Todos" ? photos : photos.filter(p => p.cat === active);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#C15B3A] text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1714] mb-4">
            Cada foto cuenta{" "}
            <span className="text-[#C15B3A]">una historia</span>
          </h2>
          <p className="text-[#8A7E76] text-base leading-relaxed">
            Fotografías reales de Ignacio. La calidad que ves aquí es exactamente
            la que recibirás en tu encargo.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat
                  ? "bg-[#C15B3A] text-white shadow-md"
                  : "bg-stone-100 text-[#8A7E76] hover:bg-[#F9EDE8] hover:text-[#C15B3A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {filtered.map(photo => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${photo.span}`}
              onClick={() => setLightbox(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover image-zoom"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#1C1714]/0 group-hover:bg-[#1C1714]/30 transition-all duration-400 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <ZoomIn size={26} className="text-white drop-shadow-lg" />
                  <span className="text-white text-xs tracking-widest uppercase font-semibold bg-[#C15B3A]/80 px-3 py-1 rounded-full">
                    {photo.cat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/30 rounded-full p-2"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Foto ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
