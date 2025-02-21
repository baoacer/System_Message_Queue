const { consumerQueue, connectRabbitMQ } = require('../databases/init.rabbit')

class ConsumerService {
    static async consumerQueue( queueName ){
        try {
            const { channel, connection } = await connectRabbitMQ()
            await consumerQueue(channel, queueName)
        } catch (error) {
            console.error(`Error consumerQueue: ${error}`)
        }
    }
}

module.exports = ConsumerService