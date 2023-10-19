import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { WeatherDescription } from '../models/weather-description';
import { WeatherResponse } from '../dto/weather-response.dto';
import { WeatherResponseMapper } from './weather-response.mapper';

@Injectable()
export class WeatherResponseInterceptor
  implements NestInterceptor<WeatherDescription, WeatherResponse>
{
  constructor(private readonly weatherResponseMapper: WeatherResponseMapper) {}

  public intercept(
    _context: ExecutionContext,
    next: CallHandler<WeatherDescription>,
  ): Observable<WeatherResponse> {
    return next
      .handle()
      .pipe(map((data) => this.weatherResponseMapper.toResponse(data)));
  }
}
