import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Registration";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import React from "react";
import CreateShop from "./create-shop";
import Dashboard from "./Dashboard";

function App() {
  let initialState = {
    isLoggedIn: false,
    userName: "",
  };

  if (localStorage.getItem("userName")) {
    initialState.isLoggedIn = true;
    initialState.userName = localStorage.getItem("userName");
  }

  const [state, setState] = React.useState(initialState);
  return (
    <Router>
      <div className="App">
        <Navbar state={state} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setState={setState} />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
