const express = require('express')
const axios = require('axios')
const url = require('url')

async function sendTicket (email,subject,body,fromName,replyTo){
    try{    
    const json ={
        email:email,
        subject:subject,
        body:body,
        fromName:fromName,
        replyTo:replyTo
    }

    let eventId = {eventId: "630376620b55762db35bf89c" }

    const params = new url.URLSearchParams(eventId);
    const baseUrl = `https://apis.ticket-generator.com/client/v1/ticket/send?${params}`;
    
    await axios.post(baseUrl,json);

} catch(error){
    console.log(error)
}
}

module.exports = sendTicket