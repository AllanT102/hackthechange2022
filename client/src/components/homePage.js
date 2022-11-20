import React from "react";
import StartPanel from "./startPanel";
import "../styles/homePageStyles.css";

export default function HomePage({ handleStart, setUserURL }) {

  return (
    <div className="homePage">
      <div className="homePage--Logo">
        <h1>test.iq</h1>
      </div>
      <div className="homePage--Intro">
        <h2>Don't want to pay for subscriptions?</h2>
        <h1 className="smaller-text">Study for <b>FREE</b> with just a simple quizlet link</h1>
        <StartPanel handleStart={handleStart} setUserURL={setUserURL}/>
      </div>
    </div>
  );
}
