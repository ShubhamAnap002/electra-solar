# Electra Solar — Production Deployment & Hosting Guide

## 1. Overview

The Electra Solar web application is built on Next.js 14 and can be deployed in multiple environments depending on company infrastructure preferences. Because the site utilizes Static Site Generation (SSG), it offers near-instant global edge delivery with minimal compute overhead.

---

## 2. Option A: Vercel Edge Deployment (Recommended)

Vercel provides native zero-configuration hosting for Next.js with automatic global CDN caching, SSL generation, and edge revalidation.

### Deployment Steps:
1. Push the codebase to a GitHub, GitLab, or Bitbucket repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of electra solar production website"
   git remote add origin git@github.com:your-org/electra-solar.git
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the `electra-solar` repository.
4. Set the Framework Preset to **Next.js**.
5. Configure Environment Variables (from `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` = `https://electrasolar.in`
   - `NEXT_PUBLIC_PHONE_PRIMARY` = `+919822407189`
   - `NEXT_PUBLIC_EMAIL_PRIMARY` = `contact@electrasolar.in`
   - `RESEND_API_KEY` (if automated email routing is enabled)
6. Click **Deploy**. Vercel will run `npm run build` and provision the production site.
7. Under Project Settings > **Domains**, add `electrasolar.in` and `www.electrasolar.in`. Update your DNS registrar with the provided A and CNAME records.

---

## 3. Option B: Self-Hosted Linux VPS (Ubuntu / Debian + PM2 + Nginx)

For deployment on a dedicated cloud server (AWS EC2, DigitalOcean, Hetzner, or local Pune datacenter):

### Prerequisites:
- Ubuntu 22.04 LTS or 24.04 LTS
- Node.js 18.x or 20.x LTS (`node -v`)
- Nginx & Certbot for SSL
- PM2 process manager (`npm install -g pm2`)

### 1. Build and Start Application:
```bash
cd /var/www/electra-solar
npm ci
npm run build
pm2 start npm --name "electra-solar" -- start -- -p 3000
pm2 save
pm2 startup
```

### 2. Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/electrasolar.in`):
```nginx
server {
    server_name electrasolar.in www.electrasolar.in;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Provision Free SSL via Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/electrasolar.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d electrasolar.in -d www.electrasolar.in
```

---

## 4. Option C: Docker Container Deployment

Create a `Dockerfile` in the root:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
```

Build and run:
```bash
docker build -t electra-solar:latest .
docker run -d -p 3000:3000 --name electra-solar-app electra-solar:latest
```
