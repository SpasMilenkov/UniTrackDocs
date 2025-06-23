# ⚙️ Backend API Configuration

> **Configure the .NET Core API with all required integrations and services**

## 🏗️ Backend Architecture Overview

The UniTrack backend is built with .NET 8.0 and provides:

- **🔐 JWT Authentication** with role-based authorization
- **📊 RESTful API** with OpenAPI/Swagger documentation
- **🤖 AI Integration** with Ollama and Qdrant vector database
- **📧 Email Services** via Gmail OAuth2 or Mailtrap
- **📁 File Storage** through Firebase Cloud Storage
- **⚡ Real-time Communication** using SignalR
- **📈 Metrics & Monitoring** with Prometheus integration

---

## 📋 Configuration Files Structure

```
UniTrackRemasterBackend/
├── appsettings.json                     # 🔧 Base configuration
├── appsettings.Development.json         # 🛠️ Development overrides
├── appsettings.Production.json          # 🏭 Production overrides
├── unitrack-firebase-credentials.json   # 🔐 Firebase service account
├── Dockerfile
└── Templates/                           # 📧 Email templates
    ├── WelcomeEmail.html
    └── PasswordReset.html
```

---

## 🔧 Base Configuration Template

### `appsettings.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Transaction": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Warning",
      "Microsoft": "Warning",
      "System": "Warning"
    }
  },
  "AllowedHosts": "*",

  // 🌐 Server Configuration
  "Kestrel": {
    "EndPoints": {
      "Http": {
        "Url": "http://*:5086"
      }
    }
  },

  // 🗄️ Database Connections
  "ConnectionStrings": {
    "Database": "REPLACE_WITH_POSTGRES_CONNECTION_STRING",
    "Qdrant": "http://qdrant:6333"
  },

  // 🔐 JWT Authentication Settings
  "Jwt": {
    "Key": "REPLACE_WITH_256_BIT_SECRET_KEY",
    "Issuer": "https://your-domain.com",
    "Audience": "https://your-domain.com",
    "ExpireMinutes": 60,
    "RefreshTokenExpireDays": 7
  },

  // 📧 Email Configuration (Gmail OAuth2)
  "Gmail": {
    "EmailAddress": "your-app-email@gmail.com",
    "OAuth2": {
      "ClientId": "your_gmail_client_id.apps.googleusercontent.com",
      "ClientSecret": "REPLACE_WITH_GMAIL_CLIENT_SECRET",
      "RefreshToken": "REPLACE_WITH_GMAIL_REFRESH_TOKEN"
    }
  },

  // 📧 Alternative: Mailtrap (for development/testing)
  "Mailtrap": {
    "Host": "sandbox.smtp.mailtrap.io",
    "Port": 587,
    "Username": "REPLACE_WITH_MAILTRAP_USERNAME",
    "Password": "REPLACE_WITH_MAILTRAP_PASSWORD",
    "FromEmail": "noreply@unitrack.edu",
    "FromName": "UniTrack Education Platform"
  },

  // 📁 Firebase Cloud Storage
  "FirebaseCredentials": {
    "CredentialsPath": "unitrack-firebase-credentials.json",
    "BucketPath": "your-firebase-project.appspot.com"
  },

  // 🧠 Qdrant Vector Database Settings
  "QdrantSettings": {
    "Host": "qdrant",
    "Port": 6334,
    "ApiKey": null,
    "UseTls": false,
    "CollectionName": "unitrack_embeddings",
    "VectorSize": 768
  },

  // 🤖 Ollama AI Model Settings
  "OllamaSettings": {
    "BaseUrl": "http://ollama:11434",
    "EmbeddingModel": "nomic-embed-text",
    "ChatModel": "llama3.2:3b",
    "EmbeddingDimensions": 768,
    "MaxTokens": 2048,
    "Temperature": 0.7,
    "RequestTimeout": 300
  },

  // 📧 Email Template Settings
  "TemplateSettings": {
    "Source": "Embedded",
    "LocalPath": "Templates"
  },

  // 🔄 Email Processing
  "EmailProcessing": {
    "TargetEmailAddress": "admin@your-domain.com",
    "ProcessingInterval": "00:05:00",
    "MaxRetryAttempts": 3
  },

  // 🌐 Frontend Integration
  "FrontendUrl": "https://your-domain.com",
  "CorsOrigins": ["https://your-domain.com", "https://localhost:3000"],

  // 🛠️ Development Settings
  "DataSeeding": false,
  "DetailedErrorMessages": false,

  // 📊 Rate Limiting
  "RateLimiting": {
    "EnableLimiting": true,
    "GeneralRules": [
      {
        "Endpoint": "*",
        "Period": "1m",
        "Limit": 60
      },
      {
        "Endpoint": "*/api/auth/*",
        "Period": "1m",
        "Limit": 10
      }
    ]
  },

  // 📈 Monitoring & Health Checks
  "HealthChecks": {
    "Database": true,
    "Qdrant": true,
    "Ollama": true,
    "Firebase": true
  }
}
```

---

## 🛠️ Development Configuration Override

### `appsettings.Development.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },

  // 🗄️ Local Development Database
  "ConnectionStrings": {
    "Database": "Host=localhost;Port=5434;Database=UniTrackRemaster;Username=unitrack_user;Password=dev_password_123",
    "Qdrant": "http://localhost:6333"
  },

  // 🔐 Development JWT (shorter expiry for testing)
  "Jwt": {
    "Key": "development_secret_key_for_testing_only_256_bits_long",
    "Issuer": "http://localhost:5086",
    "Audience": "http://localhost:3000",
    "ExpireMinutes": 30
  },

  // 📧 Use Mailtrap for development emails
  "Gmail": {
    "EmailAddress": "dev@localhost",
    "OAuth2": {
      "ClientId": "",
      "ClientSecret": "",
      "RefreshToken": ""
    }
  },

  "Mailtrap": {
    "Host": "sandbox.smtp.mailtrap.io",
    "Port": 587,
    "Username": "your_mailtrap_username",
    "Password": "your_mailtrap_password",
    "FromEmail": "dev@unitrack.localhost",
    "FromName": "UniTrack Development"
  },

  // 🤖 Local AI Services
  "QdrantSettings": {
    "Host": "localhost",
    "Port": 6334,
    "ApiKey": null,
    "UseTls": false
  },

  "OllamaSettings": {
    "BaseUrl": "http://localhost:11434",
    "EmbeddingModel": "nomic-embed-text",
    "ChatModel": "llama3.2:3b"
  },

  // 🌐 Local Frontend
  "FrontendUrl": "http://localhost:3000",
  "CorsOrigins": ["http://localhost:3000", "https://localhost:3000"],

  // 🛠️ Development Helpers
  "DataSeeding": true,
  "DetailedErrorMessages": true,

  // 📊 Relaxed Rate Limiting
  "RateLimiting": {
    "EnableLimiting": false
  }
}
```

---

## 🏭 Production Configuration Override

### `appsettings.Production.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Error",
      "Microsoft.EntityFrameworkCore": "Error",
      "UniTrack": "Information"
    }
  },

  // 🗄️ Production Database (use environment variables)
  "ConnectionStrings": {
    "Database": "${DATABASE_CONNECTION_STRING}",
    "Qdrant": "http://qdrant:6333"
  },

  // 🔐 Production JWT (from environment)
  "Jwt": {
    "Key": "${JWT_SECRET_KEY}",
    "Issuer": "${JWT_ISSUER}",
    "Audience": "${JWT_AUDIENCE}",
    "ExpireMinutes": 60
  },

  // 📧 Production Gmail (from environment)
  "Gmail": {
    "EmailAddress": "${GMAIL_EMAIL}",
    "OAuth2": {
      "ClientId": "${GMAIL_CLIENT_ID}",
      "ClientSecret": "${GMAIL_CLIENT_SECRET}",
      "RefreshToken": "${GMAIL_REFRESH_TOKEN}"
    }
  },

  // 📁 Production Firebase
  "FirebaseCredentials": {
    "CredentialsPath": "/run/secrets/firebase_credentials",
    "BucketPath": "${FIREBASE_BUCKET_PATH}"
  },

  // 🌐 Production Frontend
  "FrontendUrl": "${FRONTEND_URL}",
  "CorsOrigins": ["${FRONTEND_URL}", "${ADMIN_PANEL_URL}"],

  // 🛠️ Production Security
  "DataSeeding": false,
  "DetailedErrorMessages": false,

  // 📊 Strict Rate Limiting
  "RateLimiting": {
    "EnableLimiting": true,
    "GeneralRules": [
      {
        "Endpoint": "*",
        "Period": "1m",
        "Limit": 100
      },
      {
        "Endpoint": "*/api/auth/*",
        "Period": "1m",
        "Limit": 5
      }
    ]
  }
}
```

---

## 🔐 Required API Keys & Credentials

### 1. 🗄️ Database Configuration

**PostgreSQL Connection String:**

```
Host=unitrack-db;Port=5432;Database=UniTrackRemaster;Username=unitrack_user;Password=your_secure_password
```

**What you need:**

- Database host (container name: `unitrack-db`)
- Database name: `UniTrackRemaster`
- Username and password (set in Docker environment)

---

### 2. 🔐 JWT Authentication

**Generate a secure 256-bit key:**

```bash
# Generate random 256-bit key
openssl rand -base64 64 | tr -d "=+/" | cut -c1-64
```

**Required settings:**

- `Jwt.Key`: 256-bit secret key (keep secure!)
- `Jwt.Issuer`: Your domain (e.g., "https://unitrack.edu")
- `Jwt.Audience`: Same as issuer for simple setup

---

### 3. 📧 Gmail OAuth2 Setup (Recommended)

**Step-by-step Gmail OAuth2 setup:**

1. **Create Google Cloud Project:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Enable Gmail API

2. **Create OAuth2 Credentials:**

   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Add authorized redirect URI: `http://localhost:8080/oauth2callback`

