import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Billboard from "./Billboard";
import Dashboard from "./Dashboard"; // Import the Dashboard component

const Home = () => {
  const navigate = useNavigate();
  const shopId = localStorage.getItem("shopId");

  return (
    <div>
      {shopId ? (
        <Dashboard /> // Replace with the actual shop name if needed
      ) : (
        <Billboard />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  button: {
    fontSize: "1.25rem",
    padding: "15px 30px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
