FROM node:13-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV PORT=8000
COPY . .
EXPOSE 8000
CMD ["node","server.js"]

