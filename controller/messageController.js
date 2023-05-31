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

        // Retrieve the final status of the message
        const messageInfo = await client.messages(message.sid).fetch();
        const isSent = messageInfo.status === 'delivered' || 'sent';

        if (isSent) {
            res.status(201).json({ "status": messageInfo });
        } else {
            res.status(400).json({ "status": messageInfo })
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}