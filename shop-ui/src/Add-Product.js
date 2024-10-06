import React, { useState } from "react";

const AddProduct = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    shopId: localStorage.getItem("shopId"),
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      onAddProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        shopId: localStorage.getItem("shopId"),
      });
      setError(""); // Clear any previous errors
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div style={styles.addProductContainer}>
      <h2 style={styles.addProductTitle}>Add Product</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="description"
        placeholder="Product Description"
        value={newProduct.description}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleChange}
        style={styles.input}
      />
      <button style={styles.addButton} onClick={handleAddProduct}>
        Add
      </button>
    </div>
  );
};

const styles = {
  addProductContainer: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  addProductTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  addButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default AddProduct;
