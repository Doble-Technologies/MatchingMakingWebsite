# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . ./

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

RUN npm run build

# --- Serve stage ---
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.js ./

EXPOSE 4173

CMD ["npx", "vite", "preview", "--host", "--port", "4173"]