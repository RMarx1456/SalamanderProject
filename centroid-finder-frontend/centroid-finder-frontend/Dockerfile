FROM node:18

WORKDIR /app

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

EXPOSE 3005

# Tell Next.js to start on port 3005
CMD ["npx", "next", "start", "-p", "3005"]