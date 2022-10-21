//Importation of mongoose. 
const mongoose = require('mongoose');

//importation of validator email to validate email. 
const { isEmail } = require('validator');

//Importation of bcrypt to hash the password of users. 
//bscrypt is a function adaptive to the hash based to an encryption algorithm,
//using the salage technic (method letting to enforce security of informations that are hashing) adding a supplement data 
//so that forbidden 2 information identical having the same borrow.
//protect attacks from rainbow table, posibility to steal. 
//testing one and one every possible conbinations 
const bcrypt = require('bcrypt');

//Creation of data schema for database of MongoDB. 
//that containt the desired fields for post model. 
//indicate that their type and their caracters (obligatory or not)
//use the schema method put a disposition to Mongoose. 
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
    },
    bio:{
      type: String, 
      max: 1024,
    },
    admin: { 
      type: Boolean, //allow to define filling state.
      default: false
    },
  },
  {
    timestamps: true,
  }
);

// play function before to save in display :'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(); // salage of password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Let to create a function directly related to schema, 
//but calling at the same files with help of model, 
//verify if the data are already there. 
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

//Exportation of this Schema as mongoose model call '"post",
//that will make available for our Express application 
//with the helps of model method that transforms to a usable model.
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;