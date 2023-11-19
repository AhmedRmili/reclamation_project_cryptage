FROM node:21-alpine
COPY . /app/
WORKDIR /app

RUN npm install
EXPOSE 3002
CMD ["node" ,"index.js"]
