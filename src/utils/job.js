const cron = require('node-cron');
const emailService = require('../services/email-service.js');
const sender = require('../config/emailConfig.js');

const setupCron = ()=>{
    cron.schedule('*/1 * * * *',async ()=>{
        const tickets = await emailService.fetchPendingEmails();
        tickets.forEach((email) => {
            sender.sendMail({
                from:email.from,
                to:email.recepientEmail,
                subject:email.subject,
                text:email.content
            },async (err,info)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`Email sent`);
                    await emailService.updateNotification(email.id,{status:"SUCCESS"});
                }
            });
        });
        console.log(tickets);
    })
}

module.exports = {
    setupCron
}