// import { CurrentQuestionUseContext } from "./components/CurrentQuestionUseContext";
import { CurrentQuestionZustand } from "./components/CurrentQuestionZustand";
import { QuizProvider } from "./context/QuizContext";

export const App = () => {
  return (
    <QuizProvider>
      <div>
        {/* <CurrentQuestionUseContext /> */}
        <CurrentQuestionZustand />
      </div>
    </QuizProvider>
  );
};
