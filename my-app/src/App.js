import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import StartScreen from './components/StartScreen';
import Result from './components/Result';
import shuffle from './utils/shuffle';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(false);
  const [reviewMode, setReviewMode] = useState(true); // State for review mode

  // Load the quiz questions on launch
  useEffect(() => {
    fetch('/DEA_questions.json')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data)
        setTotalQuestions(data.length)
      })
      .catch((error) => console.error('Error loading quiz data:', error));
  }, []);

  // Function to start the quiz with a specific range or random selection
  const startQuiz = (selectedQuestions) => {
    setSelectedQuestions(shuffle(selectedQuestions)); // Shuffle questions
    setUserAnswers({}); // Reset answers
    setIsQuizComplete(false); // Reset quiz state
  };

  const handleQuizSubmit = (answers) => {
    setUserAnswers(answers);
    setIsQuizComplete(true); // Mark quiz as complete
  };

  const handleWorkOnWrong = (wrongQuestions) => {
    setUserAnswers({}); // Reset answers
    setIsQuizComplete(false); // Reset quiz state
    setSelectedQuestions(wrongQuestions);
  }

  const handleQuizRestart = () => {
    setUserAnswers({}); // Reset answers
    setIsQuizComplete(false); // Reset quiz state
    setSelectedQuestions([])
  };

  // Handle toggling the review mode
  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
  };
  
  return (
    <div>
      {isQuizComplete ? (
        <Result questions={selectedQuestions} userAnswers={userAnswers} handleWorkOnWrong={handleWorkOnWrong} handleQuizRestart={handleQuizRestart}/>
      ) : selectedQuestions.length > 0 ? (
        <Quiz
          questions={selectedQuestions}
          onSubmit={handleQuizSubmit}
          reviewMode={reviewMode} // Pass the toggle function
        />
      ) : (
        <StartScreen questions={questions} startQuiz={startQuiz} totalQuestions={totalQuestions} reviewMode={reviewMode} toggleReviewMode={toggleReviewMode} />
      )}
    </div>
  );
};

export default App;
