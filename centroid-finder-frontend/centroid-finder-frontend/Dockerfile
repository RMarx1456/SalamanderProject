FROM node:18

WORKDIR /app

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

# Use node directly instead of npm start to avoid potential issues
CMD ["node_modules/.bin/next", "start", "-p", "3002"]