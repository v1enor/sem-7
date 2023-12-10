const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const Manager = require('../models/managerModel.js');
const jwt = require('jsonwebtoken');
const Team = require('../models/teamModel.js');

function checkToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ isValid: false, message: 'No token provided.' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(500).json({ isValid: false, message: 'Failed to authenticate token.' });
        }

        const userId = decoded.id;
        req.user = userId;
        next();
    });
}
router.use(checkToken);

router.get('/manager', async (req, res) => {
    try {
        const manager = await Manager.findOne({ userId: req.user });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found.' });
        }
        res.json(manager);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/projects', async (req, res) => {
    try {
        const manager = await Manager.findOne({ userId: req.user });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found.' });
        }

        const projects = await Project.find({ manager: manager._id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/teams', async (req, res) => { 
    try {
        const manager = await Manager.findOne({ userId: req.user });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found.' });
        }

        const teams = await Team.find({ manager: manager._id });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;