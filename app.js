const http = require('http')
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// middlewares
app.use(bodyParser())

//
// const router = require('./app/router')
// router(app)


const server = http.createServer(app.callback())
if (!module.parent) {
  server.listen()
  console.log('server start')
}
module.exports = server
