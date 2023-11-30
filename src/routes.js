import { Router } from 'express'
import authMiddlewares from './app/middlewares/auth.js'

import UserController from './app/controllers/UserController.js'
import SessionController from './app/controllers/SessionController.js'
import AgendaController from './app/controllers/AgendaController.js'

const routes = new Router()

routes.put('/update-password', UserController.update)
routes.post('/sessions', SessionController.store)
routes.get('/listCalendar', AgendaController.index)
routes.post('/users', UserController.store)

routes.use(authMiddlewares)

routes.post('/addCalendar', AgendaController.store)
routes.put('/updateCalendar', AgendaController.update)
routes.delete('/agenda/:id', AgendaController.delete);

export default routes