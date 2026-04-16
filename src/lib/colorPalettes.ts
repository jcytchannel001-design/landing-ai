/**
 * Color palettes per business sector.
 * Used by the generate API to suggest the right primary color
 * and by the UI to pre-select appropriate defaults.
 */

export interface ColorPalette {
  primary: string;
  bg: string;
  dark: string;
  name: string;
  description: string;
}

export const SECTOR_PALETTES: Record<string, ColorPalette[]> = {
  restaurante: [
    { primary: "#C2570A", bg: "#FDFAF7", dark: "#1C1209", name: "Terracota cálida", description: "Evoca la cocina de mercado y la madera natural" },
    { primary: "#8B2E12", bg: "#FEF9F5", dark: "#1A0A05", name: "Borgoña profundo", description: "Elegancia y tradición culinaria" },
    { primary: "#D97706", bg: "#FFFBEB", dark: "#1C1304", name: "Ámbar mediterráneo", description: "Luminoso, cálido, veraniego" },
  ],
  gimnasio: [
    { primary: "#16A34A", bg: "#F0FDF4", dark: "#061A0E", name: "Verde energía", description: "Fuerza, salud y vitalidad" },
    { primary: "#DC2626", bg: "#FFF5F5", dark: "#1A0505", name: "Rojo potencia", description: "Intensidad y motivación extrema" },
    { primary: "#0891B2", bg: "#F0F9FF", dark: "#041218", name: "Azul rendimiento", description: "Tecnología y alto rendimiento deportivo" },
  ],
  clinica: [
    { primary: "#0284C7", bg: "#F0F9FF", dark: "#041218", name: "Azul clínico", description: "Confianza, profesionalidad y limpieza" },
    { primary: "#0D9488", bg: "#F0FDFA", dark: "#041A18", name: "Verde salud", description: "Bienestar natural y medicina integrativa" },
    { primary: "#6D28D9", bg: "#FAF5FF", dark: "#160829", name: "Violeta innovación", description: "Clínica moderna y tecnológica" },
  ],
  fotografia: [
    { primary: "#1C1C1E", bg: "#FAFAFA", dark: "#0A0A0A", name: "Negro editorial", description: "Minimalismo fotográfico clásico" },
    { primary: "#C15B3A", bg: "#FDF8F5", dark: "#1C0F09", name: "Terracota artística", description: "Calidez y expresión creativa" },
    { primary: "#7C3AED", bg: "#FAF5FF", dark: "#160828", name: "Morado creativo", description: "Estudio de autor contemporáneo" },
  ],
  abogados: [
    { primary: "#C9A84C", bg: "#FAFAF6", dark: "#0D0F1A", name: "Oro jurídico", description: "Autoridad, tradición y excelencia legal" },
    { primary: "#1E3A5F", bg: "#F8FAFF", dark: "#0A1020", name: "Azul marino", description: "Seriedad, rigor y profesionalidad" },
    { primary: "#374151", bg: "#F9FAFB", dark: "#111827", name: "Grafito neutral", description: "Modernidad y neutralidad jurídica" },
  ],
  peluqueria: [
    { primary: "#BE185D", bg: "#FFF1F2", dark: "#1A0510", name: "Rosa moda", description: "Glamour, tendencia y feminidad" },
    { primary: "#854D0E", bg: "#FFFBEB", dark: "#1C0F02", name: "Caramelo luxury", description: "Elegancia cálida y sofisticación" },
    { primary: "#0F766E", bg: "#F0FDFA", dark: "#041A18", name: "Verde esmeralda", description: "Spa, bienestar y tratamientos naturales" },
  ],
  arquitectura: [
    { primary: "#292524", bg: "#FAFAF9", dark: "#0C0A09", name: "Carbón arquitectónico", description: "Precisión y diseño contemporáneo" },
    { primary: "#1D4ED8", bg: "#EFF6FF", dark: "#0B1526", name: "Azul plano", description: "Técnica, precisión e innovación" },
    { primary: "#B45309", bg: "#FFFBEB", dark: "#1C0E02", name: "Cobre industrial", description: "Materiales nobles y construcción premium" },
  ],
  estetica: [
    { primary: "#DB2777", bg: "#FDF2F8", dark: "#1A0514", name: "Rosa luxe", description: "Belleza, sofisticación y cuidado personal" },
    { primary: "#9333EA", bg: "#FAF5FF", dark: "#160828", name: "Violeta bienestar", description: "Experiencia premium de wellness" },
    { primary: "#0EA5E9", bg: "#F0F9FF", dark: "#041218", name: "Azul serenidad", description: "Calma, pureza y tratamientos spa" },
  ],
  tecnologia: [
    { primary: "#2563EB", bg: "#EFF6FF", dark: "#0B1526", name: "Azul digital", description: "Innovación tecnológica y confianza" },
    { primary: "#10B981", bg: "#ECFDF5", dark: "#04160F", name: "Verde tech", description: "Desarrollo sostenible y software" },
    { primary: "#6366F1", bg: "#EEF2FF", dark: "#10122A", name: "Indigo startup", description: "SaaS moderno y plataformas digitales" },
  ],
  inmobiliaria: [
    { primary: "#0F172A", bg: "#F8FAFF", dark: "#04060F", name: "Navy premium", description: "Propiedades de lujo y exclusividad" },
    { primary: "#065F46", bg: "#ECFDF5", dark: "#011A12", name: "Verde inversión", description: "Confianza, crecimiento y patrimonio" },
    { primary: "#B45309", bg: "#FFFBEB", dark: "#1C0E02", name: "Bronce estable", description: "Tradición, solidez y valores seguros" },
  ],
  educacion: [
    { primary: "#1D4ED8", bg: "#EFF6FF", dark: "#0B1526", name: "Azul académico", description: "Conocimiento, rigor y excelencia" },
    { primary: "#7C3AED", bg: "#FAF5FF", dark: "#160828", name: "Morado creativo", description: "Creatividad, innovación pedagógica" },
    { primary: "#059669", bg: "#ECFDF5", dark: "#04160F", name: "Verde crecimiento", description: "Desarrollo personal y aprendizaje" },
  ],
};

