import { Transform } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';
import {
  WeatherSummaryPart,
  weatherSummaryParts,
} from '../models/weather-summary-parts.const';
import { ApiProperty } from '@nestjs/swagger';

export class GetWeatherDataQuery {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @ApiProperty({
    description: 'latitude',
    example: 33.44,
  })
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @ApiProperty({
    description: 'longitude',
    example: -94.04,
  })
  lon: number;

  @IsIn(weatherSummaryParts)
  @ApiProperty()
  @ApiProperty({
    description: 'Part of weather report to include',
    example: 'current',
  })
  part: WeatherSummaryPart;
}
