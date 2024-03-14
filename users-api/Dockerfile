FROM maven:3.9.4-eclipse-temurin-21-alpine AS build
ADD pom.xml /application/pom.xml
ADD src /application/src
WORKDIR /application
RUN mvn -B package

FROM openjdk:21
ADD kapeta.yml /application/kapeta.yml
COPY --from=build  /application/target/*.jar /application/app.jar
WORKDIR /application
HEALTHCHECK --interval=5s --timeout=15s --start-period=5s --retries=10 CMD curl --fail http://localhost:80/.kapeta/health || exit 1

ENTRYPOINT [ "java", "-jar", "/application/app.jar" ]