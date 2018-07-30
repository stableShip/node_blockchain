import * as Koa from 'koa'
import router from './app/router'
import * as  bodyParser from 'koa-bodyparser'

let app = new Koa()

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

let server = app.listen(3000)
console.log('server running in  port 3000')

export default server
