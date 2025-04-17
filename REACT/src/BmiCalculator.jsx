import React, { useState } from 'react';
import './BmiCalculator.css';

function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const handleCalculate = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      // const calculatedBmi = weight / (heightInMeters * heightInMeters);
      //const calculatedBmi = parseFloat(weight) / ((parseFloat(height) / 100) ** 2);
      setBmi(calculatedBmi.toFixed(2));

      if (calculatedBmi < 18.5) {
        setCategory('Alultáplált');
      } else if (calculatedBmi < 24.9) {
        setCategory('Normál testsúly');
      } else if (calculatedBmi < 29.9) {
        setCategory('Túlsúlyos');
      } else {
        setCategory('Elhízott');
      }
    }
  };

  return (
    <div className="bmiCalculator">
      <h2>BMI Kalkulátor</h2>
      <div>
        <label>Testsúly (kg): </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Pl. 70"
        />
      </div>
      <div>
        <label>Magasság (cm): </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Pl. 170"
        />
      </div>
      <div>
        <button onClick={handleCalculate}>Számolás</button>
      </div>
      {bmi && (
        <div>
          <p>BMI: {bmi}</p>
          <p>Szint: {category}</p>
        </div>
      )}
    </div>
  );
}

export default BmiCalculator;
