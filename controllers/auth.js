const User = require('../models/user')
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")
const { validationResult, check } = require('express-validator')
//const user = require('../models/user')
const moment = require('moment');
//const {sendGridEmail, sendGridEmailResetPassword} = require('./emailsubscriber')
const sendEmail = require('../helper/sendEmail')
const Token = require('../models/token')

// API Key check
// exports.apiAuth = (req, res, next) => {
//   if(req.headers['api-key']) {  
//     let apiKey = req.headers['api-key']

//     if(apiKey !== process.env.API_KEY) {
//       return res.status(400).json({
//         message: "Invalid API Key"
//       })
//     }
//     next()
//   } else {
//     return res.status(400).json({
//       message: "Missing API Token"
//     })
//   }
// }

exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(402).json({
      error: errors.array()[0].msg
    })
  }

  // Check whether email already exists
  const {email} = req.body
  User.findOne({email}, async (err, email) => {
    if(err || email) {
      return res.status(403).json({
        error: "Email already exists"
      })
    }

    
    const data = req.body;
    const user = new User({
      ...data,
      isVerified: false
    })
    const token = await new Token({
      token: Math.random().toString(36).slice(2),
      isUsed: false,
      email: req.body.email,
      expiryDate: moment(new Date()).add(30, 'm').toDate()
    }).save();

    const url = "http://localhost:3476/api/verifyToken?token=" + token.token;

    const body = `</div><p style="font-size:1.1em">Hi, ${user.firstname}</p><p>Click the button below to verify your BUSA account.OTP is valid for 10 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href=${url}>Click here </a></h2><p style="font-size:0.9em;">Regards,<br />Your Brand</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>In Patnership with <a href="www.light.io">Light.io</a></p></div></div></div>`; 
  
    await sendEmail(user.email,body,"Verify Email");
   //  res.send("An Email sent to your account please verify");



  


   // add user to the db
    user.save(async (err, user) => {
      if(err) {
        return res.status(400).json({
          error: "Unable to save user to DB",
          err
        })
      }
      // Send Email 
      // await sendEmail(user.email, "working", "Successful signup")
      res.json({
        message: "Successfully added user",
        user: {
          name: user.name,
          email: user.email,
          id: user._id
        }
      })
    })
    

  })
}
// exports.verifyToken = async (req,res) =>{
//   let token = req.query.token;
//   let check = await Token.findOne({
//     token: token,
//   });
//   console.log(check);
//   if(!check){
//     res.status(400).json({
//       message: "Token not found in the Database"
//     })
//   }

//   if(check.expiryDate < new Date()){
//     res.status(400).json({
//       message:"Token expired. Sign up Again"
//     })
//   }
//   await User.findOne({
//     email: check.email
//   }).updateOne({
//     isVerified: true
//   });
//   await Token.findByIdAndRemove(check._id);

//   return res.status(200).send({
//     message: "User verified successfully"
//   });
// }

exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email does not exists"
      })
    }

    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match"
      })
    }

    // Send Email
    sendEmail(user.email, "Signin Alert", "You have signed in to Alerge Right now. This is an alert... \n\n Happy Coding, \n Alerge Team")

    // create a token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 100 })

    // Send response to front end
    const { _id, name, email, role } = user
    return res.json({token, user: { _id, name, email, role }})
  })
}


exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User signout successfull"
  })
}

// Protected Routes
// exports.isSignedIn = expressJwt({
//   secret: process.env.SECRET,
//   userProperty: "auth"
// })

// Custom MiddleWares
// exports.isAuthenticated = (req, res, next) => {
//   let checker = req.profile && req.auth && req.profile._id == req.auth._id
//   if(!checker) {
//     return res.status(403).json({
//       error: "Access Denied"
//     })
//   }

//   next()
// }

// exports.isAdmin = (req, res, next) => {
//   if(req.profile.role === 0) {
//     return res.status(403).json({
//       error: "Your are not an Admin, Access Denied"
//     })
//   }

//   next()
// }

