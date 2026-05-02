# 🏛️ Technical Club KITSW

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)

A sophisticated, full-stack recruitment and event management ecosystem designed for the **Technical Club at KITSW**. This platform streamlines administrative workflows, automates candidate screening, and showcases club activities through a modern, responsive interface.

---

## ✨ Key Features

### 👤 For Members & Applicants
- **Dynamic Recruitment Portal**: Professional multi-stage application process with automated resume handling.
- **Interactive Event Showcase**: Real-time updates on upcoming workshops, hackathons, and technical sessions.
- **Living Gallery**: High-performance photo albums powered by Cloudinary.
- **Responsive Design**: Optimized for everything from mobile phones to high-resolution desktop monitors.

### 🛡️ For Administrators (Dashboard)
- **Recruitment Pipeline**: Advanced management of applications with status tracking (`Pending` → `Reviewing` → `Shortlisted` → `Accepted`).
- **Internal Note-Taking**: Secure administrative feedback and notes for each candidate.
- **Content Management (CMS)**: Easily manage events, gallery images, and team member profiles without touching code.
- **Real-time Analytics**: Quick insights into application trends and club growth.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js, JWT Authentication |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Media Storage** | Cloudinary (Gallery/Photos), Firebase Storage (Documents/Resumes) |
| **State Management** | React Hooks & Context API |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Cloudinary & Firebase Accounts

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nikhil-Madaravena/Technical-Club-Website.git
   cd Technical-Club-Website
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   # Create a .env file with VITE_API_URL
   npm run dev
   ```

---

## 🌐 Deployment Configuration

### 🎨 Frontend (Vercel)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Required Variable**: `VITE_API_URL`

### ⚙️ Backend (Render)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Required Variables**: See `server/.env.example` for the full list of credentials.

---

## 📄 License
This project is proprietary and intended for the exclusive use of the Technical Club at KITSW.

---

<p align="center">Made with ❤️ by the Technical Club Team</p>
