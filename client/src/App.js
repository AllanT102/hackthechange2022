import "./App.css";
import StartPanel from "./components/startPanel";
import axios from "axios"
import { useEffect, useState } from "react";

function App() {
  const [textObj, setTextObj] = useState();
  useEffect(() => {
    axios.post("http://localhost:3001/getYTLinks")
    .then((res) =>{
      setTextObj(res.data);
      console.log(res.data);
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
