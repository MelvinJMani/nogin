import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sudoku from './pages/Sudoku';
import Game2048 from './pages/Game2048';
import Tetris from './pages/Tetris';
import Crosswords from './pages/Crosswords';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sudoku' element={<Sudoku />} />
        <Route path='/2048' element={<Game2048 />} />
        <Route path='/tetris' element={<Tetris />} />
        <Route path='/crosswords' element={<Crosswords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
