import React from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try {
      // backend logout API
      await axios.post("http://localhost:8080/api/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "25px",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <img
        src="./NavbarLogo.png"
        alt="Digitalflake logo"
        style={{ width: "296px", height: "46px" }}
      />

      {/* Profile Icon */}
      <CgProfile
        onClick={handleLogout} // event for logout
        style={{
          color: "white",
          width: "45px",
          height: "45px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Navbar;
