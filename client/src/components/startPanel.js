import { useState, useEffect } from "react";
import "../styles/startPanelStyles.css";
import { useNavigate } from "react-router-dom";

export default function StartPanel({ handleStart, setUserURL }) {
  const navigate = useNavigate();

  function handleChange(event) {
    setUserURL(event.target.value);
  }


  return (
    <div className="startPanel">
      <div className="form">
        <input
          type="url"
          placeholder="Enter a Quizlet URL..."
          className="form--input"
          name="url"
          onChange={handleChange}
        />
        <button
          className="submit"
          onClick={(e) => {
            handleStart(e.target.value);
            navigate("/test");
          }}
        >
          Start Testing
        </button>
      </div>
    </div>
  );
}
