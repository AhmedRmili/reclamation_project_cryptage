
FROM node:21-alpine
COPY . /app/
WORKDIR /app

# Ensure that reclamation_project is inside /app/
COPY reclamation_project /app/reclamation_project/

RUN npm install
EXPOSE 3002
CMD ["node", "index.js"]
