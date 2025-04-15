import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ClientsModule } from './clients/clients.module';
import { CarsModule } from './cars/cars.module';
import { DamagesModule } from './damages/damages.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { Client } from './clients/client.entity';
import { Car } from './cars/car.entity';
import { Damage } from './damages/damage.entity';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Client, Car, Damage, User],

        synchronize: true, // Mos e aktivizo në prodhim!
      }),
    }),
    ClientsModule,
    CarsModule,
    DamagesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
