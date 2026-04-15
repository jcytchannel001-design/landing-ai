import type { SiteConfig } from "./siteTypes";

/**
 * Deep-update a SiteConfig at a dot-notation path.
 * Handles array indices: "stats.0.value", "services.2.title", etc.
 */
export function updatePath(config: SiteConfig, path: string, value: unknown): SiteConfig {
  const clone = JSON.parse(JSON.stringify(config)) as Record<string, unknown>;
  const keys = path.split(".");
  let obj = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (obj[key] === null || typeof obj[key] !== "object") {
      obj[key] = isNaN(Number(keys[i + 1])) ? {} : [];
    }
    obj = obj[key] as Record<string, unknown>;
  }
  obj[keys[keys.length - 1]] = value;
  return clone as unknown as SiteConfig;
}

export function loadConfig(id: string): SiteConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`site-config-${id}`);
    return raw ? (JSON.parse(raw) as SiteConfig) : null;
  } catch {
    return null;
  }
}

export function persistConfig(id: string, config: SiteConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`site-config-${id}`, JSON.stringify(config));
}
