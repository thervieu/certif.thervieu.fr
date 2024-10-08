import React, { useState } from 'react';

const StartScreen = ({ questions, startQuiz, totalQuestions, reviewMode, toggleReviewMode}) => {
  const [startNb, setStartNb] = useState(0);
  const [endNb, setEndNb] = useState(0);
  const [numRandom, setNumRandom] = useState(0);
  const [selectionType, setSelectionType] = useState('range');

  const handleStartQuiz = () => {
    if (selectionType === 'range') {
      const selected = questions.slice(startNb - 1, endNb);
      startQuiz(selected);
    } else {
      const selected = [];
      while (selected.length < numRandom) {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        if (!selected.includes(randomQuestion)) {
          selected.push(randomQuestion);
        }
      }
      startQuiz(selected);
    }
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
          onChange={(e) => setStartNb(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="End number"
          value={endNb}
          onChange={(e) => setEndNb(Number(e.target.value))}
        />
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
          onChange={(e) => setNumRandom(Number(e.target.value))}
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
