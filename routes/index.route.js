import express from 'express';
import { loginPage, loginProcess, logout } from '../controllers/index.controller.js';
const indexRoute = express.Router();


indexRoute.get('/', loginPage);

indexRoute.post('/post_login',  loginProcess);
indexRoute.get('/logout', logout);


export default indexRoute