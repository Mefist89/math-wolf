import React from 'react';
// Removed unused import

type WolfMathGameCreditsProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

const WolfMathGameCredits: React.FC<WolfMathGameCreditsProps> = ({ setScreen }) => {
  const handleReturnToMenu = () => {
    setScreen('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 to-purple-500 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-8">
          Creatori
        </h2>

        <img src="wolf1.png" alt="Wolf" className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6" />

        <div className="space-y-6 text-lg text-gray-70">
          <div className="bg-purple-50 p-6 rounded-2xl">
            <h3 className="font-bold text-2xl text-purple-700 mb-2">Aventura Matematică a Lupului</h3>
            <p className="text-gray-600">Joc educațional pentru clasa I</p>
          </div>

          <div className="bg-pink-50 p-6 rounded-2xl">
            <h3 className="font-bold text-xl text-pink-700 mb-2">📚 Concept educațional</h3>
            <p>Învățare prin joacă - matematică distractivă</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="font-bold text-xl text-blue-700 mb-2">🎨 Design</h3>
            <p>Interfață prietenoasă și colorată pentru copii</p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h3 className="font-bold text-xl text-green-700 mb-2">💡 Versiunea</h3>
            <p>1.0 - 2024</p>
          </div>
        </div>

        <button
          onClick={handleReturnToMenu}
          className="w-full mt-8 bg-purple-500 text-white px-6 py-4 rounded-2xl text-xl font-bold hover:bg-purple-600 transition"
        >
          Înapoi la Meniu
        </button>
      </div>
    </div>
  );
};

export default WolfMathGameCredits;