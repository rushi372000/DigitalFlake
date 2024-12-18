import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      login(response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const styles = {
    outer: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    inner: {
      width: "660px",
      border: "1px solid #9f9f9f",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      padding: "2rem",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      width: "238px",
      height: "auto",
      marginBottom: "1.5rem",
    },
    welcomeText: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#000000",
      marginBottom: "2rem",
      textAlign: "center",
    },
    inputField: {
      width: "100%",
      height: "58px",
      border: "1px solid #9f9f9f",
      borderRadius: "5px",
      fontSize: "1rem",
      padding: "0.75rem",
      marginBottom: "1.5rem",
    },
    forgotPassword: {
      fontSize: "1rem",
      color: "#5c218b",
      fontWeight: "500",
      textDecoration: "none",
      display: "block",
      textAlign: "right",
      marginBottom: "1.5rem",
      cursor: "pointer",
    },
    loginButton: {
      width: "100%",
      height: "58px",
      borderRadius: "5px",
      backgroundColor: "#5c218b",
      color: "#ffffff",
      fontSize: "1.2rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    modalContent: {
      textAlign: "center",
      padding: "2rem",
    },
    modalTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#5c218b",
      marginBottom: "1rem",
    },
    modalButton: {
      backgroundColor: "#5c218b",
      border: "none",
      borderRadius: "5px",
      padding: "0.75rem 1.5rem",
      color: "#ffffff",
      fontWeight: "500",
    },
    modalInput: {
      width: "100%",
      height: "50px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginBottom: "1rem",
      padding: "0.5rem",
    },
    backToLogin: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      color: "#666",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  return (
    <>
      <div style={styles.outer}>
        <div style={styles.inner}>
          <div className="text-center">
            <img
              src="./HomePage.png"
              alt="Digitalflake Logo"
              style={styles.logo}
            />
            <p style={styles.welcomeText}>Welcome to Digitalflake admin</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email-id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.inputField}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.inputField}
              />
            </div>

            {/* Forgot Password Link */}
            <div>
              <span style={styles.forgotPassword} onClick={handleShow}>
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                style={styles.loginButton}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#4a1a6e")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#5c218b")}
              >
                Log In
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div
              style={{ color: "red", marginTop: "1rem", textAlign: "center" }}
            >
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Forgot Password */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body style={styles.modalContent}>
          <h5 style={styles.modalTitle}>Did you forget password?</h5>
          <p>
            Enter your email address and we’ll send you a link to restore
            password
          </p>
          <input
            type="email"
            placeholder="Email Address"
            style={styles.modalInput}
          />
          <Button style={styles.modalButton}>Request reset link</Button>
          <div style={styles.backToLogin} onClick={handleClose}>
            Back to log in
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;