const amqp = require('amqplib');

async function consume() {
    try {
        const connection = await amqp.connect('amqp://127.0.0.1');

        const channel = await connection.createChannel();

        const queue = 'task_queue';

        await channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(" [x] Received '%s'", msg.content.toString());
                setTimeout(() => {
                    channel.ack(msg);
                }, 1000);
            }
        }, {
            noAck: false
        });
    } catch (error) {
        console.error(error);
    }
}

consume();
