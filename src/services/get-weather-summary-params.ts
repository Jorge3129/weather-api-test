import { WeatherSummaryPart } from '../models/weather-summary-parts.const';

export type GetWeatherSummaryParams = {
  lat: number;
  lon: number;
  part: WeatherSummaryPart;
};
