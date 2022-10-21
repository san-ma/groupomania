const UserModel = require('../models/user.model'); //importation of user model 
const jwt = require('jsonwebtoken'); //importation of package jsonwebtoken who let to create and verify TOKEN
const { signUpErrors, signInErrors } = require('../utils/errors.utils'); //Errors check

// Life of cookies (24h)
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Creation of TOKEN
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

/**
 * Inscription of website and hash of paswword 
 *  
 * If mistake change send error
 * @param {*} req 
 * @param {*} res 
 */
//exportation of function signup (inscriptions)
exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body
  const picture = `http://localhost:${process.env.PORT}/uploads/random-user.png`;
  try {
    const user = await UserModel.create({pseudo, email, password, picture });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
};

/**
 * Connection to the app, attribution of a token where cookies are safeguard to save the connection if we're leaving the page 
 * 
 * If mistake send error 200 
 * @param {*} req 
 * @param {*} res 
 */

//exportation of function signIn (connection)
exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

//exportation of function logout (disconnection)
exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};