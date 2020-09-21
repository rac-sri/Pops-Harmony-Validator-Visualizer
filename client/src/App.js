import React, { useState, useEffect, Suspense } from "react";
import Table from "./Components/Table";
import axios from "axios";
import Header from "./Components/Header";
import Game from "./Components/Game";
import Individual from "./Components/Individual";
import { Router } from "@reach/router";
import "./App.css";

function App() {
  const [tableData, updateTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:5000/pvauser/getAll`);
      updateTableData(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Table data={tableData} path="/" default={true} />
        <Individual path="individual" />
        <Game path="/game" />
      </Router>
      <br />
    </div>
  );
}

export default App;
