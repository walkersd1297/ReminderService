const express = require('express');
const {PORT,REMINDER_BINDING_KEY} = require('./config/serverConfig.js');
const bodyParser = require('body-parser');

const {createChannel,subscribeMessage} = require('./utils/messageQueue.js');

const ticketController = require('./controllers/ticket-contoller.js');
const EmailService = require('./services/email-service.js');
const StartAndSetupServer = async()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.post('/api/v1/tickets',ticketController.create);
    
    const channel = await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);

    app.listen(PORT,()=>{
        // basicEmail(
        //     'support@admin.com',
        //     'sahildh.iiman12@gmail.com',
        //     'Test Email',
        //     'This is a test email'
        // );

        // setupCron();
        console.log(`Server is running on port ${PORT}`);
    });
}

StartAndSetupServer();