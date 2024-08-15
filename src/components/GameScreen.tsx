import React, { useState, useEffect } from 'react';
import '../styles/GameScreen.css';
import { Card, getCardSymbol } from './Card';
import seedrandom from 'seedrandom';

interface Props {
  x: number;
  y: number;
  randomSeed: number;
  onEndGame: () => void;
}

const GameScreen: React.FC<Props> = ({ x, y, randomSeed, onEndGame }) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchMessage, setMatchMessage] = useState<string>('');
  const [moveCount, setMoveCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const cards = Array.from({ length: x * y }, (_, i) => i + 1);
  const shuffledCards = shuffleArray(cards, randomSeed);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function shuffleArray(array: number[], seed: number): number[] {
    const shuffledArray = [...array];
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    const random = seedrandom(seed.toString());

    while (currentIndex !== 0) {
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }

  const handleCardClick = (cardNumber: number) => {
    console.log(`Card ${cardNumber} clicked`);
    const newSelectedCards = [...selectedCards, cardNumber];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setMoveCount(moveCount + 1); // Increment move count
      if (getCardSymbol(newSelectedCards[0]) === getCardSymbol(newSelectedCards[1])) {
        console.log('Match!');
        setMatchMessage("Match!");
      } else {
        console.log('Not a match!');
        setMatchMessage("Not a match!");
        setTimeout(() => {
          newSelectedCards.forEach(card => resetCard(card));
        }, 1000); // delay to show the message before resetting
      }
      setSelectedCards([]);
    }
  };

  const resetCard = (cardNumber: number) => {
    console.log(`Reset card ${cardNumber}`);
    // Logic to reset the card state
  };

  return (
    <div className="gamescreen" style={{ gridTemplateColumns: `repeat(${x}, 1fr)` }}>
      {shuffledCards.map((card) => (
        <Card key={card} cardNumber={card} onCardClick={handleCardClick} resetCard={resetCard}/>
      ))}
      {matchMessage && <div className="match-message">{matchMessage}</div>}
      <div className="move-count">Moves: {moveCount}</div>
      <div className="timer">Time: {timer}s</div>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
};

export default GameScreen;