const express = require('express')
const nodemailer = require("nodemailer");
require('dotenv').config()


async function sendEmail(email, message, subject) {
  try {
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "0c3804aa601ee5",
        pass: "b1e5ef36b5ef91"
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