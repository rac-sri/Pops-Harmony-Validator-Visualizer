import Axios from "axios";
import React, { useState, useEffect} from "react";
import Table from "./Components/Table";
import axios from 'axios';

function App() {
  const [value,updateValue] = useState("");
  useEffect(()=>{
    async function fetchData(()=>{
      const data = await axios.get(`localhost/${value}/results/uptime`);
      console.log(data)
      updateValue(data);
    })    
    fetchData();

  },[]);

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
