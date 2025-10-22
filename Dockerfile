# ---- Stage 1: Build Vite frontend ----
FROM node:20 AS build
WORKDIR /app/frontend

# Copy and install frontend dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source files and build
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: Setup Node backend ----
FROM node:20
WORKDIR /app/backend

# Copy and install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ ./

# Copy frontend build into backend/public
COPY --from=build /app/frontend/dist/ ./public/

# Expose port
EXPOSE 8080

# Start backend
CMD ["node", "src/server.js"]
