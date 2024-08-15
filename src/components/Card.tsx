import React, { useState, useEffect } from 'react';
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
  onCardClick: (cardNumber: number) => void;
  resetCard: (cardNumber: number) => void;
}

// default image for unclicked card
const defaultCardSymbol = "🃏";

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

function getCardSymbol(cardNumber: number): string {
  const modifiedCardNumber = Math.floor(cardNumber / 2);
  const symbolIndex = (modifiedCardNumber) % (Object.keys(CardSymbols).length);
  return CardSymbols[symbolIndex] || `Card ${modifiedCardNumber}`;
}

const Card: React.FC<CardProps> = ({ cardNumber, onCardClick, resetCard }) => {
  const [isClicked, setIsClicked] = useState(false); // state to manage if card has been clicked

  useEffect(() => {
    resetCard(cardNumber);
  }, [resetCard, cardNumber]);

  const handleClick = () => {
    setIsClicked(true); // set isClicked to true when card is clicked
    onCardClick(cardNumber); // game screen handler for card click
  };


  return (
    <div className="card" onClick={handleClick}>
      {isClicked ? getCardSymbol(cardNumber) : `${defaultCardSymbol}`}
    </div>
  );
};

export { Card, getCardSymbol };