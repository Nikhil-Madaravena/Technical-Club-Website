# Technical Club KITSW Website

A professional recruitment and event management platform for the Technical Club at KITSW.

## 🚀 Deployment Guide

### Backend (Render / Heroku)
1. Set the root directory to `server`.
2. Install Command: `npm install`.
3. Start Command: `npm start`.
4. Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long random string.
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`: For initial dashboard access.
   - `FRONTEND_URL`: Your Vercel app URL (for CORS).
   - `CLOUDINARY_*`: Cloudinary credentials (for photos).
   - `FIREBASE_*`: Firebase credentials (for resumes).

### Frontend (Vercel)
1. Set the root directory to `client`.
2. Framework Preset: `Vite`.
3. Output Directory: `dist`.
4. Environment Variables:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com/api`).

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Storage**: Cloudinary (Photos), Firebase (Documents).
