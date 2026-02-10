import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import jsPDF from 'jspdf';
import './Dashboard.css';

function Dashboard({ data, url }) {
  const { trackerCount, driftScore, riskLevel, trackers, policyFound, securityIssues, trackerCategories, policyAnalysis, policyInsights } = data;

  const scoreData = [{ name: "Privacy Drift", value: driftScore }];
  
  const getColor = () => {
    if (riskLevel === "High") return "#ef4444";
    if (riskLevel === "Medium") return "#f59e0b";
    return "#10b981";
  };

  const categoryData = [
    { name: "Analytics", value: trackerCategories?.analytics?.length || 0, color: "#3b82f6" },
    { name: "Advertising", value: trackerCategories?.advertising?.length || 0, color: "#ef4444" },
    { name: "Social Media", value: trackerCategories?.social?.length || 0, color: "#8b5cf6" },
    { name: "Other", value: trackerCategories?.other?.length || 0, color: "#6b7280" }
  ].filter(item => item.value > 0);

  const downloadReport = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    // Helper function to add new page if needed
    const checkPageBreak = () => {
      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Title
    doc.setFontSize(20);
    doc.setTextColor(102, 126, 234);
    doc.text('TruthTrace - Privacy Analysis Report', 105, yPos, { align: 'center' });
    yPos += 15;

    // Website and Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Website: ${url}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Scan Date: ${new Date().toLocaleString()}`, 20, yPos);
    yPos += 15;

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('SUMMARY', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.text(`Trackers Detected: ${trackerCount}`, 25, yPos);
    yPos += lineHeight;
    doc.text(`Privacy Drift Score: ${driftScore}%`, 25, yPos);
    yPos += lineHeight;
    
    // Risk level with color
    if (riskLevel === 'High') doc.setTextColor(239, 68, 68);
    else if (riskLevel === 'Medium') doc.setTextColor(245, 158, 11);
    else doc.setTextColor(16, 185, 129);
    doc.text(`Risk Level: ${riskLevel}`, 25, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += lineHeight;
    
    doc.text(`Privacy Policy: ${policyFound ? 'Found' : 'Not Found'}`, 25, yPos);
    yPos += 15;

    checkPageBreak();

    // Security Threats
    if (securityIssues && securityIssues.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(239, 68, 68);
      doc.text('SECURITY THREATS', 20, yPos);
      yPos += 10;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      securityIssues.forEach((issue, i) => {
        checkPageBreak();
        const lines = doc.splitTextToSize(`${i + 1}. ${issue}`, 170);
        lines.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += lineHeight;
        });
      });
      yPos += 10;
    }

    checkPageBreak();

    // Tracker Categories
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('TRACKER CATEGORIES', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.text(`Analytics: ${trackerCategories?.analytics?.length || 0}`, 25, yPos);
    yPos += lineHeight;
    doc.text(`Advertising: ${trackerCategories?.advertising?.length || 0}`, 25, yPos);
    yPos += lineHeight;
    doc.text(`Social Media: ${trackerCategories?.social?.length || 0}`, 25, yPos);
    yPos += lineHeight;
    doc.text(`Other: ${trackerCategories?.other?.length || 0}`, 25, yPos);
    yPos += 15;

    checkPageBreak();

    // AI Policy Analysis
    if (policyAnalysis) {
      doc.setFontSize(14);
      doc.setTextColor(59, 130, 246);
      doc.text('AI POLICY ANALYSIS', 20, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Policy Quality Score: ${policyAnalysis.score}/100`, 25, yPos);
      yPos += 10;

      if (policyAnalysis.positives && policyAnalysis.positives.length > 0) {
        doc.setFontSize(11);
        doc.text('Positive Aspects:', 25, yPos);
        yPos += 7;
        doc.setFontSize(9);
        policyAnalysis.positives.forEach((item, i) => {
          checkPageBreak();
          const lines = doc.splitTextToSize(`${i + 1}. ${item}`, 165);
          lines.forEach(line => {
            doc.text(line, 30, yPos);
            yPos += lineHeight;
          });
        });
        yPos += 5;
      }

      if (policyAnalysis.concerns && policyAnalysis.concerns.length > 0) {
        checkPageBreak();
        doc.setFontSize(11);
        doc.text('Concerns:', 25, yPos);
        yPos += 7;
        doc.setFontSize(9);
        policyAnalysis.concerns.forEach((item, i) => {
          checkPageBreak();
          const lines = doc.splitTextToSize(`${i + 1}. ${item}`, 165);
          lines.forEach(line => {
            doc.text(line, 30, yPos);
            yPos += lineHeight;
          });
        });
      }
      yPos += 10;
    }

    checkPageBreak();

    // Privacy Policy Insights
    if (policyInsights) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('PRIVACY POLICY INSIGHTS', 20, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.text(`Data Collection: ${policyInsights.dataCollected}`, 25, yPos);
      yPos += lineHeight;
      doc.text(`Third-Party Sharing: ${policyInsights.thirdPartySharing}`, 25, yPos);
      yPos += lineHeight;
      doc.text(`User Rights: ${policyInsights.userRights}`, 25, yPos);
      yPos += 15;
    }

    checkPageBreak();

    // Detected Trackers
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`DETECTED TRACKERS (${trackerCount})`, 20, yPos);
    yPos += 10;

    doc.setFontSize(8);
    trackers.forEach((tracker, i) => {
      checkPageBreak();
      const lines = doc.splitTextToSize(`${i + 1}. ${tracker}`, 170);
      lines.forEach(line => {
        doc.text(line, 25, yPos);
        yPos += 6;
      });
    });

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `TruthTrace Report - Page ${i} of ${totalPages} - Generated: ${new Date().toLocaleString()}`,
        105,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    doc.save(`TruthTrace_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="dashboard-container">
      {/* Download Button */}
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <button 
          onClick={downloadReport}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          💾 Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Trackers Detected</div>
              <div className="stat-value">{trackerCount}</div>
            </div>
            <div className="stat-icon">🕵️</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Privacy Drift Score</div>
              <div className={`stat-value risk-${riskLevel.toLowerCase()}`}>{driftScore}%</div>
            </div>
            <div className="stat-icon">📊</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Risk Level</div>
              <div className={`stat-value risk-${riskLevel.toLowerCase()}`}>{riskLevel}</div>
            </div>
            <div className="stat-icon">{riskLevel === "High" ? "🔴" : riskLevel === "Medium" ? "🟡" : "🟢"}</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">📈 Privacy Drift Score</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                <Cell fill={getColor()} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {categoryData.length > 0 && (
          <div className="chart-card">
            <h3 className="chart-title">🧩 Tracker Categories</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Security Issues */}
      {securityIssues && securityIssues.length > 0 && (
        <div className="security-alert">
          <h3>🔒 Cybersecurity Threats Detected</h3>
          <ul className="security-list">
            {securityIssues.map((issue, idx) => (
              <li key={idx} className="security-item">
                <span>⚠️</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Policy Analysis */}
      {policyAnalysis && (
        <div className="ai-analysis">
          <h3>🤖 AI-Powered Policy Analysis</h3>
          <div className="analysis-grid">
            <div className="analysis-section">
              <h4>✅ Positive Aspects</h4>
              {policyAnalysis.positives && policyAnalysis.positives.length > 0 ? (
                <ul className="analysis-list">
                  {policyAnalysis.positives.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{color: '#6b7280', fontSize: '0.9rem'}}>No positive indicators found</p>
              )}
            </div>
            <div className="analysis-section">
              <h4>⚠️ Concerns</h4>
              {policyAnalysis.concerns && policyAnalysis.concerns.length > 0 ? (
                <ul className="analysis-list">
                  {policyAnalysis.concerns.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{color: '#6b7280', fontSize: '0.9rem'}}>No concerns found</p>
              )}
            </div>
          </div>
          <div className="policy-score">
            <span style={{color: '#374151', fontWeight: '600'}}>Policy Quality Score:</span>
            <span className={`score-value risk-${policyAnalysis.score > 60 ? 'low' : policyAnalysis.score > 40 ? 'medium' : 'high'}`}>
              {policyAnalysis.score}/100
            </span>
          </div>
        </div>
      )}

      {/* Policy Insights */}
      {policyInsights && (
        <div className="insights-card">
          <h3>📝 Privacy Policy Insights</h3>
          <div className="insights-grid">
            <div className="insight-box">
              <h4>Data Collection</h4>
              <p>{policyInsights.dataCollected}</p>
            </div>
            <div className="insight-box">
              <h4>Third-Party Sharing</h4>
              <p>{policyInsights.thirdPartySharing}</p>
            </div>
            <div className="insight-box">
              <h4>User Rights</h4>
              <p>{policyInsights.userRights}</p>
            </div>
          </div>
        </div>
      )}

      {/* Trackers List */}
      <div className="trackers-card">
        <h3>🎯 Detected Tracking Scripts ({trackerCount})</h3>
        {trackers.length > 0 ? (
          <div className="trackers-list">
            {trackers.map((tracker, idx) => (
              <div key={idx} className="tracker-item">
                {tracker}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-trackers">✅ No tracking scripts detected!</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
