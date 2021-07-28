import * as React from 'react';
import IHand from '../shared/interfaces/IHand';
import Hand from './Hand';
import Flex from './Flex';
import { TIE } from '../utils/constants';
import { isDesktopView } from '../utils/helpers';

interface OwnProps {
    hands: IHand[];
    winnerId: string;
}

const Table = (props: OwnProps) => {
    const [hand1, hand2, hand3, hand4] = props.hands;
    return (
        <Flex className="game-table" direction="column" justifyContent="center">
            {
              hand3 && (
                <Flex alignItems="center" justifyContent="center" className="top-player">
                    <Hand hand={hand3} isWinner={props.winnerId === hand3.id} />
                </Flex>
              )
            }
            <Flex alignItems="center" justifyContent="space-between" direction={isDesktopView() ? 'row' : 'column'}>
                <Hand key={hand1.id} hand={hand1} isWinner={props.winnerId === hand1.id} />
                {props.winnerId === TIE && (<h2 className="no-winner">GAME OVER. Tie!</h2>) }
                <Hand key={hand2.id} hand={hand2} isWinner={props.winnerId === hand2.id} />
            </Flex>
            {
              hand4 && (
                <Flex alignItems="center" justifyContent="center" className="bottom-player">
                    <Hand hand={hand4} isWinner={props.winnerId === hand4.id} />
                </Flex>
              )
            }
        </Flex>
    );
}

export default Table;
