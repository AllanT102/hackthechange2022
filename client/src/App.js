import "./App.css";
import StartPanel from "./components/startPanel";
import axios from "axios"
import { useEffect, useState } from "react";

function App() {
  const [textObj, setTextObj] = useState();
  useEffect(() => {
    axios.get("http://localhost:3001/getQuizData")
    .then((res) =>{
      setTextObj(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  console.log(textObj);
  return (
    <div>
      <StartPanel />
    </div>
  );
}

export default App;
