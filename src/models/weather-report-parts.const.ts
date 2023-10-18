import { WeatherReport } from './weather-report.type';

export const weatherReportParts = [
  'current',
  'minutely',
  'hourly',
  'daily',
  'alerts',
] satisfies (keyof WeatherReport)[];

export type WeatherReportPart = (typeof weatherReportParts)[number];
