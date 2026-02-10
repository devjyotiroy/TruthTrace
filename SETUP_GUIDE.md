# 🚀 TruthTrace - Complete Setup Guide

## ✅ What's Been Implemented

### Backend Features:
- ✅ MongoDB Atlas connection
- ✅ User authentication (Signup/Login)
- ✅ JWT token-based security
- ✅ Password hashing with bcrypt
- ✅ Scan history storage in database
- ✅ Protected API routes
- ✅ AI-powered policy analysis
- ✅ Cybersecurity threat detection

### Frontend Features:
- ✅ Login page
- ✅ Signup page
- ✅ Authentication flow
- ✅ Protected scanner page
- ✅ User profile display
- ✅ Logout functionality
- ✅ Beautiful gradient UI

## 📦 Installation Steps

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

## 🔧 Configuration

### Backend (.env file already created)
```
MONGODB_URI=mongodb+srv://devjyotiroy11:weather123@cluster0.mzszm7l.mongodb.net/truthtrace?retryWrites=true&w=majority
JWT_SECRET=truthtrace_secret_key_2024_secure
PORT=5000
```

## 🚀 How to Run

### Terminal 1 - Start Backend
```bash
cd backend
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
Server running on port 5000
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm start
```

Browser will open at: `http://localhost:3000`

## 📱 How to Use

### Step 1: Create Account
1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Enter your name, email, and password (min 6 characters)
4. Click "Sign Up" button

### Step 2: Login
1. If you already have an account, click "Login"
2. Enter your email and password
3. Click "Login" button

### Step 3: Scan Websites
1. After login, you'll see the scanner page
2. Enter any website URL (e.g., https://google.com)
3. Click "Scan Website"
4. Wait 20-30 seconds for results
5. View comprehensive analysis

### Step 4: Logout
1. Click "Logout" button in top-right corner

## 🗄️ Database Structure

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### ScanHistory Collection
```javascript
{
  userId: ObjectId (ref: User),
  url: String,
  trackerCount: Number,
  driftScore: Number,
  riskLevel: String,
  scannedAt: Date
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/me` - Get current user (protected)

### Scanning
- `POST /api/scan` - Scan website (protected, requires JWT token)
- `GET /api/history` - Get scan history (protected, requires JWT token)

## 🎯 Features Breakdown

### 1. Authentication System
- ✅ Secure password hashing
- ✅ JWT token generation
- ✅ Token validation middleware
- ✅ Protected routes

### 2. Database Integration
- ✅ MongoDB Atlas connection
- ✅ User model with validation
- ✅ Scan history storage
- ✅ Automatic timestamps

### 3. Scanner Features
- ✅ 20+ tracker detection
- ✅ Privacy policy analysis
- ✅ AI-powered insights
- ✅ Cybersecurity threats
- ✅ Risk scoring
- ✅ Beautiful visualizations

### 4. UI/UX
- ✅ Modern login/signup pages
- ✅ Gradient backgrounds
- ✅ Smooth animations
- ✅ Responsive design
- ✅ User profile display
- ✅ Error handling

## 🧪 Test URLs
Try scanning these websites:
- https://www.google.com
- https://www.facebook.com
- https://www.amazon.com
- https://www.nytimes.com
- https://www.reddit.com

## 🔒 Security Features
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Protected API routes
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled

## 📊 What Gets Saved in Database

Every scan saves:
- User ID (who scanned)
- Website URL
- Number of trackers found
- Privacy drift score
- Risk level (Low/Medium/High)
- Timestamp

## 🎨 Color Scheme
- 🟢 Green: Low risk / Success
- 🟡 Yellow: Medium risk / Warning
- 🔴 Red: High risk / Error
- 🟣 Purple: Primary actions
- 🔵 Blue: Information

## ⚠️ Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in .env
- Make sure port 5000 is not in use
- Run `npm install` again

### Frontend won't start
- Make sure backend is running first
- Check if port 3000 is available
- Run `npm install` again

### Login/Signup not working
- Check backend console for errors
- Verify MongoDB connection
- Check browser console for errors

### Scan fails
- Make sure you're logged in
- Check if URL is valid (must include http:// or https://)
- Wait for scan to complete (20-30 seconds)

## 📁 Project Structure
```
TruthTrace/
├── backend/
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   ├── middleware/
│   │   └── auth.js (JWT authentication)
│   ├── models/
│   │   ├── User.js (User schema)
│   │   └── ScanHistory.js (Scan history schema)
│   ├── routes/
│   │   ├── authRoute.js (Login/Signup)
│   │   └── scanRoute.js (Scanning + History)
│   ├── services/
│   │   ├── scanner.js (Tracker detection)
│   │   ├── policyAnalyzer.js (Policy fetching)
│   │   ├── driftEngine.js (Score calculation)
│   │   ├── securityAnalyzer.js (Threat detection)
│   │   └── aiAnalyzer.js (AI analysis)
│   ├── .env (Environment variables)
│   ├── .gitignore
│   ├── package.json
│   └── server.js (Main server file)
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Login.js (Login page)
        │   ├── Signup.js (Signup page)
        │   ├── Scanner.js (Main scanner)
        │   └── Dashboard.js (Results display)
        ├── App.js (Main app with auth flow)
        ├── App.css (Gradient background)
        └── index.css (Animations)
```

## 🎉 All Done!

Your TruthTrace is now a complete full-stack application with:
- ✅ MongoDB database integration
- ✅ User authentication system
- ✅ Login/Signup pages
- ✅ Protected routes
- ✅ Scan history storage
- ✅ Beautiful UI
- ✅ AI-powered analysis
- ✅ Cybersecurity features

## 🚀 Next Steps

1. Start backend: `cd backend && node server.js`
2. Start frontend: `cd frontend && npm start`
3. Create an account
4. Start scanning websites!

Enjoy using TruthTrace! 🔍🔒
