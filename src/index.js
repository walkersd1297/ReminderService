const express = require('express');
const {PORT} = require('./config/serverConfig.js');

const bodyParser = require('body-parser');

// const {basicEmail} = require('./services/email-service.js');
const {setupCron} = require('./utils/job.js');
const ticketController = require('./controllers/ticket-contoller.js');

function StartAndSetupServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.post('/api/v1/tickets',ticketController.create);

    app.listen(PORT,()=>{
        // basicEmail(
        //     'support@admin.com',
        //     'sahildh.iiman12@gmail.com',
        //     'Test Email',
        //     'This is a test email'
        // );

        setupCron();
        console.log(`Server is running on port ${PORT}`);
    });
}

StartAndSetupServer();