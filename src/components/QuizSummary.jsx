// QuizSummary.js
import React from 'react';
import useQuizStore from '../stores/useQuizStore';

const QuizSummary = () => {
  const answers = useQuizStore((state) => state.answers);

  // Calculate the number of correct answers
  const correctAnswers = answers.filter((answer) => answer.isCorrect);

  return (
    <div className="summary">
      <h2>Quiz Summary</h2>
      <p>Total Questions: {answers.length}</p>
      <p>Correct Answers: {correctAnswers.length}</p>
    </div>
  );
};

export default QuizSummary;
