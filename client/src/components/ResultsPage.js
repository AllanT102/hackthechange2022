import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/resultsPageStyles.css";
import { useNavigate } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';

export default function ResultsPage({
  testObjects,
  score,
  wrongQuestions,
  correctQuestions,
  setUserURL,
  handleStart,
  setWrongQuestions,
  setCorrectQuestions,
  setTestObjects,
  resetScore,
  setCanRenderTest
}) {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [correctKeywords, setCorrectKeywords] = useState([]);
  const [ytLinks, setYtLinks] = useState([]);
  const [canRender, setCanRender] = useState(false);
  // keywords is [ of arrays basically...] to get term: correctKeywords[0][index].parsed_value

  const keywordRef = useRef(false);
  const youtubeRef = useRef(false);

  const [embedId, setEmbedId] = useState("");

  const fetchData = () => {
    for (let i = 0; i < wrongQuestions.length; i++) {
      let data = new FormData();
      data.append("text", wrongQuestions[i]);
      axios({
        method: "post",
        url: "http://localhost:3001/getKeywords",
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          keywords.push(res.data[0].extractions[0].parsed_value);
          setKeywords([...keywords]);
          setCanRender(true);
        })
        .catch((err) => console.log(err));
    }
    for (let i = 0; i < correctQuestions.length; i++) {
      let data = new FormData();
      data.append("text", correctQuestions[i]);
      axios({
        method: "post",
        url: "http://localhost:3001/getKeywords",
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          correctKeywords.push(res.data[0].extractions[0].parsed_value);
          setCorrectKeywords([...correctKeywords]);
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchYTData = (termIdx) => {
    let data = new FormData();
    data.append("text", keywords[termIdx]);
    axios({
      method: "post",
      url: "http://localhost:3001/getYTLinks",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setEmbedId(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (keywordRef.current) return;
    keywordRef.current = true;
    fetchData();
  }, []);

  // console.log(keywords)

  const handleClick = (idx) => {
    fetchYTData(idx);
  }

  function handleChange(event) {
    setUserURL(event.target.value);
  }
  
  const resetAllStates = () => {
    setCorrectKeywords([]);
    setKeywords([]);
    setEmbedId("");
    setWrongQuestions([]);
    setCorrectQuestions([]);
    resetScore();
    setCanRenderTest(true);
    // setTestObjects([]);
  }

  return (
    <div className="resultsPage">
      <div className="scorePanel">
        <div className="scoreCard">
          <h1>{Math.floor((score.current * 100) / testObjects.length)}%</h1>
        </div>
        <h2>
          Great job! You answered {score.current} out of {testObjects.length}{" "}
          questions correctly!
        </h2>
      </div>
      <div className="wordsPanel">
        <div className="bestWordsPanel">
          <h2>It seems you have these terms down:</h2>
          <div className="bestWords">
            {correctKeywords.map((word, idx) => (
              <div className="correctWord" key={idx}>{word}</div>
            ))}
          </div>
              <div className="replayDiv">
                <div className="replaybtndiv">
                  <ReplayIcon onClick={() => {
                    resetAllStates();
                    handleStart();
                    navigate("/test");
                  }} 
                  sx={{
                    cursor: "pointer"
                  }}></ReplayIcon>
                  <h1 className="study-again">Study again</h1>
                </div>
                <div className="form">
                  <h2>Want to study a new quizlet?</h2>
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
                      resetAllStates();
                      handleStart();
                      navigate("/test");
                    }}
                  >
                    Start Testing
                  </button>
              </div>
            </div>

        </div>
        <div className="videoPanel">
          <h2>You might want to brush up on these:</h2>
          {
            
            <div className="keywordButtons">
            {keywords.map((word, idx) => (
              idx <= 4 && (
                <button
                className="keywordButton"
                id={idx}
                key={idx}
                onClick={() => handleClick(idx)}
              >
                {word}
              </button>
              ) 
            ))}
          </div>
          }
          <h1 className="descText">Click the terms to start learning!</h1>
          <div className="video-responsive">
            {embedId != "" && (
              <iframe
                width="360"
                height="250"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
