# 🐳 Docker Infrastructure Setup

> **Configure the containerized deployment of UniTrack's microservices architecture**

## 📦 Docker Compose Configuration

Create your `docker-compose.yml` file with the following configuration:

```yaml
version: "3.8"

services:
  # 🗄️ PostgreSQL Database - Main data storage
  unitrack-db:
    image: postgres:alpine
    container_name: UniTrackRemaster.Database
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: UniTrackRemaster
    ports:
      - "5434:5432" # External access on port 5434
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  # 🧠 Qdrant Vector Database - AI/ML features
  qdrant:
    image: qdrant/qdrant:latest
    container_name: UniTrackRemaster.Qdrant
    ports:
      - "6333:6333" # REST API
      - "6334:6334" # gRPC API
    volumes:
      - qdrant_storage:/qdrant/storage
    environment:
      - QDRANT__SERVICE__HTTP_PORT=6333
      - QDRANT__SERVICE__GRPC_PORT=6334
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 512M

  # 🤖 Ollama AI Models - Local LLM hosting
  ollama:
    image: ollama/ollama:latest
    container_name: UniTrackRemaster.Ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
      resources:
        limits:
          memory: 8G # AI models need significant RAM
        reservations:
          memory: 1G

  # ⚙️ .NET Backend API - Business logic (2 replicas for HA)
  unitrack-backend:
    build:
      context: .
      dockerfile: UniTrackRemasterBackend/Dockerfile
    image: ${REGISTRY_URL}/unitrack-backend:${VERSION:-latest}
    secrets:
      - firebase_credentials
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - FirebaseCredentials__CredentialsPath=/run/secrets/firebase_credentials
      - ASPNETCORE_URLS=http://+:5086
      - QDRANT_URL=http://qdrant:6333
      - OLLAMA_URL=http://ollama:11434
      - ConnectionStrings__Database=${DATABASE_CONNECTION_STRING}
      - Jwt__Key=${JWT_SECRET_KEY}
      - Gmail__EmailAddress=${GMAIL_EMAIL}
      - Gmail__OAuth2__ClientId=${GMAIL_CLIENT_ID}
      - Gmail__OAuth2__ClientSecret=${GMAIL_CLIENT_SECRET}
      - Gmail__OAuth2__RefreshToken=${GMAIL_REFRESH_TOKEN}
    networks:
      - app-network
    depends_on:
      - unitrack-db
      - qdrant
      - ollama
    deploy:
      replicas: 2 # High availability
      restart_policy:
        condition: any
        delay: 5s
      update_config:
        order: start-first # Zero-downtime deployment
        failure_action: rollback

  # 🎨 Nuxt.js Frontend - Progressive Web App
  unitrack-frontend:
    build:
      context: ./UniTrackRemasterFrontend
      dockerfile: Dockerfile
    image: ${REGISTRY_URL}/unitrack-frontend:${VERSION:-latest}
    container_name: UniTrackRemaster.Frontend
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_BASE_URL=/api
      - NUXT_PUBLIC_SOCKET_URL=${FRONTEND_SOCKET_URL}
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  # 🔄 NGINX Load Balancer - Reverse proxy & SSL termination
  nginx:
    image: nginx:latest
    container_name: UniTrackRemaster.LoadBalancer
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    ports:
      - "8080:443" # HTTPS
      - "8081:8081" # HTTP (for health checks)
    networks:
      - app-network
    depends_on:
      - unitrack-backend
      - unitrack-frontend
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  # 📊 Prometheus - Metrics collection
  prometheus:
    image: prom/prometheus:latest
    container_name: UniTrackRemaster.Prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    ports:
      - "9090:9090"
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  # 📈 Grafana - Monitoring dashboards
  grafana:
    image: grafana/grafana:latest
    container_name: UniTrackRemaster.Grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_ADMIN_PASSWORD:-admin}
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

# 💾 Persistent Data Volumes
volumes:
  db_data:
    driver: local
  qdrant_storage:
    driver: local
  ollama_data:
    driver: local
  grafana_data:
    driver: local

# 🌐 Container Networking
networks:
  app-network:
    driver: overlay
    attachable: true

# 🔐 Docker Secrets Management
secrets:
  firebase_credentials:
    file: ./UniTrackRemasterBackend/unitrack-firebase-credentials.json
```

---

## 🔧 Environment Variables Template

Create a `.env` file in your project root:

```bash
# 🏭 Deployment Configuration
REGISTRY_URL=localhost:5000
VERSION=latest
COMPOSE_PROJECT_NAME=unitrack

# 🗄️ Database Configuration
POSTGRES_USER=unitrack_user
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_CONNECTION_STRING=Host=unitrack-db;Port=5432;Database=UniTrackRemaster;Username=unitrack_user;Password=your_secure_password_here

# 🔐 JWT Authentication
JWT_SECRET_KEY=your_256_bit_secret_key_here_make_it_long_and_random

# 📧 Gmail OAuth2 Configuration (for email notifications)
GMAIL_EMAIL=your-app-email@gmail.com
GMAIL_CLIENT_ID=your_gmail_client_id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token

# 🎨 Frontend Configuration
FRONTEND_SOCKET_URL=wss://your-domain.com

# 📊 Monitoring
GRAFANA_ADMIN_PASSWORD=your_grafana_password

# 🔒 SSL Configuration (for production)
SSL_CERT_PATH=./ssl/cert.pem
SSL_KEY_PATH=./ssl/key.pem
```

