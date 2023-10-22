// CurrentQuestionZustand.jsx
import React, { useState, useEffect } from 'react';
import useQuizStore from '../stores/useQuizStore';
import './CurrentQuestionZustand.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const CurrentQuestionZustand = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);

  const quizOver = useQuizStore((state) => state.quizOver);
  const answers = useQuizStore((state) => state.answers);

  useEffect(() => {
    const newProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    setProgress(newProgress);
  }, [currentQuestionIndex, totalQuestions]);

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleOptionSelect = (index) => {
    setSelectedAnswerIndex(index);
  };

  const handleSubmit = () => {
    if (selectedAnswerIndex !== null) {
      const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;
      useQuizStore.getState().submitAnswer(question.id, selectedAnswerIndex);

      setShowResult(true);

      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswerIndex(null);

        useQuizStore.getState().goToNextQuestion();

        if (currentQuestionIndex + 1 === totalQuestions) {
          useQuizStore.getState().setQuizOver(true);
        }
      }, 1500);
    }
  };

  const options = question.options.map((option, index) => {
    const isCorrectAnswer = question.correctAnswerIndex === index;
    const isSelectedAnswer = selectedAnswerIndex === index;

    const optionClasses = `option ${showResult && isCorrectAnswer ? 'correct' : ''} ${isSelectedAnswer ? 'selected' : ''}`;

    return (
      <div key={index} className={optionClasses}>
        <input
          type="radio"
          name="answer"
          value={index}
          onChange={() => handleOptionSelect(index)}
          checked={isSelectedAnswer}
          disabled={showResult}
        />
        <label>
          {option}
        </label>
      </div>
    );
  });

  if (quizOver) {
    // Navigate to the summary page when the quiz is over
    navigate('/summary');
  }

  return (
    <div className="managed-component">
      <h2>Using Zustand</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </div>
      <h4>Question: {question.questionText}</h4>
      {question.image && (
        <img src={question.image} alt="Question" className="question-image" />
      )}
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
    </div>
  );
};

export default CurrentQuestionZustand;
