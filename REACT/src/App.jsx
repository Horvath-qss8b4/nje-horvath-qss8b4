import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import KoPapirOllo from './KoPapirOllo';
import BmiCalculator from './BmiCalculator';

function App() {
  return (
    <Router basename="/reactapp">
      <div className="App">
        <header>
          <h1>React Alkalmazás</h1>
        </header>
        <nav>
          <ul>
            <li><a href="/index.html">Kilépés</a></li>
            <li><Link to="/koPapirOllo">Kő-Papír-Olló Játék</Link></li>
            <li><Link to="/bmiCalculator">BMI Kalkulátor</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<h2>Válassz egy alkalmazást!</h2>} />
            <Route path="/koPapirOllo" element={<KoPapirOllo />} />
            <Route path="/bmiCalculator" element={<BmiCalculator />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 React App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
