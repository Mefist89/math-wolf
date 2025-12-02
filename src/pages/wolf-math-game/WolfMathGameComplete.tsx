import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { useWolfMathGame } from './WolfMathGameState';

type WolfMathGameCompleteProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

const WolfMathGameComplete: React.FC<WolfMathGameCompleteProps> = ({ setScreen }) => {
  const { score, startGame } = useWolfMathGame();

  const handlePlayAgain = () => {
    startGame();
    setScreen('game');
  };

  const handleReturnToMenu = () => {
    setScreen('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <img src="/img/wolf1.png" alt="Wolf" className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4" />
          <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
        </div>
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Felicitări!</h1>
        <p className="text-xl text-gray-700 mb-4">
          Ai terminat toate misiunile împreună cu Lupul Prietenos!
        </p>
        <div className="bg-yellow-10 rounded-xl p-4 mb-6">
          <p className="text-2xl font-bold text-purple-700">
            Scor final: {score} / 15
          </p>
        </div>
        <div className="flex gap-2 justify-center mb-4">
          {[...Array(6)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <div className="space-y-3">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-purple-700 transition"
          >
            Joacă din nou
          </button>
          <button
            onClick={handleReturnToMenu}
            className="w-full bg-gray-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-600 transition"
          >
            Meniu Principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WolfMathGameComplete;