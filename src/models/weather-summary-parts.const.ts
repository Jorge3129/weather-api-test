import { WeatherSummary } from './weather-summary';

export const weatherSummaryParts = [
  'current',
  'minutely',
  'hourly',
  'daily',
  'alerts',
] satisfies (keyof WeatherSummary)[];

export type WeatherSummaryPart = (typeof weatherSummaryParts)[number];
