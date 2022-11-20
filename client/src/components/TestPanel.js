import { useState, useEffect } from "react";
import "../styles/testPanelStyles.css";

export default function TestPanel({ testObjects }) {
  const [questionNumber, setQuestionNumber] = useState(0);

  function add() {
    setQuestionNumber((prevQuestionNumber) =>
      prevQuestionNumber == testObjects.length - 1
        ? testObjects.length - 1
        : prevQuestionNumber + 1
    );
  }

  function subtract() {
    setQuestionNumber((prevQuestionNumber) =>
      prevQuestionNumber == 0 ? 0 : prevQuestionNumber - 1
    );
  }

  return (
    <div className="testPanel">
      <div className="arrowsPanel">
        <button onClick={subtract}></button>
        <div className="questionsPanel">
          <h2>{testObjects[questionNumber].question}</h2>
        </div>
        <button onClick={add}></button>
      </div>
      <div className="answersPanel">
        {testObjects[questionNumber].answers.map((answer) => (
          <div className="answer">{answer}</div>
        ))}
      </div>
    </div>
  );
}
