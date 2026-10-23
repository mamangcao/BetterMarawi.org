import { useState, useEffect, useSyncExternalStore } from 'react';

export type WeatherConditionKey =
  | 'weatherClearSky'
  | 'weatherMainlyClear'
  | 'weatherPartlyCloudy'
  | 'weatherOvercast'
  | 'weatherFoggy'
  | 'weatherDrizzle'
  | 'weatherRain'
  | 'weatherRainShowers'
  | 'weatherThunderstorm';

export type WeatherIconName =
  | 'Sun'
  | 'CloudSun'
  | 'Cloud'
  | 'CloudRain'
  | 'CloudFog'
  | 'CloudLightning';

export interface WeatherConditionMeta {
  key: WeatherConditionKey;
  iconName: WeatherIconName;
}

export function mapWmoCodeToCondition(code: number): WeatherConditionMeta {
  switch (code) {
    case 0:
      return { key: 'weatherClearSky', iconName: 'Sun' };
    case 1:
      return { key: 'weatherMainlyClear', iconName: 'CloudSun' };
    case 2:
      return { key: 'weatherPartlyCloudy', iconName: 'CloudSun' };
    case 3:
      return { key: 'weatherOvercast', iconName: 'Cloud' };
    case 45:
    case 48:
      return { key: 'weatherFoggy', iconName: 'CloudFog' };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { key: 'weatherDrizzle', iconName: 'CloudRain' };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { key: 'weatherRain', iconName: 'CloudRain' };
    case 80:
    case 81:
    case 82:
      return { key: 'weatherRainShowers', iconName: 'CloudRain' };
    case 95:
    case 96:
    case 99:
      return { key: 'weatherThunderstorm', iconName: 'CloudLightning' };
    default:
      return { key: 'weatherPartlyCloudy', iconName: 'CloudSun' };
  }
}

export interface CurrentWeather {
  time: string; // e.g. "2026-10-20T23:15"
  temperature: number; // in °C
  humidity: number; // %
  apparentTemperature: number; // in °C
  weatherCode: number;
  windSpeed: number; // km/h
  conditionKey: WeatherConditionKey;
  iconName: WeatherIconName;
}

export interface WeatherData {
  current: CurrentWeather;
  timestamp: number;
}

export const WEATHER_CACHE_KEY = 'bm_weather_cache_v1';
export const WEATHER_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export function parseWeatherApiResponse(data: unknown): WeatherData | null {
  if (!data || typeof data !== 'object') return null;
  const obj = data as {
    current?: {
      time?: string;
      temperature_2m?: number;
      relative_humidity_2m?: number;
      apparent_temperature?: number;
      weather_code?: number;
      wind_speed_10m?: number;
    };
  };

  if (
    !obj.current ||
    typeof obj.current.temperature_2m !== 'number' ||
    typeof obj.current.weather_code !== 'number' ||
    !obj.current.time
  ) {
    return null;
  }

  const { key, iconName } = mapWmoCodeToCondition(obj.current.weather_code);

  const current: CurrentWeather = {
    time: obj.current.time,
    temperature: obj.current.temperature_2m,
    humidity: obj.current.relative_humidity_2m ?? 0,
    apparentTemperature: obj.current.apparent_temperature ?? obj.current.temperature_2m,
    weatherCode: obj.current.weather_code,
    windSpeed: obj.current.wind_speed_10m ?? 0,
    conditionKey: key,
    iconName,
  };

  return {
    current,
    timestamp: Date.now(),
  };
}

let memoryCache: WeatherData | null = null;
let inFlightPromise: Promise<WeatherData | null> | null = null;
const listeners = new Set<(data: WeatherData | null) => void>();

function notifyListeners(data: WeatherData | null) {
  listeners.forEach((listener) => listener(data));
}

function readLocalStorageCache(): WeatherData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WeatherData;
    if (
      parsed &&
      parsed.current &&
      typeof parsed.timestamp === 'number' &&
      Date.now() - parsed.timestamp < WEATHER_CACHE_TTL_MS
    ) {
      return parsed;
    }
  } catch {
    // Ignore localStorage access errors
  }
  return null;
}

function writeLocalStorageCache(data: WeatherData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore localStorage write errors
  }
}

export async function fetchWeather(): Promise<WeatherData | null> {
  if (memoryCache && Date.now() - memoryCache.timestamp < WEATHER_CACHE_TTL_MS) {
    return memoryCache;
  }

  const local = readLocalStorageCache();
  if (local) {
    memoryCache = local;
    return local;
  }

  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    try {
      const url =
        'https://api.open-meteo.com/v1/forecast?latitude=8.0&longitude=124.29&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FManila';
      const res = await fetch(url);
      if (!res.ok) {
        return null;
      }
      const json = await res.json();
      const parsed = parseWeatherApiResponse(json);
      if (parsed) {
        memoryCache = parsed;
        writeLocalStorageCache(parsed);
        notifyListeners(parsed);
        return parsed;
      }
    } catch {
      // Silently handle blocked requests or network failures
    } finally {
      inFlightPromise = null;
    }
    return null;
  })();

  return inFlightPromise;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}
const getSnapshot = () => memoryCache;
// The server (and the hydration render) never sees browser storage, so both start with no data.
const getServerSnapshot = () => null;

export function useWeather() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Set once the first load attempt finishes, so a failed fetch stops showing "loading".
  const [attempted, setAttempted] = useState(false);

  // After hydration: load saved weather (or fetch fresh data) and tell every subscriber.
  useEffect(() => {
    if (!memoryCache || Date.now() - memoryCache.timestamp >= WEATHER_CACHE_TTL_MS) {
      fetchWeather().then((result) => {
        if (result) notifyListeners(result);
        setAttempted(true);
      });
    } else {
      setAttempted(true);
    }
  }, []);

  return {
    weather: data,
    isLoading: !data && !attempted,
  };
}

export function formatWeatherTime(timeString: string | undefined, language: string): string {
  if (!timeString) return '';
  const cleanTime =
    timeString.includes('+') || timeString.endsWith('Z') ? timeString : `${timeString}:00+08:00`;
  const date = new Date(cleanTime);
  if (isNaN(date.getTime())) return '';
  const locale = language === 'FIL' ? 'fil-PH' : 'en-PH';
  return date.toLocaleTimeString(locale, {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
  });
}
