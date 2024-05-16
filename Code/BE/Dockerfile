FROM tomcat

#install maven
RUN apt-get update && apt-get install -y maven

COPY . .

#build the project
RUN mvn clean package -DskipTests

#determine the war file name
RUN mv target/*.war /usr/local/tomcat/webapps/app.war

EXPOSE 8080

#start tomcat
CMD ["catalina.sh", "run"]
