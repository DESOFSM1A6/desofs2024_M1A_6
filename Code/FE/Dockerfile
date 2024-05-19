# Angular app
FROM node:alpine AS builder

COPY . .

WORKDIR ./desofs-news

# Install dependencies
RUN npm install

RUN ls

# Build the project
RUN npm run build

EXPOSE 4200

# Start the app
CMD ["npm", "start"]