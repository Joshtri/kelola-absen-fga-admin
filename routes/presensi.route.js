import express from 'express';
import { createPresensiController, getPresensiPage, getPresensiSession, totalAlpha, totalHadir, totalPesertaByPresensi } from '../controllers/presensi.controller.js';

const presensiRoute = express.Router();

presensiRoute.post('/presensi', createPresensiController);
presensiRoute.get('/presensi', getPresensiPage)
presensiRoute.get('/presensi/:live_sesi', getPresensiSession);


presensiRoute.get('/total_presensi/:liveSesi', totalPesertaByPresensi);
presensiRoute.get('/total_presensi_hadir/:liveSesi', totalHadir);
presensiRoute.get('/total_presensi_alpha/:liveSesi', totalAlpha);


export default presensiRoute;
