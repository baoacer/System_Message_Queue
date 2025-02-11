'use strict'
const amqp = require('amqplib')

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:root@localhost')
        if(!connection) throw new Error('[RabbitMQ] - Connection Failed')
        
        const channel = await connection.createChannel()

        return { channel, connection}
    } catch (error) {
        console.error(`Error Connect RabbitMQ : ${error}`)
    }
}

const testConnectRabbitMQ = async () => {
    try {
        const { channel, connection } = await connectRabbitMQ()

        // publish message to queue
        const queueName = 'test_queue'
        const message = 'Helle Test RabbitMQ'
        await channel.assertQueue(queueName)
        await channel.sendToQueue(queueName, Buffer.from(message))

        // close connection
        await connection.close()
    } catch (error) {
        console.error(`Error Test Connection RabbitMQ : ${error}`)
    }
}

module.exports = {
    connectRabbitMQ,
    testConnectRabbitMQ
}