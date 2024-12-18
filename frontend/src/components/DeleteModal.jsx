import React from "react";
import { IoIosWarning } from "react-icons/io";

// Delete Modal for delete Users & Roles
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          width: "350px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span
              style={{
                color: "red",
                fontSize: "36px",
                fontWeight: "bold",
                paddingRight: "10px",
                paddingBottom: "10px",
              }}
            >
              <IoIosWarning />
            </span>
            <h3 style={{ fontWeight: "bold", margin: "10px 0" }}>Delete</h3>
          </div>

          <p style={{ color: "#777" }}>Are you sure you want to delete?</p>
        </div>
        <div>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#FFF",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#662671",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
