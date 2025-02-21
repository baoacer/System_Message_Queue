'use strict'

const ConsumerService = require('./src/services/consumer.service')
const queueName = 'test-topic'

ConsumerService.consumerQueue(queueName).then(() => {
    console.log(`Message consumer started: ${queueName}`)
}).catch(error => {
    console.error(`Error consumer message: ${error}`)
})