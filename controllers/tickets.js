const express = require('express');
const User = require("../models/user");
const sendTicket = require('../helper/tickets')



 exports.sendTicket = async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId)

        sendTicket(user.email,"BUSA Show Ticket","Your Ticket","BUSA","ezehdavidhoddy@gmail.com")        

    res.status(200).json({
        success: true  
     })
    
} catch (error){
    console.log(error)
    res.status(500).json({
        success:false,
        msg:error
    })
}


}
