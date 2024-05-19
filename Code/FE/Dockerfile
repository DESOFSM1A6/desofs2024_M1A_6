#Angular app
FROM node:alpine
WORKDIR /app
COPY . .

#install dependencies
RUN npm install

#build the project
RUN npm run build

EXPOSE 4200

#start the app
CMD ["npm", "start"]