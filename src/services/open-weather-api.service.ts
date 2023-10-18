import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { WeatherReport } from '../models/weather-report.type';
import { weatherReportParts } from '../models/weather-report-parts.const';
import { GetWeatherReportParams } from './get-weather-report-params';
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

  public getWeatherReport(
    weatherParams: GetWeatherReportParams,
  ): Promise<WeatherReport> {
    const data$ = this.httpService
      .get<WeatherReport>(this.apiUrl, {
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
    weatherParams: GetWeatherReportParams,
  ): OpenWeatherApiRequestParams {
    const partsToExclude = weatherReportParts
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
