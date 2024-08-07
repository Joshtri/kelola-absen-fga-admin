import express from 'express';
import { loginPage } from '../controllers/index.controller.js';
const indexRoute = express.Router();


indexRoute.get('/', loginPage);

export default indexRoute