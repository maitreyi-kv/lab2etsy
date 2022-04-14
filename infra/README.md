### Start
cd kafka
docker-compose up -d

## Cli commands
Try out cli commands 



https://kafka.apache.org/quickstart

C:\Users\maitr\Downloads\kafka_2.13-3.1.0\bin
wsl
./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic posts
./kafka-topics.sh --bootstrap-server localhost:9092 --list

./kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
./kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092

