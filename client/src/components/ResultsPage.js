import { useState, useEffect } from "react";

export default function ResultsPage({ testObjects, score }) {
  console.log(score.current);
  return (
    <div className="resultsPage">
      <div className="scorePanel">
        <div className="scoreCard"></div>
      </div>
      <h1>Rendered</h1>
    </div>
  );
}
