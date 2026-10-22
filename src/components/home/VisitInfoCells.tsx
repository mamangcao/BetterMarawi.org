'use client';
import React, { useEffect, useState } from 'react';
import {
  Car,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { useWeather, formatWeatherTime, WeatherIconName } from '@/lib/weather';
import { cellClass, eyebrowClass, iconBase, iconClass, titleClass } from './linkGridStyles';
import { WeatherEffects } from './WeatherEffects';

const WEATHER_ICONS: Record<WeatherIconName, LucideIcon> = {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudFog,
  CloudLightning,
};

type TranslationKey = 'fromIligan' | 'fromCdo' | 'fromCotabato' | 'fromManila' | 'manilaRoute';

const PREVIEW_KINDS: Record<string, WeatherIconName> = {
  sun: 'Sun',
  partly: 'CloudSun',
  cloud: 'Cloud',
  rain: 'CloudRain',
  fog: 'CloudFog',
  storm: 'CloudLightning',
};

const MAPS_URL = 'https://www.google.com/maps/place/Marawi+City,+Lanao+del+Sur/@8.0034,124.2851,13z';

/** Live weather (Open-Meteo) styled as a grid cell. */
export function WeatherCell() {
  const { t, language } = useTranslation();
  const { weather, isLoading } = useWeather();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Preview any effect with ?weather=sun|partly|cloud|rain|fog|storm (visual only)
  const [preview, setPreview] = useState<WeatherIconName | null>(null);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('weather');
    if (p && p in PREVIEW_KINDS) setPreview(PREVIEW_KINDS[p]);
  }, []);

  const loading = !mounted || (isLoading && !weather);
  const kind: WeatherIconName | null = preview ?? (weather ? weather.current.iconName : null);
  const Icon = kind ? WEATHER_ICONS[kind] || CloudSun : CloudSun;

  return (
    <div className={`${cellClass} bg-white overflow-hidden isolate`}>
      {!loading && kind && <WeatherEffects kind={kind} />}
      <Icon className={`${iconBase} text-lake-700 relative z-10`} aria-hidden="true" />
      <div className="relative z-10 min-w-0 flex-1 pr-24 sm:pr-32">
        {loading ? (
          <div className="space-y-2 animate-pulse" aria-hidden="true">
            <div className="h-6 w-40 bg-surface-elevated rounded" />
            <div className="h-3 w-56 bg-surface-elevated rounded" />
            <div className="h-4 w-64 bg-surface-elevated/70 rounded mt-3" />
          </div>
        ) : !weather ? (
          <>
            <h3 className={titleClass}>{t.currentConditions}</h3>
            <p className="mt-3 text-[15px] text-foreground-muted">{t.weatherUnavailable}</p>
          </>
        ) : (
          <>
            <h3 className={`${titleClass} flex flex-wrap items-baseline gap-x-2`}>
              <span className="font-mono-tabular">{Math.round(weather.current.temperature)}°C</span>
              <span className="text-base font-semibold text-foreground-muted">
                {t[weather.current.conditionKey] || t.weatherPartlyCloudy}
              </span>
            </h3>
            <p className={eyebrowClass}>{t.currentConditions}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-foreground-muted">
              <span>
                {t.weatherFeelsLike}:{' '}
                <strong className="text-brand-950 font-mono-tabular">
                  {Math.round(weather.current.apparentTemperature)}°C
                </strong>
              </span>
              <span>
                {t.weatherHumidity}:{' '}
                <strong className="text-brand-950 font-mono-tabular">{weather.current.humidity}%</strong>
              </span>
              <span>
                {t.weatherWind}:{' '}
                <strong className="text-brand-950 font-mono-tabular">
                  {Math.round(weather.current.windSpeed)} km/h
                </strong>
              </span>
            </p>
            <p className="mt-2 text-xs text-foreground-subtle">
              {t.coolHighlandClimate} · {t.weatherUpdated} {formatWeatherTime(weather.current.time, language)}
            </p>
          </>
        )}
      </div>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-10 top-6 right-6 inline-flex items-center gap-1 text-xs font-semibold text-brand-800 hover:text-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 rounded"
      >
        {t.openInGoogleMaps}
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// Times are approximate and not yet verified (see docs/VERIFICATION_CHECKLIST.md).
// Manila has no road link to Mindanao, so it is a flight to Laguindingan plus the CDO drive.
const ROUTES: { labelKey: TranslationKey; road?: string; roadKey?: TranslationKey; time: string; flight?: boolean }[] = [
  { labelKey: 'fromIligan', road: 'Marawi–Iligan Hwy (38 km)', time: '45 min' },
  { labelKey: 'fromCdo', road: 'CDO–Iligan–Marawi Rd (102 km)', time: '1 hr 50 min' },
  { labelKey: 'fromCotabato', road: 'Narciso Ramos Hwy (158 km)', time: '3 hr 30 min' },
  { labelKey: 'fromManila', roadKey: 'manilaRoute', time: '1 hr 50 min', flight: true },
];

/** Driving times to Marawi styled as a grid cell. */
export function DrivingCell() {
  const { t } = useTranslation();
  return (
    <div className={`${cellClass} bg-white`}>
      <Car className={iconClass} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <h3 className={titleClass}>{t.drivingTimeToMarawi}</h3>
        <p className={eyebrowClass}>{t.gettingThere}</p>
        <ul className="mt-3 divide-y divide-surface-border-subtle">
          {ROUTES.map((r) => (
            <li key={r.labelKey} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-brand-950">{t[r.labelKey]}</div>
                <div className="text-xs text-foreground-subtle">{r.roadKey ? t[r.roadKey] : r.road}</div>
              </div>
              <span className="font-mono-tabular text-sm font-bold text-brand-800 whitespace-nowrap">
                {r.flight ? `${t.flightPlus} ${r.time}` : r.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
