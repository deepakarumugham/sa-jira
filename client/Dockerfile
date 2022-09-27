FROM node:18.0.0

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
ENV NODE_OPTIONS=--openssl-legacy-provider=value
ENV REACT_APP_SERVER_BASE_URL="http://backend:4000"
RUN npm install

COPY . .

EXPOSE 9099

CMD ["npm", "run", "start"]
