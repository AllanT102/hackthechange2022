import { useState, useEffect, useRef } from "react";
import "../styles/testPanelStyles.css";
import { useNavigate } from "react-router-dom";
import rightArrow from "../images/rightArrow.png";
import leftArrow from "../images/leftArrow.png";

export default function TestPanel({ testObjects, handleAnswer, setWrongQuestions, wrongQuestions, correctQuestions, setCorrectQuestions }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  const questionsRef = useRef();

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
    <div className="testPanel">
      <div className="arrowsPanel">
        <img src={leftArrow} onClick={subtract} />
        <div className="questionsPanel">
          <h2>{testObjects[questionNumber].question}</h2>
        </div>
        <img src={rightArrow} onClick={add} />
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
  );
}
