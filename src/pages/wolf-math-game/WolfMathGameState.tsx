import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define types
type Level = {
  levelId: number;
  name: string;
  concept: string;
  operation: string;
 maxSum?: number;
  maxNum?: number;
  terms: number;
  icon: string;
};

type FallingItem = {
  id: number | string;
  question: string;
  answer: number;
  position: number;
  progress: number;
};

type WolfMathGameState = {
  currentLevel: number;
 setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswer: any;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<any>>;
  showFeedback: boolean;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  levelScores: number[];
  setLevelScores: React.Dispatch<React.SetStateAction<number[]>>;
  currentLevelScore: number;
 setCurrentLevelScore: React.Dispatch<React.SetStateAction<number>>;
  fallingItems: FallingItem[];
 setFallingItems: React.Dispatch<React.SetStateAction<FallingItem[]>>;
  fallingScore: number;
  setFallingScore: React.Dispatch<React.SetStateAction<number>>;
  fallingMisses: number;
  setFallingMisses: React.Dispatch<React.SetStateAction<number>>;
  gameTime: number;
  setGameTime: React.Dispatch<React.SetStateAction<number>>;
  question: {
    text: string;
    correctAnswer: number | string;
    options: (number | string)[];
    isCompare: boolean;
  } | null;
  setQuestion: React.Dispatch<React.SetStateAction<{
    text: string;
    correctAnswer: number | string;
    options: (number | string)[];
    isCompare: boolean;
  } | null>>;
  levels: Level[];
  generateQuestion: (level: Level) => {
    text: string;
    correctAnswer: number | string;
    options: (number | string)[];
    isCompare: boolean;
 };
  generateOptions: (correct: number | string, min: number, max: number) => (number | string)[];
  handleAnswer: (answer: any) => void;
 handleFallingAnswer: (userAnswer: number, itemId: string | number) => boolean;
 nextLevel: () => void;
  startGame: () => void;
 startFromLevel: (levelIndex: number) => void;
 returnToMenu: () => void;
};

// Create context
const WolfMathGameContext = createContext<WolfMathGameState | undefined>(undefined);

// Provider component
export const WolfMathGameProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [levelScores, setLevelScores] = useState([0, 0, 0, 0, 0]);
  const [currentLevelScore, setCurrentLevelScore] = useState(0);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [fallingScore, setFallingScore] = useState(0);
  const [fallingMisses, setFallingMisses] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [question, setQuestion] = useState<{
    text: string;
    correctAnswer: number | string;
    options: (number | string)[];
    isCompare: boolean;
  } | null>(null);

  const levels: Level[] = [
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

  const generateOptions = (correct: number | string, min: number, max: number) => {
    if (typeof correct === 'string') {
      // For comparison operations, we have fixed options
      return ["<", ">", "="].sort(() => Math.random() - 0.5);
    }
    
    const options = [correct];
    while (options.length < 4) {
      const opt = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!options.includes(opt)) {
        options.push(opt);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateQuestion = (level: Level) => {
    if (level.operation === "compare") {
      const a = Math.floor(Math.random() * (level.maxNum! + 1));
      const b = Math.floor(Math.random() * (level.maxNum! + 1));
      const correctAnswer = a < b ? "<" : a > b ? ">" : "=";
      return {
        text: `${a} ___ ${b}`,
        correctAnswer,
        options: generateOptions(correctAnswer, 0, 10),
        isCompare: true
      };
    }

    if (level.operation === "+") {
      if (level.terms === 2) {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * (level.maxSum! - a + 1));
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
        const c = Math.floor(Math.random() * (level.maxSum! - a - b + 1));
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
        const a = Math.floor(Math.random() * (level.maxNum! + 1));
        const b = Math.floor(Math.random() * (a + 1));
        const correctAnswer = a - b;
        return {
          text: `${a} - ${b} = ?`,
          correctAnswer,
          options: generateOptions(correctAnswer, 0, 10),
          isCompare: false
        };
      } else {
        const a = Math.floor(Math.random() * (level.maxNum! + 1));
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
    
    // For falling operations, we don't generate questions here
    return {
      text: "",
      correctAnswer: 0,
      options: [],
      isCompare: false
    };
  };

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (question && answer === question.correctAnswer) {
      setScore(score + 1);
      setCurrentLevelScore(currentLevelScore + 1);
      const newScores = [...levelScores];
      newScores[currentLevel]++;
      setLevelScores(newScores);
    }
  };

  const handleFallingAnswer = (userAnswer: number, itemId: string | number) => {
    const item = fallingItems.find(i => i.id === itemId);
    if (item && item.answer === userAnswer) {
      setFallingScore(prev => prev + 1);
      setFallingItems(prev => prev.filter(i => i.id !== itemId));
      return true;
    }
    return false;
  };

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setCurrentQuestion(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
  };

  const startGame = () => {
    setCurrentLevel(0);
    setCurrentQuestion(0);
    setScore(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
  };

  const startFromLevel = (levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setCurrentQuestion(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
  };

  const returnToMenu = () => {
    // Reset game state
    setCurrentLevel(0);
    setCurrentQuestion(0);
    setScore(0);
    setCurrentLevelScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFallingItems([]);
    setFallingScore(0);
    setFallingMisses(0);
    setGameTime(0);
    setQuestion(null);
  };

  const value = {
    currentLevel,
    setCurrentLevel,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
    selectedAnswer,
    setSelectedAnswer,
    showFeedback,
    setShowFeedback,
    levelScores,
    setLevelScores,
    currentLevelScore,
    setCurrentLevelScore,
    fallingItems,
    setFallingItems,
    fallingScore,
    setFallingScore,
    fallingMisses,
    setFallingMisses,
    gameTime,
    setGameTime,
    question,
    setQuestion,
    levels,
    generateQuestion,
    generateOptions,
    handleAnswer,
    handleFallingAnswer,
    nextLevel,
    startGame,
    startFromLevel,
    returnToMenu,
  };

  return (
    <WolfMathGameContext.Provider value={value}>
      {children}
    </WolfMathGameContext.Provider>
  );
};

// Custom hook to use the context
export const useWolfMathGame = () => {
  const context = useContext(WolfMathGameContext);
  if (context === undefined) {
    throw new Error('useWolfMathGame must be used within a WolfMathGameProvider');
  }
  return context;
};