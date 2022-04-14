### Setup steps


# 1. Kafka Infra
1. cd infra/
2. docker-compose up -d

## Create topics
C:\Users\maitr\Downloads\kafka_2.13-3.1.0\bin
wsl
./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic posts
./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic response
./kafka-topics.sh --bootstrap-server localhost:9092 --list


# 2. Backend 
cd backend/backend
npm i 
node .\index.js

# 3. Kafka Backend

cd backend/kafka-backend
npm i 
node server.js
