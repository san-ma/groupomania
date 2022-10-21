//Importation of user model. 
const UserModel = require("../models/user.model");

//Declaration of constant objectID : Types.ObjectId(mongoose)
//an objectID is a special type that it used for unique identifier.
//To verify if the params (Id) exist in the data.
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const filesDestination = `${__dirname}/../uploads`;

/**
 * Getting all users and their emails // passwords is hash.
 * 
 * If everything is ok, allow getting infos of users. 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password -email");
  res.status(200).json(users);
};

/**
 * Verification of object id to see correspondance between user and modify comment.
 * 
 * If everything is ok, allow to get specifics users Si tout se passe bien,
 * @param {*} req 
 * @param {*} res 
 * @returns if id object is not valide send 400 to client. 
 */
//exportation function getOneUser
exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password -email");
};

//exportation of function uploadProfil. 
exports.uploadProfil = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: `${req.protocol}://${req.get("host")}/uploads/${
            req.file.filename
          }`,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

/**
 * Verification if object id to see correspondance between user and update user profil. 
 * 
 * If everthing is ok, allow modification of profil.
 * @param {*} req 
 * @param {*} res 
 * @returns If object id is not valid, send 400 error to client
 */
//exportation of udpateUser. 
exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**f
 * Verification of id Object to see correspondance between users and deleted user. 
 * 
 * If everything is ok allow delete profile. 
 * @param {*} req 
 * @param {*} res 
 * @returns If object id is not valid, send error 400 to client.
 */
exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
