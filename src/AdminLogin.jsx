import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";

function AdminLogin() {
  const { loginAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Please enter a valid 10 digit login ID");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8080/admin/login", {
        phone: phone,
      });

      console.log("Login Response:", response.data);

      // Store admin in AuthContext
      loginAdmin(response.data);

      alert("Admin login successful");
      // navigate("/admin-dashboard");
      navigate("/rduser");
    } catch (error) {
      console.error("Login Error:", error);

      let message = "Unable to connect to server";

      if (error.response) {
        message = error.response.data;
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <div>
            <div style={styles.logo}>₹</div>

            <h1 style={styles.brand}>RD System</h1>

            <p style={styles.tagline}>Safe Deposit | Better Tomorrow</p>
          </div>

          <div>
            <h2 style={styles.welcome}>Welcome Back</h2>

            <h2 style={styles.admin}>Administrator</h2>

            <p style={styles.description}>
              Securely login to the RD System administration panel and manage
              recurring deposit records.
            </p>
          </div>

          <div style={styles.features}>
            <span>✓ Secure Access</span>
            <span>₹ RD Management</span>
            <span>📊 Reports</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <div style={styles.formBox}>
            <div style={styles.badge}>ADMINISTRATOR LOGIN</div>

            <h2 style={styles.title}>Admin Login</h2>

            <p style={styles.subtitle}>
              Enter your registered login ID to continue
            </p>

            <form onSubmit={handleLogin}>
              <label style={styles.label}>login ID</label>

              <input
                type="tel"
                placeholder="Enter 10 login ID"
                value={phone}
                maxLength={10}
                required
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);

                  setPhone(value);
                }}
                style={styles.input}
              />

              <button type="submit" disabled={loading} style={styles.button}>
                {loading ? "Logging in..." : "Login →"}
              </button>
            </form>

            <p style={styles.security}>🔒 Secure Admin Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef4fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "25px",
    fontFamily: "Arial, sans-serif",
  },

  box: {
    width: "100%",
    maxWidth: "1050px",
    minHeight: "600px",
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    display: "flex",
    boxShadow: "0 10px 35px rgba(0,0,0,0.10)",
  },

  left: {
    width: "50%",
    background: "linear-gradient(145deg,#e8f3ff,#d9eaff)",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "13px",
    background: "#1769d1",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  brand: {
    color: "#143d76",
    fontSize: "30px",
    margin: "15px 0 3px",
  },

  tagline: {
    color: "#6c7f9b",
    fontSize: "13px",
  },

  welcome: {
    color: "#143d76",
    fontSize: "38px",
    margin: "0",
  },

  admin: {
    color: "#1769d1",
    fontSize: "38px",
    margin: "5px 0 18px",
  },

  description: {
    color: "#617795",
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "400px",
  },

  features: {
    display: "flex",
    justifyContent: "space-between",
    color: "#315987",
    fontSize: "12px",
    fontWeight: "600",
  },

  right: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    padding: "50px 70px",
  },

  formBox: {
    width: "100%",
    maxWidth: "430px",
    margin: "auto",
  },

  badge: {
    display: "inline-block",
    padding: "6px 14px",
    background: "#eaf3ff",
    color: "#1769d1",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  title: {
    color: "#143d76",
    fontSize: "34px",
    margin: "0 0 8px",
  },

  subtitle: {
    color: "#7889a0",
    fontSize: "14px",
    marginBottom: "35px",
  },

  label: {
    display: "block",
    color: "#203653",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    height: "52px",
    border: "1px solid #d5dfeb",
    borderRadius: "8px",
    outline: "none",
    padding: "0 15px",
    fontSize: "14px",
    marginBottom: "25px",
  },

  button: {
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "8px",
    background: "#1769d1",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  security: {
    textAlign: "center",
    marginTop: "27px",
    color: "#7b899d",
    fontSize: "12px",
  },
};

export default AdminLogin;
