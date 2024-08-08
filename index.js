import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pesertaRoute from './routes/peserta.route.js';
import presensiRoute from './routes/presensi.route.js';
import session from 'express-session';
import connectDB from './config/dbConfig.js';
import sesiRoute from './routes/sesi.route.js';
import indexRoute from './routes/index.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import MongoStore from 'connect-mongo';


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

// Session middleware
app.use(
    session({
      proxy: true,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      name: 'fga',
      store: MongoStore.create({
        mongoUrl: process.env.APP_MONGODB_URI, // Replace with your MongoDB connection string
        collectionName: 'sessions'
      })
    })
);


app.set('view engine', 'ejs');

app.set("views",[
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/peserta"),
    path.join(__dirname, "/views/presensi")
]);

app.use('/adm', dashboardRoute)
app.use('/data',pesertaRoute, presensiRoute,sesiRoute)
app.use(indexRoute);

app.listen(PORT,()=>{
    console.log(`app run on port : `, PORT);
});