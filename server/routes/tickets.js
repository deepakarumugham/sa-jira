const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ticket = require('../models/ticket');
const user = require('../models/user');
const User = require('../models/user');


router.get('/', async(req, res) => {
    let tickets;
    const status = req.query.status || null;
    const assignee = req.query.assignee || null;

    try{
        let query = Ticket.find({});
        if(status && status !== "ALL")
            query = query.where({status: status});
        if(assignee && assignee !== "ALL")    
            query = query.where({assignee: assignee});
        
        tickets = await query.populate(
            {
            path: 'assignee',
            select: 'name'
            }
        ).exec();

        if(!tickets)
            return res.status(400).json("Error while fetching tickets for the given query");

    } catch(error) {
        return res.status(400).send("Error while fetching all tickets: " + error)
    }    
    res.status(200).json(tickets);
});


router.post('/', async (req, res) => {
    debugger;
    const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'NEW',
        assignee: req.body.assignee || null
    });
    console.log(ticket);
    try{
        const newTicket = await ticket.save();
        res.status(201).send(newTicket);
        console.log("Successfully added new ticket");
    } catch(error) {
        res.status(400).send("Error while adding new ticket");
        console.log(error);
    }
});

router.get('/:id', getTicketByID, (req, res) => {
    res.status(200).json(req.ticket);
});

router.put('/:id', getTicketByID, async (req, res) => {
    if (req.body.title)
        req.ticket.title = req.body.title;

    if (req.body.description)
        req.ticket.description = req.body.description;

    if (req.body.status)
        req.ticket.status = req.body.status;

    if(req.body.assignee)
        req.ticket.assignee = req.body.assignee;

    await req.ticket.save();
    res.status(204).send("Ticket updated successfully");
});

router.delete('/:id', getTicketByID, async (req, res) => {
    await req.ticket.remove();
    return res.status(204).json("Deleted ticket");
});

async function getTicketByID (req, res, next) {
    let ticket
    try {
        ticket = await Ticket.findById(req.params.id);
        if (!ticket)
            return res.status(404).send("Can't find ticket by ID");
    } catch(error) {
        return res.status(400).send("Error while fetching ticket by ID: " + error)
    }
    req.ticket = ticket;
    next();
}


module.exports = router;