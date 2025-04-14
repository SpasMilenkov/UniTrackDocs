# 🐳 Docker Production Setup

This guide provides detailed instructions for deploying UniTrack in a production environment using Docker Swarm for high availability and scalability.

## 🌟 Features of the Production Setup

The production deployment includes:

- **Docker Swarm** for orchestration and high availability
- **Replicated backend services** for load balancing and redundancy
- **Nginx** as a reverse proxy and load balancer
- **Prometheus** for monitoring
- **Grafana** for visualization and dashboards
- **Local registry** for Docker images

## 📋 Prerequisites

Before starting, ensure you have:

- Docker Engine installed (version 20.10.0+)
- Docker Swarm initialized
- SSL certificates (for HTTPS)
- Firebase credentials file (for notifications)
- At least 8GB RAM and 4 CPU cores recommended

## 🔧 Step 1: Initialize Docker Swarm

If you haven't already initialized a Docker Swarm, run:

```bash
docker swarm init --advertise-addr <YOUR-IP-ADDRESS>
```

Replace `<YOUR-IP-ADDRESS>` with your server's IP address.

## 🏭 Step 2: Set Up Local Registry

The deployment uses a local Docker registry to store images:

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

## 🔐 Step 3: Prepare Firebase Credentials

Place your Firebase credentials JSON file at:

```
./UniTrackRemasterBackend/unitrack-firebase-credentials.json
```

This will be mounted as a Docker secret.

## 📄 Step 4: Configure Docker Compose File

The production setup uses a comprehensive Docker Compose file:

```yaml
version: "3.8"
services:
  unitrack-db:
    image: postgres:alpine
    container_name: UniTrackRemaster.Database
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin # Change this in production!
      POSTGRES_DB: UniTrackRemaster
    ports:
      - "5434:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  unitrack-backend:
    build:
      context: .
      dockerfile: UniTrackRemasterBackend/Dockerfile
    image: localhost:5000/unitrack-backend:latest
    secrets:
      - firebase_credentials
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - FirebaseCredentials__CredentialsPath=/run/secrets/firebase_credentials
      - ASPNETCORE_URLS=http://+:5086
    networks:
      - app-network
    depends_on:
      - unitrack-db
    deploy:
      replicas: 2
      restart_policy:
        condition: any
        delay: 5s
      update_config:
        order: start-first
        failure_action: rollback

  unitrack-frontend:
    build:
      context: ./UniTrackRemasterFrontend
      dockerfile: Dockerfile
    image: localhost:5000/unitrack-frontend:latest
    container_name: UniTrackRemaster.Frontend
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_BASE_URL=/api
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  nginx:
    image: nginx:latest
    container_name: UniTrackRemaster.LoadBalancer
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    ports:
      - "8080:443"
      - "8081:8081"
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  prometheus:
    image: prom/prometheus:latest
    container_name: UniTrackRemaster.Prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  grafana:
    image: grafana/grafana:latest
    container_name: UniTrackRemaster.Grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin # Change this in production!
    networks:
      - app-network
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

volumes:
  db_data:

networks:
  app-network:
    driver: overlay

secrets:
  firebase_credentials:
    file: ./UniTrackRemasterBackend/unitrack-firebase-credentials.json
```

:::warning
Be sure to change default passwords in the production environment!
:::

## 📜 Step 5: Create Deployment Script

Create a file named `build_and_deploy.sh`:

```bash
#!/bin/bash
# Exit immediately if a command fails
set -e

# Define variables
LOCAL_REGISTRY="localhost:5000"
BACKEND_DIR="./UniTrackRemasterBackend"
FRONTEND_DIR="./UniTrackRemasterFrontend"
BACKEND_IMAGE_NAME="unitrack-backend"
FRONTEND_IMAGE_NAME="unitrack-frontend"
STACK_FILE="docker-compose.yml"
STACK_NAME="unitrack-stack"

# Checking if the container is running, prevents issues with replicas exceeding limit
is_container_running() {
  docker ps --filter "name=$1" --filter "status=running" -q
}

# Step 1: Check and Start Docker Registry
echo "Checking if local Docker registry is running..."
if [[ $(is_container_running "registry") ]]; then
  echo "Local Docker registry is already running."
else
  echo "Starting local Docker registry..."
  docker run -d -p 5000:5000 --restart=always --name registry registry:2
fi

# Step 2: Build and Push Backend Image
echo "Building backend image..."
if [[ -f "$BACKEND_DIR/Dockerfile" ]]; then
  docker build -t $LOCAL_REGISTRY/$BACKEND_IMAGE_NAME $BACKEND_DIR
  echo "Pushing backend image to local registry..."
  docker push $LOCAL_REGISTRY/$BACKEND_IMAGE_NAME
else
  echo "Error: Dockerfile not found in $BACKEND_DIR"
  exit 1
fi

# Step 3: Build and Push Frontend Image
echo "Building frontend image..."
if [[ -f "$FRONTEND_DIR/Dockerfile" ]]; then
  docker build -t $LOCAL_REGISTRY/$FRONTEND_IMAGE_NAME $FRONTEND_DIR
  echo "Pushing frontend image to local registry..."
  docker push $LOCAL_REGISTRY/$FRONTEND_IMAGE_NAME
else
  echo "Error: Dockerfile not found in $FRONTEND_DIR"
  exit 1
fi

# Step 4: Deploy the Docker Stack
echo "Deploying the stack..."
docker stack deploy -c $STACK_FILE $STACK_NAME

# Step 5: Verify Deployment
echo "Verifying deployment..."
docker stack services $STACK_NAME

echo "Deployment complete!"
echo "Access your frontend via http://<your-machine-ip>"
echo "Access Prometheus via http://<your-machine-ip>:9090"
echo "Access Grafana via http://<your-machine-ip>:3001"
```

Make the script executable:

```bash
chmod +x build_and_deploy.sh
```

## 🔄 Step 6: Deploy the Stack

Run the deployment script:

```bash
./build_and_deploy.sh
```

This will:

1. Check and start the local registry if needed
2. Build and push the backend image
3. Build and push the frontend image
4. Deploy the application stack
5. Verify the deployment

## 🔍 Step 7: Verify Deployment

Check the status of your services:

```bash
docker stack services unitrack-stack
```

Ensure all services show the desired number of replicas.

## 🌐 Step 8: Access Your Application

After deployment, you can access:

- **UniTrack Application**: https://your-server-ip:8080
- **Prometheus**: http://your-server-ip:9090
- **Grafana**: http://your-server-ip:3001 (default login: admin/admin)

## 🧰 Maintenance Tasks

### Updating the Application

To update your deployment after code changes:

```bash
./build_and_deploy.sh
```

### Scaling Services

To scale backend services:

```bash
docker service scale unitrack-stack_unitrack-backend=4
```

### Viewing Logs

To view logs for a service:

```bash
docker service logs unitrack-stack_unitrack-backend
```

## 🚨 Troubleshooting

For common issues and solutions, see the [Troubleshooting](/en/setup/troubleshooting) section.

## 📌 Next Steps

After completing the production setup:

1. [Configure your application](/en/setup/config)
2. Set up monitoring alerts in Grafana
3. Implement regular database backups
4. Review security best practices