3. **Get Authorization Code:**

   ```bash
   # Replace YOUR_CLIENT_ID with actual client ID
   https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:8080/oauth2callback&scope=https://www.googleapis.com/auth/gmail.send&response_type=code&access_type=offline&prompt=consent
   ```

4. **Exchange for Refresh Token:**
   ```bash
   curl -X POST https://oauth2.googleapis.com/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "code=AUTHORIZATION_CODE_FROM_STEP_3" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=http://localhost:8080/oauth2callback"
   ```

**Required values:**

- `Gmail.EmailAddress`: The Gmail account email
- `Gmail.OAuth2.ClientId`: From Google Cloud Console
- `Gmail.OAuth2.ClientSecret`: From Google Cloud Console
- `Gmail.OAuth2.RefreshToken`: From OAuth2 flow above

---

### 4. 📧 Mailtrap Setup (Development Alternative)

**For development/testing emails:**

1. **Create Mailtrap Account:**

   - Sign up at [Mailtrap.io](https://mailtrap.io/)
   - Create new inbox

2. **Get SMTP Credentials:**
   - Go to inbox → SMTP Settings
   - Copy credentials

**Required values:**

- `Mailtrap.Host`: Usually "sandbox.smtp.mailtrap.io"
- `Mailtrap.Port`: Usually 587
- `Mailtrap.Username`: From Mailtrap inbox
- `Mailtrap.Password`: From Mailtrap inbox

---

### 5. 📁 Firebase Cloud Storage Setup

**Step-by-step Firebase setup:**

1. **Create Firebase Project:**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project
   - Enable Storage

2. **Generate Service Account:**

   - Project Settings → Service Accounts
   - Generate new private key
   - Download JSON file

3. **Configure Storage Rules:**
   ```javascript
   // Firebase Storage Rules
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

**Required files:**

- `unitrack-firebase-credentials.json`: Service account JSON
- `FirebaseCredentials.BucketPath`: Usually "project-id.appspot.com"

---

### 6. 🤖 AI Services Configuration

**Ollama Models (Auto-downloaded):**

```bash
# These models will be downloaded automatically on first run
# Or pre-download them:
docker exec unitrack_ollama ollama pull nomic-embed-text
docker exec unitrack_ollama ollama pull llama3.2:3b
```

**Qdrant Vector Database:**

- No API key required for local deployment
- Automatically configured via Docker networking

**Required settings:**

- `OllamaSettings.EmbeddingModel`: "nomic-embed-text" (768 dimensions)
- `OllamaSettings.ChatModel`: "llama3.2:3b" (fast, good for education)
- Alternative models: "llama3.2:1b" (faster), "mistral:latest" (larger)

---

## 🚀 Environment Variables for Production

Create a `.env` file for production deployment:

```bash
# Database
DATABASE_CONNECTION_STRING=Host=unitrack-db;Port=5432;Database=UniTrackRemaster;Username=unitrack_user;Password=prod_secure_password_123

# JWT Authentication
JWT_SECRET_KEY=your_production_256_bit_secret_key_here
JWT_ISSUER=https://unitrack.yourdomain.com
JWT_AUDIENCE=https://unitrack.yourdomain.com

# Gmail OAuth2
GMAIL_EMAIL=notifications@yourdomain.com
GMAIL_CLIENT_ID=123456789.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token

# Firebase
FIREBASE_BUCKET_PATH=your-firebase-project.appspot.com

# Frontend
FRONTEND_URL=https://unitrack.yourdomain.com
ADMIN_PANEL_URL=https://admin.unitrack.yourdomain.com
```

---

## 🛠️ Development Setup Commands

```bash
# Navigate to backend directory
cd UniTrackRemasterBackend

# Restore dependencies
dotnet restore

# Update database (development)
dotnet ef database update

# Run in development mode
dotnet run --environment Development

# Or with hot reload
dotnet watch run

# Run tests
dotnet test

# Generate API documentation
dotnet build && dotnet run --urls http://localhost:5086
# Then visit: http://localhost:5086/swagger
```

---

## 🐛 Common Issues & Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
docker exec -it unitrack_unitrack-db psql -U unitrack_user -d UniTrackRemaster

# Check connection string format
# Should be: Host=host;Port=port;Database=db;Username=user;Password=pass
```

### JWT Authentication Problems

```bash
# Verify JWT key length (should be 256+ bits)
echo "your_jwt_key" | wc -c

# Test JWT generation
curl -X POST http://localhost:5086/api/auth/test-jwt
```

### AI Services Not Responding

```bash
# Check Ollama status
curl http://localhost:11434/api/version

# Download required models manually
docker exec unitrack_ollama ollama pull nomic-embed-text
docker exec unitrack_ollama ollama pull llama3.2:3b

# Check Qdrant status
curl http://localhost:6333/health
```

### Email Service Issues

```bash
# Verify Firebase credentials
cat unitrack-firebase-credentials.json | jq .project_id
```

---

## ✅ Backend Configuration Checklist

- [ ] `appsettings.json` configured with all required settings
- [ ] Development and Production overrides created
- [ ] PostgreSQL connection string verified
- [ ] JWT secret key generated (256+ bits)
- [ ] Gmail OAuth2 credentials obtained and configured
- [ ] Firebase service account JSON downloaded
- [ ] Environment variables set for production
- [ ] AI services responding
- [ ] Email service functional

**Next Step:** [Configure Frontend Application](./frontend-setup.md) →
