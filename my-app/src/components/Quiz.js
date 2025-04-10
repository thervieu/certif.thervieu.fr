import React, { useState, useEffect } from 'react';
import Question from './Question';
import shuffle from '../utils/shuffle';

const Quiz = ({ questions, onSubmit, reviewMode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Move the state here

  const totalQuestions = questions.length;

  // Shuffle the question choices once when the component mounts
  useEffect(() => {
    const shuffled = questions.map((question) => ({
      ...question,
      choices: shuffle([...question.choices]), // Shuffle choices once for each question
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  // Handle moving to the next question
  const handleNext = () => {
    const correctAnswers = shuffledQuestions[currentQuestionIndex].site_answers;
    const userAnswer = answers[currentQuestionIndex] || [];

    // Check if the answer is correct
    const isCorrect =
      correctAnswers.length === userAnswer.length &&
      correctAnswers.every((answer) => userAnswer.includes(answer));

    if (!isCorrect) {
      // If the answer is incorrect and review mode is enabled
      if (reviewMode && !showCorrectAnswer) {
        setShowCorrectAnswer(true); // Show the correct answer
        return; // Prevent changing the question
      }
    }

    // Move to the next question if correct or in normal mode
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    setShowCorrectAnswer(false);
  };

  // Handle moving to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setShowCorrectAnswer(false); // Reset correct answer before question change
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle when the user answers a question
  const handleAnswer = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  // Handle quiz submission
  const handleSubmit = () => {
    onSubmit(answers);
  };

  // Handle showing correct answer for current question
  const handleShowCorrectAnswer = () => {
    setShowCorrectAnswer(true);
  };

  return (
    <div>
      <h2>Question {currentQuestionIndex+1}/{questions.length}</h2> 
      {shuffledQuestions.length > 0 && (
        <Question
          question={shuffledQuestions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          userAnswer={answers[currentQuestionIndex] || []}
          showCorrectAnswer={showCorrectAnswer} // Pass the showCorrectAnswer state as a prop
          onShowAnswer={handleShowCorrectAnswer} // Handler for showing correct answer
        />
      )}

      <div style={{ marginTop: '20px' }}>
        {/* Previous Button */}
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
        </button>

        {/* Submit Button when it's the last question */}
        {currentQuestionIndex === totalQuestions - 1 && (
          <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
