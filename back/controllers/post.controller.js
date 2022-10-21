//importation of model of publications
const PostModel = require('../models/post.model');

//importation of user model
const UserModel = require('../models/user.model');

//Declaration of constant objectID : Types.ObjectId(mongoose)
//an objectID is a special type that it used for unique identifier.
//To verify if the params (Id) exist in the data.
const ObjectID = require('mongoose').Types.ObjectId; 

//importation of module Node fs thant let you create.
//and stock, allow, generate and interact with the files systems.
const fs = require('fs');

/**
 * Display of posts to most recent to older 
 * 
 * if there is a miskta send 'cannot get data' to client.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

//Exportation of function readPost 
exports.readPost = (req, res, next) => {
    PostModel.find((error, docs) => {
        if(!error) {
            res.send(docs);
        } else {
            console.log('Error to get data :' + error);
        }
    }).sort({ createdAt: -1 }); //sort by most recent to most older post.
};


/**
 * Creation of a post, getting the id of poster and dynamique image of profil. Initialisation of likes and comments.
 * 
 * if everything is okay send 201 creation to client.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns If thre is mistake send error 400 to client.
 */

//exportation of function createPost
exports.createPost = async (req, res, next) => {
    const newPost = new PostModel( {
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== undefined ?  `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`: "",
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}


/**
 * Update of posts already created. Getting de id object to verify if post is from the user to allow his modification.
 * 
 * If every ok, allow modification.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns If object Id is not good, send error 'ID unknow'.
 */

//exportation of function updatePost.
exports.updatePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);//admin here?
    } else {
        const updatedRecord = {};
        if (req.body.message && req.body.message !== "null") {
            updatedRecord.message = req.body.message
        };
        if (req.file) {
            updatedRecord.picture = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        };
        PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
            (error, docs) => {
                if (!error) {
                    res.send(docs);
                } else {
                    console.log("Update error : " + error);
                }
            }
        )
    }
}


/**
 * VVerification of id object to see the correspondance between user and post.
 * 
 * If everything is ok authorized delete post and image if there is.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns if object id is not valide send error 400 to client.
 */

//exportation function delete post.
exports.deletePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id); //+admin?
    } else {
        PostModel.findOne({ _id : req.params.id})
        .then((post) => {
            if (!post) {
                res.status(404).json({error: new Error('Post non trouvé !')});
              }
            const filename = post.picture.split('/uploads/')[1];
            
            fs.unlink(`./uploads/${filename}`, () => {
                PostModel.deleteOne({ _id: req.params.id }) 
                    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
    }
}


/**
 * VVerification of object id to see the correspondance between user and like
 * 
 * If everything is ok allow like.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns If object id is not valide send 400 to client.
 */
//exportation of function likePost.
exports.likePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: req.body.id }
                },
                { new : true },
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('OK');
        }
        catch (error) {
            console.log(error)
            return res.status(400).send(error);
        }
    }
}


/**
 * Verificatio of object id to see the correspondance between user and unlike. 
 * 
 * If everything ok allow unlike
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns If object id is not valide send error 400 to client.
 */
//exportation unLikePost function.
exports.unLikePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likers: req.body.id }
                },
                { new : true },
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $pull: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('OK');
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}

//exportation of function commentPost 
exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.commenterPseudo,
                text: req.body.text,
                timestamp: new Date().getTime(),
            },
          },
        },
        { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

//exportation of function edditCommentPost 
exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);//admin 
  
    try {
      return PostModel.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        );
  
        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;
  
        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
};

//exportation comment deleteCommentPost 
exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true })
              .then((data) => res.send(data))
              .catch((err) => res.status(500).send({ message: err }));
      } catch (err) {
          return res.status(400).send(err);
      }
  };