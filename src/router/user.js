const router = require("express").Router();
const user = require("../controllers/userController.js");
const isAuthenticated = require("../middleware/auth");
const {authorizedCook, authorizedHost} = require('../middleware/role.js')

//put
router.route("/update-info").put(isAuthenticated, user.updateUser);
router.route("/savedOrUnsavedAccomodation/:id").put(isAuthenticated, user.savedOrUnsavedAccomodation);

//get
router.route("/getusers").get(isAuthenticated, authorizedHost, user.getAllUsers);
router.route("/userProfile").get(isAuthenticated, user.getUserProfile);
router.route("/savedAccomodations").get(isAuthenticated, user.getSavedAccomodations);


module.exports = router;