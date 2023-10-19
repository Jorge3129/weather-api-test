import { Test, TestingModule } from '@nestjs/testing';
import { WeatherResponseMapper } from './weather-response.mapper';
import {
  CurrentWeatherDescription,
  DailyWeatherDescription,
} from '../models/weather-description-types';

describe('WeatherResponseMapper', () => {
  let mapper: WeatherResponseMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherResponseMapper],
    }).compile();

    mapper = module.get<WeatherResponseMapper>(WeatherResponseMapper);
  });

  it('should transform current weather description', () => {
    const currentWeather: CurrentWeatherDescription = {
      dt: 1684929490,
      sunrise: 1684926645,
      sunset: 1684977332,
      temp: 292.55,
      feels_like: 292.87,
      pressure: 1014,
      humidity: 89,
      dew_point: 290.69,
      uvi: 0.16,
      clouds: 53,
      visibility: 10000,
      wind_speed: 3.13,
      wind_deg: 93,
      wind_gust: 6.71,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d',
        },
      ],
    };

    const result = mapper.toResponse(currentWeather);

    expect(result).toEqual({
      sunrise: 1684926645,
      sunset: 1684977332,
      temp: 292.55,
      feels_like: 292.87,
      pressure: 1014,
      humidity: 89,
      uvi: 0.16,
      wind_speed: 3.13,
    });
  });

  it('should transform daily weather description', () => {
    const dailyWeather: DailyWeatherDescription[] = [
      {
        dt: 1684951200,
        sunrise: 1684926645,
        sunset: 1684977332,
        moonrise: 1684941060,
        moonset: 1684905480,
        moon_phase: 0.16,
        summary: 'Expect a day of partly cloudy with rain',
        temp: {
          day: 299.03,
          min: 290.69,
          max: 300.35,
          night: 291.45,
          eve: 297.51,
          morn: 292.55,
        },
        feels_like: {
          day: 299.21,
          night: 291.37,
          eve: 297.86,
          morn: 292.87,
        },
        pressure: 1016,
        humidity: 59,
        dew_point: 290.48,
        wind_speed: 3.98,
        wind_deg: 76,
        wind_gust: 8.92,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        clouds: 92,
        pop: 0.47,
        rain: 0.15,
        uvi: 9.23,
      },
    ];

    const result = mapper.toResponse(dailyWeather);

    expect(result).toEqual([
      {
        sunrise: 1684926645,
        sunset: 1684977332,
        temp: 299.03,
        feels_like: 299.21,
        pressure: 1016,
        humidity: 59,
        uvi: 9.23,
        wind_speed: 3.98,
      },
    ]);
  });
});
