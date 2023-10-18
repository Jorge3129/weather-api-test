import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherApiService } from './services/open-weather-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { createConfigPropertyProvider } from './utils/create-config-property-provider';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    OpenWeatherApiService,
    createConfigPropertyProvider('OPEN_WEATHER_API_KEY', ''),
    createConfigPropertyProvider('OPEN_WEATHER_API_URL', ''),
  ],
})
export class AppModule {}
