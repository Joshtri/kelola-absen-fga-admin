import express from 'express';
import { createPresensiController, getPresensiPage, getPresensiSession, totalHadir, totalPesertaByPresensi } from '../controllers/presensi.controller.js';

const presensiRoute = express.Router();

presensiRoute.post('/presensi', createPresensiController);
presensiRoute.get('/presensi', getPresensiPage)
presensiRoute.get('/presensi/:live_sesi', getPresensiSession);


presensiRoute.get('/total_presensi/:liveSesi', totalPesertaByPresensi);
presensiRoute.get('/total_presensi_hadir/:liveSesi', totalHadir);


export default presensiRoute;
