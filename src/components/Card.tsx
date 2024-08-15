import React, { useState } from 'react';
import '../styles/Card.css';

interface CardProps {
  /*
    This is the Card component that represents a single card in the game. We need to
    track the state of the card to determine if it has been flipped or matched. We also
    need to track the type of card to check if two cards are a match. If the cards are a match,
    we can update the state of the cards to indicate that they are matched. If they are not a match,
    we can flip the cards back over.
  */
  cardNumber: number;

}

// default image for unclicked card
const unicodeCardSymbol = "🃏";

// Mapping of card numbers to unciode symbols
const CardSymbols: { [key: number]: string } = {
  0: '🍕',
  1: '🍔',
  2: '🍟',
  3: '🌭',
  4: '🍦',
  5: '🍩',
  6: '🍪',
  7: '🍫',
  // 8: '🍬',
  // 9: '🍭',
  // 10: '🍮',
  // 11: '🍯',
  // 12: '🍰',
  // 13: '🍱',
  // 14: '🍲',
  // 15: '🍳',
};

const Card: React.FC<CardProps> = ({ cardNumber }) => {
  const [isClicked, setIsClicked] = useState(false); // state to manage if card has been clicked

  const handleClick = () => {
    setIsClicked(true); // set isClicked to true when card is clicked
  };

  const getCardSymbol = (cardNumber: number): string => {
    cardNumber = Math.floor(cardNumber / 2);
    const symbolIndex = (cardNumber) % (Object.keys(CardSymbols).length);
    return CardSymbols[symbolIndex] || `Card ${cardNumber}`;
  };

  return (
    <div className="card" onClick={handleClick}>
      {isClicked ? getCardSymbol(cardNumber) : `${unicodeCardSymbol}`}
    </div>
  );
};

export default Card;