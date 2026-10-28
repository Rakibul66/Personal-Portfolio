import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./app";
import AdminDashboard from "./components/AdminDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import VenturesPage from "./pages/VenturesPage";
import ContactPage from "./pages/ContactPage";
import { ThemeProvider } from "./context/ThemeContext";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<App />} />

          {/* Dedicated Catalog Sub-Pages with Filters, Themes & Pagination */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/ventures" element={<VenturesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Dedicated Admin Dashboard Route: http://localhost:5173/admin */}
          <Route path="/admin/*" element={<AdminDashboard onClose={() => window.location.href = "/"} />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
