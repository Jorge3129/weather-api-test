import {
  MinutelyWeatherDescription,
  WeatherAlertDescription,
} from '../models/weather-description-types';
import { WeatherResponseItem } from './weather-response-item.dto';

export type WeatherResponse =
  | WeatherResponseItem
  | (
      | Partial<WeatherResponseItem>
      | MinutelyWeatherDescription
      | WeatherAlertDescription
    )[];
