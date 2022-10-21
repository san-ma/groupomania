//importation of express
//framework to build app base on Node.js
const express = require('express');

//Importation middleware cookie-parser. 
const cookieParser = require('cookie-parser');

//Importation HELMET
//modul that helps securer headers HTTP sending to Express app. 
const helmet = require ('helmet');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

//importation of DOTENV
////module without dependance that charge envionment variable of .env files in process.env
//that allow to mask information of connexion to data base. 
require('dotenv').config({path: '.env'});

//importation date base configuration MongoDB
require('./config/db');

//Importation middleware user auth 
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

//importation middleware CORS (Cross Origin Resource sharing)
const cors = require('cors');
//importation middlewara path
const path = require("path");
//Importation app to server
const app = express();

//option of middleware errors CORS  ( Cross Origin Resource Sharing)
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}

//Activation middleware Cors
app.use(cors(corsOptions));


app.use(express.json());

//analyse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//analyse cookies attached to request object of client
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

//Activation of auth middleware to each request get
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// activation routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})