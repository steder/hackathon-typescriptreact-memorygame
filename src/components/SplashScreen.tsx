import React from 'react';
import '../styles/Common.css';
import '../styles/SplashScreen.css';

/*
    This is the SplashScreen component that will be displayed when the game starts.
    It will display a welcome message and a button to start the game.
    Optionally, we can add some instructions or a brief description of the game here
    along with other options such as settings for the game including type of and number
    of cards, and difficulty level.

*/

interface SplashScreenProps {
  onStartGame: () => void; // Prop function to start the game
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStartGame }) => {
  return (
    <div className="screen">
      <h1>Welcome to My Game App!!</h1>
      <p>
        Test your memory by matching pairs of cards. Click on a card to flip it over and reveal its symbol. 
        Try to find the matching card by flipping another card. If the cards match, they will stay flipped. 
        If they don't match, they will flip back over. The game ends when all pairs are matched. 
        Try to complete the game in the fewest moves and shortest time possible!
      </p>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default SplashScreen;