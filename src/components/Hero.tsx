import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F5F1EC] overflow-hidden">
      {/* Subtle warm texture */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(193,91,58,0.06) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left: Text */}
        <div className="pb-16 lg:pb-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-sm">
            <Star size={12} fill="#C15B3A" className="text-[#C15B3A]" />
            <span className="text-[#C15B3A] text-xs font-semibold tracking-widest uppercase">
              Fotografía Inmobiliaria Premium · Madrid
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tight leading-[1.08] text-[#1C1714] mb-6">
            Fotografías que{" "}
            <span className="relative inline-block">
              <span className="shimmer-accent">venden</span>
            </span>
            <br />
            tu vivienda
            <br />
            <span className="text-[#C15B3A]">antes y mejor.</span>
          </h1>

          <p className="text-[#8A7E76] text-lg leading-relaxed max-w-md mb-10">
            Fotografía profesional de interiores y viviendas en Madrid. Imágenes
            de alta calidad que destacan tu propiedad en Idealista, Fotocasa y
            cualquier portal inmobiliario.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#contacto">
              <Button
                size="lg"
                className="bg-[#C15B3A] hover:bg-[#9E4428] text-white font-bold px-8 py-6 text-base rounded-full shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                Solicitar Sesión
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-[#C15B3A]/30 text-[#C15B3A] hover:bg-[#C15B3A]/6 px-8 py-6 text-base rounded-full font-semibold transition-all duration-300"
              >
                Ver Portfolio
              </Button>
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2">
              {["IM", "AC", "PR", "+"].map((n, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-[#F5F1EC] bg-[#C15B3A] flex items-center justify-center text-xs font-bold text-white">
                  {n}
                </div>
              ))}
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill="#C15B3A" className="text-[#C15B3A]" />
                ))}
                <span className="text-[#C15B3A] font-bold text-sm ml-1">4.9</span>
              </div>
              <p className="text-[#8A7E76] text-xs">+127 clientes satisfechos</p>
            </div>
          </div>
        </div>

        {/* Right: Photo collage */}
        <div className="relative lg:h-screen flex items-end pb-0 hidden lg:flex">
          {/* Main large photo */}
          <div className="absolute top-24 right-0 w-[58%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/fotos/foto15.jpg" alt="Fotografía profesional de vivienda - comedor elegante" className="w-full h-full object-cover image-zoom" loading="eager" />
          </div>
          {/* Secondary photo */}
          <div className="absolute top-36 left-0 w-[46%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#F5F1EC]">
            <img src="/fotos/foto6.jpg" alt="Fotografía profesional de cocina moderna" className="w-full h-full object-cover image-zoom" loading="eager" />
          </div>
          {/* Third photo */}
          <div className="absolute bottom-16 right-[8%] w-[42%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#F5F1EC]">
            <img src="/fotos/foto16.jpg" alt="Fotografía profesional de dormitorio" className="w-full h-full object-cover image-zoom" loading="lazy" />
          </div>
          {/* Floating badge */}
          <div className="absolute bottom-20 left-4 bg-white rounded-2xl p-4 shadow-xl border border-stone-100 z-10">
            <p className="text-xs text-[#8A7E76] mb-1">Tiempo medio de venta</p>
            <p className="text-2xl font-bold text-[#C15B3A]">-45%</p>
            <p className="text-xs text-[#8A7E76]">con fotografía profesional</p>
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-[#C15B3A]/40 to-transparent" />
      </div>
    </section>
  );
}
