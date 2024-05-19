# Angular app
FROM node:alpine AS builder

COPY . .

WORKDIR ./desofs-news

RUN ls
RUN addgroup allusers && adduser -S -G allusers username

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

EXPOSE 4200

# Start the app
USER username
CMD ["npm", "start"]