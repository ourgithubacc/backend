const express = require('express');
const crypto = require("crypto");
const initPay = require('../helper/paystack')
const User = require("../models/user");
const secret = "sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a";

exports.payStack = async (req,res)=>{
try{
    const user = await User.findById(req.params.userId)

    
     const response = await initPay(user.email,"5000");
    res.status(200).send({
        checkout_link: response.data.data.authorization_url
    })
} catch (error){
    console.log(error)
    res.status(500).json({
        success:false,
        msg:error
    })
}

   
}

// exports.handleWebhook = async (req, res ) => {
//     try {
        
//         //webhook validation
//         //validate event
//     const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
//         if (hash == req.headers['x-paystack-signature']) {
//             // Retrieve the request's body
//             const event = req.body;
//             // Do something with event  
//         }
//         res.send(200);
//         const rest = 2+2;
//         console.log(rest)
//     }catch(error){
//         console.log(error);
//     }
// }