import { useState, useEffect } from "react";
import "../styles/startPanelStyles.css";
import { useNavigate } from "react-router-dom";

export default function StartPanel() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  function handleChange(event) {
    setUrl(event.target.value);
  }

  let disabled = url == 0;

  return (
    <div className="startPanel">
      <div className="form">
        <input
          type="text"
          placeholder="Enter a Quizlet URL..."
          className="form--input"
          name="url"
          value={url}
          onChange={handleChange}
        />
        <button
          className="submit"
          disabled={disabled}
          onClick={() => {
            navigate("/test");
          }}
        >
          Start Testing
        </button>
      </div>
    </div>
  );
}
