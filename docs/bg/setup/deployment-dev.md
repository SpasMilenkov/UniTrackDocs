# 🧪 Docker Development Setup

This guide covers setting up UniTrack for local development using Docker. This approach is perfect for developers who want to contribute to the project or customize it for their needs.

## 🎯 Benefits of the Development Setup

- Quick to set up and tear down
- Uses hot-reload for rapid development
- Minimal resource usage
- No Docker Swarm required
- Great for testing and feature development

## 📋 Prerequisites

For development, you'll need:

- Docker Engine (version 19.03.0+)
- Docker Compose (version 1.27.0+)
- Git
- Code editor (VS Code recommended)
- .NET SDK 7.0+ (for local debugging)
- Node.js 16+ (for local frontend development)

## 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/SpasMilenkov/UniTrackRemaster.git
cd UniTrackRemaster
```

## 📄 Step 2: Create a Development Docker Compose File

Create a file named `docker-compose.dev.yml`:

```yaml
version: "3.8"
services:
  unitrack-db:
    image: postgres:alpine
    container_name: UniTrackRemaster.Database.Dev
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: UniTrackRemaster
    ports:
      - "5434:5432"
    volumes:
      - dev_db_data:/var/lib/postgresql/data
    networks:
      - dev-network

  unitrack-backend:
    build:
      context: ./UniTrackRemasterBackend
      dockerfile: Dockerfile.dev
    container_name: UniTrackRemaster.Backend.Dev
    ports:
      - "5086:5086"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:5086
      - ConnectionStrings__DefaultConnection=Host=unitrack-db;Port=5432;Database=UniTrackRemaster;Username=postgres;Password=admin
    volumes:
      - ./UniTrackRemasterBackend:/app
      - backend_packages:/app/packages
    depends_on:
      - unitrack-db
    networks:
      - dev-network

  unitrack-frontend:
    build:
      context: ./UniTrackRemasterFrontend
      dockerfile: Dockerfile.dev
    container_name: UniTrackRemaster.Frontend.Dev
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_BASE_URL=http://localhost:5086
    volumes:
      - ./UniTrackRemasterFrontend:/app
      - frontend_node_modules:/app/node_modules
    depends_on:
      - unitrack-backend
    networks:
      - dev-network

volumes:
  dev_db_data:
  backend_packages:
  frontend_node_modules:

networks:
  dev-network:
    driver: bridge
```

## 📝 Step 3: Create Development Dockerfiles

### Backend Dockerfile.dev

Create `UniTrackRemasterBackend/Dockerfile.dev`:

```bash
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

# Copy csproj files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

EXPOSE 5086

# Use dotnet watch for hot reload
ENTRYPOINT ["dotnet", "watch", "run", "--urls=http://+:5086"]
```

### Frontend Dockerfile.dev

Create `UniTrackRemasterFrontend/Dockerfile.dev`:

```bash
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Start with hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## 🚀 Step 4: Start the Development Environment

```bash
docker-compose -f docker-compose.dev.yml up
```

This will build and start all the services in development mode with hot-reloading enabled.

## 🔗 Step 5: Access the Development Environment

- **Backend API**: [http://localhost:5086](http://localhost:5086)
- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Database**: PostgreSQL at localhost:5434 (User: postgres, Password: admin)

## 🔄 Development Workflow

1. **Code Changes**: Edit files in your project directory, and the containers will automatically detect changes and rebuild as needed.

2. **Backend Development**: Changes to C# files will trigger automatic recompilation and application restart.

3. **Frontend Development**: Changes to Vue/Nuxt files will trigger hot-module replacement without page reloads.

4. **API Testing**: Use tools like Postman or Swagger UI (available at http://localhost:5086/swagger) to test API endpoints.

5. **Database Access**: Connect to the PostgreSQL database using tools like pgAdmin or DBeaver with these credentials:
   - Host: localhost
   - Port: 5434
   - Database: UniTrackRemaster
   - Username: postgres
   - Password: admin

## 🛑 Stopping the Environment

To stop the development environment, press `Ctrl+C` in the terminal where Docker Compose is running, or run:

```bash
docker-compose -f docker-compose.dev.yml down
```

To completely remove volumes (including the database data):

```bash
docker-compose -f docker-compose.dev.yml down -v
```

## 🧪 Running Tests

To run backend tests:

```bash
cd UniTrackRemasterBackend
dotnet test
```

To run frontend tests:

```bash
cd UniTrackRemasterFrontend
npm run test
```

## 🧰 Development Tips

- Use VS Code with the "Remote - Containers" extension to develop directly inside the Docker containers
- Set up a `.env` file for additional environment variables
- Install the `dotnet-ef` tools for database migrations:
  ```bash
  dotnet tool install --global dotnet-ef
  ```
- Configure browser auto-refresh by adding the following to your frontend `.env` file:
  ```
  CHOKIDAR_USEPOLLING=true
  ```

## 🔄 Syncing with Production

To bring changes from development to production:

1. Commit your changes to version control
2. Pull the latest changes in your production environment
3. Run the build and deploy script:
   ```bash
   ./build_and_deploy.sh
   ```

## 📚 Next Steps

- Review the [Application Configuration](/en/setup/config) options
- Explore the [API Documentation](/en/modules/api)
