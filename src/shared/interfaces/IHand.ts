import ICard from "./ICard";

export default interface IHand {
    id: string;
    name: string;
    cards: ICard[];
    isCardsFlipped: boolean;
}
