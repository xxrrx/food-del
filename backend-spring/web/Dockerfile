FROM eclipse-temurin:17-jre-alpine

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 \
     /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=8080

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
