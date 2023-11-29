import express from 'express'
import routes from './routes'

import './database'

import cors from 'cors'
dotenv.config()

class App {
  constructor() {
    this.app = express()
    app.use(cors())

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app