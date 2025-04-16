'use strict'

const ConsumerService = require('./src/services/consumer.service')
const queueName = 'test-topic'

// ConsumerService.consumerQueue(queueName).then(() => {
//     console.log(`Message consumer started: ${queueName}`)
// }).catch(error => {
//     console.error(`Error consumer message: ${error}`)
// })

ConsumerService.consumerQueue(queueName).then(() => {
    console.log(`Message consumerQueue started`)
}).catch(error => {
    console.error(`Error consumer message: ${error}`)
})

ConsumerService.consumerQueueFalse(queueName).then(() => {
    console.log(`Message consumerQueueDLX started`)
}).catch(error => {
    console.error(`Error consumer message: ${error}`)
})
