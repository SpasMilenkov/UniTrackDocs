# 🎓 Introduction to UniTrack

<div class="intro-banner">
  <div class="banner-content">
    <img src="/logo.png" alt="UniTrack Logo" class="intro-logo" />
    <h2>Welcome to the future of education management</h2>
  </div>
</div>

Welcome to UniTrack, a comprehensive university management system designed and built as a diploma project. This documentation provides detailed information about the system's architecture, features, and usage.

## 🚀 Project Overview

UniTrack is a modern educational management solution built with a robust tech stack to address the complex needs of educational institutions. The system offers modules for academic structure management, student grading, user management, and interactive dashboards.

<div class="feature-grid">
  <div class="feature-card">
    <div class="card-icon">📊</div>
    <h3>Analytics</h3>
    <p>Real-time insights and data visualization</p>
  </div>
  <div class="feature-card">
    <div class="card-icon">👩‍🏫</div>
    <h3>Teaching</h3>
    <p>Streamlined class management tools</p>
  </div>
  <div class="feature-card">
    <div class="card-icon">📝</div>
    <h3>Grading</h3>
    <p>Flexible assessment system</p>
  </div>
  <div class="feature-card">
    <div class="card-icon">👥</div>
    <h3>Users</h3>
    <p>Comprehensive role-based access</p>
  </div>
</div>

## 💻 Technology Stack

### Frontend

- **Nuxt.js** ⚡: A Vue.js framework that provides an intuitive and powerful way to create server-side rendered applications
- **Naive UI** 🎨: A Vue 3 component library offering a comprehensive set of high-quality components with customizable themes
- **Tailwind CSS** 🌈: A utility-first CSS framework for rapidly building custom designs
- **TypeScript** 📘: For type safety and improved developer experience

### Backend

- **ASP.NET Core** 🔄: A high-performance, cross-platform framework for building modern, cloud-based applications
- **Entity Framework Core** 🗃️: An object-database mapper for .NET that enables developers to work with a database using .NET objects
- **PostgreSQL** 🐘: A powerful, open-source object-relational database system with a strong reputation for reliability and performance

<div class="tech-stack-visual">
  <div class="stack-layer frontend">
    <span>Nuxt.js + Naive UI + Tailwind CSS</span>
  </div>
  <div class="stack-layer api">
    <span>ASP.NET Core RESTful API</span>
  </div>
  <div class="stack-layer database">
    <span>PostgreSQL Database</span>
  </div>
</div>

## 🏗️ Architecture

- **Microservices-inspired architecture** 🧩: The backend is organized into distinct modules with clear boundaries
- **RESTful API** 🔌: The backend exposes a comprehensive API that follows REST principles
- **JWT Authentication** 🔒: Secure token-based authentication system
- **Unit of Work & Repository Pattern** 📁: For clean data access and separation of concerns

## ✨ Core Features

- **Academic Structure Management** 🏛️: Manage faculties, departments, subjects, and grades
- **User Management** 👤: Comprehensive user lifecycle handling including students, teachers, and administrators
- **Dashboard Module** 📊: Role-based dashboards with real-time analytics and personalized views
- **Grading System** 📝: Flexible, customizable grading with historical tracking and analytics

## 🚢 Deployment Options

UniTrack supports multiple deployment scenarios:

<div class="deployment-options">
  <div class="option">
    <h3>🐳 Docker</h3>
    <p>For easy setup in both development and production environments</p>
  </div>
  <div class="option">
    <h3>⚙️ Manual</h3>
    <p>Step-by-step instructions for traditional deployment</p>
  </div>
  <div class="option">
    <h3>☁️ Cloud</h3>
    <p>Compatible with all major cloud providers</p>
  </div>
</div>

## 🏁 Getting Started

To quickly get started with UniTrack:

1. Check out the [Getting Started](/setup/getting-started) guide
2. Learn about deployment options with [Docker Development](/setup/docker-deployment-dev)
3. Explore the available [Modules](/modules/dashboard-module)

## 🎯 About This Project

UniTrack was developed as a diploma project by Spas Milenkov, demonstrating the application of modern web development practices in creating comprehensive educational software. The project aims to provide a flexible, scalable, and user-friendly solution for educational institutions of various sizes.

The system's modular architecture allows for easy extension and customization, making it suitable for different educational contexts from K-12 schools to universities.

<div class="note-box">
  <div class="note-icon">💡</div>
  <div class="note-content">
    <strong>Fun Fact:</strong> This project combines over 15 different technologies and best practices from modern web development to create a cohesive, powerful platform!
  </div>
</div>

<style>
.intro-banner {
  background: linear-gradient(to right, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.intro-logo {
  max-width: 120px;
  height: auto;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.feature-card {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tech-stack-visual {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stack-layer {
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
}

.frontend {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.api {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.database {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.deployment-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.option {
  flex: 1;
  min-width: 200px;
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.option h3 {
  margin-top: 0;
}

.cta-container {
  margin: 2rem 0;
  text-align: center;
}

.cta-button {
  display: inline-block;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.note-box {
  display: flex;
  gap: 1rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--vp-c-secondary);
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
}

.note-icon {
  font-size: 1.5rem;
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .deployment-options {
    flex-direction: column;
  }
}
</style>
