import { useState, useEffect } from "react";

export default function ResultsPage({ testObjects, score }) {
  console.log(score.current);
  console.log(testObjects.length);
  console.log(score.current / testObjects.length);
  return (
    <div className="resultsPage">
      <div className="scorePanel">
        <div className="scoreCard">
          <h1>{(score.current * 100) / testObjects.length}%</h1>
        </div>
      </div>
    </div>
  );
}
