# 🚀 UniTrack Deployment Overview

<div class="deployment-banner">
  <div class="banner-content">
    <div class="banner-icon">🔧</div>
    <h2>Understanding the UniTrack Infrastructure</h2>
  </div>
</div>

Welcome to the deployment guide for UniTrack! This page provides a quick overview of the various components that make up the UniTrack system and how they work together.

## 🏗️ System Architecture

UniTrack is built using a modern containerized architecture, with several key components working together to provide a robust educational management platform.

<div class="architecture-diagram">
  <div class="arch-component client">
    <span class="component-icon">🖥️</span>
    <span class="component-label">Client Browsers</span>
  </div>
  <div class="arch-arrow">▶</div>
  <div class="arch-component nginx">
    <span class="component-icon">🔄</span>
    <span class="component-label">NGINX Load Balancer</span>
  </div>
  <div class="arch-arrow">▶</div>
  <div class="arch-component-group">
    <div class="arch-component frontend">
      <span class="component-icon">🎨</span>
      <span class="component-label">Nuxt Frontend</span>
    </div>
    <div class="arch-component backend">
      <span class="component-icon">⚙️</span>
      <span class="component-label">ASP.NET Backend (x2)</span>
    </div>
  </div>
  <div class="arch-arrow">▶</div>
  <div class="arch-component database">
    <span class="component-icon">🐘</span>
    <span class="component-label">PostgreSQL Database</span>
  </div>
  <div class="arch-monitoring">
    <div class="arch-component monitoring">
      <span class="component-icon">📊</span>
      <span class="component-label">Prometheus + Grafana</span>
    </div>
  </div>
</div>

## 📦 Components Overview

### Database (PostgreSQL)

- **Role**: Stores all application data
- **Configuration**: Runs on port 5434 (mapped to internal 5432)
- **Persistence**: Uses Docker volumes for data persistence
- **Health Checks**: Automatically monitored for availability

### Backend API (ASP.NET Core)

- **Role**: Provides the RESTful API services and business logic
- **Scaling**: Deployed with 2 replicas for high availability
- **Dependencies**: Requires the database and Firebase credentials
- **Security**: Uses secret management for sensitive configuration

### Frontend (Nuxt.js)

- **Role**: Delivers the user interface to browsers
- **Configuration**: Exposes port 3000
- **API Integration**: Configured to connect to the backend via NGINX

### Load Balancer (NGINX)

- **Role**: Routes traffic and provides SSL termination
- **Configuration**: Exposes ports 8080 (HTTPS) and 8081 (HTTP)
- **SSL**: Uses certificates stored in the ./ssl directory

### Monitoring Stack

- **Prometheus**: Collects metrics from the services
- **Grafana**: Provides visualization dashboards for monitoring
- **Access**: Grafana UI available on port 3001

## 🔄 Network Configuration

All services are connected through the `app-network` overlay network, allowing secure communication between containers.

<div class="note-box">
  <div class="note-icon">💡</div>
  <div class="note-content">
    <strong>Pro Tip:</strong> The overlay network type allows this setup to scale across multiple Docker hosts in a swarm if needed.
  </div>
</div>

## 🚀 Deployment Process

Deploying the full stack is straightforward with Docker Compose:

```bash
# Build and deploy all services
docker-compose up -d

# View logs for all services
docker-compose logs -f

# Scale specific services if needed
docker-compose up -d --scale unitrack-backend=3
```

## 🛠️ Important Files

Make sure you have these files in your deployment directory:

<div class="files-list">
  <div class="file">
    <span class="file-icon">📄</span>
    <span class="file-name">docker-compose.yml</span>
    <span class="file-description">Main configuration file</span>
  </div>
  <div class="file">
    <span class="file-icon">📄</span>
    <span class="file-name">nginx.conf</span>
    <span class="file-description">NGINX configuration</span>
  </div>
  <div class="file">
    <span class="file-icon">📄</span>
    <span class="file-name">prometheus.yml</span>
    <span class="file-description">Prometheus configuration</span>
  </div>
  <div class="file">
    <span class="file-icon">🔐</span>
    <span class="file-name">Firebase credentials</span>
    <span class="file-description">For authentication</span>
  </div>
</div>

## ✅ Prerequisites

Before deployment, ensure you have:

- Docker and Docker Compose installed
- Network ports 3000, 3001, 5434, 8080, 8081, and 9090 available
- SSL certificates (for production deployment)
- Firebase project credentials file

Ready to get started? Head over to our detailed [Docker Development Guide](en/setup/deployment-dev) or [Production Deployment Guide](en/setup/deployment-prod) for step-by-step instructions!

<style>
.deployment-banner {
  background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(34, 197, 94, 0.2));
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.banner-icon {
  font-size: 2.5rem;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  gap: 1rem;
}

.arch-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  min-width: 180px;
  text-align: center;
}

.arch-component-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.component-icon {
  font-size: 1.5rem;
}

.arch-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.client {
  background: rgba(75, 85, 99, 0.2);
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.nginx {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.frontend {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.3);
}

.backend {
  background: rgba(124, 58, 237, 0.2);
  border: 1px solid rgba(124, 58, 237, 0.3);
}

.database {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.monitoring {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.3);
  margin-top: 1rem;
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

.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.file {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.file-icon {
  font-size: 1.25rem;
}

.file-name {
  font-weight: bold;
  min-width: 180px;
}

@media (max-width: 768px) {
  .arch-component-group {
    flex-direction: column;
  }
  
  .arch-arrow {
    transform: rotate(90deg);
  }
  
  .file {
    flex-direction: column;
    text-align: center;
  }
  
  .file-name {
    min-width: unset;
  }
}
</style>
