import { useState } from "react";
import axios from "axios";
import './Auth.css';

function Login({ onLogin, onSwitchToSignup, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
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
          <h3>Welcome Back</h3>
          
          <form onSubmit={handleSubmit}>
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
            </div>

            {error && (
              <div className="error-box">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              Don't have an account?{" "}
              <span onClick={onSwitchToSignup}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
