# FROM node:13.12.0-alpine
FROM node:current-stretch-slim
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 
COPY . ./
EXPOSE 3000

CMD npm start