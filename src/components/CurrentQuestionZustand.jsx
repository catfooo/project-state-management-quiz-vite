import React, { useState } from "react";
import useQuizStore from "../stores/useQuizStore"; // Adjust the path accordingly

const CurrentQuestionZustand = () => {
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  );
  const question = questions[currentQuestionIndex];

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

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
        checked={selectedAnswerIndex === index} // Check if this option is selected
        disabled={showResult}
      />
      <label>{option}</label>
    </div>
  ));

  return (
    <div className="managed-component">
      <h2>Using Zustand</h2>
      <h1>Question: {question.questionText}</h1>
      <form>
        {options}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent the form submission
            handleSubmit(); // Manually trigger the submit logic
          }}
          disabled={showResult}
        >
          Submit
        </button>
      </form>
      {showResult && (
        <p>
          {selectedAnswerIndex === question.correctAnswerIndex
            ? "Correct!"
            : `Wrong. The correct answer is: ${question.options[question.correctAnswerIndex]}`}
        </p>
      )}
    </div>
  );
};

export default CurrentQuestionZustand;
