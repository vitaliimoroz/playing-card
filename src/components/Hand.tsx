import * as React from 'react';
import IHand from '../shared/interfaces/IHand';
import { COLORS } from '../utils/constants';
import { getPairs } from '../utils/helpers';
import Card from './Card';
import Flex from './Flex';

interface OwnProps {
    hand: IHand;
    isWinner: boolean;
}

const Hand = (props: OwnProps) => {
    const { countOfPairs, pairs, singleCards } = getPairs(props.hand.cards);
    return (
        <div className={`player ${props.isWinner ? 'winner' : ''}`}>
            <h2 className="player-name">{props.isWinner ? 'WINNER!' : props.hand.name}</h2>
            <Flex className="player-cards" justifyContent="space-around">
                <>
                    {
                      Boolean(countOfPairs) && pairs.map((pair, index) => (
                          <Flex key={`pair-${index}`} className={`card-pair ${COLORS[index]}`}>
                              {pair.map(card => (
                                  <Card key={`${card.value}-${props.hand.id}`} card={card} isFlipped={props.hand.isCardsFlipped} />
                              ))}
                          </Flex>
                      ))
                    }
                    {singleCards.map(card => (
                        <Card key={`${card.value}-${props.hand.id}`} card={card} isFlipped={props.hand.isCardsFlipped} />
                    ))}
                </>
            </Flex>
        </div>
    );
}

export default Hand;
