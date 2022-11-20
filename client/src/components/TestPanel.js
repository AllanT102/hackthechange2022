import { useState, useEffect, useRef } from "react";
import "../styles/testPanelStyles.css";
import { useNavigate } from "react-router-dom";

export default function TestPanel({ testObjects, handleAnswer, setWrongQuestions, wrongQuestions, correctQuestions, setCorrectQuestions }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const questionsRef = useRef();

  useEffect(() => {
    function log() {
      console.log("unmounted");
    }
  });

  function add() {
    setQuestionNumber((prevQuestionNumber) => {
      return prevQuestionNumber + 1;
    });
    if (questionNumber >= testObjects.length - 1) navigate("/results");
    for (let i = 0; i < 4; i++) {
      questionsRef.current.children[i].style.background = "#e3efff";
    }
    setAnswered(false);
  }

  function subtract() {
    setQuestionNumber((prevQuestionNumber) =>
      prevQuestionNumber == 0 ? 0 : prevQuestionNumber - 1
    );
    for (let i = 0; i < 4; i++) {
      questionsRef.current.children[i].style.background = "#e3efff";
    }
    setAnswered(false);
  }

  function revealAnswer(event) {
    if (event.target.id == testObjects[questionNumber].correctA) {
      event.target.style.background = "green";
      setCorrectQuestions([...correctQuestions, testObjects[questionNumber].question]);
      handleAnswer();
    } else {
      event.target.style.background = "red";
      setWrongQuestions([...wrongQuestions, testObjects[questionNumber].question]);
    }
    questionsRef.current.children[
      testObjects[questionNumber].correctA
    ].style.background = "green";
    setAnswered(true);
  }

  return (
    isVisible && (
      <div className="testPanel">
        <div className="arrowsPanel">
          <button onClick={subtract}>Prev</button>
          <div className="questionsPanel">
            <h2>{testObjects[questionNumber].question}</h2>
          </div>
          <button onClick={add}>Next</button>
        </div>
        <div className="answersPanel" ref={questionsRef}>
          {testObjects[questionNumber].answers.map((answer, idx) => (
            <button
              className="answer"
              id={idx}
              key={idx}
              onClick={revealAnswer}
              disabled={answered}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    )
  );
}
