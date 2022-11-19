import { useState, useEffect } from "react";
import "../styles/startPanelStyles.css";

export default function StartPanel() {
  return (
    <div className="startPanel">
      <div className="startPanelText">
        <h2>Start Testing On Any Quizlet!</h2>
        <p>Paste a Quizlet URL to start testing</p>
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Paste a Quizlet URL..."
          className="form--input"
          //   name="name"
          //   value={clientDetails.name}
          //   onChange={handleChange}
        />
      </div>
    </div>
  );
}
