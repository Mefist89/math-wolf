import { useState } from 'react';
import { WolfMathGameProvider } from './WolfMathGameState';
import WolfMathGameMenu from './WolfMathGameMenu';
import WolfMathGameLevels from './WolfMathGameLevels';
import WolfMathGameHowTo from './WolfMathGameHowTo';
import WolfMathGameCredits from './WolfMathGameCredits';
import WolfMathGamePlay from './WolfMathGamePlay';
import WolfMathGameLevelComplete from './WolfMathGameLevelComplete';
import WolfMathGameComplete from './WolfMathGameComplete';

const WolfMathGameLayout = () => {
  const [screen, setScreen] = useState('menu');
  const [gameComplete, setGameComplete] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  // Render the appropriate component based on the current screen
  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return <WolfMathGameMenu setScreen={setScreen} />;
      case 'levels':
        return <WolfMathGameLevels setScreen={setScreen} />;
      case 'howto':
        return <WolfMathGameHowTo setScreen={setScreen} />;
      case 'credits':
        return <WolfMathGameCredits setScreen={setScreen} />;
      case 'game':
        if (levelComplete) {
          return <WolfMathGameLevelComplete
            setScreen={setScreen}
            setLevelComplete={setLevelComplete}
            setGameComplete={setGameComplete}
          />;
        } else if (gameComplete) {
          return <WolfMathGameComplete setScreen={setScreen} />;
        } else {
          return <WolfMathGamePlay
            setScreen={setScreen}
            setLevelComplete={setLevelComplete}
            setGameComplete={setGameComplete}
          />;
        }
      default:
        return <WolfMathGameMenu setScreen={setScreen} />;
    }
  };

  return (
    <WolfMathGameProvider>
      {renderScreen()}
    </WolfMathGameProvider>
  );
};

export default WolfMathGameLayout;