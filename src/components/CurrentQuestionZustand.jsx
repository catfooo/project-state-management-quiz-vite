import React, { useState, useEffect } from 'react';
import useQuizStore from '../stores/useQuizStore';
import './CurrentQuestionZustand.css';

const CurrentQuestionZustand = () => {
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0); // Added progress state

  const quizOver = useQuizStore((state) => state.quizOver);
  const answers = useQuizStore((state) => state.answers);

  useEffect(() => {
    // Calculate the progress percentage
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
      // Check if the selected answer index is correct
      const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;
      useQuizStore.getState().submitAnswer(question.id, selectedAnswerIndex);

      // Display the result
      setShowResult(true);

      // After a brief delay, advance to the next question
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswerIndex(null);

        // Call the goToNextQuestion method from the store
        useQuizStore.getState().goToNextQuestion();

        // Check if all questions have been answered
        if (currentQuestionIndex + 1 === totalQuestions) {
          // If all questions are answered, set quizOver to true
          useQuizStore.getState().setQuizOver(true);
        }
      }, 1500); // Delay for 1.5 seconds (adjust as needed)
    }
  };

  const options = question.options.map((option, index) => {
    const isCorrectAnswer = question.correctAnswerIndex === index;
    const isSelectedAnswer = selectedAnswerIndex === index;

    // Apply styles based on the selected and correct answers
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
        <label>{option}</label>
      </div>
    );
  });

  // Display the summary when the quiz is over
  if (quizOver) {
    // Calculate the number of correct answers
    const correctAnswers = answers.filter((answer) => answer.isCorrect);

    return (
      <div className="summary">
        <h2>Quiz Summary</h2>
        <p>Total Questions: {answers.length}</p>
        <p>Correct Answers: {correctAnswers.length}</p>
      </div>
    );
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

      {quizOver && (
        <div className="summary">
          {/* Display the summary when the quiz is over */}
          <p>Total Questions: {answers.length}</p>
          <p>Correct Answers: {answers.filter((answer) => answer.isCorrect).length}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentQuestionZustand;
