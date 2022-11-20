import { useState, useEffect, useRef } from "react";
import HomePage from "./components/homePage";
import { Routes, Route } from "react-router-dom";
import TestPanel from "./components/TestPanel";
import "./App.css";
import axios from "axios";
import ResultsPage from "./components/ResultsPage";

function App() {
  const [textObj, setTextObj] = useState();
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getQuizData")
      .then((res) => {
        setTextObj(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [testObjects, setTestObjects] = useState([
    {
      qNum: 0,
      question: "how did joe break his ligma?",
      answers: ["A", "B", "C", "D"],
      correctA: 1,
    },
    {
      qNum: 1,
      question: "how did yo mama break her suqma?",
      answers: ["0", "1", "2", "3"],
      correctA: 3,
    },
    {
      qNum: 2,
      question: "deez nuts?",
      answers: ["N", "U", "T", "S"],
      correctA: 0,
    },
  ]);
  const score = useRef(0);

  function handleAnswer() {
    score.current += 1;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/test"
          element={
            <TestPanel testObjects={testObjects} handleAnswer={handleAnswer} 
            setWrongQuestions={setWrongQuestions} wrongQuestions={wrongQuestions}
            setCorrectQuestions={setCorrectQuestions} correctQuestions={correctQuestions}/>
          }
        />
        <Route
          path="/results"
          element={<ResultsPage testObjects={testObjects} score={score} wrongQuestions={wrongQuestions} correctQuestions={correctQuestions}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