/**
 * Get the best palette for a given sector keyword.
 * Returns the first (recommended) palette.
 */
export function getPaletteForSector(sector: string): ColorPalette {
  const key = sector.toLowerCase().trim();

  // Direct match
  if (SECTOR_PALETTES[key]) return SECTOR_PALETTES[key][0];

  // Keyword matching
  const keywords: Record<string, string> = {
    "restaur": "restaurante", "bar": "restaurante", "cafet": "restaurante", "gastro": "restaurante",
    "gym": "gimnasio", "fitness": "gimnasio", "sport": "gimnasio", "crossfit": "gimnasio",
    "dental": "clinica", "médic": "clinica", "psicolog": "clinica", "fisioterap": "clinica", "clinic": "clinica",
    "foto": "fotografia", "fotograf": "fotografia", "video": "fotografia",
    "abogad": "abogados", "legal": "abogados", "jurídi": "abogados", "notari": "abogados",
    "peluquer": "peluqueria", "barbería": "peluqueria", "estétic": "estetica", "spa": "estetica", "nail": "estetica",
    "arquitect": "arquitectura", "construcc": "arquitectura", "diseño inter": "arquitectura",
    "tech": "tecnologia", "software": "tecnologia", "app": "tecnologia", "web": "tecnologia",
    "inmobil": "inmobiliaria", "piso": "inmobiliaria", "casa": "inmobiliaria", "alquil": "inmobiliaria",
    "escuel": "educacion", "academia": "educacion", "formac": "educacion", "profesor": "educacion",
  };

  for (const [kw, sectorKey] of Object.entries(keywords)) {
    if (key.includes(kw)) return SECTOR_PALETTES[sectorKey][0];
  }

  // Default
  return { primary: "#C15B3A", bg: "#FDFAF7", dark: "#1C1209", name: "Terracota universal", description: "Color cálido y profesional" };
}

/**
 * All palettes as a flat array for display
 */
export function getAllPalettes(): Array<ColorPalette & { sector: string }> {
  return Object.entries(SECTOR_PALETTES).flatMap(([sector, palettes]) =>
    palettes.map(p => ({ ...p, sector }))
  );
}
