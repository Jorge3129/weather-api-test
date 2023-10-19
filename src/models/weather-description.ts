import {
  CurrentWeatherDescription,
  DailyWeatherDescription,
  HourlyWeatherDescription,
  MinutelyWeatherDescription,
  WeatherAlertDescription,
} from './weather-description-types';

export type WeatherDescription =
  | CurrentWeatherDescription
  | DailyWeatherDescription[]
  | HourlyWeatherDescription[]
  | MinutelyWeatherDescription[]
  | WeatherAlertDescription[];
