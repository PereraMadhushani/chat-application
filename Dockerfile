# ---- Stage 1: Build React frontend ----
FROM node:20 AS build
WORKDIR /app/frontend

# Copy frontend files
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./

# Build React
RUN npm run build

# ---- Stage 2: Setup Node backend ----
FROM node:20
WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend

# Copy React build into backend/public
COPY --from=build /app/frontend/dist/ ./public/

WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "src/server.js"]
