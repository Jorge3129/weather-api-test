import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherDataQuery } from './dto/get-weather-data-query.dto';
import { CreateWeatherReportDto } from './dto/create-weather-report.dto';
import { WeatherResponseInterceptor } from './interceptors/weather-response.interceptor';
import { WeatherReport } from './entity/weather-report.entity';
import { WeatherDescription } from './models/weather-description';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Weather')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(WeatherResponseInterceptor)
  public getWeatherData(
    @Query() query: GetWeatherDataQuery,
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
