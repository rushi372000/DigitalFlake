import { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { FaArrowLeftLong } from "react-icons/fa6";

const AddUsers = ({ onClose }) => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    roleName: "",
    uploadImage: null,
    imagePreview: null,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        uploadImage: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRoleSelection = (role) => {
    setFormData((prev) => ({
      ...prev,
      roleName: role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("mobile", formData.mobile);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("roleName", formData.roleName);
      if (formData.uploadImage)
        form.append("uploadImage", formData.uploadImage);

      await axiosInstance.post("/users", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("User added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

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
          Add User
        </h3>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="mobile"
              className="form-control"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email-Id"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Role:</label>
            <div className="d-flex flex-column gap-2">
              {roles.map((role) => (
                <button
                  type="button"
                  key={role._id}
                  className={`btn ${
                    formData.roleName === role.name
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => handleRoleSelection(role.name)}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Image */}
          <div className="col-md-4">
            <label className="form-label">Upload Image:</label>
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
                className="form-control"
                name="uploadImage"
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
              border: "1px solid #9D9D9D",
              color: "white",
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
