import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useWolfMathGame } from './WolfMathGameState';

type WolfMathGamePlayProps = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  setLevelComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const WolfMathGamePlay: React.FC<WolfMathGamePlayProps> = ({ 
  setScreen, 
  setLevelComplete,
  setGameComplete
}) => {
 const {
    currentLevel,
    currentQuestion,
    setCurrentQuestion,
    levels,
    question,
    setQuestion,
    generateQuestion,
    selectedAnswer,
    setSelectedAnswer,
    showFeedback,
    setShowFeedback,
    handleAnswer,
    fallingItems,
    setFallingItems,
    fallingScore,
    fallingMisses, // This is the state variable
    setFallingMisses, // This is the setter function
    gameTime,
    setGameTime,
    handleFallingAnswer,
    score,
    returnToMenu
  } = useWolfMathGame();
  
  // State to track if spawning is paused
  const [spawningPaused, setSpawningPaused] = useState(true);
  
  // Flag to track if initial items have been spawned
  const [initialSpawned, setInitialSpawned] = useState(false);

  // Effect to generate questions when level or question changes
 useEffect(() => {
    if (currentLevel < levels.length) {
      if (levels[currentLevel].operation === 'falling') {
        return;
      }
      setQuestion(generateQuestion(levels[currentLevel]));
    }
 }, [currentLevel, currentQuestion]);

  // Effect for falling game timer
 useEffect(() => {
    if (levels[currentLevel]?.operation === 'falling') {
      const timer = setInterval(() => {
        setGameTime(prev => {
          if (prev >= 60) {
            setLevelComplete(true);
            return 60;
          }
          return prev + 0.1;
        });
      }, 100);

      return () => clearInterval(timer);
    }
 }, [currentLevel]);

  // Effect for spawning falling items - only initially spawn 5 items
  useEffect(() => {
    if (levels[currentLevel]?.operation === 'falling' && fallingItems.length === 0 && !initialSpawned) {
      // Initially spawn 5 items
      const newItems: typeof fallingItems = [];
      for (let i = 0; i < 5; i++) {
        const operation = Math.random() > 0.5 ? '+' : '-';
        let a, b, answer;
        
        if (operation === '+') {
          a = Math.floor(Math.random() * 10);
          b = Math.floor(Math.random() * (10 - a + 1));
          answer = a + b;
        } else {
          a = Math.floor(Math.random() * 11);
          b = Math.floor(Math.random() * (a + 1));
          answer = a - b;
        }

        const newItem = {
          id: Date.now() + Math.random() + i,
          question: `${a} ${operation} ${b}`,
          answer: answer,
          position: Math.random() * 80,
          progress: 0
        };

        newItems.push(newItem);
      }
      
      setFallingItems(prev => [...prev, ...newItems]);
      setInitialSpawned(true);
    }
  }, [currentLevel, fallingItems.length, initialSpawned]);

  // Separate effect for continuous spawning that can be paused
  useEffect(() => {
    if (levels[currentLevel]?.operation === 'falling' && !spawningPaused && initialSpawned) {
      const spawnInterval = setInterval(() => {
        const operation = Math.random() > 0.5 ? '+' : '-';
        let a, b, answer;
        
        if (operation === '+') {
          a = Math.floor(Math.random() * 10);
          b = Math.floor(Math.random() * (10 - a + 1));
          answer = a + b;
        } else {
          a = Math.floor(Math.random() * 11);
          b = Math.floor(Math.random() * (a + 1));
          answer = a - b;
        }

        const newItem = {
          id: Date.now() + Math.random(),
          question: `${a} ${operation} ${b}`,
          answer: answer,
          position: Math.random() * 80,
          progress: 0
        };

        setFallingItems(prev => [...prev, newItem]);
      }, 2000); // Spawn every 2 seconds when not paused
      
      return () => clearInterval(spawnInterval);
    }
  }, [currentLevel, spawningPaused, initialSpawned]);

  // Effect for moving falling items
  useEffect(() => {
    if (levels[currentLevel]?.operation === 'falling') {
      const moveInterval = setInterval(() => {
        setFallingItems(prev => {
          const updated = prev.map(item => ({
            ...item,
            progress: item.progress + 0.1
          }));

          const filtered = updated.filter(item => {
            if (item.progress >= 100) {
              setFallingMisses(m => m + 1);
              return false;
            }
            return true;
          });

          return filtered;
        });
      }, 100);

      return () => clearInterval(moveInterval);
    }
  }, [currentLevel]);

  // Check if game is complete
 useEffect(() => {
    if (currentLevel >= levels.length) {
      setGameComplete(true);
    }
  }, [currentLevel, levels.length]);

  // Function to handle answer and navigation
  const handleAnswerAndNavigate = (answer: any) => {
    if (showFeedback) return; // Prevent multiple clicks during feedback
    
    handleAnswer(answer);
    
    setTimeout(() => {
      if (currentQuestion < 2) {
        // Move to next question (0->1 or 1->2)
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        
        // Generate new question for the next question
        if (levels[currentLevel].operation !== 'falling') {
          setQuestion(generateQuestion(levels[currentLevel]));
        }
      } else {
        // Level is complete after 3rd question (index 2)
        setLevelComplete(true);
        setShowFeedback(false);
      }
    }, 1500);
 };

  if (levels[currentLevel]?.operation === 'falling') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-300 to-red-300 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-5xl">🐺</div>
                <div>
                  <h2 className="text-xl font-bold text-purple-70">
                    {levels[currentLevel].name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Prinde carnea cu răspunsul corect!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Timp</div>
                <div className="text-2xl font-bold text-red-700">
                  {Math.floor(60 - gameTime)}s
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-green-100 rounded-xl p-3 text-center">
              <div className="text-sm text-green-600">Prinse</div>
              <div className="text-3xl font-bold text-green-700">{fallingScore}</div>
            </div>
            <div className="flex-1 bg-red-100 rounded-xl p-3 text-center">
              <div className="text-sm text-red-600">Pierdute</div>
              <div className="text-3xl font-bold text-red-700">{fallingMisses}</div>
            </div>
          </div>

          <div className="bg-sky-200 rounded-3xl shadow-2xl p-4 relative overflow-hidden" style={{ height: '500px' }}>
            {fallingItems.map(item => (
              <div
                key={item.id}
                className="absolute transition-all duration-100"
                style={{
                  left: `${item.position}%`,
                  top: `${item.progress}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                  <div className="text-4xl mb-2">🥩</div>
                  <div className="text-xl font-bold text-gray-800">{item.question}</div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="text-8xl">🐺</div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 mt-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <button
                key={num}
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default behavior
                  
                  // Check if any of the falling items match the number clicked
                  let anyCorrect = false;
                  fallingItems.forEach(item => {
                    if (item.answer === num) {
                      if (handleFallingAnswer(num, item.id)) {
                        anyCorrect = true;
                      }
                    }
                  });
                  
                  // If any correct answer was found, unpause spawning
                  if (anyCorrect) {
                    setSpawningPaused(false);
                  }
                  // If no correct answer was found, keep the current state
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white text-2xl font-bold py-4 rounded-xl transition transform hover:scale-110 active:scale-95"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              // Reset game state and return to menu
              returnToMenu();
              setScreen('menu');
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-bold transition inline-flex items-center"
          >
            Meniu
          </button>
        </div>
      </div>
    );
  }

  // Regular game screen
  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-300 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl">🐺</div>
              <div>
                <h2 className="text-xl font-bold text-purple-70">
                  {levels[currentLevel].name}
                </h2>
                <p className="text-sm text-gray-60">
                  Întrebarea {currentQuestion + 1} din 3
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Nivel</div>
              <div className="text-2xl font-bold text-purple-700">
                {currentLevel + 1}/6
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-full h-4 mb-6 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
            style={{ width: `${((currentLevel * 3 + currentQuestion) / 15) * 10}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">
              {question?.text}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {question?.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showFeedback && handleAnswerAndNavigate(option)}
                disabled={showFeedback}
                className={`
                  text-3xl font-bold py-8 rounded-2xl transition-all transform hover:scale-105
                  ${!showFeedback ? 'bg-purple-100 hover:bg-purple-200 text-purple-700' : ''}
                  ${showFeedback && option === question?.correctAnswer ? 'bg-green-500 text-white' : ''}
                  ${showFeedback && option === selectedAnswer && option !== question?.correctAnswer ? 'bg-red-500 text-white' : ''}
                  ${showFeedback && option !== question?.correctAnswer && option !== selectedAnswer ? 'bg-gray-200 text-gray-500' : ''}
                  disabled:cursor-not-allowed
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`mt-6 p-4 rounded-xl text-center text-lg font-bold ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {selectedAnswer === question?.correctAnswer
                ? '🎉 Bravo! Răspuns corect!'
                : `😊 Răspunsul corect este ${question?.correctAnswer}`}
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
            <span className="text-lg font-bold text-purple-700">
              Scor: {score} / {currentLevel * 3 + currentQuestion + 1}
            </span>
            <button
              onClick={() => {
                // Reset game state and return to menu
                returnToMenu();
                setScreen('menu');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-bold transition"
            >
              Meniu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WolfMathGamePlay;