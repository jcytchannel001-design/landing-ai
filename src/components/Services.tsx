import { Camera, Home, Plane, Video, Lightbulb, Layers } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Fotografía de Interiores",
    desc: "Salones, cocinas, dormitorios y baños capturados con luz natural y técnicas HDR para mostrar cada espacio en su máximo esplendor.",
    detail: "Gran angular · HDR · Retoque profesional",
  },
  {
    icon: Camera,
    title: "Fotografía de Fachada",
    desc: "Exteriores del inmueble fotografiados en las mejores condiciones de luz para causar la mejor primera impresión.",
    detail: "Golden hour · Cielos naturales · Alta resolución",
  },
  {
    icon: Plane,
    title: "Fotografía Aérea con Dron",
    desc: "Perspectivas únicas desde el aire para viviendas con terreno, urbanizaciones y grandes propiedades.",
    detail: "Dron certificado · Vuelo autorizado · 4K",
  },
  {
    icon: Video,
    title: "Video Tour Profesional",
    desc: "Recorrido cinematográfico de la propiedad con edición profesional, música y subtítulos para publicar en cualquier portal.",
    detail: "4K · Edición profesional · Entrega rápida",
  },
  {
    icon: Lightbulb,
    title: "Virtual Staging",
    desc: "Amueblamos digitalmente los espacios vacíos para que los compradores visualicen el potencial real de la vivienda.",
    detail: "Renderizado 3D · Varios estilos · 48h",
  },
  {
    icon: Layers,
    title: "Pack Completo Inmobiliaria",
    desc: "Fotos, vídeo, plano y virtual tour en un único servicio con precio especial para agencias y promotoras.",
    detail: "Todo incluido · Entrega express · Descuento agencia",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#F5F1EC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C15B3A] text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1714] mb-4">
            Todo lo que necesitas para{" "}
            <span className="text-[#C15B3A]">vender antes</span>
          </h2>
          <p className="text-[#8A7E76] text-lg leading-relaxed">
            Servicios fotográficos diseñados para el mercado inmobiliario español,
            con entrega express y calidad garantizada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group bg-white rounded-2xl p-7 border border-stone-100 hover:border-[#C15B3A]/25 hover:shadow-lg transition-all duration-300 cursor-default card-lift"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F9EDE8] flex items-center justify-center mb-5 group-hover:bg-[#C15B3A]/15 transition-colors">
                  <Icon size={21} className="text-[#C15B3A]" />
                </div>
                <h3 className="text-[#1C1714] font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-[#8A7E76] text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="text-[10px] text-[#C15B3A] tracking-widest uppercase font-semibold">{s.detail}</div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a href="#contacto" className="inline-flex items-center gap-2 text-[#C15B3A] hover:text-[#9E4428] text-sm font-semibold tracking-wide transition-colors group">
            Ver todos los precios y packs
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
