# Build Stage
FROM node:20-alpine AS BUILD_IMAGE
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# Production Stage
FROM node:20-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /build/package*.json ./
COPY --from=BUILD_IMAGE /build/.next ./.next
COPY --from=BUILD_IMAGE /build/public ./public
COPY --from=BUILD_IMAGE /build/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]