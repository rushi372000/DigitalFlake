import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axios";
import { FaArrowLeftLong } from "react-icons/fa6";

const UpdateUsers = ({ onClose, userId }) => {
  console.log("userId 5 => ", userId);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    roleName: "",
    status: "",
    uploadImage: null,
    imagePreview: null,
  });
  const [roles, setRoles] = useState([]); // For role selection
  const [loading, setLoading] = useState(true);

  // Fetch user data for pre-filling form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        const userData = response.data;
        setFormData({
          name: userData.name || "",
          mobile: userData.mobile || "",
          email: userData.email || "",
          roleName: userData.role.name || "",
          status: userData.status || "",
          password: "",
          uploadImage: null,
          imagePreview: userData.imageUrl || null,
        });

        // Fetch roles from dropdown
        const rolesResponse = await axiosInstance.get("/role");
        setRoles(rolesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        uploadImage: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("mobile", formData.mobile);
    formPayload.append("email", formData.email);
    formPayload.append("password", formData.password);
    formPayload.append("roleName", formData.roleName);
    formPayload.append("status", formData.status);
    if (formData.uploadImage) {
      formPayload.append("uploadImage", formData.uploadImage);
    }

    try {
      await axiosInstance.put(`/users/${userId}`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("User updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update the user. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container py-4">
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
          Update User
        </h3>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          {/* Name */}
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Name"
              required
            />
          </div>

          {/* Mobile */}
          <div className="col-md-4">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              placeholder="Mobile"
              required
            />
          </div>

          {/* Email */}
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Password */}
          <div className="col-md-4">
            <label className="form-label">Password (optional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
            />
          </div>

          {/* Role */}
          <div className="col-md-4">
            <label className="form-label">Role</label>
            <select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="col-md-4">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label">Upload Image</label>
            <div className="d-flex align-items-center gap-2">
              <div
                className="border rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                }}
              >
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="img-fluid"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <i
                      className="bi bi-person-fill"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                )}
              </div>
              <input
                type="file"
                name="uploadImage"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <small className="text-muted">Max size: 10MB</small>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{
              position: "absolute",
              width: "176px",
              height: "51px",
              top: "916px",
              left: "1030px",
              gap: "0px",
              borderRadius: "25px",
              color: "white",
              border: "1px solid #9D9D9D",
              background: "#767676",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
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
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUsers;