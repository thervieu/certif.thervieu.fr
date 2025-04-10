import React, { useState } from 'react';

const StartScreen = ({ questions, startQuiz, totalQuestions, reviewMode, toggleReviewMode}) => {
  const [startNb, setStartNb] = useState(101);
  const [endNb, setEndNb] = useState(150);
  const [numRandom, setNumRandom] = useState(150);
  const [rangeNb, SetRangeNB] = useState(1000);
  const [selectionType, setSelectionType] = useState('range');

  const handleStartQuiz = () => {
    if (selectionType === 'range') {
      const selected = questions.slice(startNb - 1, endNb);
      startQuiz(selected);
    } else {
      const selected = [];
      while (selected.length < numRandom) {
        const rangeQuestions = questions.slice(0, rangeNb);
        const randomQuestion = rangeQuestions[Math.floor(Math.random() * rangeQuestions.length)];
        if (!selected.includes(randomQuestion)) {
          selected.push(randomQuestion);
        }
      }
      startQuiz(selected);
    }
  };

  const addTwenty = () => {
    setStartNb(startNb+50);
    setEndNb(endNb+50);
  };

  return (
    <div>
      <h1>Welcome to the Quiz</h1>
      <p>Total Questions Available: {totalQuestions}</p>
      <div>
        <label>
          <input
            type="radio"
            value="range"
            checked={selectionType === 'range'}
            onChange={() => setSelectionType('range')}
          />
          Select Range of Questions
        </label>
        <input
          type="number"
          placeholder="Start number"
          value={startNb}
          onChange={(e) => {
            setStartNb(Number(e.target.value) < 0 ? 1 : Number(e.target.value))
            setSelectionType('range');
          }}
        />
        <input
          type="number"
          placeholder="End number"
          value={endNb}
          onChange={(e) => {  
            setEndNb(Number(e.target.value) < questions.length ? Number(e.target.value) : questions.length)
            setSelectionType('range');
          }}
        />
        <button onClick={addTwenty}>
          Add 50
        </button>
          
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="random"
            checked={selectionType === 'random'}
            onChange={() => setSelectionType('random')}
          />
          Select Random Questions
        </label>
        <input
          type="number"
          placeholder="Number of questions"
          value={numRandom}
          onChange={(e) => {
            setNumRandom(Number(e.target.value));
            setSelectionType('random');
          }}
        />
        <input
          type="number"
          placeholder="Range number"
          value={rangeNb}
          onChange={(e) => {
            SetRangeNB(Number(e.target.value));
            setSelectionType('random');
          }}
        />
      </div>
      <button onClick={toggleReviewMode}>
        {reviewMode ? 'Disable Review Mode' : 'Enable Review Mode'}
      </button>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;
