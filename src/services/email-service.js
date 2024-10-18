 const sender = require('../config/emailConfig.js');

 const basicEmail = async (from,to,subject,mailBody)=>{
        const mailOptions = {
            from:from,
            to:to,
            subject:subject,
            text:mailBody
        };
        await sender.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log(`Email sent: ${info.response}`);
            }
        });
 }


 module.exports = {
    basicEmail
 }