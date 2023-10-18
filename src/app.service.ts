import { Injectable } from '@nestjs/common';
import { WeatherReport } from './models/weather-report.type';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { GetWeatherReportQuery } from './dto/get-weather-report-query.dto';

@Injectable()
export class AppService {
  constructor(private readonly openWeatherApi: OpenWeatherApiService) {}

  public async getWeatherReport(
    query: GetWeatherReportQuery,
  ): Promise<WeatherReport> {
    return this.openWeatherApi.getWeatherReport(query);
  }
}
