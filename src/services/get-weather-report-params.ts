import { WeatherReportPart } from '../models/weather-report-parts.const';

export type GetWeatherReportParams = {
  lat: number;
  lon: number;
  part: WeatherReportPart;
};
