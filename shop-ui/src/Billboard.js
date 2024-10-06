import React from "react";
import { useNavigate } from "react-router-dom";

const Billboard = () => {
  const navigate = useNavigate();

  const handleCreateShopClick = () => {
    navigate("/create-shop");
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>Create Your Own Online Shop</h1>
        <h1 style={styles.subHeading}>And make your dream come true.</h1>
        <button style={styles.button} onClick={handleCreateShopClick}>
          Create a Shop
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
    backgroundColor: "#f4f4f4", // Light background for contrast
    padding: "20px",
  },
  textContainer: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: "1.75rem",
    marginBottom: "30px",
    color: "#555",
  },
  button: {
    fontSize: "1.25rem",
    padding: "15px 30px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    display: "inline-block",
  },
};

export default Billboard;
