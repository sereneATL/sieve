import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { TrpcModule } from '@server/trpc/trpc.module';
import { TrpcService } from '@server/trpc/trpc.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TrpcModule
  ],
  controllers: [AppController],
  providers: [AppService, TrpcService],
})
export class AppModule {}
