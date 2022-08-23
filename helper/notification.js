
 
 const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.sendNotification = async (notificationTitle, Subtitle) =>{
    const notification ={
        title: notificationTitle,
        text: Subtitle
    };

    const fcm_tokens = [];

    const notification_body ={
        'notification': notification,
        'registration_ids': fcm_tokens
    }

    fetch(`https://fcm.googleapis.com/fcm/send`,{
        'method': 'POST',
        'headers':{
            'Authorization': 'key='+'AAAAmOQnN3g:APA91bF0RVOZyg9gAcIBde-CtOtDQjiUmCkOLjMru0e6siKLW4HXNquFl8dZIufSwHpl3fzztPAow11Xg_3QuTsyJSKG0K-1zqrRnGSrd8d3iXmLaqBW12gejEvX6XeF3N1hB6RrtXJl',
            'Content-Type': 'application/json'
        },
        'body':JSON.stringify(notification_body)
    })
};