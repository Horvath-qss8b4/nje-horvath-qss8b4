import React, { useState } from 'react';
import './KoPapirOllo.css';

function KoPapirOllo() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const choices = ['Kő', 'Papír', 'Olló'];

  const handlePlayerChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    if (choice === computerChoice) {
      setResult('Döntetlen!');
    } else if (
      (choice === 'Kő' && computerChoice === 'Olló') ||
      (choice === 'Papír' && computerChoice === 'Kő') ||
      (choice === 'Olló' && computerChoice === 'Papír')
    ) {
      setResult('Nyertél!');
    } else {
      setResult('Vesztettél!');
    }
  };

  return (
    <div className="koPapirOllo">
      <h2>Kő-Papír-Olló Játék</h2>
      <div className="game-board">
        {choices.map((choice) => (
          <button key={choice} className="game-button" onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div>
        {playerChoice && <p>Te választottad: {playerChoice}</p>}
        {computerChoice && <p>Gép választása: {computerChoice}</p>}
        {result && <p>Eredmény: {result}</p>}
      </div>
    </div>
  );
}

export default KoPapirOllo;
