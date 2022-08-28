const crypto  = require ('crypto')

const secret = "sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a"


exports.handleWebhook = async (req, res ) => {
    try {
        
        const event = req.body;
         // Do something with event
         console.log(event);
        res.send(200);




    //     //webhook validation
    //     //validate event
    // const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    //     if (hash == req.headers['x-paystack-signature']) {
    //         // Retrieve the request's body
    //         const event = req.body;
    //         // Do something with event  
    //     }
    //     res.send(200);
    //     const rest = 2+2;
    //     console.log(rest)
    }catch(error){
        console.log(error);
    }
}