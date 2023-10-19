import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherSummaryQuery } from './dto/get-weather-summary-query.dto';
import { CreateWeatherReportDto } from './dto/create-weather-report.dto';
import { WeatherResponseMapperInterceptor } from './interceptors/weather-response-mapper.interceptor';
import { WeatherReport } from './entity/weather-report.entity';
import { WeatherDescription } from './models/weather-description';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(WeatherResponseMapperInterceptor)
  public getWeatherData(
    @Query() query: GetWeatherSummaryQuery,
  ): Promise<WeatherDescription> {
    return this.appService.getWeatherData(query);
  }

  @Post()
  public createWeatherReport(
    @Body() createReportDto: CreateWeatherReportDto,
  ): Promise<WeatherReport> {
    return this.appService.createWeatherReport(createReportDto);
  }
}
