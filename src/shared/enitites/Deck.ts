import { CARDS_WEIGHT, FACES, SUITS } from "../../utils/constants";
import { shuffle } from "../../utils/helpers";
import ICard from "../interfaces/ICard";

export default class Deck {
  cards: ICard[]
  constructor(){
      this.cards = this.initDeck();
  }

  initDeck = () => {
      let deck: ICard[] = [];
      
      let addSuits = (prefix: string | number, deck: ICard[]) => {
        for(let suit of SUITS){
            deck.push({
                suit,
                rank: `${prefix}`,
                value: `${prefix}${suit}`,
                weight: CARDS_WEIGHT[prefix]
            });
        }
        return deck;
      }
      
      for(let i = 2; i < 11; i++){
          deck = addSuits(i, deck);
      }
      
      for(let face of FACES){
          deck = addSuits(face, deck);
      }
      return deck;
  }

  deal = (count: number) => {
      let dist: ICard[] = [];
      if (count > this.cards.length){
          count = this.cards.length;
      }
      for (let i = 0; i < count; i++) {
          dist.push(this.cards.pop()!)
      }
      return dist;
  }

  restore = () => {
      this.cards = this.initDeck();
  }

  shuffle = () => {
      this.cards = shuffle(this.cards);
  }
}