import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import './Scanner.css';

function Scanner({ user, onLogout }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const scanSite = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    setLoading(true);
    setError("");
    setResult(null);
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/scan", { url }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to scan website. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <nav className="scanner-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🔍</span>
            <span className="logo-text">TruthTrace</span>
          </div>
          <div className="nav-right">
            <span className="user-name">👤 {user.name}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="scanner-content">
        <div className="hero-section">
          <h2>Privacy Transparency Analyzer</h2>
          <p>Detect hidden tracking & analyze privacy policies</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Website URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && scanSite()}
          />
          <button onClick={scanSite} disabled={loading}>
            {loading ? "Scanning..." : "🔍 Scan Website"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {result && <Dashboard data={result} url={url} />}

        {!result && !loading && (
          <div className="info-cards">
            <div className="info-card">
              <div className="card-icon">🎯</div>
              <h3>Track Detection</h3>
              <p>Identifies 20+ types of third-party trackers, analytics, and advertising scripts</p>
            </div>
            <div className="info-card">
              <div className="card-icon">🤖</div>
              <h3>AI Analysis</h3>
              <p>AI-powered privacy policy analysis with quality scoring and insights</p>
            </div>
            <div className="info-card">
              <div className="card-icon">🔒</div>
              <h3>Security Threats</h3>
              <p>Detects malicious trackers, fingerprinting, and cross-site tracking</p>
            </div>
          </div>
        )}

        {/* About Section */}
        {!result && !loading && (
          <div className="about-section">
            <h2>About TruthTrace</h2>
            <div className="about-content">
              <p>
                TruthTrace is an advanced web-based transparency analysis platform designed to detect and visualize 
                inconsistencies between website privacy policies and actual tracking behavior.
              </p>
              <p>
                Our mission is to promote digital transparency and help users make informed decisions about their 
                online privacy. We combine cutting-edge AI technology with cybersecurity expertise to provide 
                comprehensive privacy analysis.
              </p>
              <p>
                Whether you're a privacy-conscious user, a developer, or an organization, TruthTrace empowers you 
                to understand the real privacy practices of any website.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🔍 TruthTrace</h3>
            <p>Privacy Transparency Analyzer</p>
            <p>Empowering users with digital privacy awareness through AI-powered analysis.</p>
          </div>
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>🎯 Tracker Detection</li>
              <li>🤖 AI Policy Analysis</li>
              <li>🔒 Security Threats</li>
              <li>📊 Privacy Drift Score</li>
              <li>📈 Visual Analytics</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <ul>
              <li>Educational Tool</li>
              <li>Open Source</li>
              <li>Privacy Focused</li>
              <li>No Data Collection</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 TruthTrace - Made with ❤️ for Digital Privacy Awareness</p>
        </div>
      </footer>
    </div>
  );
}

export default Scanner;
