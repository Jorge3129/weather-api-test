import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WeatherSummaryPart } from '../models/weather-summary-parts.const';
import { WeatherData } from '../models/weather-data';

@Entity()
export class WeatherReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;

  @Column()
  part: WeatherSummaryPart;

  @Column({ type: 'jsonb' })
  data: WeatherData;
}