// Send verification code
// exports.sendVerificationCode = async (req, res) => {
//   const {email} = req.body
//   User.find({email}, (err, user) => {
//     if(err || user.length==0) {
//       return res.status(400).json({
//         error: "Email do not exist"
//       })
//     }

//     id = user[0]._id
//     let val = Math.floor(10000 + Math.random() * 9000);

//     User.findByIdAndUpdate(
//       { _id: id },
//       { $set: {verification_code: val} },
//       { new: true, useFindAndModify: false },
//       (err, user) => {
//         if (err) {
//           return res.status(400).json({
//             error: "You are not authorized to update this user"
//           });
//         }

//     const url = "http://localhost:3476/api/verifyToken?token=" + token.token;
//     const body = `</div><p style="font-size:1.1em">Hi, ${user.firstname}</p><p>Click the button below to verify your BUSA account.OTP is valid for 10 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href=${url}>Click here </a></h2><p style="font-size:0.9em;">Regards,<br />Your Brand</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>In Patnership with <a href="www.light.io">Light.io</a></p></div></div></div>`; 
//     await sendEmail(user.email,body,"Verify Email");
//         user.salt = undefined;
//         user.encry_password = undefined;
//         res.json({
//           status: "Success",
//           id: user._id,
//           message: "Verification code successfully sent"
//         });
//       }
//     );

//   })
// }


// exports.forgotPassWord = async (req,res) =>{
//     const {email,id, verificationCode} = req.body;

//     User.findOne({email},(err,user)=>{
//       if(err||!user){
//         return res.status(400).json({
//           error: "This user does not exist"
//         })
//       } 

//       const token = await new Token({
//         token: Math.random().toString(36).slice(2),
//         isUsed: false,
//         email: req.body.email,
//         expiryDate: moment(new Date()).add(30, 'm').toDate()
//       }).save();
  
//       const url = "http://localhost:3476/api/verifyToken?token=" + token.token;
  
//       const body = `</div><p style="font-size:1.1em">Hi, ${user.firstname}</p><p>Click the button below to verify your BUSA account.OTP is valid for 10 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href=${url}>Click here </a></h2><p style="font-size:0.9em;">Regards,<br />Your Brand</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>In Patnership with <a href="www.light.io">Light.io</a></p></div></div></div>`; 
    
//       await sendEmail(user.email,body,"Verify Email");

//       if(verificationCode === null) {
//         return res.status(400).json({
//           error: "Please add a valid code"
//         })
//       }
  
//       if(user.verification_code !== verificationCode) {
//         return res.status(400).json({
//           error: "Verification code does not match"
//         })
//       }
  
//       if(!req.body.newPassword) {
//         return res.status(200).json({
//           message: "Please input a valid password"
//         })
//       }
  
//       const {newPassword} = req.body
  
//       if(newPassword.length < 6) {
//         return res.json({
//           error: "Password should be at least 6 characters"
//         })
//       }
  
  
//       let encryPassword = user.securePassword(newPassword)
  
//       if(encryPassword == user.encry_password) {
//         return res.json({
//           error: "You cannot update the same password"
//         })
//       }
  
  
//       User.findByIdAndUpdate(
//         { _id: id },
//         { $set: {verification_code: undefined, encry_password: encryPassword} },
//         { new: true, useFindAndModify: false },
//         (err, user) => {
//           if (err) {
//             return res.status(400).json({
//               error: "Unable to update new password"
//             });
//           }
  
//           sendEmail(user.email, "Your Password was changed", `Your password had been chnaged..... \n\n Happy Coding, \n Alerge Team`)
//           res.json({
//             status: "Success",
//             id: user._id,
//             message: "Password was successfully changed"
//           });
//         }
//       );
//     })
    
//   }


// Reset Password
// exports.resetPassword = (req, res) => {
//   const {id, verificationCode} = req.body
//   User.findById(id).exec((err, user) => {
//     if(err || !user) {
//       return res.status(400).json({
//         error: "User do not exist"
//       })
//     }

