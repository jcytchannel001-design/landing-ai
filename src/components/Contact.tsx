"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Phone, Mail, MapPin, AtSign } from "lucide-react";

const PHONE = "601408966";
const WA_LINK = `https://wa.me/34${PHONE}`;

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C15B3A] text-xs font-semibold tracking-[0.22em] uppercase mb-3 block">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1714] mb-4">
            ¿Listo para{" "}
            <span className="text-[#C15B3A]">destacar tu propiedad?</span>
          </h2>
          <p className="text-[#8A7E76] text-base leading-relaxed">
            Cuéntanos tu proyecto y te enviamos presupuesto sin compromiso en menos de 2 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#F5F1EC] rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#C15B3A]/10 border border-[#C15B3A]/20 flex items-center justify-center mb-4">
                  <Send size={24} className="text-[#C15B3A]" />
                </div>
                <h3 className="text-[#1C1714] text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#8A7E76] text-sm">Te contactaremos en menos de 2 horas.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#4A3F38] text-xs font-semibold tracking-wide uppercase">Nombre</label>
                    <input required className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-[#1C1714] text-sm placeholder:text-stone-300 focus:border-[#C15B3A]/50 focus:outline-none transition-colors shadow-sm" placeholder="Tu nombre" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#4A3F38] text-xs font-semibold tracking-wide uppercase">Teléfono</label>
                    <input type="tel" className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-[#1C1714] text-sm placeholder:text-stone-300 focus:border-[#C15B3A]/50 focus:outline-none transition-colors shadow-sm" placeholder="+34 601 408 966" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#4A3F38] text-xs font-semibold tracking-wide uppercase">Email</label>
                  <input required type="email" className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-[#1C1714] text-sm placeholder:text-stone-300 focus:border-[#C15B3A]/50 focus:outline-none transition-colors shadow-sm" placeholder="tu@email.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#4A3F38] text-xs font-semibold tracking-wide uppercase">Tipo de propiedad</label>
                  <select className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-[#4A3F38] text-sm focus:border-[#C15B3A]/50 focus:outline-none transition-colors shadow-sm">
                    <option value="">Selecciona...</option>
                    <option value="piso">Piso / Apartamento</option>
                    <option value="chalet">Chalet / Villa</option>
                    <option value="local">Local / Oficina</option>
                    <option value="promocion">Promoción inmobiliaria</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#4A3F38] text-xs font-semibold tracking-wide uppercase">Mensaje</label>
                  <textarea rows={4} className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-[#1C1714] text-sm placeholder:text-stone-300 focus:border-[#C15B3A]/50 focus:outline-none transition-colors resize-none shadow-sm" placeholder="Cuéntanos tu proyecto: ubicación, metros cuadrados, fecha deseada..." />
                </div>
                <Button type="submit" className="w-full bg-[#C15B3A] hover:bg-[#9E4428] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg mt-2">
                  <Send size={16} className="mr-2" />
                  Solicitar Presupuesto Gratuito
                </Button>
                <p className="text-[#8A7E76] text-xs text-center">Sin compromiso · Respuesta en menos de 2 horas</p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-[#1C1714] text-xl font-semibold mb-6">Información de contacto</h3>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: "Teléfono", value: `+34 ${PHONE.slice(0,3)} ${PHONE.slice(3,6)} ${PHONE.slice(6)}`, href: `tel:+34${PHONE}` },
                  { icon: Mail, label: "Email", value: "info@ignaciodelasfotografia.es", href: "mailto:info@ignaciodelasfotografia.es" },
                  { icon: MapPin, label: "Ubicación", value: "Madrid · Disponible en toda España", href: null },
                  { icon: AtSign, label: "Instagram", value: "@ignaciodelasfotografia", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F9EDE8] border border-[#C15B3A]/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={17} className="text-[#C15B3A]" />
                    </div>
                    <div>
                      <p className="text-[#8A7E76] text-xs mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-[#1C1714] text-sm font-medium hover:text-[#C15B3A] transition-colors">{value}</a>
                      ) : (
                        <p className="text-[#1C1714] text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-2xl px-6 py-4 font-semibold text-sm transition-all duration-300 hover:shadow-lg w-full justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escríbeme por WhatsApp
              </a>
            </div>

            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden h-44">
              <img src="/fotos/foto11.jpg" alt="Fotografía profesional de vivienda - comedor con terraza" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/70 text-xs">¿Tienes fotos de referencia?</p>
                <p className="text-white text-sm font-semibold">Coméntalas en el mensaje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
