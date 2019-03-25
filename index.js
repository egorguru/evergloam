require('dotenv').config()

const app = require('./app')

app(() => console.log(`Server has been started`))
