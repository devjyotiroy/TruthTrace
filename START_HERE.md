# TruthTrace - Quick Start Guide

## Backend ko start karne ke liye:

1. Ek naya terminal kholo
2. Backend folder me jao:
   ```
   cd C:\Users\Comsys\Desktop\TruthTrace\backend
   ```
3. Server start karo:
   ```
   node server.js
   ```

Aapko yeh dikhna chahiye:
```
✅ MongoDB Connected Successfully
Server running on port 5000
```

## Frontend ko start karne ke liye:

1. Ek aur naya terminal kholo
2. Frontend folder me jao:
   ```
   cd C:\Users\Comsys\Desktop\TruthTrace\frontend
   ```
3. Frontend start karo:
   ```
   npm start
   ```

Browser automatically khul jayega: http://localhost:3000

## Agar error aaye:

### Backend Error:
- MongoDB connection string check karo
- Port 5000 free hai ya nahi check karo
- .env file exist karti hai ya nahi check karo

### Frontend Error:
- Port 3000 free hai ya nahi check karo
- npm install phir se run karo

## Test karne ke liye:

Backend test:
```
cd backend
node test.js
```

Yeh dikhna chahiye:
```
✅ Server is running
✅ Signup successful
✅ Login successful
✅ All tests passed!
```

---

**Important:** Dono terminals ko khula rakhna hai - ek backend ke liye, ek frontend ke liye!
