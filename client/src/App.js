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
  
  const [testObjects, setTestObjects] = useState([]);
  const [canRenderTest, setCanRenderTest] = useState(false);
  const [userURL, setUserURL] = useState("");
  const score = useRef(0);

  function handleStart() {
    let data = new FormData();
    data.append("text", userURL)
    axios({
      method: "post",
      url: "http://localhost:3001/getQuizData",
      data: data,
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        setTestObjects(res.data.tests);
        setCanRenderTest(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAnswer() {
    score.current += 1;
  }

  function resetScore() {
    score.current = 0;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage handleStart={handleStart} setUserURL={setUserURL}/>} />
        {canRenderTest && (
        <Route
          path="/test"
          element={
            <TestPanel testObjects={testObjects} handleAnswer={handleAnswer} 
            setWrongQuestions={setWrongQuestions} wrongQuestions={wrongQuestions}
            setCorrectQuestions={setCorrectQuestions} correctQuestions={correctQuestions}/>
          }
        />
        )}

        <Route
          path="/results"
          element={<ResultsPage testObjects={testObjects} score={score} 
          wrongQuestions={wrongQuestions} correctQuestions={correctQuestions} 
          setUserURL={setUserURL} handleStart={handleStart}
          setWrongQuestions={setWrongQuestions}
          setCorrectQuestions={setCorrectQuestions}
          setTestObjects={setTestObjects}
          resetScore={resetScore}
          setCanRenderTest={setCanRenderTest}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
