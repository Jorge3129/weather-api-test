import { Injectable, NotFoundException } from '@nestjs/common';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { GetWeatherSummaryQuery } from './dto/get-weather-summary-query.dto';
import { CreateWeatherReportDto } from './dto/create-weather-report.dto';
import { WeatherReport } from './entity/weather-report.entity';
import { EntityManager } from 'typeorm';
import { WeatherDescription } from './models/weather-description';

@Injectable()
export class AppService {
  constructor(
    private readonly openWeatherApi: OpenWeatherApiService,
    private readonly entityManager: EntityManager,
  ) {}

  public async getWeatherData(
    query: GetWeatherSummaryQuery,
  ): Promise<WeatherDescription> {
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

  public async createWeatherReport(
    dto: CreateWeatherReportDto,
  ): Promise<WeatherReport> {
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
