import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import { FaArrowLeftLong } from "react-icons/fa6";

// Update Roles page
const UpdateRoles = ({ roleId, onClose }) => {
  const [roleData, setRoleData] = useState({ name: "", status: "Active" });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get(`/role/${roleId}`);
        setRoleData(response.data);
      } catch (error) {
        console.error("Error fetching role details:", error);
      }
    };
    if (roleId) fetchRole();
  }, [roleId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/role/${roleId}`, roleData);
      alert("Role updated successfully.");
      onClose();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <FaArrowLeftLong onClick={onClose} />
        <h3 style={{ marginLeft: "10px", marginTop: "-8px" }}>Edit Role</h3>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Role Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Admin"
            value={roleData.name}
            onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            placeholder="Active"
            value={roleData.status}
            onChange={(e) =>
              setRoleData({ ...roleData, status: e.target.value })
            }
          >
            {console.log("roleData => ", roleData)}
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary me-2"
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
          Update
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
    </div>
  );
};

export default UpdateRoles;
