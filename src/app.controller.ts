import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherReportQuery } from './dto/get-weather-report-query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getWeatherReport(@Query() query: GetWeatherReportQuery) {
    return this.appService.getWeatherReport(query);
  }
}
