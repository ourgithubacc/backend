const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { reset } = require("nodemon");
const {
  signup,
  verifyToken,
  signin,
  signout,
  apiAuth,
  sendVerificationCode,
  resetPassword,
  forgotPassWord,
  createNewPassWord
  
} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("firstname", "Firstname should be atleast 3 characters").isLength({
      min: 3,
    }),
    check("lastname", "Lastname should be atleast 3 characters").isLength({
      min: 3,
    }),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

//router.get("/verifyToken", verifyToken);

router.post(
  "/signin",

  [
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  signin
);

//router.put("/sendverificationcode",  sendVerificationCode);
//router.put("/resetpassword",  resetPassword);


router.get("/signout",  signout);

router.route('/forgotPassWord').post(forgotPassWord)
router.route('/createNewPassWord/:userId').post(createNewPassWord)

module.exports = router;

//router.post;
