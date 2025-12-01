import React from 'react';
import { Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';
import { useWolfMathGame } from './WolfMathGameState';

type WolfMathGameLevelCompleteProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  setLevelComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const WolfMathGameLevelComplete: React.FC<WolfMathGameLevelCompleteProps> = ({ 
  setScreen, 
  setLevelComplete,
  setGameComplete
}) => {
  const { 
    currentLevel, 
    levels, 
    currentLevelScore, 
    fallingScore, 
    fallingMisses, 
    nextLevel 
  } = useWolfMathGame();

  const isFallingGame = levels[currentLevel].operation === 'falling';
  const levelScore = isFallingGame ? fallingScore : currentLevelScore;
  const maxScore = isFallingGame ? fallingScore + fallingMisses : 3;

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      nextLevel();
      setLevelComplete(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleReturnToMenu = () => {
    setScreen('menu');
    setLevelComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <img src="wolf1.png" alt="Wolf" className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4" />
          <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        </div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">Misiune Completă!</h1>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          {levels[currentLevel].name}
        </h2>
        <p className="text-xl text-gray-700 mb-4">
          Ai terminat acest nivel cu succes!
        </p>
        <div className="bg-green-100 rounded-xl p-4 mb-6">
          <p className="text-2xl font-bold text-green-70">
            {isFallingGame 
              ? `Scor: ${levelScore} prinsă / ${fallingMisses} pierdută`
              : `Scor nivel: ${levelScore} / ${maxScore}`
            }
          </p>
        </div>
        {!isFallingGame && (
          <div className="flex gap-2 justify-center mb-6">
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-12 h-12 ${
                  i < levelScore 
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
        )}
        {isFallingGame && (
          <div className="text-6xl mb-6">🥩</div>
        )}
        <div className="space-y-3">
          {currentLevel < levels.length - 1 ? (
            <button
              onClick={handleNextLevel}
              className="w-full bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              Următorul Nivel
              <ArrowRight className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setGameComplete(true)}
              className="w-full bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              Finalizează Jocul
              <Trophy className="w-6 h-6" />
            </button>
          )}
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

export default WolfMathGameLevelComplete;