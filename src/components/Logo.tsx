export function Logo({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  const stroke = dark ? "url(#strokeDark)" : "url(#strokeLight)";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House */}
      <path d="M40 8L10 32V72H32V52H48V72H70V32L40 8Z" fill={dark ? "rgba(193,91,58,0.12)" : "rgba(193,91,58,0.08)"} />
      <path d="M40 8L10 32V72H32V52H48V72H70V32L40 8Z" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
      {/* Aperture ring */}
      <circle cx="40" cy="46" r="12" fill="none" stroke={stroke} strokeWidth="1.3" opacity="0.55" />
      {/* Aperture blades */}
      <line x1="40" y1="34" x2="40" y2="58" stroke={stroke} strokeWidth="1" opacity="0.4" />
      <line x1="28" y1="46" x2="52" y2="46" stroke={stroke} strokeWidth="1" opacity="0.4" />
      <line x1="31.5" y1="37.5" x2="48.5" y2="54.5" stroke={stroke} strokeWidth="1" opacity="0.4" />
      <line x1="48.5" y1="37.5" x2="31.5" y2="54.5" stroke={stroke} strokeWidth="1" opacity="0.4" />
      {/* Center */}
      <circle cx="40" cy="46" r="3" fill="#C15B3A" />
      {/* Roof dot */}
      <circle cx="40" cy="8" r="2.5" fill="#C15B3A" />
      <defs>
        <linearGradient id="strokeLight" x1="10" y1="8" x2="70" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C15B3A" />
          <stop offset="100%" stopColor="#9E4428" />
        </linearGradient>
        <linearGradient id="strokeDark" x1="10" y1="8" x2="70" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8846A" />
          <stop offset="100%" stopColor="#C15B3A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  const nameColor = dark ? "#ffffff" : "#1C1714";
  const subColor = dark ? "rgba(255,255,255,0.45)" : "#8A7E76";
  return (
    <div className="flex items-center gap-3">
      <Logo size={size} dark={dark} />
      <div className="flex flex-col leading-tight">
        <span style={{ fontSize: size * 0.37, color: nameColor, fontWeight: 600, letterSpacing: "0.05em" }}>
          IGNACIO DE LAS RIVAS
        </span>
        <span style={{ fontSize: size * 0.195, color: subColor, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Fotografía Profesional
        </span>
      </div>
    </div>
  );
}
