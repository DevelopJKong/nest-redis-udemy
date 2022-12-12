import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './libs/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_LOCAL_HOST: Joi.string().required(),
        DB_LOCAL_PORT: Joi.number().required(),
        DB_LOCAL_USERNAME: Joi.string().required(),
        DB_LOCAL_PASSWORD: Joi.string().required(),
        DB_LOCAL_DATABASE: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_EXPIRES_SEC: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_LOCAL_HOST,
      port: Number(process.env.DB_LOCAL_PORT),
      username: process.env.DB_LOCAL_USERNAME,
      password: process.env.DB_LOCAL_PASSWORD,
      database: process.env.DB_LOCAL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: [],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
