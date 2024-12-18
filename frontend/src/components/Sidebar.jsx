import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";

// Sidebar Component
const Sidebar = ({ setSelectedPage }) => {
  const [activeButton, setActiveButton] = useState("Home");

  const handleButtonClick = (page) => {
    setSelectedPage(page);
    setActiveButton(page);
  };

  // Managing   button style
  const getButtonStyle = (page) => {
    return activeButton === page
      ? { backgroundColor: "#F4EDAF" } // Active
      : { backgroundColor: "#F4F4F4" }; // Default
  };

  const getIconColor = (page) => {
    return activeButton === page ? "black" : "grey";
  };

  return (
    <div className="d-flex flex-column p-3">
      <div
        className="home d-flex justify-content-between p-1"
        style={getButtonStyle("Home")}
        onClick={() => handleButtonClick("Home")}
      >
        <img
          src="/HomeIcon.png"
          alt="Home Icon"
          style={{ width: "42px", height: "42px", top: "154px", left: "34px" }}
        />
        <button className="btn mb-2">Home</button>
        <FaCaretRight
          style={{
            width: "26px",
            height: "40px",
            top: "162px",
            left: "344px",
            color: getIconColor("Home"),
          }}
        />
      </div>

      <div
        className="home d-flex justify-content-between p-1"
        style={getButtonStyle("Roles")}
        onClick={() => handleButtonClick("Roles")}
      >
        <img
          src="/RolesIcon.png"
          alt="Roles Icon"
          style={{ width: "42px", height: "42px", top: "154px", left: "34px" }}
        />
        <button className="btn mb-2">Roles</button>
        <FaCaretRight
          style={{
            width: "26px",
            height: "40px",
            top: "162px",
            left: "344px",
            color: getIconColor("Roles"),
          }}
        />
      </div>

      <div
        className="home d-flex justify-content-between p-1"
        style={getButtonStyle("Users")}
        onClick={() => handleButtonClick("Users")}
      >
        <img
          src="/UserIcon.png"
          alt="User Icon"
          style={{ width: "42px", height: "42px", top: "154px", left: "34px" }}
        />
        <button className="btn">Users</button>
        <FaCaretRight
          style={{
            width: "26px",
            height: "40px",
            top: "162px",
            left: "344px",
            color: getIconColor("Users"),
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
