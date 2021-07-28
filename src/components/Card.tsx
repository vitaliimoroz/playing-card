import * as React from 'react';
import ICard from '../shared/interfaces/ICard';
import { FLIPPED_CARD } from '../utils/constants';

interface OwnProps {
    card: ICard;
    isFlipped: boolean;
}

const Card = (props: OwnProps) => {

    return (
        <div>
            <img
                className="single-card"
                src={props.isFlipped ? FLIPPED_CARD : `img/${props.card.value}.svg`}
                alt={props.isFlipped ? 'Hidden Card' : props.card.value}
            />
        </div>
    );
}

export default Card;
