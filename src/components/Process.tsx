const steps = [
  { n: "01", title: "Solicita presupuesto", desc: "Cuéntanos el tipo de propiedad, la zona y la fecha. Te enviamos presupuesto en menos de 2 horas sin compromiso." },
  { n: "02", title: "Sesión fotográfica", desc: "Ignacio se desplaza a la propiedad y realiza la sesión con equipamiento profesional de estudio." },
  { n: "03", title: "Edición y retoque", desc: "Selección y retoque profesional de cada imagen: color, luz, perspectiva y eliminación de elementos no deseados." },
  { n: "04", title: "Entrega en 24-48h", desc: "Recibes todas las fotos en alta resolución listas para publicar en Idealista, Fotocasa o tu web inmobiliaria." },
];

export default function Process() {
  return (
    <section id="proceso" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C15B3A] text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">Proceso</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1714] mb-4">
            Así de <span className="text-[#C15B3A]">sencillo</span>
          </h2>
          <p className="text-[#8A7E76] text-base leading-relaxed">
            De tu solicitud a las fotos listas en menos de 48 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {steps.map((s, i) => (
            <div key={s.n} className="relative group bg-[#F5F1EC] rounded-2xl p-6 hover:bg-[#F9EDE8] hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#C15B3A]/15">
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-full w-5 h-px bg-[#C15B3A]/25 z-10" />
              )}
              <div className="text-5xl font-bold text-[#C15B3A]/20 mb-4 leading-none select-none">{s.n}</div>
              <h3 className="text-[#1C1714] font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-[#8A7E76] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-4 gap-3 h-52 rounded-2xl overflow-hidden">
          {["/fotos/foto1.jpg", "/fotos/foto8.jpg", "/fotos/foto12.jpg", "/fotos/foto14.jpg"].map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl">
              <img src={src} alt={`Ejemplo fotografía profesional ${i + 1}`} className="w-full h-full object-cover image-zoom" loading="lazy" />
              <div className="absolute inset-0 bg-[#1C1714]/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
