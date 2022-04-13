### Start
cd kafka
docker-compose up -d

## Cli commands
Try out cli commands 

C:\Users\maitr\Downloads\kafka_2.13-3.1.0\bin

https://kafka.apache.org/quickstart

./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic posts
./kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
./kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092

kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic posts
