import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const getUserHandler = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/info");
      setUser(response.data);
      console.log(response);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome Home</h2>
      {user ? (
        <div style={styles.userInfo}>
          <p>Email: {user.email}</p>
          {/* Add more user information as needed */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      {error && <p style={styles.error}>{error}</p>}
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
  userInfo: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    width: "300px",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
};

export default Home;
