import React from 'react';
import { Play, Map, BookOpen, Users } from 'lucide-react';
import { useWolfMathGame } from './WolfMathGameState';

type WolfMathGameMenuProps = {
 setScreen: React.Dispatch<React.SetStateAction<string>>;
};

const WolfMathGameMenu: React.FC<WolfMathGameMenuProps> = ({ setScreen }) => {
  const { startGame } = useWolfMathGame();

  const handleStartGame = () => {
    startGame();
    setScreen('game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <h1 className="text-5xl font-bold text-purple-700 mb-4">
            Aventura Matematică
          </h1>
          <h2 className="text-3xl font-bold text-pink-600 mb-8">
            a Lupului
          </h2>
          
          <img src="/img/wolf1.png" alt="Wolf" className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 animate-bounce" />

          <div className="space-y-4">
            <button
              onClick={handleStartGame}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <Play className="w-8 h-8" />
              Start
            </button>

            <button
              onClick={() => setScreen('levels')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <Map className="w-8 h-8" />
              Niveluri
            </button>

            <button
              onClick={() => setScreen('howto')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:from-yellow-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <BookOpen className="w-8 h-8" />
              Cum se joacă
            </button>

            <button
              onClick={() => setScreen('credits')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <Users className="w-8 h-8" />
              Creatori
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WolfMathGameMenu;