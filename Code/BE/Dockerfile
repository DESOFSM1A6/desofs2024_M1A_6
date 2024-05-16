FROM tomcat

#install maven
RUN apt-get update && apt-get install -y maven \
    && apt-get clean

# create new directory for the project
RUN mkdir /app

#copy the project to the container
COPY . /app

#change the working directory
WORKDIR /app

RUN ls
RUN pwd

#build the project
RUN mvn clean package -DskipTests

#determine the war file name
RUN mv target/*.war /usr/local/tomcat/webapps/app.war

EXPOSE 8080

#start tomcat
CMD ["catalina.sh", "run"]
