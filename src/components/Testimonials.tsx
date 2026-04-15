import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "María Fernández", role: "Directora Comercial · ERA Inmobiliaria Madrid", text: "Trabajamos con Ignacio desde hace 3 años. La calidad de sus fotos es incomparable: nuestros pisos se venden entre un 30 y un 40% más rápido que la media del mercado.", rating: 5, initials: "MF" },
  { name: "Carlos Romero", role: "Particular · Venta piso en Salamanca, Madrid", text: "Vendí mi apartamento en 12 días. El agente me dijo que las fotos eran lo que más llamaba la atención en Idealista. Ignacio es un auténtico profesional.", rating: 5, initials: "CR" },
  { name: "Ana Martínez", role: "Promotora Inmobiliaria · Grupo Habitat", text: "Para nuestra nueva promoción de 40 viviendas en Madrid, contamos con Ignacio. El resultado es impresionante. Los pisos piloto quedaron perfectos.", rating: 5, initials: "AM" },
  { name: "Pablo García", role: "Agente Inmobiliario · Engel & Völkers Barcelona", text: "Desde que uso fotografía de Ignacio, el tiempo medio de venta se ha reducido a la mitad. Mis clientes están encantados con los resultados.", rating: 5, initials: "PG" },
  { name: "Lucía Torres", role: "Particular · Venta chalet en La Moraleja", text: "El dron fue un plus increíble. Los compradores llegaban ya enamorados de la propiedad antes de visitarla. Precio conseguido muy por encima del mercado.", rating: 5, initials: "LT" },
  { name: "Roberto Sánchez", role: "Director · RE/MAX España Norte", text: "Usamos a Ignacio para todas nuestras propiedades premium. Su atención al detalle y profesionalidad son simplemente excelentes.", rating: 5, initials: "RS" },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-[#F5F1EC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C15B3A] text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1714] mb-4">
            Lo que dicen{" "}
            <span className="text-[#C15B3A]">nuestros clientes</span>
          </h2>
          <p className="text-[#8A7E76] text-base leading-relaxed">
            Más de 127 clientes confían en Ignacio de las Rivas para fotografiar sus propiedades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-7 border border-stone-100 hover:shadow-lg hover:border-[#C15B3A]/15 transition-all duration-300 flex flex-col gap-4 card-lift">
              <Quote size={22} className="text-[#C15B3A]/35" />
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="#C15B3A" className="text-[#C15B3A]" />
                ))}
              </div>
              <p className="text-[#4A3F38] text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-[#C15B3A] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#1C1714] text-sm font-semibold">{t.name}</p>
                  <p className="text-[#8A7E76] text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-stone-200 shadow-sm">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={15} fill="#C15B3A" className="text-[#C15B3A]" />)}
            </div>
            <span className="text-[#1C1714] font-bold">4.9 / 5</span>
            <span className="text-stone-300">·</span>
            <span className="text-[#8A7E76] text-sm">127 reseñas verificadas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
