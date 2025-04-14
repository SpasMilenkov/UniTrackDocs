# 🚀 Getting Started with UniTrack

Welcome to the setup guide for UniTrack, a comprehensive university management system. This guide will walk you through the installation and configuration process to get your instance up and running.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Docker** (version 20.10.0 or later)
- **Docker Compose** (version 2.0.0 or later)
- **Git** (for cloning the repository)
- **Bash shell** (for running the deployment scripts)

## 🛠️ Setup Options

UniTrack offers several setup options depending on your needs:

1. **[Docker Development Setup](/en/setup/docker-dev)** - Quick setup for local development
2. **[Docker Production Setup](/en/setup/docker-prod)** - Full production deployment with Docker Swarm
3. **[Manual Setup](/en/setup/manual)** - For advanced users who want to run components individually

## 🏁 Quick Start

For the quickest possible setup, follow these steps:

```bash
# Clone the repository
git clone https://github.com/SpasMilenkov/UniTrackRemaster.git
cd UniTrackRemaster

# Start the development environment
docker-compose -f docker-compose.dev.yml up
```

This will start a simplified development environment with:

- PostgreSQL database
- Backend API
- Frontend application

Access the application at [http://localhost:3000](http://localhost:3000)

## 🔄 System Requirements

UniTrack is designed to be lightweight, but for optimal performance we recommend:

| Component | Minimum | Recommended |
| --------- | ------- | ----------- |
| CPU       | 2 cores | 4+ cores    |
| RAM       | 4GB     | 8GB+        |
| Storage   | 10GB    | 20GB+       |
| Network   | 10Mbps  | 100Mbps+    |

## 📚 Documentation Structure

The complete setup documentation is organized as follows:

- **[Docker Development Setup](/en/setup/docker-dev)** - For local development
- **[Docker Production Setup](/en/setup/docker-prod)** - For production environments
- **[Manual Setup](/en/setup/manual)** - Advanced component-by-component setup
- **[Configuration Options](/en/setup/config)** - Details on all configuration parameters
- **[Troubleshooting](/en/setup/troubleshooting)** - Common issues and solutions

## ⚠️ Important Notes

- The first user to register on a new installation will automatically be assigned administrator privileges
- Default database credentials should be changed before exposing the system to the internet
- For educational institutions, we recommend starting with a test deployment before migrating to production
- Firebase credentials are required for certain features like notifications

Next, proceed to the [Docker Production Setup](/en/setup/docker-prod) to learn about setting up UniTrack in a production environment.
