import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherSummary } from './models/weather-summary';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { GetWeatherSummaryQuery } from './dto/get-weather-summary-query.dto';
import { CreateWeatherReportDto } from './dto/create-weather-report.dto';
import { WeatherReport } from './entity/weather-report.entity';
import { EntityManager } from 'typeorm';
import { WeatherData } from './models/weather-data';

@Injectable()
export class AppService {
  constructor(
    private readonly openWeatherApi: OpenWeatherApiService,
    private readonly entityManager: EntityManager,
  ) {}

  public async getWeatherSummary(
    query: GetWeatherSummaryQuery,
  ): Promise<WeatherSummary> {
    return this.openWeatherApi.getWeatherSummary(query);
  }

  public async getWeatherData(
    query: GetWeatherSummaryQuery,
  ): Promise<WeatherData> {
    return this.entityManager
      .findOneByOrFail(WeatherReport, {
        latitude: query.lat,
        longitude: query.lon,
        part: query.part,
      })
      .then((report) => report.data)
      .catch(() => {
        throw new NotFoundException('Weather report not found');
      });
  }

  public async createWeatherReport(dto: CreateWeatherReportDto): Promise<any> {
    const weatherSummary = await this.openWeatherApi.getWeatherSummary({
      lat: dto.lat,
      lon: dto.lon,
      part: dto.part,
    });

    await this.entityManager.delete(WeatherReport, {
      latitude: dto.lat,
      longitude: dto.lon,
      part: dto.part,
    });

    return await this.entityManager.save(WeatherReport, {
      latitude: dto.lat,
      longitude: dto.lon,
      part: dto.part,
      data: weatherSummary[dto.part] ?? [],
    });
  }
}
