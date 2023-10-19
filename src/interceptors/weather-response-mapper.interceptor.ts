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
} from '../models/weather-description-types';
import { pick } from '../utils/pick';
import { WeatherDescription } from '../models/weather-description';
import { WeatherResponse } from '../dto/weather-response.dto';
import { WeatherResponseItem } from '../dto/weather-response-item.dto';

@Injectable()
export class WeatherResponseMapperInterceptor
  implements NestInterceptor<WeatherDescription, WeatherResponse>
{
  public intercept(
    _context: ExecutionContext,
    next: CallHandler<WeatherDescription>,
  ): Observable<WeatherResponse> {
    return next
      .handle()
      .pipe(map((data: WeatherDescription) => this.transformToResponse(data)));
  }

  private transformToResponse(data: WeatherDescription): WeatherResponse {
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
  ): WeatherResponseItem {
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
  ): WeatherResponseItem {
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
  ): Partial<WeatherResponseItem> {
    return {
      ...pick(hourlyWeather, ['pressure', 'humidity', 'uvi', 'wind_speed']),
    };
  }
}
