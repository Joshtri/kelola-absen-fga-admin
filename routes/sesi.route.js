import express from 'express';
import {  createSesiActive, createSesiController} from '../controllers/sesi.controller.js';

const sesiRoute = express.Router();

sesiRoute.post('/sesi', createSesiController);
sesiRoute.post('/setActive', createSesiActive)

export default sesiRoute;
