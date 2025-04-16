const amqp = require('amqplib')

class ConsumerService {
    static async consumerQueue(){
        try {
            const connection = await amqp.connect('amqp://guest:root@localhost')
            const channel = await connection.createChannel()

            const notificationQueue = 'notification-queue'

          
            // 1 - TTL
            // const time = 7000
            // setTimeout(async () => {
            //      await channel.consume(notificationQueue, message => {
            //          console.log(`Send notification Successfully processed: ${message.content.toString()}`)
            //          channel.ack(message)
            //      })
            // }, time)

            // 2 - LOGIC
            await channel.consume(notificationQueue, message => {
                try {
                    const number = Math.random()
                    console.log(number)
                    if(number < 0.8){
                        throw new Error('Send notification failed')
                    }
                    console.log(`Send notification Successfully processed: ${message.content.toString()}`)
                    channel.ack(message) // complete message
                } catch (error) {
                    channel.nack(message, false, false)
                    /*
                        @param-1 - message: tin nhắn bị từ chối -> đẩy sang queue dlx
                        @param-2 - false: not retry -> đẩy sang queue dlx
                        @param-3 - false: chỉ message hiện tại bị từ chối
                        nack: negative acknowledgment (bị từ chối queue trước đó)
                    */
                }
            })
        } catch (error) {
            console.error(`Error consumerQueueNormal: ${error}`)
        }
    }

    static async consumerQueueFalse(){
        try {
            const connection = await amqp.connect('amqp://guest:root@localhost')
            const channel = await connection.createChannel()

            const notificationExchangeDLX = 'notification-exchange-dlx'
            const notificationRoutingKeyDLX = 'notification-routing-key-dlx'
            const notificationQueueDLX = 'notification-queue-dlx'

            // 1 - Create Exchange
            await channel.assertExchange(notificationExchangeDLX, 'direct', {
                durable: true
            })

            // 2 - Create Queue
            const queueResult = await channel.assertQueue(notificationQueueDLX, {
                exclusive: false,
            })

            // 3 - binding
            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX)

            // 4 - consume message
           await channel.consume(notificationQueueDLX, message => {
                console.log(`Message Error Pls Hot fix: ${message.content.toString()}`)
            }, { noAck: true })
        } catch (error) {
            console.error(`Error consumerQueueDLX: ${error}`)
        }
    }
}

module.exports = ConsumerService