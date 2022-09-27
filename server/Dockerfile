FROM node:18.0.0

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install
COPY . .

EXPOSE 4000

CMD ["npm", "run", "prod"]