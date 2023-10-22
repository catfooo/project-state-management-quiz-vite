// App.js
import React from 'react';
import CurrentQuestionZustand from './components/CurrentQuestionZustand';
import useQuizStore from './stores/useQuizStore';

const App = () => {
  const quizOver = useQuizStore((state) => state.quizOver);

  return (
    <div>
      {quizOver ? (
        <CurrentQuestionZustand /> // Display the summary screen
      ) : (
        <CurrentQuestionZustand /> // Display the current question
      )}
    </div>
  );
};

export default App;