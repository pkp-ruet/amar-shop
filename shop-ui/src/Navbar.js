import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ state }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/home" style={styles.navItem}>
        Home
      </Link>
      <div style={styles.rightItems}>
        {state.isLoggedIn ? (
          <div style={styles.dropdownContainer}>
            <button onClick={toggleDropdown} style={styles.userButton}>
              {state.userName} <span style={styles.arrow}>&#9662;</span>
            </button>
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <Link to="/account-settings" style={styles.dropdownItem}>
                  Account Settings
                </Link>
                <Link to="/logout" style={styles.dropdownItem}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register" style={styles.navItem}>
              Register
            </Link>
            <Link to="/login" style={styles.navItem}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    backgroundColor: "#1F2937",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  rightItems: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navItem: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    padding: "8px 16px",
    transition: "background-color 0.3s ease",
    borderRadius: "4px",
  },
  userButton: {
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    fontSize: "18px",
    padding: "10px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease",
  },
  arrow: {
    marginLeft: "8px",
    fontSize: "12px",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "#374151",
    borderRadius: "8px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    overflow: "hidden",
  },
  dropdownItem: {
    display: "block",
    padding: "12px 20px",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
  dropdownItemHover: {
    backgroundColor: "#4B5563",
  },
};

export default Navbar;
