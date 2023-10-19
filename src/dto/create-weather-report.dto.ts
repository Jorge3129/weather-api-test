import { IsIn, IsNumber } from 'class-validator';
import {
  WeatherSummaryPart,
  weatherSummaryParts,
} from '../models/weather-summary-parts.const';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeatherReportDto {
  @IsNumber()
  @ApiProperty({
    description: 'latitude',
    example: 33.44,
  })
  lat: number;

  @IsNumber()
  @ApiProperty({
    description: 'longitude',
    example: -94.04,
  })
  lon: number;

  @IsIn(weatherSummaryParts)
  @ApiProperty({
    description: 'Part of weather report to include',
    example: 'current',
  })
  part: WeatherSummaryPart;
}
