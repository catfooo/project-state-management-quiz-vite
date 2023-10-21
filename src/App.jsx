import React, { useState } from "react";
import "./App.css"

const quizData = [
  {
    id: 1,
    questionText: "Who set the Olympic record for the 100m dash in 2012?",
    options: ["Usain Bolt", "Justin Gatlin", "Tyson Gay", "Asafa Powell"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText:
      "When was Michael Phelps last named male World Swimmer of the Year?",
    options: ["2012", "2014", "2016", "2018"],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    questionText: "Vilka mat älskar katter mest",
    options: ["fiskar", "kycklingar", "oster", "frukter"],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    questionText: "hur länge bodde din katt",
    options: ["15 år", "20 år", "25 år", "mer än 25 år"],
    correctAnswerIndex: 3,
  },
  {
    id: 5,
    questionText: "hade din katt barn, om so, hur många?",
    options: ["nej", "mindre 5", "5-15", "mer än 15"],
    correctAnswerIndex: 2,
  },
];

function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // New state to track selected answer

  const handleAnswerSubmit = (selectedAnswerIndex) => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < quizData.length) {
      const currentQuestion = quizData[currentQuestionIndex];
      const isCorrect =
        currentQuestion.correctAnswerIndex === selectedAnswerIndex;

      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          selectedAnswerIndex,
          isCorrect,
        },
      ]);

      setSelectedAnswer(selectedAnswerIndex); // Update the selected answer

      // Move to the next question or mark the quiz as completed.
      if (currentQuestionIndex + 1 < quizData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setSelectedAnswer(null); // Reset selected answer
  };

  // Calculate current question number and total number of questions
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = quizData.length;

  // Calculate the number of correct and incorrect answers
  const numCorrectAnswers = userAnswers.filter((answer) => answer.isCorrect)
    .length;
  const numIncorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect)
    .length;

  return (
    <div className="quiz-app">
      {quizCompleted ? (
        <div>
          <h1>Quiz Completed!</h1>
          <h2>Your Results:</h2>
          <ul>
            {userAnswers.map((answer, index) => (
              <li key={index}>
                Question {index + 1}:{" "}
                {answer.isCorrect ? "Correct" : "Incorrect"}
              </li>
            ))}
          </ul>
          <p>
            Correct Answers: {numCorrectAnswers} / {totalQuestions}
          </p>
          <p>
            Incorrect Answers: {numIncorrectAnswers} / {totalQuestions}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        currentQuestionIndex >= 0 &&
        currentQuestionIndex < quizData.length && (
          <div>
            <h1>Question {currentQuestionNumber}</h1>
            <h2>{quizData[currentQuestionIndex].questionText}</h2>
            <ul>
              {quizData[currentQuestionIndex].options.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleAnswerSubmit(index)}
                    className={
                      selectedAnswer !== null &&
                      selectedAnswer === index &&
                      quizData[currentQuestionIndex].correctAnswerIndex ===
                        index
                        ? "correct-answer"
                        : selectedAnswer !== null &&
                          selectedAnswer === index
                        ? "incorrect-answer"
                        : ""
                    }
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            {/* Display feedback to the user */}
            {selectedAnswer !== null && (
              <p>
                {userAnswers[userAnswers.length - 1].isCorrect
                  ? "Correct!"
                  : "Incorrect!"}
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default QuizApp;
