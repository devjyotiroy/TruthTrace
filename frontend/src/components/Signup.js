import { useState } from "react";
import axios from "axios";
import './Auth.css';

function Signup({ onSignup, onSwitchToLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://truthtrace.onrender.com/api/auth/signup", {
        name,
        email,
        password
      });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onSignup(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-btn" onClick={onBack}>← Back to Home</button>
      
      <div className="auth-box">
        <div className="auth-header">
          <div className="auth-icon">🔍</div>
          <h2>TruthTrace</h2>
          <p>Privacy Transparency Analyzer</p>
        </div>

        <div className="auth-form">
          <h3>Create Account</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>👤 Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label>📧 Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>🔒 Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <small>Minimum 6 characters</small>
            </div>

            {error && (
              <div className="error-box">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              Already have an account?{" "}
              <span onClick={onSwitchToLogin}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
