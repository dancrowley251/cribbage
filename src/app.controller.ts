import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { CribbageService } from './cribbage.service';
import { Card } from './models/card.model';
import { CardDto } from './dtos/card.dto';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private readonly cribbageService: CribbageService) {}

  @Get()
  getHello(): string {
    return this.cribbageService.getHello();
  }

  @Post('score')
  async scoreHand(
    @Body('starterCard') starterCard: CardDto,
    @Body('hand') handIn: Array<CardDto>,
  ) {
    let hand: Card[] = [];
    if (handIn.length !== 4) {
      throw new HttpException('hand must have 4 cards', 400);
    }
    handIn.forEach((card: CardDto) => {
      if (CardDto.checkSuitAndRank(card)) {
        hand.push(new Card(card.suit, card.rank));
      } else {
        throw new HttpException(
          `Invalid card suit is ${card.suit} and rank is ${card.rank}`,
          400,
        );
      }
    });
    const starter = new Card(starterCard.suit, starterCard.rank);
    return this.cribbageService.scoreHand(hand, starter);
  }
}
