# Angular app
FROM node:alpine

ARG PROJECT_PATH

RUN mkdir /app

# COPY ./Code/FE/desofs-news /app
# For the docker-compose
# COPY ./desofs-news /app
COPY $PROJECT_PATH /app

WORKDIR /app

# Install dependencies
RUN npm install -g @angular/cli

RUN npm install 

# Build the project
# RUN npm run build

CMD ["npm", "start"]