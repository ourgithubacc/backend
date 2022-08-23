const express = require('express')
const axios = require('axios')
const url = require('url')

async function initPay(email,amount){
    try{    
    const json ={
            "email": "customer@email.com",
            "amount": "5000",
            "currency": "NGN",
            "metadata": {
                "cancel_action": "http://cancelurl.com"
            }
    }

    const token = "sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a";
    


    //const params = new url.URLSearchParams(eventId);
    const baseUrl = `https://api.paystack.co/transaction/initialize`;
    
     return await axios.post(baseUrl,json,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });

    //console.log(response);

} catch(error){
    console.log(error)
}
}

module.exports = initPay