import './Home.css';

function Home({ onGetStarted }) {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🔍</span>
            <span className="logo-text">TruthTrace</span>
          </div>
          <button className="nav-btn" onClick={onGetStarted}>Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">TruthTrace</h1>
          <p className="hero-subtitle">Privacy Transparency Analyzer</p>
          <p className="hero-description">
            Detect hidden tracking scripts and analyze privacy policies with AI-powered technology
          </p>
          <button className="cta-button" onClick={onGetStarted}>
            Start Analyzing →
          </button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Tracker Detection</h3>
            <p>Identifies 20+ types of third-party trackers, analytics, and advertising scripts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Analysis</h3>
            <p>AI-powered privacy policy analysis with quality scoring and insights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Security Threats</h3>
            <p>Detects malicious trackers, fingerprinting, and cross-site tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Privacy Drift Score</h3>
            <p>Quantifies the gap between privacy claims and actual behavior</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Visual Analytics</h3>
            <p>Beautiful charts and graphs to understand tracking behavior</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Scan History</h3>
            <p>Save and track your website scans over time</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2 className="section-title">About TruthTrace</h2>
        <div className="about-content">
          <p>
            TruthTrace is an advanced web-based transparency analysis platform that helps users understand 
            the gap between what websites claim in their privacy policies and what they actually do.
          </p>
          <p>
            Our mission is to promote digital transparency and help users make informed decisions about 
            their online privacy.
          </p>
        </div>
      </section>

      <section className="problem">
        <h2 className="section-title">The Problem We Solve</h2>
        <div className="problem-content">
          <div className="problem-item">
            <span className="problem-icon">⚠️</span>
            <p>Many websites claim to protect user privacy but deploy multiple tracking scripts</p>
          </div>
          <div className="problem-item">
            <span className="problem-icon">🕵️</span>
            <p>Hidden surveillance and data exploitation without transparent disclosure</p>
          </div>
          <div className="problem-item">
            <span className="problem-icon">❌</span>
            <p>Users lack tools to analyze tracking behaviors embedded in websites</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 TruthTrace - Privacy Transparency Analyzer</p>
        <p>Made with ❤️ for Digital Privacy Awareness</p>
      </footer>
    </div>
  );
}

export default Home;
