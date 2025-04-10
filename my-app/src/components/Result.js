import React from 'react';

const Result = ({ questions, userAnswers, handleWorkOnWrong, handleQuizRestart }) => {
  let correctAnswers = 0;
  let wrongQuestions = [];

  questions.forEach((question, index) => {
    const correctAnswer = question.site_answers.sort().join(',');
    const userAnswer = (userAnswers[index] || []).sort().join(',');
    if (correctAnswer === userAnswer) {
      correctAnswers++;
    } else {
      wrongQuestions.push(question);
    }
  });
  const score = Math.floor((correctAnswers / questions.length) * 1000);

  // Handle quiz wrong
  const handleQuizWring = () => {
    handleWorkOnWrong(wrongQuestions);
  };


  return (
    <div>
      <h1>Your Score: {score}/1000</h1>
      <button onClick={handleQuizWring} style={{ marginTop: '20px' }}>
        Work On Wrong Questions
      </button>
      <button onClick={handleQuizRestart} style={{ marginTop: '20px' }}>
        Go to Start
      </button>
    </div>
  );
};

export default Result;
