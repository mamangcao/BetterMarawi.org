'use client';

import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudFog, CloudLightning, LucideIcon } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { WeatherData, WeatherIconName, formatWeatherTime } from '@/lib/weather';

const WEATHER_ICONS: Record<WeatherIconName, LucideIcon> = {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudFog,
  CloudLightning,
};

export interface WeatherTickerProps {
  weather: WeatherData | null;
  isLoading: boolean;
}

export function WeatherTicker({ weather, isLoading }: WeatherTickerProps) {
  const { t, language } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and first client mount, render identical loading skeleton to prevent hydration mismatch
  if (!mounted || (isLoading && !weather)) {
    return (
      <div
        className="inline-flex items-center gap-1.5 text-stone-500 select-none font-mono-tabular shrink-0"
        aria-hidden="true"
      >
        <span className="w-3.5 h-3.5 rounded-full bg-stone-800 animate-pulse inline-block shrink-0" />
        <span className="w-[16ch] h-3.5 rounded bg-stone-800/80 animate-pulse inline-block" />
      </div>
    );
  }

  // If fetch failed or no weather data exists, hide completely with no layout shift or error text
  if (!weather) {
    return null;
  }

  const { current } = weather;
  const IconComponent = WEATHER_ICONS[current.iconName] || CloudSun;
  const tempRounded = Math.round(current.temperature);
  const feelsLikeRounded = Math.round(current.apparentTemperature);
  const conditionLabel = t[current.conditionKey] || t.weatherPartlyCloudy;
  const formattedTime = formatWeatherTime(current.time, language);

  const tooltip = `${conditionLabel} · ${t.weatherFeelsLike} ${feelsLikeRounded}°C · ${t.weatherUpdated} ${formattedTime}`;

  return (
    <div
      role="region"
      aria-label={`${t.weatherAriaLabel}: Marawi City, ${tempRounded}°C, ${conditionLabel}`}
      title={tooltip}
      className="inline-flex items-center gap-1.5 text-stone-300 shrink-0 whitespace-nowrap select-none"
    >
      <IconComponent className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
      <span>Marawi City {tempRounded}°C</span>
      <span className="sr-only">
        ({conditionLabel}, {t.weatherUpdated} {formattedTime})
      </span>
    </div>
  );
}
