import { LogoFull } from "./Logo";
import { Separator } from "@/components/ui/separator";

const tickerPhotos = [
  "/fotos/foto1.jpg", "/fotos/foto5.jpg", "/fotos/foto9.jpg", "/fotos/foto13.jpg",
  "/fotos/foto3.jpg", "/fotos/foto7.jpg", "/fotos/foto11.jpg", "/fotos/foto15.jpg",
];

export default function Footer() {
  return (
    <footer className="bg-[#1C1714]">
      {/* Photo ticker */}
      <div className="ticker-wrap h-24 border-b border-white/5">
        <div className="ticker-inner h-full">
          {[...tickerPhotos, ...tickerPhotos].map((src, i) => (
            <div key={i} className="w-36 h-24 flex-shrink-0 overflow-hidden mx-0.5">
              <img src={src} alt="" className="w-full h-full object-cover opacity-40 hover:opacity-70 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <LogoFull size={36} dark={true} />
            <p className="text-white/35 text-sm leading-relaxed mt-4 max-w-xs">
              Fotografía profesional de viviendas en Madrid y toda España.
              Imágenes que venden más rápido y a mejor precio.
            </p>
            <a
              href="https://wa.me/34601408966"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +34 601 408 966
            </a>
          </div>

          <div>
            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Servicios</h4>
            <ul className="flex flex-col gap-2.5">
              {["Fotografía de Interiores", "Fotografía de Fachada", "Fotografía con Dron", "Video Tour", "Virtual Staging", "Pack Inmobiliaria"].map(l => (
                <li key={l}>
                  <a href="#servicios" className="text-white/35 text-sm hover:text-[#C15B3A] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Zonas de trabajo</h4>
            <ul className="flex flex-col gap-2.5">
              {["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Costa del Sol", "Toda España"].map(l => (
                <li key={l}><span className="text-white/35 text-sm">{l}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Ignacio de las Rivas Fotografía Profesional · Madrid, España
          </p>
          <div className="flex gap-6">
            {["Aviso legal", "Privacidad", "Cookies"].map(l => (
              <a key={l} href="#" className="text-white/20 text-xs hover:text-[#C15B3A] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
