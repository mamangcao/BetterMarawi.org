import React from 'react';
import { Cloud, Zap } from 'lucide-react';
import type { WeatherIconName } from '@/lib/weather';

/*
 * Decorative weather layer for the weather card. It sits behind the text,
 * mostly on the right side, and fades out toward the left. Hidden from
 * assistive tech; animations stop under prefers-reduced-motion (globals.css).
 */

// Fixed positions (no Math.random) so server and client render the same markup
const RAIN = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 23) % 60 - 20}%`,
  duration: `${0.7 + ((i * 7) % 5) * 0.08}s`,
  delay: `${-((i * 13) % 10) * 0.1}s`,
  height: 10 + ((i * 5) % 4) * 3,
}));

function Sun({ small = false }: { small?: boolean }) {
  const size = small ? 'w-28 h-28' : 'w-40 h-40';
  return (
    <div className={`absolute -top-10 -right-8 ${size}`}>
      {/* Rays: a soft conic gradient turning slowly */}
      <div className="wx-spin wx-rays absolute inset-[-40%] rounded-full opacity-60" />
      {/* Core glow */}
      <div className="wx-pulse absolute inset-[18%] rounded-full bg-accent/50 blur-md" />
      <div className="absolute inset-[30%] rounded-full bg-accent/70" />
    </div>
  );
}

function Clouds({ dark = false, count = 3 }: { dark?: boolean; count?: number }) {
  const tone = dark ? 'text-foreground-subtle/40' : 'text-brand-100';
  const spots = [
    'top-3 right-10 w-24 h-24',
    'top-10 right-36 w-16 h-16 [animation-delay:-3s]',
    'top-1 right-56 w-14 h-14 [animation-delay:-6s]',
  ].slice(0, count);
  return (
    <>
      {spots.map((pos) => (
        <Cloud
          key={pos}
          fill="currentColor"
          strokeWidth={0}
          className={`wx-cloud absolute ${pos} ${tone}`}
        />
      ))}
    </>
  );
}

function Rain({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'bg-brand-700/45' : 'bg-brand-500/40';
  return (
    <div className="absolute inset-y-0 right-0 w-2/3">
      {RAIN.map((d, i) => (
        <span
          key={i}
          className={`wx-rain absolute w-px rounded-full ${color}`}
          style={{
            left: d.left,
            top: d.top,
            height: d.height,
            animationDuration: d.duration,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

function Fog() {
  return (
    <>
      <div className="wx-fog absolute top-6 right-0 w-3/4 h-5 rounded-full bg-surface-highlight/70 blur-md" />
      <div className="wx-fog absolute top-16 right-10 w-2/3 h-6 rounded-full bg-surface-highlight/60 blur-md [animation-delay:-4s]" />
      <div className="wx-fog absolute top-28 right-4 w-3/4 h-5 rounded-full bg-surface-highlight/50 blur-md [animation-delay:-8s]" />
    </>
  );
}

function Lightning() {
  return (
    <>
      <div className="wx-flash absolute inset-0 bg-accent-light" />
      <Zap
        fill="currentColor"
        strokeWidth={0}
        className="wx-flash absolute top-12 right-24 w-10 h-10 text-accent [animation-delay:-0.1s]"
      />
    </>
  );
}

export function WeatherEffects({ kind }: { kind: WeatherIconName }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_left,black_35%,transparent_90%)]"
    >
      {kind === 'Sun' && <Sun />}
      {kind === 'CloudSun' && (
        <>
          <Sun small />
          <Clouds count={2} />
        </>
      )}
      {kind === 'Cloud' && <Clouds />}
      {kind === 'CloudRain' && (
        <>
          <Clouds count={2} />
          <Rain />
        </>
      )}
      {kind === 'CloudFog' && <Fog />}
      {kind === 'CloudLightning' && (
        <>
          <Lightning />
          <Clouds dark />
          <Rain dark />
        </>
      )}
    </div>
  );
}
