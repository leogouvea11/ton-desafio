import Koa from 'koa'
import serverless from 'serverless-http'
import BodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import routes from './routes'
import jsend from './middlewares/jsend/jsend'
import { routeNotFound } from './middlewares/routeNotFound'

require('dotenv').config()

const app = new Koa()

app.use(jsend())

app.use(BodyParser())

app.use(cors())

app.use(routes.routes())

app.use(routeNotFound())

app.listen(3000, 'localhost')
// serverless(app)
console.log(`app is running on http://localhost:3000`)