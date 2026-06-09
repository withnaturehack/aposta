FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/hrms/package.json ./apps/hrms/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/email/package.json ./packages/email/
COPY packages/entitlements/package.json ./packages/entitlements/
COPY packages/lib/package.json ./packages/lib/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @apotsa/hrms build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/hrms/.next/standalone ./
COPY --from=builder /app/apps/hrms/.next/static ./apps/hrms/.next/static
EXPOSE 3002
CMD ["node", "apps/hrms/server.js"]
