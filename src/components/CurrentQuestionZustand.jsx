import React, { useState } from "react";
import useQuizStore from "../stores/useQuizStore";

export const CurrentQuestionZustand = () => {
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const question = questions[currentQuestionIndex];
  const quizOver = useQuizStore((state) => state.quizOver);
  const goToNextQuestion = useQuizStore((state) => state.goToNextQuestion);
  const submitAnswer = useQuizStore((state) => state.submitAnswer);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsAnswerCorrect(null); // Reset the correctness message when the user selects a new option.
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null && !quizOver) {
      const selectedOptionIndex = parseInt(selectedOption, 10);
      const isCorrect = question.correctAnswerIndex === selectedOptionIndex;

      // Submit the selected option as the answer
      submitAnswer(question.id, selectedOptionIndex);

      // Set the correctness message
      setIsAnswerCorrect(isCorrect);

      // Move to the next question
      setSelectedOption(null);
      goToNextQuestion();
    }
  };

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div className="managed-component">
      <h2>Using Zustand</h2>
      <h1>Question: {question.questionText}</h1>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answerOptions"
                value={index}
                checked={selectedOption === index.toString()}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      {selectedOption !== null && (
        <p>
          {isAnswerCorrect
            ? "Correct! Well done!"
            : "Incorrect. Please try again."}
        </p>
      )}
      <div>
        {quizOver ? (
          <p>Quiz is over!</p>
        ) : (
          <button onClick={handleNextQuestion}>Next Question</button>
        )}
      </div>
    </div>
  );
};
