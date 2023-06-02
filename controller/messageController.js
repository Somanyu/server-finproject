const User = require('../models/User');
const { sendMessage } = require('../services/sendMessage');
const { addExpenses, showExpenses } = require('../services/expenses');

exports.verifyUserNumber = async (req, res, next) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try {
        const userId = req.user;
        const user = await User.findById(userId, "-password");
        // console.log("🚀 ~ file: messageController.js:17 ~ exports.twilioMsgStatus= ~ user:", user)

        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',
            body: 'Hello there!',
            to: `whatsapp:+91${user.phone}`
        });

        const messageInfo = await client.messages(message.sid).fetch();

        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Retrieve the final status of the message
        const isSent = messageInfo.status === 'delivered' || messageInfo.status === 'sent' || messageInfo.status === 'read';

        // Check if message sent to correct phone number
        const isNumberVerified = messageInfo.to === 'whatsapp:+91' + user.phone

        if (isSent && isNumberVerified) {
            res.status(201).json({ "status": messageInfo });
        } else {
            res.status(400).json({ "status": messageInfo })
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}


exports.receiveMessage = async (req, res, next) => {
    const from = req.body.From;
    const body = req.body.Body;

    // phone number format is 'whatsapp:+91XXXXXXXXXX'
    const phoneNumber = from.substring(12); // Extract the phone number from the 'From' field

    const user = await User.findOne({ phone: phoneNumber }, "-password");


    // Check if the sentence contains the word "add" or "Add"
    if (/(^|\s)(add|Add)($|\s)/.test(body)) {
        // Extract product and price using RegEx
        const match = /add\s+(\w+)\s+(\d+)/i.exec(body);
        if (match) {
            const product = match[1];
            const price = Number(match[2]);

            const productText = await addExpenses(user._id, product, price);
            sendMessage(user.phone, productText);

        } else {
            res.status(400).json({ error: 'Invalid sentence' });
        }
    } else {
        res.status(400).json({ error: 'Invalid sentence' });
    }

}