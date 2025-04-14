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

1. **[Docker Development Setup](/en/setup/deployment-dev)** - Quick setup for local development
2. **[Docker Production Setup](/en/setup/deployment-prod)** - Full production deployment with Docker Swarm

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

- **[Docker Development Setup](/en/setup/deployment-dev)** - For local development
- **[Docker Production Setup](/en/setup/deployment-prod)** - For production environments
- **[Configuration Options](/en/setup/config)** - Details on all configuration parameters
- **[Troubleshooting](/en/setup/troubleshooting)** - Common issues and solutions

## ⚠️ Important Notes

- Default database credentials should be changed before exposing the system to the internet
- For educational institutions, we recommend starting with a test deployment before migrating to production
- Firebase credentials are required for certain features like notifications

Next, proceed to the [Docker Production Setup](/en/setup/deployment-prod) to learn about setting up UniTrack in a production environment.
