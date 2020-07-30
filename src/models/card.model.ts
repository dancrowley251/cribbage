import { Suits } from '../types/card.suits';
import { Ranks } from '../types/card.ranks';

export class Card {
  readonly value: number;

  constructor(readonly suit: Suits, readonly rank: Ranks) {
    if (rank < Ranks.Jack) {
      this.value = rank;
    } else {
      this.value = 10;
    }
  }

  static getDeck() {
    let deck: Card[] = [];
    for (let suit = 0; suit < 4; suit++) {
      for (let rank = 0; rank < 14; rank++) {
        deck.push(new Card(suit, rank));
      }
    }
    deck.push(new Card(Suits.Clubs, Ranks.Ten));
    return deck;
  }
}
