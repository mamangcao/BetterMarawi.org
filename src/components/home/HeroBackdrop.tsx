import React from 'react';

// One smooth wave per 120px, repeated across a 2880px track. The track is
// twice the visible width so it can slide left by half and loop seamlessly.
const WAVE_PATH = (() => {
  let d = 'M0 20';
  for (let x = 0; x < 2880; x += 120) {
    d += ` Q${x + 30} 10 ${x + 60} 20 T${x + 120} 20`;
  }
  return d;
})();

/** Closed, filled wave across a 2880-wide track (two loops of a 1440 view) */
function filledWave(period: number, mid: number, amp: number, height: number) {
  let d = `M0 ${mid}`;
  for (let x = 0; x < 2880; x += period) {
    d += ` Q${x + period / 4} ${mid - amp} ${x + period / 2} ${mid} T${x + period} ${mid}`;
  }
  return `${d} V${height} H0 Z`;
}
const SHORE_BACK = filledWave(720, 26, 12, 64);
const SHORE_FRONT = filledWave(480, 34, 9, 64);

/**
 * Decorative hero background for BetterMarawi.org:
 * - 8-point star lattice (Islamic City of Marawi)
 * - soft floating glows
 * - Lanao highland ridges with drifting Lake Lanao waves
 * Purely visual, hidden from assistive tech. Motion stops under reduced-motion.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Star lattice, fading out toward the bottom-left so the headline stays clear */}
      <div className="absolute inset-0 bg-marawi-pattern animate-pattern-drift [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]" />

      {/* Floating glows */}
      <div className="absolute -top-24 right-[-6rem] w-[28rem] h-[28rem] rounded-full bg-brand-400/20 blur-3xl animate-glow-float" />
      <div className="absolute bottom-[-8rem] left-[-6rem] w-[24rem] h-[24rem] rounded-full bg-brand-600/25 blur-3xl animate-glow-float [animation-delay:-7s]" />

      {/* Lanao highland ridges */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 sm:h-24 lg:h-28"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          className="text-brand-800"
          fill="currentColor"
          fillOpacity="0.55"
          d="M0 120 L120 86 L230 104 L360 62 L470 92 L600 48 L720 84 L840 58 L960 96 L1090 54 L1210 88 L1330 70 L1440 92 V160 H0Z"
        />
        <path
          className="text-brand-950"
          fill="currentColor"
          fillOpacity="0.6"
          d="M0 138 L150 112 L290 128 L430 98 L560 122 L700 104 L860 130 L1000 108 L1150 126 L1300 110 L1440 124 V160 H0Z"
        />
      </svg>

      {/* Lake Lanao waves */}
      <div className="absolute bottom-10 sm:bottom-14 left-0 w-full h-6 sm:h-8 overflow-hidden">
        <svg
          className="absolute inset-y-0 left-0 h-full w-[200%] animate-wave-drift"
          viewBox="0 0 2880 40"
          preserveAspectRatio="none"
        >
          <path d={WAVE_PATH} fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
        </svg>
        <svg
          className="absolute top-2 left-0 h-full w-[200%] animate-wave-drift-slow"
          viewBox="0 0 2880 40"
          preserveAspectRatio="none"
        >
          <path d={WAVE_PATH} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Wavy bottom edge, like the Lake Lanao shoreline; filled with the next section's colour */}
      <div className="absolute inset-x-0 -bottom-px h-10 sm:h-14 lg:h-16 overflow-hidden text-surface">
        <svg
          className="absolute inset-y-0 left-0 h-full w-[200%] animate-wave-drift-slow"
          viewBox="0 0 2880 64"
          preserveAspectRatio="none"
        >
          <path d={SHORE_BACK} fill="currentColor" fillOpacity="0.35" />
        </svg>
        <svg
          className="absolute inset-y-0 left-0 h-full w-[200%] animate-wave-drift"
          viewBox="0 0 2880 64"
          preserveAspectRatio="none"
        >
          <path d={SHORE_FRONT} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
