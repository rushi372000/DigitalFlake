import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import { FaArrowLeftLong } from "react-icons/fa6";

// Add Roles page
const AddRoles = ({ onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/role", {
        name: roleName,
      });

      setSuccess("Role added successfully!");
      setRoleName("");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding role.");
    }
  };

  return (
    <div className="p-4">
      <div style={{ display: "flex" }}>
        <FaArrowLeftLong onClick={onClose} />
        <h3
          style={{
            height: 36,
            top: 138,
            left: 424,
            marginLeft: "10px",
            marginTop: "-8px",
          }}
        >
          Add Role
        </h3>
      </div>

      {/* Form for Adding Role */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="form-control"
            placeholder="Enter role name"
            required
            style={{
              width: "317px",
              height: "61px",
              top: "210px",
              left: "389px",
              gap: "0px",
              border: "1px 0px 0px 0px",
              opacity: "0px",
              borderRadius: "20px",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn me-2"
          style={{
            position: "absolute",
            width: "176px",
            height: "51px",
            top: "916px",
            left: "1237px",
            gap: "0px",
            borderRadius: "25px",
            background: "#662671",
            color: "white",
            border: "1px solid #662671",
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{
            position: "absolute",
            width: "176px",
            height: "51px",
            top: "916px",
            left: "1030px",
            gap: "0px",
            borderRadius: "25px",
            border: "1px solid #9D9D9D",
            background: "#767676",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </form>

      {/* Success/Error Messages */}
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddRoles;
