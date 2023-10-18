import { Transform } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';
import {
  WeatherReportPart,
  weatherReportParts,
} from '../models/weather-report-parts.const';

export class GetWeatherReportQuery {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  lon: number;

  @IsIn(weatherReportParts)
  part: WeatherReportPart;
}
