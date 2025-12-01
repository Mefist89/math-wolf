import React from 'react';
import { useWolfMathGame } from './WolfMathGameState';

type WolfMathGameHowToProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

const WolfMathGameHowTo: React.FC<WolfMathGameHowToProps> = ({ setScreen }) => {
  const handleReturnToMenu = () => {
    setScreen('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-400 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
          Cum se joacă
        </h2>

        <div className="space-y-6 text-lg text-gray-700">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎯</div>
            <div>
              <h3 className="font-bold text-xl text-purple-700 mb-2">Obiectiv</h3>
              <p>Ajută Lupul Prietenos să rezolve toate misiunile matematice! Fiecare nivel are 3 întrebări.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-4xl">🖱️</div>
            <div>
              <h3 className="font-bold text-xl text-purple-700 mb-2">Cum joci</h3>
              <p>Citește întrebarea și alege răspunsul corect din cele 4 variante. Apasă pe butonul cu răspunsul pe care îl crezi corect!</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-4xl">⭐</div>
            <div>
              <h3 className="font-bold text-xl text-purple-700 mb-2">Puncte</h3>
              <p>Pentru fiecare răspuns corect primești o stea! Încearcă să obții cât mai multe stele!</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-4xl">🏆</div>
            <div>
              <h3 className="font-bold text-xl text-purple-700 mb-2">Finalizare</h3>
              <p>Când termini toate cele 6 niveluri, vei primi o felicitare specială de la Lupul Prietenos!</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleReturnToMenu}
          className="w-full mt-8 bg-orange-500 text-white px-6 py-4 rounded-2xl text-xl font-bold hover:bg-orange-600 transition"
        >
          Înapoi la Meniu
        </button>
      </div>
    </div>
  );
};

export default WolfMathGameHowTo;