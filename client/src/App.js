import Axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import Table from "./Components/Table";
import axios from "axios";
import { TextField, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const Validator = React.lazy(() => import("./Components/pvavalidator"));

function App() {
  const [value, updateValue] = useState("");
  const [tableData, updateTableData] = useState([]);
  const [collection, updateCollection] = useState({});
  const [snackbar, viewSnackBar] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:5000/result/uptime`);
      updateTableData(data);
    };
    fetchData();
  }, []);

  const fetchDataByPVA = async () => {
    const data = await axios.get(`http://localhost:5000/pvauser/${value}/`);
    if (data.status == 200) updateCollection(data.data);
    else viewSnackBar(true);
  };

  const handleClose = () => {
    viewSnackBar(false);
  };

  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "blue",
          height: "10vh",
          textAlign: "center",
        }}
      >
        <img src="logo.svg" style={{ maxHeight: "100%", diplay: "block" }} />
      </div>
      <br />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          width: "20vw",
          position: "relative",
          left: "40vw",
          flexDirection: "column",
        }}
      >
        <TextField
          id="outlined-basic"
          label="PVA Address"
          variant="outlined"
          value={value}
          onChange={(e) => {
            updateValue(e.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          href="#contained-buttons"
          onClick={() => fetchDataByPVA()}
        >
          Search
        </Button>
      </div>

      <br />
      {Object.keys(collection).length != 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Validator data={collection} />
        </Suspense>
      )}
      <br />
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          This is an error message!
        </Alert>
      </Snackbar>
      <br />
      <br />
      <Table data={tableData} />
    </div>
  );
}

export default App;
