"use client";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "Proyectos realizados" },
  { value: 300, suffix: "+", label: "Clientes satisfechos" },
  { value: 8,   suffix: " años", label: "De experiencia" },
  { value: 98,  suffix: "%", label: "Tasa de repetición" },
];

export default function Stats() {
  return (
    <section className="bg-white border-y border-stone-100 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-stone-100">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-8 py-2">
              <div className="text-4xl md:text-5xl font-bold text-[#C15B3A] mb-1.5">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-[#8A7E76] text-sm tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
