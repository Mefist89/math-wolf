import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Star, ArrowRight, Play, Map, BookOpen, Users } from 'lucide-react';

const WolfMathGame = () => {
  const [screen, setScreen] = useState('menu');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [question, setQuestion] = useState(null);
  const [levelScores, setLevelScores] = useState([0, 0, 0, 0, 0, 0]);
  const [currentLevelScore, setCurrentLevelScore] = useState(0);
  const [fallingItems, setFallingItems] = useState([]);
  const [fallingScore, setFallingScore] = useState(0);
  const [fallingMisses, setFallingMisses] = useState(0);
  const [gameTime, setGameTime] = useState(0);

  const levels = [
    {
      levelId: 1,
      name: "Misiunea Adunării",
      concept: "Adunarea a două numere",
      operation: "+",
      maxSum: 10,
      terms: 2,
      icon: "➕"
    },
    {
      levelId: 2,
      name: "Misiunea Scăderii",
      concept: "Scăderea a două numere",
      operation: "-",
      maxNum: 10,
      terms: 2,
      icon: "➖"
    },
    {
      levelId: 3,
      name: "Misiunea Trei Termeni (Adunare)",
      concept: "Adunarea a trei numere",
      operation: "+",
      maxSum: 10,
      terms: 3,
      icon: "✨"
    },
    {
      levelId: 4,
      name: "Misiunea Trei Termeni (Scădere)",
      concept: "Operații cu trei numere",
      operation: "-",
      maxNum: 10,
      terms: 3,
      icon: "⭐"
    },
    {
      levelId: 5,
      name: "Misiunea de Comparare",
      concept: "Compararea numerelor",
      operation: "compare",
      maxNum: 10,
      terms: 2,
      icon: "🎯"
    },
    {
      levelId: 6,
      name: "Misiunea Cărnii Zburătoare",
      concept: "Calcul rapid - Prinde carnea!",
      operation: "falling",
      maxNum: 10,
      terms: 2,
      icon: "🥩"
    }
  ];

  const generateQuestion = (level) => {
    if (level.operation === "compare") {
      const a = Math.floor(Math.random() * (level.maxNum + 1));
      const b = Math.floor(Math.random() * (level.maxNum + 1));
      const correctAnswer = a < b ? "<" : a > b ? ">" : "=";
      return {
        text: `${a} ___ ${b}`,
        correctAnswer,
        options: ["<", ">", "="],
        isCompare: true
      };
    }

    if (level.operation === "+") {
      if (level.terms === 2) {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * (level.maxSum - a + 1));
        const correctAnswer = a + b;
        return {
          text: `${a} + ${b} = ?`,
          correctAnswer,
          options: generateOptions(correctAnswer, 0, 10),
          isCompare: false
        };
      } else {
        const a = Math.floor(Math.random() * 5);
        const b = Math.floor(Math.random() * (5 - a));
        const c = Math.floor(Math.random() * (level.maxSum - a - b + 1));
        const correctAnswer = a + b + c;
        return {
          text: `${a} + ${b} + ${c} = ?`,
          correctAnswer,
          options: generateOptions(correctAnswer, 0, 10),
          isCompare: false
        };
      }
    }

    if (level.operation === "-") {
      if (level.terms === 2) {
        const a = Math.floor(Math.random() * (level.maxNum + 1));
        const b = Math.floor(Math.random() * (a + 1));
        const correctAnswer = a - b;
        return {
          text: `${a} - ${b} = ?`,
          correctAnswer,
          options: generateOptions(correctAnswer, 0, 10),
          isCompare: false
        };
      } else {
        const a = Math.floor(Math.random() * (level.maxNum + 1));
        const b = Math.floor(Math.random() * (a + 1));
        const c = Math.floor(Math.random() * (a - b + 1));
        const correctAnswer = a - b - c;
        return {
          text: `${a} - ${b} - ${c} = ?`,
          correctAnswer,
          options: generateOptions(correctAnswer, 0, 10),
          isCompare: false
        };
      }
    }
  };

  const generateOptions = (correct, min, max) => {
    const options = [correct];
    while (options.length < 4) {
      const opt = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!options.includes(opt)) {
        options.push(opt);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (screen === 'game' && currentLevel < levels.length && !gameComplete) {
      if (levels[currentLevel].operation === 'falling') {
        return;
      }
      setQuestion(generateQuestion(levels[currentLevel]));
    }
  }, [currentLevel, currentQuestion, screen]);

  useEffect(() => {
    if (screen === 'game' && levels[currentLevel]?.operation === 'falling' && !levelComplete) {
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
  }, [screen, currentLevel, levelComplete]);

  useEffect(() => {
    if (screen === 'game' && levels[currentLevel]?.operation === 'falling' && !levelComplete) {
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
      }, 2000);

      return () => clearInterval(spawnInterval);
    }
  }, [screen, currentLevel, levelComplete]);

  useEffect(() => {
    if (screen === 'game' && levels[currentLevel]?.operation === 'falling' && !levelComplete) {
      const moveInterval = setInterval(() => {
        setFallingItems(prev => {
          const updated = prev.map(item => ({
            ...item,
            progress: item.progress + 2
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
  }, [screen, currentLevel, levelComplete]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correctAnswer) {
      setScore(score + 1);
      setCurrentLevelScore(currentLevelScore + 1);
      const newScores = [...levelScores];
      newScores[currentLevel]++;
      setLevelScores(newScores);
    }

    setTimeout(() => {
      if (currentQuestion < 2) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else if (currentLevel < levels.length - 1) {
        setLevelComplete(true);
        setShowFeedback(false);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const handleFallingAnswer = (userAnswer, itemId) => {
    const item = fallingItems.find(i => i.id === itemId);
    if (item && item.answer === userAnswer) {
      setFallingScore(prev => prev + 1);
      setFallingItems(prev => prev.filter(i => i.id !== itemId));
    }
  };

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setCurrentQuestion(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setLevelComplete(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
  };

  const startGame = () => {
    setScreen('game');
    setCurrentLevel(0);
    setCurrentQuestion(0);
    setScore(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
    setLevelComplete(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
  };

  const startFromLevel = (levelIndex) => {
    setScreen('game');
    setCurrentLevel(levelIndex);
    setCurrentQuestion(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
    setLevelComplete(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
  };

  const returnToMenu = () => {
    setScreen('menu');
    setGameComplete(false);
    setLevelComplete(false);
  };

  if (screen === 'menu') {
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
            
            <div className="text-9xl mb-8 animate-bounce">
              🐺
            </div>

            <div className="space-y-4">
              <button
                onClick={startGame}
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
  }

  if (screen === 'levels') {
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
                  onClick={() => startFromLevel(idx)}
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
              onClick={returnToMenu}
              className="w-full bg-gray-500 text-white px-6 py-4 rounded-2xl text-xl font-bold hover:bg-gray-600 transition"
            >
              Înapoi la Meniu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'howto') {
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
            onClick={returnToMenu}
            className="w-full mt-8 bg-orange-500 text-white px-6 py-4 rounded-2xl text-xl font-bold hover:bg-orange-600 transition"
          >
            Înapoi la Meniu
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'credits') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-400 to-purple-500 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-8">
            Creatori
          </h2>

          <div className="text-8xl mb-6">🐺</div>

          <div className="space-y-6 text-lg text-gray-700">
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
            onClick={returnToMenu}
            className="w-full mt-8 bg-purple-500 text-white px-6 py-4 rounded-2xl text-xl font-bold hover:bg-purple-600 transition"
          >
            Înapoi la Meniu
          </button>
        </div>
      </div>
    );
  }

  if (levelComplete) {
    const isFallingGame = levels[currentLevel].operation === 'falling';
    const levelScore = isFallingGame ? fallingScore : currentLevelScore;
    const maxScore = isFallingGame ? fallingScore + fallingMisses : 3;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-8xl mb-4">🐺</div>
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
            <p className="text-2xl font-bold text-green-700">
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
                onClick={nextLevel}
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
              onClick={returnToMenu}
              className="w-full bg-gray-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-600 transition"
            >
              Meniu Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-8xl mb-4">🐺</div>
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          </div>
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Felicitări!</h1>
          <p className="text-xl text-gray-700 mb-4">
            Ai terminat toate misiunile împreună cu Lupul Prietenos!
          </p>
          <div className="bg-yellow-100 rounded-xl p-4 mb-6">
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
              onClick={startGame}
              className="w-full bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-purple-700 transition"
            >
              Joacă din nou
            </button>
            <button
              onClick={returnToMenu}
              className="w-full bg-gray-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-600 transition"
            >
              Meniu Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!question && levels[currentLevel]?.operation !== 'falling') return null;

  if (levels[currentLevel]?.operation === 'falling') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-300 to-red-300 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-5xl">🐺</div>
                <div>
                  <h2 className="text-xl font-bold text-purple-700">
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
                onClick={() => {
                  fallingItems.forEach(item => {
                    handleFallingAnswer(num, item.id);
                  });
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white text-2xl font-bold py-4 rounded-xl transition transform hover:scale-110 active:scale-95"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-300 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl">🐺</div>
              <div>
                <h2 className="text-xl font-bold text-purple-700">
                  {levels[currentLevel].name}
                </h2>
                <p className="text-sm text-gray-600">
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
            style={{ width: `${((currentLevel * 3 + currentQuestion) / 15) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">
              {question.text}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showFeedback && handleAnswer(option)}
                disabled={showFeedback}
                className={`
                  text-3xl font-bold py-8 rounded-2xl transition-all transform hover:scale-105
                  ${!showFeedback ? 'bg-purple-100 hover:bg-purple-200 text-purple-700' : ''}
                  ${showFeedback && option === question.correctAnswer ? 'bg-green-500 text-white' : ''}
                  ${showFeedback && option === selectedAnswer && option !== question.correctAnswer ? 'bg-red-500 text-white' : ''}
                  ${showFeedback && option !== question.correctAnswer && option !== selectedAnswer ? 'bg-gray-200 text-gray-500' : ''}
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
              {selectedAnswer === question.correctAnswer
                ? '🎉 Bravo! Răspuns corect!'
                : `😊 Răspunsul corect este ${question.correctAnswer}`}
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="inline-block bg-white rounded-full px-6 py-3 shadow-lg">
            <span className="text-lg font-bold text-purple-700">
              Scor: {score} / {currentLevel * 3 + currentQuestion + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WolfMathGame;