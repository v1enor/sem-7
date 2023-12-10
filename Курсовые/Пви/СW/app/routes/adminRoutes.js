const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');

const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ isValid: false, message: 'No token provided.' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(500).json({ isValid: false, message: 'Failed to authenticate token.' });
        }

        if (!decoded.role.includes('admin')) {
            return res.status(401).json({ isValid: false, message: 'No admin rights.' });
        }

        req.user = decoded;
        next();
    });
}

router.use(checkToken);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.send(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.patch('/users/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { status }, { new: true });

        res.send(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/user', async (req, res) => {


    const user = new User(req.body);

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


module.exports = router;


