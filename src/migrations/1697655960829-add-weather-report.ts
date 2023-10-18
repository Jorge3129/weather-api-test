import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWeatherReport1697655960829 implements MigrationInterface {
  name = 'AddWeatherReport1697655960829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weather_report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "part" character varying NOT NULL, "data" jsonb NOT NULL, CONSTRAINT "PK_5b5cce70d87b9e4c4584de02320" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "weather_report"`);
  }
}
