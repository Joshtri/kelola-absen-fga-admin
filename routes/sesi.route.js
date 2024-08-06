import express from 'express';
import {  createSesiController} from '../controllers/sesi.controller.js';

const sesiRoute = express.Router();

sesiRoute.post('/sesi', createSesiController);



export default sesiRoute;
