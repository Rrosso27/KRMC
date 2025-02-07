FROM node:22
# FROM node:187
WORKDIR /app
COPY package.json .
RUN npm install express dotenv jsonwebtoken bcryptjs cors
RUN npm install --save-dev nodemon jest supertest
RUN npm install sequelize mysql2
RUN npm install

COPY . .
CMD ["npm", "start"]
EXPOSE 5000

