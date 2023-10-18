import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const createConfigPropertyProvider = <TValue>(
  propertyName: string,
  defaultValue: TValue,
  injectionToken?: string,
): FactoryProvider<TValue> => {
  return {
    provide: injectionToken ?? propertyName,
    useFactory: (config: ConfigService): TValue => {
      return config.get<TValue>(propertyName) ?? defaultValue;
    },
    inject: [ConfigService],
  };
};
