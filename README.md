### Setup steps


# 1. Kafka Infra (https://developer.confluent.io/quickstart/kafka-docker/)
1. cd infra/
2. docker-compose up -d
3. docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic getProduct
4. docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic addProduct
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic response

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


# On VM

Docker for Kafka
```
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
```

(Follow this to setup VM: https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9)

If facing: Got permission denied while trying to connect to the Docker daemon socket, run
sudo chmod 666 /var/run/docker.sock



