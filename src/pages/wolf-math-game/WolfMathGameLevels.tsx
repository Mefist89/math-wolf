import React from 'react';
import { Star } from 'lucide-react';
import { useWolfMathGame } from './WolfMathGameState';

type WolfMathGameLevelsProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

const WolfMathGameLevels: React.FC<WolfMathGameLevelsProps> = ({ setScreen }) => {
  const { levels, levelScores, startFromLevel } = useWolfMathGame();

  const handleLevelSelect = (idx: number) => {
    startFromLevel(idx);
    setScreen('game');
  };

  const handleReturnToMenu = () => {
    setScreen('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-purple-700 mb-8 text-center">
            Alege Nivelul
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {levels.map((level, idx) => (
              <button
                key={idx}
                onClick={() => handleLevelSelect(idx)}
                className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl hover:from-purple-200 hover:to-pink-200 transition transform hover:scale-105 text-left shadow-lg"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-5xl">{level.icon}</div>
                  <div>
                    <div className="text-sm text-purple-600 font-bold">Nivelul {idx + 1}</div>
                    <div className="text-xl font-bold text-gray-800">{level.name}</div>
                  </div>
                </div>
                <p className="text-gray-600">{level.concept}</p>
                {level.operation !== 'falling' && (
                  <div className="mt-3 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < levelScores[idx]
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleReturnToMenu}
            className="w-full bg-gray-500 text-white px-6 py-4 rounded-2xl text-xl font-bold hover:bg-gray-600 transition"
          >
            Înapoi la Meniu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WolfMathGameLevels;