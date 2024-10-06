import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setState }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    try {
      const response = await fetch("https://localhost:7118/api/User/login", {
        method: "Post",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error("Response was not okay");
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("token", data.token);
      if (data.hasShop) {
        localStorage.setItem("shopId", data.shopId);
        localStorage.setItem("shopName", data.shopName);
      }

      const newState = {
        isLoggedIn: true,
        userName: data.userName,
      };
      setState((previousState) => ({
        ...previousState,
        ...newState,
      }));

      navigate("/home");
    } catch (error) {
      console.error("There was a problem with registration", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
