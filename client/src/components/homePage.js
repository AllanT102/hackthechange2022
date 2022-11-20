import React from "react";
import StartPanel from "./startPanel";
import "../styles/homePageStyles.css";

export default function HomePage() {
  return (
    <div className="homePage">
      <div className="homePage--Logo">
        <h1>Project Name</h1>
      </div>
      <div className="homePage--Intro">
        <h2>Test yourself on any Quizlet with just the URL!</h2>
        <StartPanel />
      </div>
    </div>
  );
}
