import express from 'express';
import { createPresensiController, getPresensiPage, getPresensiSession } from '../controllers/presensi.controller.js';

const presensiRoute = express.Router();

presensiRoute.post('/presensi', createPresensiController);
presensiRoute.get('/presensi', getPresensiPage)
presensiRoute.get('/presensi/:live_sesi', getPresensiSession);


export default presensiRoute;