//     if(verificationCode === null) {
//       return res.status(400).json({
//         error: "Please add a valid code"
//       })
//     }

//     if(user.verification_code !== verificationCode) {
//       return res.status(400).json({
//         error: "Verification code does not match"
//       })
//     }

//     if(!req.body.newPassword) {
//       return res.status(200).json({
//         message: "Please input a valid password"
//       })
//     }

//     const {newPassword} = req.body

//     if(newPassword.length < 6) {
//       return res.json({
//         error: "Password should be at least 6 characters"
//       })
//     }


//     let encryPassword = user.securePassword(newPassword)

//     if(encryPassword == user.encry_password) {
//       return res.json({
//         error: "You cannot update the same password"
//       })
//     }


//     User.findByIdAndUpdate(
//       { _id: id },
//       { $set: {verification_code: undefined, encry_password: encryPassword} },
//       { new: true, useFindAndModify: false },
//       (err, user) => {
//         if (err) {
//           return res.status(400).json({
//             error: "Unable to update new password"
//           });
//         }

//         sendEmail(user.email, "Your Password was changed", `Your password had been chnaged..... \n\n Happy Coding, \n Alerge Team`)
//         res.json({
//           status: "Success",
//           id: user._id,
//           message: "Password was successfully changed"
//         });
//       }
//     );
//   })
// }

// Contact us email
// exports.contactEmail = (req, res) => {
//   if(!req.body.email || !req.body.subject || !req.body.message) {
//     return res.status(400).json({
//       error: "Some Input's are empty"
//     })
//   }

//   const {email, subject, message} = req.body
//   // First send Alerge team the message
//   //sendGridEmail("rajsuthan666@gmail.com", subject, `Email: ${email} \n\n ${message}`)

//   // Then send success email to user
//   sendEmail(email, message, subject)

//   return res.json({
//     message: "Email Successfull sent"
//   })
// }

exports.forgotPassWord = async (req,res) =>{
  try{
  const {email} = req.body;
  const user =  await User.findOne({email});

  if(!user){
    res.status(400).json({
      success: false,
      error: "No user with this email found"
    })
  }
    const url = `http://localhost:3476/api/createNewPassWord/${user._id}`

    const body = `</div><p style="font-size:1.1em">Hi, ${user.firstname}</p><p>We received a request to reset your password for your BUSA account:${user.email}. We're here to help. Simply click on the button to set a new password </p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href=${url}>Click here </a><br/><p>if you didn't ask to change your password, don't worry! Your password is still safe and you can delete this email</p></h2><p style="font-size:0.9em;">Regards,<br />Your Brand</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>In Patnership with <a href="www.light.io">Light.io</a></p></div></div></div>`; 

  sendEmail(user.email,body,"Reset your BUSA App password")

  res.status(200).json({
    success: true,
    msg:"An email has been sent to you"
  })
} catch (error){
  console.log(error)
  res.status(500).json({
    status: 500,
    error:"Internal Error occured"
  })
}
}
exports.createNewPassWord = async (req,res) =>{
  try {

    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
        });

     if(!req.body.newPassword) {
             return res.status(200).json({
               message: "Please input a valid password"
             })
           }
           
           
           const {newPassword} = req.body
      
           if(newPassword.length < 6) {
            return res.json({
              error: "Password should be at least 6 characters"
             })
           }
      
      
           let encryPassword = user.securePassword(newPassword)
      
           if(encryPassword == user.encry_password) {
             return res.json({
               error: "You cannot update the same password"
             })
           }
      
      
           
              
            if (!user) {
                 return res.status(400).json({
                   error: "No user exists"
                 });
              }
      
           sendEmail(user.email, "Your Password was changed", `Your password had been chnaged..... \n\n Happy Coding, \n Alerge Team`)
          
          
           res.json({
                 status: "Success",
                 id: user._id,
                 message: "Password was successfully changed"
             });

    } catch (error) {
      console.log(error)
        res.status(500).json({
          success: false,
          error: "Internal Error Occured"
    })
  }
}