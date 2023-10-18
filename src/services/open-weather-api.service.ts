import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { WeatherSummary } from '../models/weather-summary';
import { weatherSummaryParts } from '../models/weather-summary-parts.const';
import { GetWeatherSummaryParams } from './get-weather-summary-params';
import { OpenWeatherApiRequestParams } from './open-weather-api.request-params';

@Injectable()
export class OpenWeatherApiService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('OPEN_WEATHER_API_KEY')
    private readonly apiKey: string,
    @Inject('OPEN_WEATHER_API_URL')
    private readonly apiUrl: string,
  ) {}

  public getWeatherSummary(
    weatherParams: GetWeatherSummaryParams,
  ): Promise<WeatherSummary> {
    const data$ = this.httpService
      .get<WeatherSummary>(this.apiUrl, {
        params: this.createRequestParams(weatherParams),
      })
      .pipe(
        map((response) => response.data),
        catchError(() => {
          throw new InternalServerErrorException();
        }),
      );

    return lastValueFrom(data$);
  }

  private createRequestParams(
    weatherParams: GetWeatherSummaryParams,
  ): OpenWeatherApiRequestParams {
    const partsToExclude = weatherSummaryParts
      .filter((part) => part !== weatherParams.part)
      .join();

    return {
      lat: weatherParams.lat,
      lon: weatherParams.lon,
      exclude: partsToExclude,
      appid: this.apiKey,
    };
  }
}
