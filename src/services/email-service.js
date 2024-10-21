const sender = require('../config/emailConfig.js');
const TicketRepository = require('../repository/ticket-repository.js');

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

const fetchPendingEmails = async()=>{
    try {
        const repo = new TicketRepository();
        const tickets = await repo.get({status:"PENDING"});
        return tickets;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createNotification = async (data)=>{
    try {
        const repo = new TicketRepository();
        const ticket = await repo.create(data);
        return ticket;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateNotification = async (ticketId,data)=>{
    try {
        const repo = new TicketRepository();
        const ticket = await repo.update(ticketId,data);
        return ticket;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const subscribeEvents = async(payload)=>{
    let service = payload.service;
    let data = payload.data;
    switch(service){
        case "CREATE_NOTIFICATION":
            await createNotification(data);
            break;
        case "SEND_EMAIL":
            await basicEmail(data);
            break;
        default:
            console.log("Invalid service");
            break;
    }
}

module.exports = {
    basicEmail,
    fetchPendingEmails,
    createNotification,
    updateNotification,
    subscribeEvents
}