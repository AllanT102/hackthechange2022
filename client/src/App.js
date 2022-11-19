import "./App.css";
import StartPanel from "./components/startPanel";
import axios from "axios"
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState();
  useEffect(() => {
    axios.get("http://localhost:3001/getQuizData")
    .then((res) =>{
      setText(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <StartPanel />
    </div>
  );
}

export default App;
