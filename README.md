# TruthTrace – Privacy Transparency Analyzer 🔍

## 🎯 Overview
TruthTrace is an advanced web-based transparency analysis platform that detects and visualizes inconsistencies between website privacy policies and actual tracking behavior using AI-powered analysis and cybersecurity threat detection.

## 🚀 Key Features

- 🕵️ **Advanced Tracking Detection** - Identifies 20+ types of third-party trackers
- 🤖 **AI-Powered Policy Analysis** - NLP-based privacy policy evaluation
- 🔒 **Cybersecurity Threat Detection** - Identifies malicious tracking scripts
- 📊 **Privacy Drift Scoring** - Quantifies gap between claims and behavior
- 🎨 **Interactive Dashboard** - Beautiful visualizations with charts
- 📄 **PDF Report Generation** - Download detailed analysis reports
- 💾 **Scan History** - MongoDB-based scan storage
- 🔐 **User Authentication** - Secure login/signup system

## 🛠 Technology Stack

### Frontend
- React.js
- CSS3 (No frameworks)
- Recharts (Data Visualization)
- jsPDF (Report Generation)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Puppeteer (Browser Automation)
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:
```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔧 Usage

1. Open `http://localhost:3000`
2. Sign up / Login
3. Enter website URL
4. Click "Scan Website"
5. View detailed analysis
6. Download PDF report

## 📊 Features Breakdown

### Tracking Detection
- Analytics trackers
- Advertising networks
- Social media pixels
- Fingerprinting scripts

### AI Analysis
- Policy quality scoring (0-100)
- Positive aspects extraction
- Concerns identification
- GDPR/CCPA compliance checking

### Security Features
- Malicious tracker detection
- Cross-site tracking analysis
- Insecure connection warnings
- Excessive tracking alerts

## 📄 License
Educational Project - MIT License

## 👨‍💻 Contributing
Contributions welcome! Please submit a Pull Request.

---

**Made with ❤️ for Digital Privacy Awareness**
