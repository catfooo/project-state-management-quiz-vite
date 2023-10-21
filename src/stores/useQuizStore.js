import { create } from "zustand";

const questions = [
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

const useQuizStore = create((set) => ({
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,

  submitAnswer: (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    const isCorrect = question.correctAnswerIndex === answerIndex; // Check if the answer is correct

    set((state) => ({
      answers: [
        ...state.answers,
        {
          questionId,
          answerIndex,
          question,
          answer: question.options[answerIndex],
          // isCorrect: question.correctAnswerIndex === answerIndex,
          isCorrect,
        },
      ],
    }));
  },

  goToNextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        return { quizOver: true };
      } else {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
    });
  },

  restart: () => {
    set({
      answers: [],
      currentQuestionIndex: 0,
      quizOver: false,
    });
  },
}));

export default useQuizStore;
