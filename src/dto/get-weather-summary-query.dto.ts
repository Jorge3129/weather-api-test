import { Transform } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';
import {
  WeatherSummaryPart,
  weatherSummaryParts,
} from '../models/weather-summary-parts.const';

export class GetWeatherSummaryQuery {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  lon: number;

  @IsIn(weatherSummaryParts)
  part: WeatherSummaryPart;
}
