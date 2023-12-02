FROM node:18-slim
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y telnet
COPY dist/ .
EXPOSE 8080
CMD ["node", "src/index.js"]
