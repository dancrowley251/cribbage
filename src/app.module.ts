import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CribbageService } from './cribbage.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CribbageService],
})
export class AppModule {}
