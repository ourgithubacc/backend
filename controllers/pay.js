const express = require('express')
const initPay = require('../helper/paystack')
const User = require("../models/user");

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