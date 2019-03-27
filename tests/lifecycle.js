const { MongoMemoryServer } = require('mongodb-memory-server')

const app = require('../app')

const config = require('../lib/config')

const mongod = new MongoMemoryServer({
  autoStart: false
})

before(async () => {
  if (!mongod.isRunning) {
    await mongod.start()
  }
  config.mongoUri = await mongod.getConnectionString()
  await new Promise((resolve, reject) => app(resolve))
})

after(async () => {
  await mongod.stop()
})
