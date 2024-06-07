FROM mysql
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=desofs
ENV MYSQL_USER=desofs
ENV MYSQL_PASSWORD=desofs
ADD desofs.sql /docker-entrypoint-initdb.d
EXPOSE 3306
CMD ["mysqld"]