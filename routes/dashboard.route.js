import express from 'express';
import { dashboardPage } from '../controllers/dashboard.controller.js';
const dashboardRoute = express.Router();


dashboardRoute.get('/dashboard', dashboardPage);

export default dashboardRoute