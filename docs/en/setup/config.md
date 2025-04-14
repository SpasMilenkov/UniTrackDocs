# ⚙️ Configuration Options

This guide details all the configuration options available for UniTrack, helping you customize the system to your specific needs.

## 🔐 Environment Variables

UniTrack uses environment variables for configuration. These can be set in your Docker Compose file, `.env` file, or directly in your environment.

### Backend Environment Variables

| Variable                               | Description                                  | Default                  | Required |
| -------------------------------------- | -------------------------------------------- | ------------------------ | -------- |
| `ASPNETCORE_ENVIRONMENT`               | Runtime environment (Development/Production) | `Production`             | Yes      |
| `ASPNETCORE_URLS`                      | URLs to bind the HTTP server                 | `http://+:5086`          | Yes      |
| `ConnectionStrings__DefaultConnection` | Database connection string                   | (None)                   | Yes      |
| `JWT__ValidAudience`                   | JWT token valid audience                     | `https://localhost:5086` | No       |
| `JWT__ValidIssuer`                     | JWT token valid issuer                       | `https://localhost:5086` | No       |
| `JWT__Secret`                          | JWT token signing key                        | (None)                   | Yes      |
| `JWT__ExpiryMinutes`                   | JWT token expiry in minutes                  | `120`                    | No       |
| `CORS__AllowedOrigins`                 | Comma-separated list of allowed CORS origins | `*`                      | No       |
| `FirebaseCredentials__CredentialsPath` | Path to Firebase credentials file            | (None)                   | Yes\*    |
| `Email__SmtpServer`                    | SMTP server for sending emails               | (None)                   | No       |
| `Email__SmtpPort`                      | SMTP port                                    | `587`                    | No       |
| `Email__SenderEmail`                   | Sender email address                         | (None)                   | No       |
| `Email__SenderName`                    | Sender name                                  | `UniTrack`               | No       |
| `Email__Password`                      | SMTP password                                | (None)                   | No       |
| `Logging__LogLevel__Default`           | Default log level                            | `Information`            | No       |
| `Metrics__Enabled`                     | Enable Prometheus metrics                    | `true`                   | No       |

\* Required if you want to use Firebase features like notifications

### Frontend Environment Variables

| Variable                           | Description               | Default    | Required |
| ---------------------------------- | ------------------------- | ---------- | -------- |
| `NUXT_PUBLIC_API_BASE_URL`         | Base URL for API requests | `/api`     | Yes      |
| `NUXT_PUBLIC_APP_NAME`             | Application name          | `UniTrack` | No       |
| `NUXT_PUBLIC_ENVIRONMENT`          | Environment (dev/prod)    | `prod`     | No       |
| `NUXT_PUBLIC_FIREBASE_API_KEY`     | Firebase API key          | (None)     | No\*     |
| `NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain      | (None)     | No\*     |
| `NUXT_PUBLIC_FIREBASE_PROJECT_ID`  | Firebase project ID       | (None)     | No\*     |
| `NUXT_PUBLIC_FIREBASE_APP_ID`      | Firebase app ID           | (None)     | No\*     |

\* Required if you want to use Firebase features

## 📄 Configuration Files

### Nginx Configuration

For production deployments, you'll need to create an `nginx.conf` file. Below is the actual configuration used in UniTrack:

```nginx
worker_processes auto;
events {
    worker_connections 1024;
    multi_accept on;
}
http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression for faster responses
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Upstream definitions for Docker Swarm services
    upstream frontend {
        server unitrack-frontend:3000; # Match the service name and exposed port
    }
    upstream backend {
        server unitrack-backend:5086; # Match the service name and backend port
    }

    server {
        listen 8081;
        server_name unitrack.io;
        # Redirect all HTTP requests to HTTPS
        return 301 https://$server_name:8080$request_uri;
    }

    # HTTPS on port 443 (standard) and 8080
    # (8080 is here instead of 80 because docker desktop listens on 80 and it is messing up the connection.
    # On a real server there probably won't be a docker desktop)
    server {
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;
        server_name unitrack.io;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;

        # Proxy to frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Connection "";
        }

        # Proxy to backend with CORS handling
        location /api/ {
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' $http_origin always;
                add_header 'Access-Control-Allow-Credentials' 'true' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' '*' always;
                add_header 'Access-Control-Max-Age' 1728000;
                return 204;
            }
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            add_header 'Access-Control-Allow-Origin' $http_origin always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' '*' always;
        }

        error_page 404 /404.html;
        location = /404.html {
            root /usr/share/nginx/html;
            internal;
        }
    }
}
```

### Prometheus Configuration

Create a `prometheus.yml` file. Below is the actual configuration used in UniTrack which leverages DNS service discovery to automatically detect backend instances in Docker Swarm:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "backend"
    dns_sd_configs:
      - names:
          - "tasks.unitrack-backend"
        type: A
        port: 5086
    metrics_path: "/metrics"
```

