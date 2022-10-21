//creation of router with method that are a disposition to Express
const router = require("express").Router();

//importation of auth controller.
const authController = require("../controllers/auth.controller");

//importation of user controller that associate differents function to differents routes. 
const userController = require("../controllers/user.controller");

//importation of middleware multer for image gestion. 
const multer = require("../middleware/multer.midd");
const {checkUser} = require("../middleware/auth.middleware")

//Creation of differents ROUTES API users. 

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/",checkUser, userController.getAllUsers);
router.get("/:id",checkUser, userController.getOneUser);
router.put("/:id",checkUser, userController.updateUser);
router.delete("/:id",checkUser, userController.deleteUser);
router.post("/upload",checkUser, multer, userController.uploadProfil);

// Exportation ROUTER
module.exports = router;
