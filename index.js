require('dotenv').config()

const app = require('./app')
const config = require('./lib/config')

app(() => console.log(`Server has been started ${config.port}`))
