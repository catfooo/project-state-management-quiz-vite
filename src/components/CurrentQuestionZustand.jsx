import React, { useState } from 'react';
import useQuizStore from '../stores/useQuizStore';

const CurrentQuestionZustand = () => {
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const quizOver = useQuizStore((state) => state.quizOver);
  const answers = useQuizStore((state) => state.answers); // Get answers for summary

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleOptionSelect = (index) => {
    setSelectedAnswerIndex(index);
  };

  const handleSubmit = () => {
    if (selectedAnswerIndex !== null) {
      // Check if the selected answer index is correct
      const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;
      useQuizStore.getState().submitAnswer(question.id, selectedAnswerIndex);

      // Display the result
      setShowResult(true);

      // After a brief delay, advance to the next question
      setTimeout(() => {
        useQuizStore.getState().goToNextQuestion();
        setShowResult(false);
        setSelectedAnswerIndex(null);
      }, 1500); // Delay for 1.5 seconds (adjust as needed)
    }
  };

  const options = question.options.map((option, index) => (
    <div key={index}>
      <input
        type="radio"
        name="answer"
        value={index}
        onChange={() => handleOptionSelect(index)}
        checked={selectedAnswerIndex === index}
        disabled={showResult}
      />
      <label>{option}</label>
    </div>
  ));

  return (
    <div className="managed-component">
      <h2>Using Zustand</h2>
      {quizOver ? (
        <div className="summary">
          <h2>Quiz Summary</h2>
          <p>Total Questions: {totalQuestions}</p>
          <p>Correct Answers: {answers.filter((answer) => answer.isCorrect).length}</p>
          <p>Incorrect Answers: {answers.filter((answer) => !answer.isCorrect).length}</p>
        </div>
      ) : (
        <>
          <h1>
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </h1>
          <h3>{totalQuestions - currentQuestionIndex - 1} questions left</h3>
          <h4>Question: {question.questionText}</h4>
          <form>
            {options}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              disabled={showResult}
            >
              Submit
            </button>
          </form>
          {showResult && (
            <p>
              {selectedAnswerIndex === question.correctAnswerIndex
                ? 'Correct!'
                : `Wrong. The correct answer is: ${question.options[question.correctAnswerIndex]}`}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentQuestionZustand;
