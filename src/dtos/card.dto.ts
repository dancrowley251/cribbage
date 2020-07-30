import { Card } from '../models/card.model';
import { Suits } from '../types/card.suits';
import { Ranks } from '../types/card.ranks';

export class CardDto {
  suit: Suits;
  rank: Ranks;

  public static checkSuitAndRank(cardDto: CardDto): boolean {
    return cardDto.suit in Suits && cardDto.rank in Ranks;
  }
}
