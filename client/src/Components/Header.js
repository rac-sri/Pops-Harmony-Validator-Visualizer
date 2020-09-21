import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "blue",
          height: "10vh",
          display: "flex",
          padding: "1vw",
        }}
      >
        <img
          src="logo.svg"
          style={{
            maxHeight: "100%",
            diplay: "block",
            position: "relative",
            left: "15%",
          }}
        />
        <div
          style={{
            maxHeight: "100%",
            diplay: "block",
            position: "relative",
            left: "55%",
            top: "30%",
          }}
        >
          <Button variant="contained" color="default">
            <Link to="/">DashBoard</Link>
          </Button>
          <Button variant="contained" color="default">
            <Link to="/individual">Individual</Link>
          </Button>
          <Button variant="contained" color="default">
            <Link to="/game">Game</Link>
          </Button>
        </div>
      </div>

      <br />
      <br />
    </>
  );
};

export default Header;
