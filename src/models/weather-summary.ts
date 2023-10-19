import {
  CurrentWeatherDescription,
  DailyWeatherDescription,
  HourlyWeatherDescription,
  MinutelyWeatherDescription,
  WeatherAlertDescription,
} from './weather-description-types';

export type WeatherSummary = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherDescription;
  minutely: MinutelyWeatherDescription[];
  hourly: HourlyWeatherDescription[];
  daily: DailyWeatherDescription[];
  alerts: WeatherAlertDescription[];
};
