import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherSummaryQuery } from './dto/get-weather-summary-query.dto';
import { CreateWeatherReportDto } from './dto/create-weather-report.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getWeatherSummary(@Query() query: GetWeatherSummaryQuery) {
    return this.appService.getWeatherSummary(query);
  }

  @Post()
  public createWeatherReport(@Body() createReportDto: CreateWeatherReportDto) {
    return this.appService.createWeatherReport(createReportDto);
  }
}
