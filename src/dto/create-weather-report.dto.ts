import { IsIn, IsNumber } from 'class-validator';
import {
  WeatherSummaryPart,
  weatherSummaryParts,
} from '../models/weather-summary-parts.const';

export class CreateWeatherReportDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsIn(weatherSummaryParts)
  part: WeatherSummaryPart;
}
