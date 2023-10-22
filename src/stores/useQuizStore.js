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
    questionText:
      "när åt du lunch?",
    options: ["12", "1", "2", "nej"],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    questionText:
      "varför måste du plugga?",
    options: ["för att slippa dåliga händelser", "eftersom jag är intresserad", "för att använda kunskaper senare", "jag vet inte"],
    correctAnswerIndex: 3,
  },
  {
    id: 5,
    questionText:
      "vad är din katts nämn",
    options: ["katt", "katter", "felix", "hund"],
    correctAnswerIndex: 1,
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

    set((state) => ({
      answers: [
        ...state.answers,
        {
          questionId,
          answerIndex,
          question,
          answer: question.options[answerIndex],
          isCorrect: question.correctAnswerIndex === answerIndex,
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
 