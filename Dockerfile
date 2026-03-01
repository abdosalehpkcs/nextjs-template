# Stage 1: Build the application
FROM node:24-alpine AS builder

WORKDIR /app

# Accept build-time environment variables
ARG AWS_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_SES_FROM_EMAIL
ARG AWS_SES_TO_EMAIL
ARG APP_URL
ARG APP_NAME
ARG GOOGLE_SITE_VERIFICATION_ID
ARG GOOGLE_SITE_ANALYTICS_ID

# Set environment variables for the build process
ENV AWS_REGION=${AWS_REGION}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_SES_FROM_EMAIL=${AWS_SES_FROM_EMAIL}
ENV AWS_SES_TO_EMAIL=${AWS_SES_TO_EMAIL}
ENV APP_URL=${APP_URL}
ENV APP_NAME=${APP_NAME}
ENV GOOGLE_SITE_VERIFICATION_ID=${GOOGLE_SITE_VERIFICATION_ID}
ENV GOOGLE_SITE_ANALYTICS_ID=${GOOGLE_SITE_ANALYTICS_ID}

# Install dependencies (include dev dependencies for build)
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy all files
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Create the production image
FROM node:24-alpine AS runner

WORKDIR /app

# Accept runtime environment variables
ARG AWS_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_SES_FROM_EMAIL
ARG AWS_SES_TO_EMAIL
ARG APP_URL
ARG APP_NAME
ARG GOOGLE_SITE_VERIFICATION_ID
ARG GOOGLE_SITE_ANALYTICS_ID

# Set runtime environment variables
ENV AWS_REGION=${AWS_REGION}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_SES_FROM_EMAIL=${AWS_SES_FROM_EMAIL}
ENV AWS_SES_TO_EMAIL=${AWS_SES_TO_EMAIL}
ENV APP_URL=${APP_URL}
ENV APP_NAME=${APP_NAME}
ENV GOOGLE_SITE_VERIFICATION_ID=${GOOGLE_SITE_VERIFICATION_ID}
ENV GOOGLE_SITE_ANALYTICS_ID=${GOOGLE_SITE_ANALYTICS_ID}

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install production dependencies
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile --prod

# Copy build output and required assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts

USER nextjs

EXPOSE 80

ENV HOSTNAME="0.0.0.0"
ENV PORT=80

CMD ["pnpm", "start"]