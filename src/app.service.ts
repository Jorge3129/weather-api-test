import { Injectable } from '@nestjs/common';
import { WeatherSummary } from './models/weather-summary';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { GetWeatherSummaryQuery } from './dto/get-weather-summary-query.dto';

@Injectable()
export class AppService {
  constructor(private readonly openWeatherApi: OpenWeatherApiService) {}

  public async getWeatherSummary(
    query: GetWeatherSummaryQuery,
  ): Promise<WeatherSummary> {
    return this.openWeatherApi.getWeatherSummary(query);
  }
}
