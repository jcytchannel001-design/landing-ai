import type { SiteConfig } from "./siteTypes";

// Server-side in-memory store (resets on server restart, fine for demo)
const store = new Map<string, SiteConfig>();

export function saveConfig(id: string, config: SiteConfig): void {
  store.set(id, config);
}

export function getConfig(id: string): SiteConfig | undefined {
  return store.get(id);
}
