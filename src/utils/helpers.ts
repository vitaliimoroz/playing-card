import ICard from "../shared/interfaces/ICard";
import IHand from "../shared/interfaces/IHand";
import { MOBILE_BREAKPOINT, TIE } from "./constants";

export const shuffle = (a: any[]) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

export const getPairs = (cards: ICard[]) => {
    let countOfPairs = 0;
    let topWeightOfCards = 0;
    const pairs: ICard[][] = [];
    const setsOfMatches: any = {};
    cards.forEach(currentCard => {
        const rank = currentCard.rank;
        const setOfMatches = setsOfMatches[rank];
        if (setOfMatches) {
            setOfMatches.push(currentCard);
            countOfPairs += 1;
            pairs.push(setOfMatches);
            if (currentCard.weight > topWeightOfCards) {
                topWeightOfCards = currentCard.weight
            }
            delete setsOfMatches[rank];
        } else {                                          
            setsOfMatches[rank] = [currentCard];
        }
    });
    return {countOfPairs, topWeightOfCards, pairs, singleCards: flattenArray(Object.values(setsOfMatches)) };
}

export const getWinnerId = (hands: IHand[]) => {
    let winnerId = TIE;
    let maxCountOfPairs = 0;
    let countOfPlayersWithSameCountOfPairsAndWeigth = 0;
    let topWeightOfCards = 0;
    let handResults = [];
    for (const hand of hands) {
        const result = getPairs(hand.cards)
        handResults.push({
          handId: hand.id,
          result
        });
    }
    handResults = handResults.filter(handResult => handResult.result.countOfPairs > 0); // leave hands that have more than 1 pair
    if (handResults.length) {
      for (const handResult of handResults) {
          if (handResult.result.countOfPairs > maxCountOfPairs || !maxCountOfPairs) { // hand have more pairs or it's first iteration
              maxCountOfPairs = handResult.result.countOfPairs; // new max count
              topWeightOfCards = handResult.result.topWeightOfCards; // top weight of card pairs
              winnerId = handResult.handId; // set it as a winner for now
              countOfPlayersWithSameCountOfPairsAndWeigth = 1; // this is only winner
          } else if (handResult.result.countOfPairs === maxCountOfPairs) { // two or more hands have same count of pairs
              if (topWeightOfCards < handResult.result.topWeightOfCards) { // this hand has same count but weight of the top pair is greater
                  topWeightOfCards = handResult.result.topWeightOfCards; 
                  countOfPlayersWithSameCountOfPairsAndWeigth = 1; // this is only winner
                  winnerId = handResult.handId; // we have new winner
              } else if (topWeightOfCards === handResult.result.topWeightOfCards) { 
                  countOfPlayersWithSameCountOfPairsAndWeigth += 1; // two or more hands have the same pairs count and weights
              }
          }
      }
    }
    // if we have more than one hand with same pairs count and weights
    // let's assume that this is a TIE
    if (countOfPlayersWithSameCountOfPairsAndWeigth > 1) {
        return TIE;
    }
    return winnerId;
}

export const isDesktopView = () => {
  return window.innerWidth > MOBILE_BREAKPOINT;
};

const flattenArray = (arrOrArr: ICard[][]) => {
    const result = []
    for (const value of arrOrArr) {
        result.push(...value);
    }
    return result;
}
