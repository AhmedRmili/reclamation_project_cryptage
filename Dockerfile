FROM node:21-alpine
COPY . /app/
COPY reclamation_project /app/
WORKDIR /app

RUN npm install
EXPOSE 3002
CMD ["node" ,"index.js"]
