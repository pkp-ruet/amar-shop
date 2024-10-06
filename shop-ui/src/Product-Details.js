import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    GetProductDetails();
  }, []);

  const GetProductDetails = async () => {
    const token = localStorage.getItem("token");
    const tokenHeader = "Bearer " + token;

    try {
      const response = await fetch(
        `https://localhost:7118/api/Shop/get-product?productId=${productId}`,
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
      setProduct(data);
    } catch (error) {
      console.error("There was a problem with getting the product", error);
    }
  };

  if (!product) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.productCard}>
        <div style={styles.imageContainer}>
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
        </div>
        <div style={styles.productInfo}>
          <h1 style={styles.productName}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>Price: ${product.price}</p>
          <button style={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#f4f6f8",
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    maxWidth: "1000px",
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    maxHeight: "100%", // Ensure the image doesn’t overflow
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensure the image covers the full area
  },
  productInfo: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  productName: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.1rem",
    color: "#7f8c8d",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  price: {
    fontSize: "1.8rem",
    color: "#27ae60",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  addToCartButton: {
    padding: "15px 30px",
    fontSize: "1.2rem",
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    alignSelf: "start", // Align button to the left
    marginTop: "auto",
  },
  addToCartButtonHover: {
    backgroundColor: "#2980b9",
    transform: "scale(1.05)",
  },
  loading: {
    fontSize: "1.5rem",
    color: "#34495e",
  },
};

export default ProductDetails;
