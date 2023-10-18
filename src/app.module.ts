import ormConfig from './config/orm-config';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { createConfigPropertyProvider } from './utils/create-config-property-provider';
import { WeatherResponseMapperInterceptor } from './interceptors/weather-response-mapper.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    OpenWeatherApiService,
    createConfigPropertyProvider('OPEN_WEATHER_API_KEY', ''),
    createConfigPropertyProvider('OPEN_WEATHER_API_URL', ''),
    WeatherResponseMapperInterceptor,
  ],
})
export class AppModule {}
