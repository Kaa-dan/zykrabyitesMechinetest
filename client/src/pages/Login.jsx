import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign",
        formData
      );
      console.log(response);
      if (response.status === 200) navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      console.error(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        value={formData.email}
        type="text"
        style={styles.input}
      />
      <input
        name="password"
        onChange={handleChange}
        value={formData.password}
        type="password"
        placeholder="Password"
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button onClick={loginHandler} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "300px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "320px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
