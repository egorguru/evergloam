module.exports = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI,
  secret: process.env.SECRET || 'secret'
}
