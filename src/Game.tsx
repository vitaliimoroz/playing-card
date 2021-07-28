import * as React from 'react';
import Flex from './components/Flex';
import Table from './components/Table';
import Deck from './shared/enitites/Deck';
import IHand from './shared/interfaces/IHand';
import { getWinnerId } from './utils/helpers';

const Game = () => {
  const [ players, setPlayers ] = React.useState<IHand[]>([])
  const [ playersCount, setPlayersCount ] = React.useState(2)
  const [ winnerId, setWinnerId ] = React.useState('')
  const handlePlayersCountChange = (increase: boolean) => () => {
      setPlayersCount(playersCount + (increase ? 1 : -1))
  }
  const startGame = () => {
      const deck = new Deck();
      deck.shuffle();
      const newGamePlayers: IHand[] = []
      for (let i = 1; i <= playersCount; i++) {
          newGamePlayers.push({
              id: `id-${i}-${new Date().getTime()}`,
              name: `Player ${i}`,
              cards: deck.deal(7),
              isCardsFlipped: false
          })
      }
      setPlayers(newGamePlayers);
      findWinner(newGamePlayers);
  }
  const findWinner = (players: IHand[]) => setWinnerId(getWinnerId(players));
  return (
    <div className="App">

      <h1>Game of Pairs:</h1>
      
      {
        Boolean(players.length) ? (
            <Table hands={players} winnerId={winnerId}/>
        ) : <p className="empty-state">Click "Deal Cards" to start the Game</p>
      }

      <Flex alignItems="center" justifyContent="center" className="bottom-bar">
        <button className="play-button" onClick={startGame}>
            Deal Cards
        </button>
        <Flex className="spacing-left-md" alignItems="center">
          <h3>{`Number of players: ${playersCount}`}</h3>
          <Flex className="spacing-left-md">
            <button disabled={playersCount === 2} className="play-button" onClick={handlePlayersCountChange(false)}>
                -
            </button>
            <button disabled={playersCount === 4} className="play-button" onClick={handlePlayersCountChange(true)}>
                +
            </button>
          </Flex>
        </Flex>
      </Flex>

    </div>
  );
}

export default Game;
