import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/resultsPageStyles.css";

export default function ResultsPage({
  testObjects,
  score,
  wrongQuestions,
  correctQuestions,
}) {
  const [keywords, setKeywords] = useState([]);
  const [correctKeywords, setCorrectKeywords] = useState([]);
  const [ytLinks, setYtLinks] = useState([]);
  // keywords is [ of arrays basically...] to get term: correctKeywords[0][index].parsed_value

  const keywordRef = useRef(false);
  const youtubeRef = useRef(false);

  const [embedId, setEmbedId] = useState("");

  function showVideo(event) {
    setEmbedId(videos[event.target.id].substring(32));
  }

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
          setKeywords([...keywords, res.data[0].extractions]);
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
          setCorrectKeywords([...correctKeywords, res.data[0].extractions]);
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchYTData = (termIdx) => {
    console.log(keywords);
    let data = new FormData();
    data.append("text", keywords[termIdx]);
    axios({
      method: "post",
      url: "http://localhost:3001/getYTLinks",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (keywordRef.current) return;
    keywordRef.current = true;
    fetchData();
  }, []);

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
          <h2>It seems you have these words down:</h2>
          <div className="bestWords">
            {correctKeywords.map((word) => (
              <div className="correctWord">{word}</div>
            ))}
          </div>
        </div>
        <div className="videoPanel">
          <h2>You might want to brush up on these:</h2>
          <div className="keywordButtons">
            {keywords.map((word, idx) => (
              <button
                className="keywordButton"
                id={idx}
                key={idx}
                onClick={showVideo}
              >
                {word}
              </button>
            ))}
          </div>
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
