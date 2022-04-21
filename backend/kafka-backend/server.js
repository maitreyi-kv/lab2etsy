const { kafkaTopic } = require('../constants');
var connection = require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var product = require('./services/product.js');
var login = require('./services/login');
var register = require('./services/auth');

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}


// handleTopicRequest(kafkaTopic.addProducts, product.createProduct)
handleTopicRequest(kafkaTopic.addProduct, product.createProduct)
handleTopicRequest(kafkaTopic.getProducts, product.getProduct)
handleTopicRequest(kafkaTopic.getProduct, product.getSingleProduct)
handleTopicRequest(kafkaTopic.register, register.registerUser)
handleTopicRequest(kafkaTopic.login, register.loginUser)
// handleTopicRequest("postsGet", product)
