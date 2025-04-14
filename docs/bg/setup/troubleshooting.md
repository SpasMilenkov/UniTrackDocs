# 🔧 Troubleshooting

This guide provides solutions to common issues you might encounter when setting up or running UniTrack.

## 🐳 Docker Swarm Issues

### Service Won't Start or Keeps Restarting

**Symptoms:**

- Services show `0/1` replicas in `docker stack services`
- Containers constantly restart

**Solutions:**

1. Check container logs:

   ```bash
   docker service logs unitrack-stack_unitrack-backend
   ```

2. Verify resource constraints:

   ```bash
   docker info | grep Resources
   ```

   Make sure your host has enough memory and CPU.

3. Check for port conflicts:

   ```bash
   netstat -tuln
   ```

   Ensure ports 5432, 5086, 3000, 8080, 9090, and 3001 are not in use by other applications.

4. Restart Docker:
   ```bash
   systemctl restart docker
   ```

### Registry Connection Issues

**Symptoms:**

- `no basic auth credentials` error
- `unauthorized: authentication required` error

**Solutions:**

1. Verify the registry is running:

   ```bash
   docker ps | grep registry
   ```

2. Check if you can push to the registry:

   ```bash
   docker tag hello-world localhost:5000/hello-world
   docker push localhost:5000/hello-world
   ```

3. Restart the registry:
   ```bash
   docker restart registry
   ```

## 💾 Database Issues

### Connection Failures

**Symptoms:**

- `Connection refused` errors in backend logs
- `Unable to connect to PostgreSQL` errors

**Solutions:**

1. Check if PostgreSQL is running:

   ```bash
   docker ps | grep postgres
   ```

2. Verify PostgreSQL logs:

   ```bash
   docker logs UniTrackRemaster.Database
   ```

3. Test the connection:

   ```bash
   docker exec -it UniTrackRemaster.Database psql -U postgres -d UniTrackRemaster -c "SELECT 1"
   ```

4. Recreate the database container:
   ```bash
   docker rm -f UniTrackRemaster.Database
   docker stack deploy -c docker-compose.yml unitrack-stack
   ```

### Migration Errors

**Symptoms:**

- `Migration failed` errors
- Database schema errors in logs

**Solutions:**

1. Reset the database (⚠️ will lose data):

   ```bash
   docker exec -it UniTrackRemaster.Database psql -U postgres -c "DROP DATABASE \"UniTrackRemaster\""
   docker exec -it UniTrackRemaster.Database psql -U postgres -c "CREATE DATABASE \"UniTrackRemaster\""
   ```

2. Apply migrations manually:
   ```bash
   docker exec -it UniTrackRemaster.Backend dotnet ef database update
   ```

## 🔒 Authentication Issues

### JWT Validation Fails

**Symptoms:**

- `Invalid token` errors
- Users can't log in
- `401 Unauthorized` responses

**Solutions:**

1. Check JWT configuration:

   ```bash
   docker exec -it UniTrackRemaster.Backend cat /app/appsettings.json | grep JWT
   ```

2. Verify that JWT secret is properly set in environment:

   ```bash
   docker exec -it UniTrackRemaster.Backend printenv | grep JWT
   ```

3. Clear browser cookies and local storage

### Firebase Authentication Issues

**Symptoms:**

- Push notifications not working
- Firebase-related errors in logs

**Solutions:**

1. Verify Firebase credentials:

   ```bash
   docker exec -it UniTrackRemaster.Backend ls -la /run/secrets/
   ```

2. Check if the credentials file is mounted correctly:

   ```bash
   docker exec -it UniTrackRemaster.Backend cat /run/secrets/firebase_credentials | head -5
   ```

3. Update Firebase credentials and redeploy

## 🌐 Network Issues

### Nginx Configuration Problems

**Symptoms:**

- `502 Bad Gateway` errors
- `Connection refused` when accessing frontend

**Solutions:**

1. Check Nginx configuration:

   ```bash
   docker exec -it UniTrackRemaster.LoadBalancer nginx -t
   ```

2. Verify Nginx logs:

   ```bash
   docker exec -it UniTrackRemaster.LoadBalancer cat /var/log/nginx/error.log
   ```

3. Test backend connectivity from Nginx:

   ```bash
   docker exec -it UniTrackRemaster.LoadBalancer curl unitrack-backend:5086/health
   ```

4. Restart Nginx:
   ```bash
   docker exec -it UniTrackRemaster.LoadBalancer nginx -s reload
   ```

### CORS Issues

**Symptoms:**

- Browser console errors about CORS
- API requests fail in frontend but work in tools like Postman

**Solutions:**

1. Check backend CORS configuration:

   ```bash
   docker exec -it UniTrackRemaster.Backend cat /app/appsettings.json | grep -A 10 CORS
   ```

2. Update CORS settings in environment variables:

   ```yaml
   environment:
     - CORS__AllowedOrigins=https://your-domain.com,http://localhost:3000
   ```