---

## 🔄 NGINX Configuration

Create `nginx.conf` for load balancing and SSL termination:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        least_conn;
        server unitrack-backend:5086 max_fails=3 fail_timeout=30s;
        # Docker Swarm will load balance between backend replicas
    }

    upstream frontend {
        server unitrack-frontend:3000 max_fails=3 fail_timeout=30s;
    }

    # HTTP to HTTPS redirect
    server {
        listen 8081;
        server_name _;
        return 301 https://$host:8080$request_uri;
    }

    # Main HTTPS server
    server {
        listen 443 ssl http2;
        server_name _;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_private_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Security headers
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # API routes
        location /api/ {
            proxy_pass http://backend/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # WebSocket support for SignalR
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_cache_bypass $http_upgrade;
        }

        # Frontend routes
        location / {
            proxy_pass http://frontend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

---

## 📊 Prometheus Configuration

Create `prometheus.yml` for metrics collection:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  # Add alerting rules here if needed

scrape_configs:
  # UniTrack Backend API metrics
  - job_name: "unitrack-backend"
    static_configs:
      - targets: ["unitrack-backend:5086"]
    metrics_path: "/metrics"
    scrape_interval: 10s

  # PostgreSQL metrics (if exporter is added)
  - job_name: "postgres"
    static_configs:
      - targets: ["unitrack-db:5432"]
    scrape_interval: 30s

  # Prometheus self-monitoring
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  # NGINX metrics (if exporter is added)
  - job_name: "nginx"
    static_configs:
      - targets: ["nginx:8081"]
    scrape_interval: 15s
```

---

## 🚀 Deployment Commands

### Development Deployment

```bash
# Start development environment
docker-compose up -d

# View logs in real-time
docker-compose logs -f unitrack-backend

# Scale backend for testing
docker-compose up -d --scale unitrack-backend=3
```

### Production Deployment with Docker Swarm

```bash
# Initialize Docker Swarm (if not already done)
docker swarm init

# Deploy the stack
docker stack deploy -c docker-compose.yml unitrack

# Check service status
docker service ls

# Scale a specific service
docker service scale unitrack_unitrack-backend=3

# Update a service with zero downtime
docker service update --image unitrack-backend:v2.0 unitrack_unitrack-backend
```

### Monitoring & Maintenance

```bash
# View service logs
docker service logs -f unitrack_unitrack-backend

# Check resource usage
docker stats

# Remove the entire stack
docker stack rm unitrack

# Prune unused resources
docker system prune -a
```

---

## 🔍 Health Checks & Verification

### Service Health Verification

```bash
# Check all services are healthy
docker service ps unitrack_unitrack-backend --no-trunc

# Test database connectivity
docker exec -it $(docker ps -q -f name=unitrack-db) psql -U unitrack_user -d UniTrackRemaster -c "SELECT version();"

# Test API endpoint
curl -k https://localhost:8080/api/health

# Test Qdrant vector database
curl http://localhost:6333/health

# Test Ollama AI service
curl http://localhost:11434/api/version
```

### Performance Monitoring

```bash
# View Prometheus metrics
curl http://localhost:9090/api/v1/query?query=up

# Access Grafana dashboard
open http://localhost:3001
# Login: admin / admin (or your custom password)
```

---

## 🔐 Required Files & Credentials

### SSL Certificates (Required for HTTPS)

```bash
# For development - generate self-signed certificates
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

# For production - use Let's Encrypt or your CA
# Place your certificates in:
# - ssl/cert.pem (certificate)
# - ssl/key.pem (private key)
```

### Firebase Service Account (Required for File Storage)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Project Settings → Service Accounts
3. Generate new private key
4. Save as `UniTrackRemasterBackend/unitrack-firebase-credentials.json`

### Docker Registry (Optional - for private images)

```bash
# Set up local registry for private deployment
docker run -d -p 5000:5000 --name registry registry:2

# Tag and push images
docker tag unitrack-backend localhost:5000/unitrack-backend:latest
docker push localhost:5000/unitrack-backend:latest
```

---

## 🐛 Troubleshooting

### Common Issues

**Services not starting:**

```bash
# Check Docker Swarm status
docker node ls

# Verify network connectivity
docker network ls
docker network inspect unitrack_app-network
```

**Database connection failed:**

```bash
# Check PostgreSQL logs
docker service logs unitrack_unitrack-db

# Test connection manually
docker run --rm -it --network unitrack_app-network postgres:alpine \
  psql -h unitrack-db -U unitrack_user -d UniTrackRemaster
```

**SSL certificate issues:**

```bash
# Verify certificate format
openssl x509 -in ssl/cert.pem -text -noout

# Test SSL connection
openssl s_client -connect localhost:8080
```

**High memory usage:**

```bash
# Check resource consumption
docker stats

# Reduce Ollama memory if needed (edit docker-compose.yml)
# Change: memory: 4G (instead of 8G)
```

---

## ✅ Validation Checklist

- [ ] Docker and Docker Compose installed
- [ ] `.env` file configured with all required variables
- [ ] SSL certificates generated and placed in `ssl/` directory
- [ ] Firebase credentials JSON file placed correctly
- [ ] NGINX configuration file created
- [ ] Prometheus configuration file created
- [ ] Docker Swarm initialized (for production)
- [ ] All services start successfully
- [ ] Health checks pass for all services
- [ ] Application accessible via HTTPS

**Next Step:** [Configure Backend API](./backend-setup.md) →
