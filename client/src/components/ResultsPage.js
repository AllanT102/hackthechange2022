import { useState, useEffect } from "react";
import "../styles/resultsPageStyles.css";

export default function ResultsPage({ testObjects, score }) {
  console.log(score.current);
  console.log(testObjects.length);
  console.log(score.current / testObjects.length);
  return (
    <div className="scorePanel">
      <div className="scoreCard">
        <h1>{Math.floor((score.current * 100) / testObjects.length)}%</h1>
      </div>
      <h2>
        Great job! You answered {score.current} out of {testObjects.length}{" "}
        questions correctly!
      </h2>
    </div>
  );
}
