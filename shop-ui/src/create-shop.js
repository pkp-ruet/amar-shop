import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const body = JSON.stringify(formData);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const tokenHeader = "Bearer " + token;
    try {
      const response = await fetch(
        "https://localhost:7118/api/Shop/create-shop",
        {
          method: "Post",
          headers: {
            "Content-type": "application/json",
            Authorization: tokenHeader,
          },
          body: body,
        }
      );
      if (!response.ok) {
        throw new Error("Response was not okay");
      }
      const data = await response.json();
      localStorage.setItem("shopId", data.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("There was a problem with creating shop", error);
    }
    // Perform any API requests or further logic here.
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Your Shop</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="Name"
          placeholder="Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="Description"
          placeholder="Shop Details"
          value={formData.shopDetails}
          onChange={handleChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Create Shop
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    backgroundColor: "#f7f7f7",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    gap: "20px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "15px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.3s ease",
  },
  textarea: {
    padding: "15px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.3s ease",
    resize: "none",
    height: "150px",
  },
  button: {
    padding: "15px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default CreateShop;
