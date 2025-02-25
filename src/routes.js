//Importo somente a funcão router
import { Router } from 'express';

import DashboardsController from './app/controllers/DashboardsController.js';
import SessionsController from './app/controllers/SessionsController.js';

import authMiddleware from './app/middlewares/auth.js';

const routes = new Router();

//################## PROOF #####################
//Session
routes.post('/proof/session', SessionsController.store);
//################## PROOF #####################

routes.get('/proof/dashboard', authMiddleware, DashboardsController.getOrders);
//################## MIDDLEWARE AUTH #####################
routes.use(authMiddleware);
//################## MIDDLEWARE AUTH #####################

//################## AUTH PROOF #####################
//Dashboard

//################## AUTH PROOF #####################

export default routes;
