import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Cam from './pages/Cam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/registerface' element={<Cam />} />
      </Routes>
    </Router>
  );
}

export default App;