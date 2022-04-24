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

![image](https://user-images.githubusercontent.com/98665151/164988584-33314d13-3c41-487c-ab0d-51b889dc29fd.png)

# Add a .env file for aws 
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""


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



## Helper scripts


Store in a script createTopics.sh
```
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getProducts
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  addProducts
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  addProduct
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getProduct
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  deleteProduct
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  login
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  register
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  jwtUser
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  addFavorite
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getFavoriteProducts
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getShop
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getShopAvailability
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  createShop
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getShopDetails
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getCategory
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  postOrder
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic  getOrder
```

![image](https://user-images.githubusercontent.com/98665151/164988955-d72c68e6-3747-4864-899a-2071bbd77b78.png)


pm2
npm install pm2 -g

Whitelist ip for ec2 instance 
https://www.mongodb.com/docs/atlas/security/ip-access-list/
