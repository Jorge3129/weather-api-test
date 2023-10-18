import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import {
  CurrentWeatherDescription,
  DailyWeatherDescription,
  HourlyWeatherDescription,
  MinutelyWeatherDescription,
  WeatherAlert,
  WeatherData,
} from '../models/weather-data';
import { pick } from '../utils/pick';

type WeatherDataResponse = {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
};

type WeatherResult =
  | WeatherDataResponse
  | (
      | Partial<WeatherDataResponse>
      | MinutelyWeatherDescription
      | WeatherAlert
    )[];

@Injectable()
export class WeatherResponseMapperInterceptor
  implements NestInterceptor<WeatherData, WeatherResult>
{
  public intercept(
    _context: ExecutionContext,
    next: CallHandler<WeatherData>,
  ): Observable<WeatherResult> {
    return next
      .handle()
      .pipe(map((data: WeatherData) => this.transformResponse(data)));
  }

  private transformResponse(data: WeatherData): WeatherResult {
    if ('sunrise' in data) {
      return this.fromCurrentWeather(data);
    }

    return data.map((weatherInfo) => {
      if ('sunrise' in weatherInfo) {
        return this.fromDailyWeather(weatherInfo);
      }

      if ('temp' in weatherInfo) {
        return this.fromHourlyWeather(weatherInfo);
      }

      return weatherInfo;
    });
  }

  private fromCurrentWeather(
    currentWeather: CurrentWeatherDescription,
  ): WeatherDataResponse {
    return pick(currentWeather, [
      'sunrise',
      'sunset',
      'temp',
      'feels_like',
      'pressure',
      'humidity',
      'uvi',
      'wind_speed',
    ]);
  }

  private fromDailyWeather(
    dailyWeather: DailyWeatherDescription,
  ): WeatherDataResponse {
    return {
      ...pick(dailyWeather, [
        'sunrise',
        'sunset',
        'pressure',
        'humidity',
        'uvi',
        'wind_speed',
      ]),
      feels_like: dailyWeather.feels_like.day,
      temp: dailyWeather.temp.day,
    };
  }

  private fromHourlyWeather(
    hourlyWeather: HourlyWeatherDescription,
  ): Partial<WeatherDataResponse> {
    return {
      ...pick(hourlyWeather, ['pressure', 'humidity', 'uvi', 'wind_speed']),
    };
  }
}
