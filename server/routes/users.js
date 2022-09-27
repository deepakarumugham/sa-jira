const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');


router.get('/', async(req, res) => {
    let users;
    try{
        users = await User.find({});
        if(!users)
            return res.status(400).json("Error while fetching users for the given query");
    } catch(error) {
        return res.status(400).send("Error while fetching all users: " + error)
    } 
    res.status(200).json(users);
});


router.post('/', async (req, res) => {
    
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        tickets: []
    });

    try{
        const newUser = await user.save();
        res.status(201).send(newUser);
    } catch(error) {
        res.status(400).send("Error while adding new user");
    }

});

router.get('/:id', getUserByID, (req, res) => {
    res.status(200).json(req.user);
});

router.put('/:id', getUserByID, async (req, res) => {
    if (req.body.name)
        req.user.name = req.body.name;

    if (req.body.email)
        req.user.email = req.body.email;
    if (req.body.ticketID)
        req.user.tickets.push(req.body.ticketID);

    await req.user.save();
    res.status(204).send("User updated successfully");
});

router.delete('/:id', getUserByID, async (req, res) => {
    await req.user.remove();
    return res.status(204).json("Deleted user");
});

async function getUserByID (req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).send("Can't find user by ID");
    } catch(error) {
        return res.status(400).send("Error while fetching user by ID: " + error)
    }
    req.user = user;
    next();
}


module.exports = router;