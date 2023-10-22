import React from 'react';
import CurrentQuestionZustand from './components/CurrentQuestionZustand';
import useQuizStore from './stores/useQuizStore';

const App = () => {
  const quizOver = useQuizStore((state) => state.quizOver);

  return (
    <div>
      {quizOver ? (
        <div className="summary-screen">
          
          <CurrentQuestionZustand /> {/* Display the summary screen */}
        </div>
      ) : (
        <CurrentQuestionZustand /> 
      )}
    </div>
  );
};

export default App;
