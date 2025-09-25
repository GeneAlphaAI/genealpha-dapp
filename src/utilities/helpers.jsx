// addressGradient.js
const BASE_COLORS = ["#CC8931", "#4253D6", "#47BF4B", "#D4CD44"];

/** simple deterministic hash -> 32-bit unsigned int */
function hashString(str = "") {
  let h = 2166136261; // FNV offset basis (just for variety)
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** hex -> {r,g,b} */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
/** {r,g,b} -> hex */
function rgbToHex({ r, g, b }) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
/** mix two hex colors by t (0..1) */
function mixHex(a, b, t = 0.5) {
  const A = hexToRgb(a),
    B = hexToRgb(b);
  return rgbToHex({
    r: Math.round(A.r + (B.r - A.r) * t),
    g: Math.round(A.g + (B.g - A.g) * t),
    b: Math.round(A.b + (B.b - A.b) * t),
  });
}

/**
 * generateGradientFromAddress(address)
 * - address: string (wallet address)
 * returns: CSS linear-gradient(...) string
 */
export function generateGradientFromAddress(address = "") {
  const seed = hashString(String(address || "no-address"));

  // angle 0..359
  const angle = seed % 360;

  // choose count = 2 or 3 deterministically
  const chooseThree = !!(seed & 1); // roughly half the time 3, half 2
  const count = chooseThree ? 3 : 2;

  // pick indices deterministically and ensure uniqueness
  const pickIndex = (offset) =>
    Math.floor(seed / (offset + 1)) % BASE_COLORS.length;
  let idxs = [];
  for (let i = 0; i < count + 2; i++) {
    // collect a few candidates, then dedupe while preserving order
    idxs.push(pickIndex(i * 7 + 3));
  }
  // dedupe while keeping first occurrences
  idxs = [...new Set(idxs)];
  // if we ended up with fewer than needed (rare), fill from 0..n
  while (idxs.length < count) {
    for (let i = 0; idxs.length < count; i++) {
      const candidate = (idxs[idxs.length - 1] + i + 1) % BASE_COLORS.length;
      if (!idxs.includes(candidate)) idxs.push(candidate);
    }
  }
  idxs = idxs.slice(0, count);

  // create 2-3 colors, mixing adjacent palette entries a bit for variety
  const variants = idxs.map((idx, i) => {
    const next = BASE_COLORS[(idx + 1) % BASE_COLORS.length];
    // mixing factor derived from seed bits
    const t = ((seed >> (i * 5 + 3)) % 40) / 100; // 0..0.39
    // slightly brighten/darken depending on seed bit
    const mixed = mixHex(BASE_COLORS[idx], next, 0.25 + t);
    const brightnessShift = ((seed >> (i * 3 + 7)) & 31) / 255; // small shift
    // if shift is odd -> brighten slightly, else darken slightly
    return brightnessShift % 2 > 0
      ? mixHex(mixed, "#FFFFFF", brightnessShift * 0.12)
      : mixHex(mixed, "#000000", brightnessShift * 0.08);
  });

  // compute stop positions for organic feel
  const stopA = 8 + ((seed >> 6) % 20); // 8..27
  const stopB = 48 + ((seed >> 12) % 20); // 48..67

  // build gradient string for 2 or 3 colors
  if (count === 2) {
    return `linear-gradient(${angle}deg, ${variants[0]} 0%, ${variants[1]} 100%)`;
  } else {
    return `linear-gradient(${angle}deg, ${variants[0]} ${stopA}%, ${variants[1]} ${stopB}%, ${variants[2]} 100%)`;
  }
}

/** convenience style object for inline usage */
export const gradientStyle = (address = "") => ({
  background: generateGradientFromAddress(address),
});
