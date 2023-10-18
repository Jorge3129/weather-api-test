import {
  CurrentWeatherDescription,
  DailyWeatherDescription,
  HourlyWeatherDescription,
  MinutelyWeatherDescription,
  WeatherAlert,
} from './weather-data';

export type WeatherSummary = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherDescription;
  minutely: MinutelyWeatherDescription[];
  hourly: HourlyWeatherDescription[];
  daily: DailyWeatherDescription[];
  alerts: WeatherAlert[];
};
