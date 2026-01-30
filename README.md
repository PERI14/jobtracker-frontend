# 🚀 JobTracker - Modern Job Application Manager

**JobTracker** is a premium, feature-rich web application designed to help job seekers track, manage, and optimize their job search journey. Built with a modern aesthetic and powerful utilities, it provides a seamless experience for organizing applications and gaining insights.

## ✨ Features

### 💎 Premium UI/UX
- **Modern Aesthetics**: A sleek, dark-themed design using glassmorphism, vibrant gradients, and smooth animations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Interactive Dashboard**: Visual breakdown of application statuses and sources with smooth progress bars.

### 📝 Job Management
- **Smart Tracking**: Easily add and edit job applications with details like Company, Role, Salary, and Source.
- **Priority & Categorization**: Mark jobs as High/Medium/Low priority and categorize them (Full-time, Remote, etc.).
- **Search & Filter**: Real-time filtering by status and instant search capability to find specific applications.

### 📄 Resume Analyzer
- **AI-Powered Insights**: Upload your resume to get an instant analysis of your skills and formatting.
- **Optimization Tips**: Get actionable suggestions to improve your resume's impact.
- **Skill Extraction**: Automatically identifies key skills mentioned in your document.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS with CSS Modules
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Typography**: Plus Jakarta Sans & Outfit (via Google Fonts)

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- A running backend server (see [Backend Repository](https://github.com/PERI14/jobtrackr-backend))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PERI14/jobtracker-frontend.git
   cd jobtracker-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔗 Backend Compatibility Note

To fullfill all features (Priority, Category, Resume Analyzer), ensure your backend supports:
- **Job Entity**: Fields for `priority` and `category`.
- **Analyzer Endpoint**: `POST /api/resume/analyze` for PDF processing.

---

Built with ❤️ by Periyasamy

