import React from 'react';
import '../styles/GameScreen.css';
import {Card, getCardSymbol} from './Card'; // import the Card component
import seedrandom from 'seedrandom';

/*
    This is the GameScreen component that will be displayed when the game is in progress.
    It will display the grid of cards and a button to end the game.
    Optionally, we can add a timer, a score, and other game-related information here.
    We need to keep track of the state of each card, the number of cards, and the type of cards
    and implement the logic to check if two cards are a match. If they are a match, we can
    update the state of the cards to indicate that they are matched. If they are not a match,
    we can flip the cards back over.
*/

interface Props {
  // keep track of the number of cards in the x and y grid
  x: number;
  y: number;
  randomSeed: number; // Prop to seed the random number generator
  onEndGame: () => void; // Prop function to end the game
}

const GameScreen: React.FC<Props> = ({ x, y, randomSeed, onEndGame }) => {
  var selectedCards: number[] = [];
  const [matchMessage, setMatchMessage] = React.useState<string>('');

  const cards = Array.from({ length: x * y }, (_, i) => i + 1);
  const shuffledCards = shuffleArray(cards, randomSeed);

  function shuffleArray(array: number[], seed: number): number[] {
    const shuffledArray = [...array];
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // Use seed to initialize the random number generator
    const random = seedrandom(seed.toString());

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;

      // Swap it with the current element
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }
  
  const handleCardClick = (cardNumber: number) => {
    // Logic to handle card click
    console.log(`Card ${cardNumber} clicked`);
    selectedCards.push(cardNumber);
    if (selectedCards.length === 2) {
      // Check if the two selected cards are a match
      if (getCardSymbol(selectedCards[0]) === getCardSymbol(selectedCards[1])) {
        console.log('Match!');
        setMatchMessage("Match!");
      } else {
        console.log('Not a match!');
        setMatchMessage("Not a match!");
        // reset the cards after a delay
        setTimeout(() => {
          selectedCards.forEach(card => resetCard(card));
        }, 1000); // delay to show the message before resetting
      }
      selectedCards = []; // Reset selected cards
    }
    // Update state or perform other actions
  };
  
  const resetCard = (cardNumber: number) => {
    // Logic to reset the card state
    // This function will be passed to each Card component
    console.log(`Reset card ${cardNumber}`);
    // Update state or perform other actions
    // How can I adjust card.isClicked to false?
  };

  return (
    <div className="gamescreen" style={{ gridTemplateColumns: `repeat(${x}, 1fr)` }}>
      {shuffledCards.map((card) => (
        <Card key={card} cardNumber={card} onCardClick={handleCardClick} resetCard={resetCard}/>
      ))}
      {matchMessage && <div className="match-message">{matchMessage}</div>}
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
};

export default GameScreen;