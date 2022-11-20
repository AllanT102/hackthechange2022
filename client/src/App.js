import { useState, useEffect } from "react";
import HomePage from "./components/homePage";
import { Routes, Route } from "react-router-dom";
import TestPanel from "./components/TestPanel";
import "./App.css";
import StartPanel from "./components/startPanel";
import axios from "axios"
import { useEffect, useState } from "react";

function App() {
  const [textObj, setTextObj] = useState();
  useEffect(() => {
    axios.get("http://localhost:3001/getQuizData")
    .then((res) =>{
      setTextObj(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

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
      answers: ["N", "U", "a", "S"],
      correctA: 0,
    },
  ]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPanel testObjects={testObjects} />} />
      </Routes>
    </div>
  );
}

export default App;