This configuration uses Docker Swarm DNS service discovery to automatically find all running instances of the backend service, making it ideal for a scaled deployment with multiple replicas.

## 🗃️ Database Configuration

### Connection String Format

The PostgreSQL connection string format is:

```
Host=hostname;Port=5432;Database=database_name;Username=username;Password=password
```

### Database Migrations

UniTrack uses Entity Framework Core migrations. They run automatically on application startup, but you can also run them manually:

```bash
cd UniTrackRemasterBackend
dotnet ef database update
```

To create a new migration:

```bash
dotnet ef migrations add MigrationName
```

## 🔒 Security Configuration

### SSL Certificates

For production, place your SSL certificates in the `./ssl` directory:

- `server.crt` - SSL certificate
- `server.key` - SSL private key

You can generate self-signed certificates for testing:

```bash
mkdir -p ./ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./ssl/server.key -out ./ssl/server.crt
```

### JWT Configuration

The JWT configuration controls authentication:

```json
{
  "JWT": {
    "ValidAudience": "https://yourdomain.com",
    "ValidIssuer": "https://yourdomain.com",
    "Secret": "your-strong-secret-key-at-least-32-characters",
    "ExpiryMinutes": 120
  }
}
```

Generate a strong secret key:

```bash
openssl rand -base64 32
```

## 🔍 Logging Configuration

Configure logging levels in `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

## 📊 Monitoring Configuration

### Grafana Dashboards

After setup, import dashboards in Grafana:

1. Go to `http://your-server-ip:3001`
2. Log in with username `admin` and password `admin`
3. Go to Dashboards > Import
4. Upload the JSON dashboard file from the `monitoring/dashboards` directory

### Alert Configuration

To configure alerts:

1. In Grafana, go to Alerting > Notification channels
2. Add channels for email, Slack, or other integrations
3. Create alert rules in the dashboard settings

## 🚀 Advanced Configuration

### Scaling Configuration

To configure backend service scaling:

```yaml
deploy:
  replicas: 4 # Adjust based on your load
  resources:
    limits:
      cpus: "0.5"
      memory: 512M
    reservations:
      cpus: "0.25"
      memory: 256M
```

### Redis Cache (Optional)

To add Redis caching:

```yaml
unitrack-redis:
  image: redis:alpine
  container_name: UniTrackRemaster.Redis
  ports:
    - "6379:6379"
  networks:
    - app-network
```

And update the backend environment:

```yaml
environment:
  - Redis__ConnectionString=unitrack-redis:6379
  - Redis__Enabled=true
```

## 📌 Common Configuration Scenarios

### Multi-Institution Setup

To configure for multiple institutions:

```yaml
environment:
  - Features__MultiTenancy=true
  - Features__SubdomainRoutingEnabled=true
```

### LDAP Authentication

To enable LDAP authentication:

```yaml
environment:
  - LDAP__Enabled=true
  - LDAP__Server=ldap://your-ldap-server
  - LDAP__Port=389
  - LDAP__BindDN=cn=admin,dc=example,dc=com
  - LDAP__BindPassword=password
  - LDAP__SearchBase=dc=example,dc=com
  - LDAP__SearchFilter=(uid={0})
```

### Email Notifications

To configure email notifications:

```yaml
environment:
  - Email__Enabled=true
  - Email__SmtpServer=smtp.example.com
  - Email__SmtpPort=587
  - Email__SenderEmail=noreply@example.com
  - Email__SenderName=UniTrack Notifications
  - Email__Password=your-smtp-password
  - Email__EnableSsl=true
```

## 🔍 Verifying Configuration

To verify your configuration:

1. Check container logs:

   ```bash
   docker service logs unitrack-stack_unitrack-backend
   ```

2. Access the health endpoint:

   ```
   https://your-server-ip:8080/api/health
   ```

3. Check Prometheus metrics:
   ```
   http://your-server-ip:9090/metrics
   ```
