import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./Add-Product"; // Import the new AddProduct component
import { FaTrashAlt } from "react-icons/fa"; // Import a delete icon

const Dashboard = ({}) => {
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const shopName = localStorage.getItem("shopName");
  useEffect(() => {
    GetProducts();
  }, []);

  const GetProducts = async () => {
    const shopId = localStorage.getItem("shopId");
    const token = localStorage.getItem("token");
    const tokenHeader = "Bearer " + token;
    try {
      const response = await fetch(
        `https://localhost:7118/api/Shop/get-products?shopId=${shopId}`,
        {
          method: "Get",
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

  const handleAddProduct = async (newProduct) => {
    setProducts([...products, newProduct]);
    const body = JSON.stringify(newProduct);
    const token = localStorage.getItem("token");
    const tokenHeader = "Bearer " + token;

    try {
      const response = await fetch(
        "https://localhost:7118/api/Shop/add-product",
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
      console.log(data);
    } catch (error) {
      console.error("There was a problem with adding product", error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const DeleteProduct = async () => {
    const token = localStorage.getItem("token");
    const tokenHeader = "Bearer " + token;

    try {
      const response = await fetch(
        `https://localhost:7118/api/Shop/delete-product?productId=${productToDelete.id}`,
        {
          method: "Post",
          headers: {
            "Content-type": "application/json",
            Authorization: tokenHeader,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Response was not okay");
      }
      // Filter out the deleted product from the products list
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("There was a problem with deleting product", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.shopName}>{shopName}</h1>
      <div style={styles.dashboardContent}>
        <div style={styles.productTableContainer}>
          <h2 style={styles.tableTitle}>Your Products</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Product Name</th>
                <th style={styles.tableHeader}>Description</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{product.name}</td>
                  <td style={styles.tableCell}>{product.description}</td>
                  <td style={styles.tableCell}>${product.price}</td>
                  <td style={styles.tableCell}>
                    <FaTrashAlt
                      style={styles.deleteIcon}
                      onClick={() => handleDeleteClick(product)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.addProductSection}>
          <AddProduct onAddProduct={handleAddProduct} />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Are you sure you want to delete this product?</h2>
            <div style={styles.modalActions}>
              <button style={styles.modalButton} onClick={DeleteProduct}>
                Sure
              </button>
              <button
                style={styles.modalButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  shopName: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "30px",
  },
  dashboardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  productTableContainer: {
    flex: 2,
    marginRight: "20px",
  },
  tableTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  deleteIcon: {
    color: "red",
    cursor: "pointer",
  },
  addProductSection: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
  },
  modalActions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: "10px 20px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
