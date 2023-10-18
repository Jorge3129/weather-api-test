import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetWeatherSummaryQuery } from './dto/get-weather-summary-query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getWeatherSummary(@Query() query: GetWeatherSummaryQuery) {
    return this.appService.getWeatherSummary(query);
  }
}
