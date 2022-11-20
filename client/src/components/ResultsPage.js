import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ResultsPage({ testObjects, score, wrongQuestions, correctQuestions }) {
  const [keywords, setKeywords] = useState([]);
  const [correctKeywords, setCorrectKeywords] = useState([]);
  const [ytLinks, setYtLinks] = useState([]);
  // keywords is [ of arrays basically...] to get term: correctKeywords[0][index].parsed_value

  const keywordRef = useRef(false);
  const youtubeRef = useRef(false);


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
      .catch(err => console.log(err));

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
      .catch(err => console.log(err));
    }
  }

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
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (keywordRef.current) return;
    keywordRef.current = true;
    fetchData();
  },[])

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
