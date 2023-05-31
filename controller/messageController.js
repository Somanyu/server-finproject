const User = require('../models/User');

exports.twilioMsgStatus = async (req, res, next) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',
            body: 'Hello there!',
            to: 'whatsapp:+916370112909'
        });

        const userId = req.user;
        const user = await User.findById(userId, "-password");
        // console.log("🚀 ~ file: messageController.js:17 ~ exports.twilioMsgStatus= ~ user:", user)

        const messageInfo = await client.messages(message.sid).fetch();
        
        // Retrieve the final status of the message
        const isSent = messageInfo.status === 'delivered' || 'sent';

        // Check if message sent to correct phone number
        const isNumberVerified = messageInfo.to === 'whatsapp:+91'+'6370112909' 

        if (isSent && isNumberVerified) {
            res.status(201).json({ "status": messageInfo });
        } else {
            res.status(400).json({ "status": messageInfo })
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}