import React, { useState, Suspense } from "react";
import axios from "axios";
import { TextField, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const Validator = React.lazy(() => import("./pvavalidator"));

export default function Individual() {
  const [value, updateValue] = useState("");
  const [collection, updateCollection] = useState({});
  const [snackbar, viewSnackBar] = useState(false);
  const fetchDataByPVA = async () => {
    const data = await axios.get(`/pvauser/${value}/`);
    if (data.status == 200) updateCollection(data.data);
    else viewSnackBar(true);
  };

  const handleClose = () => {
    viewSnackBar(false);
  };

  return (
    <div>
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
          color="#0a93eb"
          onClick={() => fetchDataByPVA()}
        >
          Search
        </Button>
      </div>
      <br />
      <br />
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
    </div>
  );
}
