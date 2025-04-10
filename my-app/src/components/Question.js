import React, { useState, useEffect } from 'react';

const Question = ({ question, questionIndex, onAnswer, userAnswer, showCorrectAnswer, onShowAnswer }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(userAnswer); // Handle selected answers

  // Reset selected answers when the question changes
  useEffect(() => {
    setSelectedAnswers(userAnswer || (question.question_type === 'multiple' ? [] : ''));
  }, [question, userAnswer]);

  // Handle single-choice selection (radio button)
  const handleSingleChoice = (choice) => {
    setSelectedAnswers([choice]);
    onAnswer(questionIndex, [choice]);
  };

  // Handle multi-choice selection (checkbox)
  const handleMultiChoice = (choice) => {
    let updatedAnswers;
    if (selectedAnswers.includes(choice)) {
      updatedAnswers = selectedAnswers.filter((ans) => ans !== choice);
    } else {
      updatedAnswers = [...selectedAnswers, choice];
    }
    setSelectedAnswers(updatedAnswers);
    onAnswer(questionIndex, updatedAnswers);
  };

  function NewlineText(text) {
    return text.split('\n').map(str => <p>{str}</p>);
  }

  return (
    <div style={{
      paddingLeft: '5px',
      paddingRight: '5px',
    }}>
      {NewlineText(question.question_text)}

      <h3>Answer here :</h3>
      {question.choices.map((choice, index) => (
        <label
          key={index}
          style={{
            display: 'block',
            margin: '8px 0',
            padding: '5px',
            backgroundColor:
              showCorrectAnswer && question.site_answers.includes(choice)
                ? 'limegreen'
                : 'transparent',
          }}
        >
          <input
            type={question.question_type === 'single' ? 'radio' : 'checkbox'}
            name={`question-${questionIndex}`}
            value={choice}
            checked={selectedAnswers.includes(choice)}
            onChange={() =>
              question.question_type === 'single'
                ? handleSingleChoice(choice)
                : handleMultiChoice(choice)
            }
          />
          {choice}<br></br>
        </label>
      ))}

      {/* Button to show the correct answer */}
      <button onClick={onShowAnswer} style={{ marginTop: '10px' }}>
        Show Correct Answer
      </button>
    </div>
  );
};

export default Question;
