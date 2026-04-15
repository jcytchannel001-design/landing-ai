import { CheckCircle2, Clock, TrendingUp, Shield, Award, MapPin } from "lucide-react";

const features = [
  { icon: TrendingUp, title: "Viviendas que se venden más rápido", desc: "Las propiedades con fotografía profesional reciben hasta un 61% más de visitas online y se venden en la mitad del tiempo." },
  { icon: Award, title: "Equipamiento de gama alta", desc: "Cámara full-frame, objetivos gran angular, flashes de estudio y dron DJI para máxima calidad en cualquier condición de luz." },
  { icon: Clock, title: "Entrega en 24-48 horas", desc: "Recibirás todas las imágenes retocadas profesionalmente en 24-48h. Entrega express disponible el mismo día bajo petición." },
  { icon: Shield, title: "Garantía de satisfacción", desc: "Si las fotos no superan tus expectativas, repetimos la sesión sin coste adicional. Tu satisfacción es nuestra prioridad absoluta." },
  { icon: MapPin, title: "Cobertura en toda España", desc: "Disponible en Madrid, Barcelona, Valencia, Sevilla, Málaga y toda la costa. Desplazamiento incluido en zonas metropolitanas." },
  { icon: CheckCircle2, title: "Retoque profesional incluido", desc: "Corrección de color, enderezado de líneas, eliminación de elementos y optimización para portales inmobiliarios." },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-[#F5F1EC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: stacked photos */}
          <div className="relative h-[600px]">
            <div className="absolute top-0 left-0 w-[62%] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img src="/fotos/foto13.jpg" alt="Cocina de diseño profesional fotografiada por Ignacio de las Rivas" className="w-full h-full object-cover image-zoom" loading="lazy" />
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-[#F5F1EC]">
              <img src="/fotos/foto17.jpg" alt="Salón de lujo con fotografía profesional" className="w-full h-full object-cover image-zoom" loading="lazy" />
            </div>
            {/* Floating stat */}
            <div className="absolute top-[38%] right-[4%] bg-white rounded-2xl p-5 shadow-xl border border-stone-100 z-10 w-44">
              <p className="text-xs text-[#8A7E76] mb-1">Precio conseguido</p>
              <p className="text-3xl font-bold text-[#C15B3A]">+12%</p>
              <p className="text-xs text-[#8A7E76]">sobre el precio de salida</p>
            </div>
          </div>

          {/* Right: copy + features */}
          <div>
            <span className="text-[#C15B3A] text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">Por qué elegirnos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1714] mb-4">
              La diferencia está{" "}
              <span className="text-[#C15B3A]">en los detalles</span>
            </h2>
            <p className="text-[#8A7E76] text-base leading-relaxed mb-10">
              Más de 8 años fotografiando viviendas en toda España nos han enseñado
              exactamente qué hace que una propiedad destaque sobre las demás.
            </p>

            <div className="flex flex-col gap-6">
              {features.map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center mt-0.5 group-hover:bg-[#F9EDE8] group-hover:border-[#C15B3A]/25 transition-colors shadow-sm">
                      <Icon size={18} className="text-[#C15B3A]" />
                    </div>
                    <div>
                      <h3 className="text-[#1C1714] font-semibold text-sm mb-1">{f.title}</h3>
                      <p className="text-[#8A7E76] text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
