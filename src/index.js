const express = require('express');
const {PORT} = require('./config/serverConfig.js');

const bodyParser = require('body-parser');

const {basicEmail} = require('./services/email-service.js');

function StartAndSetupServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=>{
        basicEmail(
            'support@admin.com',
            'sahildh.iiman12@gmail.com',
            'Test Email',
            'This is a test email'
        );
        console.log(`Server is running on port ${PORT}`);
    });
}

StartAndSetupServer();