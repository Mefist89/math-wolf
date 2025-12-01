import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WolfMathGameLayout from './pages/wolf-math-game/WolfMathGameLayout';

function App() {
 return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<WolfMathGameLayout />} />
          <Route path="/wolf-math-game/*" element={<WolfMathGameLayout />} />
        </Routes>
      </div>
    </Router>
 );
}

export default App;
