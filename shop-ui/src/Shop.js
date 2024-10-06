import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Shop = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetProducts();
  }, []);

  const GetProducts = async () => {
    const token = localStorage.getItem("token");
    const tokenHeader = "Bearer " + token;
    try {
      const response = await fetch(
        `https://localhost:7118/api/Shopping/get-products?shopId=${shopId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: tokenHeader,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Response was not okay");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("There was a problem with get products", error);
    }
  };

  if (products.length === 0) {
    return <div style={styles.loading}>Loading products...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shop Products</h1>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={styles.productImage}
            />
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productDescription}>{product.description}</p>
            <p style={styles.productPrice}>${product.price}</p>
            <button style={styles.addToCartButton}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "40px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  productCardHover: {
    transform: "scale(1.05)",
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  productName: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#34495e",
    marginBottom: "10px",
  },
  productDescription: {
    fontSize: "1rem",
    color: "#7f8c8d",
    marginBottom: "15px",
    textAlign: "justify",
  },
  productPrice: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: "15px",
  },
  addToCartButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s, transform 0.3s",
    "&:hover": {
      backgroundColor: "#2980b9",
      transform: "scale(1.05)",
    },
  },
  loading: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#7f8c8d",
    marginTop: "100px",
  },
};

export default Shop;
