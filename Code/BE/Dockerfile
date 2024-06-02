FROM tomcat

ARG PROJECT_PATH

# Install maven
RUN apt-get update && apt-get install -y maven \
    && apt-get clean

# Create new directory for the project
RUN mkdir /app

# Copy the project to the container
# COPY ./Code/BE /app
# For the docker-compose
# COPY . /app
COPY $PROJECT_PATH /app

#change the working directory
WORKDIR /app

RUN ls
RUN pwd

# Build the project
RUN mvn clean package -DskipTests

# Determine the war file name
RUN mv target/*.war /usr/local/tomcat/webapps/app.war

EXPOSE 8080

# Start tomcat
CMD ["catalina.sh", "run"]
