var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'ted';
        var exchange = 'hello-exchange';
        var routeKey1 = 'order';
        var routeKey2 = 'member';
        var routeKey3 = 'webstore';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.publish(exchange, routeKey1, Buffer.from("order"))
        channel.publish(exchange, routeKey2, Buffer.from("member"))
        channel.publish(exchange, routeKey3, Buffer.from("webstore"))
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});