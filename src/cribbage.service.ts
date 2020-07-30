import { Injectable } from '@nestjs/common';
import { Card } from './models/card.model';
import { Ranks } from './types/card.ranks';

@Injectable()
export class CribbageService {
  getHello(): string {
    return 'Hello Cribbage World!';
  }

  scoreHand(hand: Card[], starter: Card): number {
    let score = 0;
    if (hand.length !== 4) {
      throw new Error('Hand must have 4 cards');
    }
    const allCards: Card[] = hand;
    allCards.push(starter);
    console.log('allCards', allCards);

    // Jack in hand or crib of same suit as starter card
    const jack = hand.find(card => card.rank === Ranks.Jack);
    if (jack && jack.suit === starter.suit) {
      score++;
      console.log('Jack in hand same suit as starter!');
    }

    // combinations - same rank
    //  combos(rank)=count
    const combos: Array<number> = [];
    allCards.forEach(card => {
      //console.log("card rank=", card.rank, (card.rank in combos) ? " current count is " + combos[card.rank] : "starting count at 1");
      combos[card.rank] =
        card.rank in combos ? (combos[card.rank] = combos[card.rank] + 1) : 1;
    });
    //console.log('combos', combos);
    combos.forEach(count => {
      if (count === 2) {
        console.log('score 2 for 2 of a kind');
        score += 2;
      }
      if (count === 3) {
        console.log('score 6 for 3 of a kind');
        score += 6;
      }
      if (count === 4) {
        console.log('score 12 for 4 of a kind');
        score += 12;
      }
    });

    // straights
    const sortedCards = allCards;
    sortedCards.sort((a, b) => (a.rank > b.rank ? 1 : -1));
    console.log('sorted cards', sortedCards);

    let straightFound: boolean = false;
    if (
      sortedCards[0].rank + 1 === sortedCards[1].rank &&
      sortedCards[1].rank + 1 === sortedCards[2].rank &&
      sortedCards[2].rank + 1 === sortedCards[3].rank &&
      sortedCards[3].rank + 1 === sortedCards[4].rank
    ) {
      console.log('straight of 5 scores 5');
      score += 5;
      straightFound = true;
    }
    if (!straightFound) {
      for (let i = 0; i < 2; i++) {
        if (
          sortedCards[i].rank + 1 === sortedCards[i + 1].rank &&
          sortedCards[i + 1].rank + 1 === sortedCards[i + 2].rank &&
          sortedCards[i + 2].rank + 1 === sortedCards[i + 3].rank
        ) {
          console.log('straight of 4 scores 4');
          score += 4;
          straightFound = true;
        }
      }
    }
    if (!straightFound) {
      for (let i = 0; i < 3; i++) {
        console.log(
          'i=',
          i,
          ' sci ',
          sortedCards[i],
          ' sci+1 ',
          sortedCards[i + 1],
          ' sci+2 ',
          sortedCards[i + 2],
        );
        if (
          sortedCards[i].rank + 1 === sortedCards[i + 1].rank &&
          sortedCards[i + 1].rank + 1 === sortedCards[i + 2].rank
        ) {
          console.log('straight of 3 scores 3');
        }
      }
    }

    // 15 count
    // check all 2 card combos
    for (let cardIndx1 = 0; cardIndx1 < allCards.length - 1; cardIndx1++) {
      for (
        let cardIndx2 = cardIndx1 + 1;
        cardIndx2 < allCards.length;
        cardIndx2++
      ) {
        const total = allCards[cardIndx1].value + allCards[cardIndx2].value;
        if (total === 15) {
          console.log(
            'Card1 index=',
            cardIndx1,
            ' card=',
            allCards[cardIndx1],
            ' Card2 index=',
            cardIndx2,
            ' card=',
            allCards[cardIndx2],
            ': score 2!',
          );
          score += 2;
        }
        //console.log("index1=", cardIndx1, " index2=", cardIndx2, " total=", total);
      }
    }
    // check all 3 card combos
    for (let cardIndx1 = 0; cardIndx1 < allCards.length - 2; cardIndx1++) {
      for (
        let cardIndx2 = cardIndx1 + 1;
        cardIndx2 < allCards.length - 1;
        cardIndx2++
      ) {
        for (
          let cardIndx3 = cardIndx2 + 1;
          cardIndx3 < allCards.length;
          cardIndx3++
        ) {
          const total =
            allCards[cardIndx1].value +
            allCards[cardIndx2].value +
            allCards[cardIndx3].value;
          if (total === 15) {
            console.log(
              'Card1 index=',
              cardIndx1,
              ' card=',
              allCards[cardIndx1],
              ' Card2 index=',
              cardIndx2,
              ' card=',
              allCards[cardIndx2],
              ' Card3 index=',
              cardIndx3,
              ' card=',
              allCards[cardIndx3],
              ': score 2!',
            );
            score += 2;
          }
          //console.log("index1=", cardIndx1, " index2=", cardIndx2, " index3=", cardIndx3, " total=", total);
        }
      }
    }
    // check all 4 card combos
    for (let cardIndx1 = 0; cardIndx1 < allCards.length - 3; cardIndx1++) {
      for (
        let cardIndx2 = cardIndx1 + 1;
        cardIndx2 < allCards.length - 2;
        cardIndx2++
      ) {
        for (
          let cardIndx3 = cardIndx2 + 1;
          cardIndx3 < allCards.length - 1;
          cardIndx3++
        ) {
          for (
            let cardIndx4 = cardIndx3 + 1;
            cardIndx4 < allCards.length;
            cardIndx4++
          ) {
            const total =
              allCards[cardIndx1].value +
              allCards[cardIndx2].value +
              allCards[cardIndx3].value +
              allCards[cardIndx4].value;
            if (total === 15) {
              console.log(
                'Card1 index=',
                cardIndx1,
                ' card=',
                allCards[cardIndx1],
                ' Card2 index=',
                cardIndx2,
                ' card=',
                allCards[cardIndx2],
                ' Card3 index=',
                cardIndx3,
                ' card=',
                allCards[cardIndx3],
                ' Card4 index=',
                cardIndx4,
                ' card=',
                allCards[cardIndx4],
                ': score 2!',
              );
              score += 2;
            }
            //console.log("index1=", cardIndx1, " index2=", cardIndx2, " index3=", cardIndx3, " index4=", cardIndx4, " total=", total);
          }
        }
      }
    }
    const total =
      allCards[0].value +
      allCards[1].value +
      allCards[2].value +
      allCards[3].value +
      allCards[4].value;
    if (total === 15) {
      console.log('total all cards = 15: score 2');
      score += 2;
    }
    //console.log("all cards", total);
    console.log('final score for hand=', score);
    return score;
  }
}
