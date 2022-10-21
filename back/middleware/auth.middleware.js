//Importation of package "jsonwebtoken" who allow creation and verfication of TOKEN
//TOKENS authentification allow to users to connect only one time. 
//to their account. Moment to connect, they will received their token and send it back. 
//automatically to each request. 
//This will let backend to verify that request is authentified. 
const jwt = require("jsonwebtoken");
//importation of user model. 
const UserModel = require("../models/user.model");


/**
 *  Verify of recieved token in front and allow only to authentify requests to succeed.
 * 
 * If a mistake is declare, send 401 client.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
//exportation function checkUser
exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(401).json({message: "non connecté"});
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({message: "non connecté"});
    res.locals.user = null;
  }
};


/**
 *  verify if token is a taken token by a client. 
 * 
 * If there is no token send error 200 to client "No token"
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

//exportation funciton requireAuth
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};


