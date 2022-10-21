//Importation of Mongoose. 
const mongoose = require('mongoose');

//Creation of data schema for database of MongoDB. 
//that containt the desired fields for post model. 
//indicate that their type and their caracters (obligatory or not)
//use the schema method put a disposition to Mongoose. 
const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Exportation of this Schema as mongoose model call '"post",
//that will make available for our Express application 
//with the helps of model method that transforms to a usable model. 
module.exports = mongoose.model('post', PostSchema);