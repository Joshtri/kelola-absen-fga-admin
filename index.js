import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pesertaRoute from './routes/peserta.route.js';
import presensiRoute from './routes/presensi.route.js';
import connectDB from './config/dbConfig.js';
import sesiRoute from './routes/sesi.route.js';


config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.APP_PORT;


// Serve Bootstrap CSS and JS
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Serve Popper.js
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');

app.set("views",[
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/peserta"),
    path.join(__dirname, "/views/presensi")
]);


app.use('/data',pesertaRoute, presensiRoute,sesiRoute)

app.listen(PORT,()=>{
    console.log(`app run on port : `, PORT);
});