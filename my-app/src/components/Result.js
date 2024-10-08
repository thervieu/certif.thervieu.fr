import React from 'react';

const Result = ({ questions, userAnswers, handleQuizRestart }) => {
  const calculateScore = () => {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      const correctAnswer = question.site_answers.sort().join(',');
      const userAnswer = (userAnswers[index] || []).sort().join(',');
      if (correctAnswer === userAnswer) {
        correctAnswers++;
      }
    });

    return Math.floor((correctAnswers / questions.length) * 1000);
  };

  const score = calculateScore();

  return (
    <div>
      <h1>Your Score: {score}/1000</h1>
      <button onClick={handleQuizRestart} style={{ marginTop: '20px' }}>
        Go to Start
      </button>
    </div>
  );
};

export default Result;
