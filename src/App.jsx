// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentQuestionZustand from './components/CurrentQuestionZustand';
import QuizSummary from './components/QuizSummary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CurrentQuestionZustand />} />
        <Route path="/summary" element={<QuizSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
