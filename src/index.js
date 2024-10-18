const express = require('express');
const {PORT} = require('./config/serverConfig.js');

const bodyParser = require('body-parser');


function StartAndSetupServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}

StartAndSetupServer();