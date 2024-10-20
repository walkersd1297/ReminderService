const ticketService = require('../services/email-service.js');

const create = async (req,res)=>{
    try {
        const ticket = await ticketService.createNotification(req.body);
        res.status(200).json({
            message:"Ticket Created",
            data:ticket,
            err:{},
            success:true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Cannot create ticket",
            data:{},
            err:error,
            success:false
        });
    }
}


const getAll = async (req,res)=>{
    try {
        const tickets = await ticketService.fetchPendingEmails();
        res.status(200).json({
            message:"Tickets fetched",
            data:tickets,
            err:{},
            success:true
        });
    } catch (error) {
        res.status(500).json({
            message:"Cannot fetch tickets",
            data:{},
            err:error,
            success:false
        });
    }
}

module.exports = {
    create,
    getAll
}