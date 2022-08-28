const express = require('express')
const nodemailer = require("nodemailer");
require('dotenv').config()


async function sendEmail(email, message, subject) {
  try {
    var transport = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.MAILPORT,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });
    

  return await transport.sendMail({
    from: '"Busa" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text:'test', // plain text body
    html: message, // html body
  });

 
  }catch(error){
    console.log(error);
  }
}



  module.exports = sendEmail;