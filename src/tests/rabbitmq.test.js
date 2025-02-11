'use strict'

const { testConnectRabbitMQ } = require('../databases/init.rabbit')

describe('Test RabbitMQ Connection', () => {
    it('Should connect to success RabbitMQ', async () => {
        const result = await testConnectRabbitMQ()
        expect(result).toBeUndefined()
    })
})