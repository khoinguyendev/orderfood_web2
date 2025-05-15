# Stage 1: Build ứng dụng
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy file cấu hình và source
COPY pom.xml .
COPY src ./src

# Build jar file
RUN mvn clean package -DskipTests

# Stage 2: Chạy ứng dụng
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy file jar từ stage 1
COPY --from=builder /app/target/orderfood-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
