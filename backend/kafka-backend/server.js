const { kafkaTopic } = require('../constants');
var connection = require('./kafka/Connection');
var product = require('./services/product.js');
var register = require('./services/auth');
var favorite = require('./services/favorite');
var shop = require('./services/shop');
var profile = require('./services/profile');

require('./mongodb/connection');
const order = require('./services/order');

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname(data.data, function (err, res) {
            console.log('after handle message from ' + topic_name + " Response" + res);
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
handleTopicRequest(kafkaTopic.getProducts, product.getProducts)
handleTopicRequest(kafkaTopic.getProduct, product.getSingleProduct)
handleTopicRequest(kafkaTopic.updateProducts, product.updateProducts)
handleTopicRequest(kafkaTopic.register, register.registerUser)
handleTopicRequest(kafkaTopic.editProfile, profile.updateProfile)
handleTopicRequest(kafkaTopic.getProfile, profile.getProfile)
handleTopicRequest(kafkaTopic.login, register.loginUser)
handleTopicRequest(kafkaTopic.jwtUser, register.checkJWT)
handleTopicRequest(kafkaTopic.addFavorite, favorite.favoriteAdd)
handleTopicRequest(kafkaTopic.getFavoriteProducts, favorite.getFavoriteProducts)
handleTopicRequest(kafkaTopic.getShop, shop.getShop)
handleTopicRequest(kafkaTopic.getShopAvailability, shop.getShopAvailability)
handleTopicRequest(kafkaTopic.createShop, shop.createShop)
handleTopicRequest(kafkaTopic.getShopDetails, shop.getShopDetails)
handleTopicRequest(kafkaTopic.getCategory, shop.getCategory)
handleTopicRequest(kafkaTopic.postOrder, order.createOrder)
handleTopicRequest(kafkaTopic.getOrder, order.getOrder)
// handleTopicRequest("postsGet", product)