3. Restart the backend service:
   ```bash
   docker service update --force unitrack-stack_unitrack-backend
   ```

## 💻 Frontend Issues

### Build Failures

**Symptoms:**

- `Failed to compile` errors
- White screen in browser

**Solutions:**

1. Check frontend build logs:

   ```bash
   docker service logs unitrack-stack_unitrack-frontend
   ```

2. Clean node_modules and rebuild:

   ```bash
   cd UniTrackRemasterFrontend
   rm -rf node_modules
   npm install
   npm run build
   ```

3. Rebuild frontend image:
   ```bash
   docker build -t localhost:5000/unitrack-frontend:latest ./UniTrackRemasterFrontend
   docker push localhost:5000/unitrack-frontend:latest
   docker service update --force unitrack-stack_unitrack-frontend
   ```

### API Connection Issues

**Symptoms:**

- "Failed to fetch" errors in console
- API requests timing out

**Solutions:**

1. Verify API URL configuration:

   ```bash
   docker exec -it UniTrackRemaster.Frontend env | grep API_BASE_URL
   ```

2. Test API connectivity:

   ```bash
   curl -I http://localhost:5086/health
   ```

3. Update the API base URL environment variable:
   ```yaml
   environment:
     - NUXT_PUBLIC_API_BASE_URL=http://unitrack-backend:5086
   ```

## 📊 Monitoring Issues

### Prometheus/Grafana Connection Problems

**Symptoms:**

- No data in Grafana dashboards
- "No data points" errors

**Solutions:**

1. Check Prometheus configuration:

   ```bash
   docker exec -it UniTrackRemaster.Prometheus cat /etc/prometheus/prometheus.yml
   ```

2. Verify Prometheus can scrape targets:

   ```bash
   curl http://localhost:9090/api/v1/targets
   ```

3. Test metrics endpoint:

   ```bash
   curl http://unitrack-backend:5086/metrics
   ```

4. Restart monitoring services:
   ```bash
   docker service update --force unitrack-stack_prometheus
   docker service update --force unitrack-stack_grafana
   ```

## 🚀 Deployment Script Issues

### Build and Deploy Script Fails

**Symptoms:**

- Script exits with error
- Images not being pushed to registry

**Solutions:**

1. Run script with debugging:

   ```bash
   bash -x build_and_deploy.sh
   ```

2. Check Docker daemon status:

   ```bash
   systemctl status docker
   ```

3. Verify Docker Swarm status:

   ```bash
   docker node ls
   ```

4. Try running commands manually:
   ```bash
   docker build -t localhost:5000/unitrack-backend ./UniTrackRemasterBackend
   docker push localhost:5000/unitrack-backend
   ```

## 🌡️ Performance Issues

### Slow Application Response

**Symptoms:**

- Long load times
- Timeout errors

**Solutions:**

1. Check container resources:

   ```bash
   docker stats
   ```

2. Look for database performance issues:

   ```bash
   docker exec -it UniTrackRemaster.Database psql -U postgres -d UniTrackRemaster -c "SELECT * FROM pg_stat_activity"
   ```

3. Increase resources for services:

   ```yaml
   deploy:
     resources:
       limits:
         cpus: "1"
         memory: 1G
   ```

4. Scale backend services:
   ```bash
   docker service scale unitrack-stack_unitrack-backend=3
   ```

## 🧪 Development Environment Issues

### Hot Reload Not Working

**Symptoms:**

- Changes not reflected in browser
- Need to manually restart containers

**Solutions:**

1. Check volume mounts:

   ```bash
   docker-compose -f docker-compose.dev.yml config
   ```

2. Enable polling:

   ```bash
   # For frontend (in .env)
   CHOKIDAR_USEPOLLING=true

   # For backend
   dotnet watch run --project YourProject.csproj
   ```

3. Restart development containers:
   ```bash
   docker-compose -f docker-compose.dev.yml restart
   ```

## 📑 Logs and Diagnostics

### Collecting Diagnostic Information

If you need to provide information for support:

1. Collect Docker service status:

   ```bash
   docker stack services unitrack-stack > docker-status.txt
   ```

2. Gather container logs:

   ```bash
   docker service logs unitrack-stack_unitrack-backend > backend-logs.txt
   docker service logs unitrack-stack_unitrack-frontend > frontend-logs.txt
   docker service logs unitrack-stack_unitrack-db > db-logs.txt
   ```

3. Check system resources:

   ```bash
   docker info > docker-info.txt
   free -m > memory-info.txt
   df -h > disk-info.txt
   ```

4. Create a support bundle:
   ```bash
   tar -czf unitrack-diagnostics.tar.gz *.txt
   ```

## 📞 Getting Help

If you continue to experience issues:

1. Check the [GitHub Issues](https://github.com/SpasMilenkov/UniTrackRemaster/issues) for similar problems and solutions
2. File a new issue with detailed information about your problem

Remember to include:

- Exact error messages
- Steps to reproduce
- Version information
- Environment details
