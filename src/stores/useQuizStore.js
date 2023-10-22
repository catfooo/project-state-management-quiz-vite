import create from 'zustand';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';
import image5 from '../assets/5.jpg';

const questions = [
  {
    id: 1,
    questionText: 'Who set the Olympic record for the 100m dash in 2012?',
    options: ['Usain Bolt', 'Justin Gatlin', 'Tyson Gay', 'Asafa Powell'],
    correctAnswerIndex: 0,
    image: image1,
  },
  {
    id: 2,
    questionText: 'When was Michael Phelps last named male World Swimmer of the Year?',
    options: ['2012', '2014', '2016', '2018'],
    correctAnswerIndex: 2,
    image: image2,
  },
  {
    id: 3,
    questionText: 'När åt du lunch?',
    options: ['12', '1', '2', 'Nej'],
    correctAnswerIndex: 2,
    image: image3,
  },
  {
    id: 4,
    questionText: 'Varför måste du plugga?',
    options: ['För att slippa dåliga händelser', 'Eftersom jag är intresserad', 'För att använda kunskaper senare', 'Jag vet inte'],
    correctAnswerIndex: 3,
    image: image4,
  },
  {
    id: 5,
    questionText: 'Vad är din katts namn?',
    options: ['Katt', 'Katter', 'Felix', 'Hund'],
    correctAnswerIndex: 1,
    image: image5,
  },
];

const useQuizStore = create((set) => ({
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,

  submitAnswer: (questionId, answerIndex) => {
    set((state) => {
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          'Could not find the question! Check to make sure you are passing the question id correctly.'
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      return {
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
      };
    });
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

  setQuizOver: (value) => {
    set((state) => ({
      quizOver: value,
    }));
  },
}));

export default useQuizStore;
