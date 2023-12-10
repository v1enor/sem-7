const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Team = require('../models/teamModel.js');

const jwt = require('jsonwebtoken');

function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

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

router.patch('/users/:id/teams', async (req, res) => {
    try {
        const { id } = req.params;
        let { teams } = req.body;
        teams = Array.from(new Set(teams));
        
        // Проверить, существуют ли команды
        try {
            teams.forEach(teamId => {
              if (!isValidObjectId(teamId)) {
                throw new Error();
              }
            });
          } catch (error) {
            return res.status(400).json({ message: 'One or more teams are invalid' });
          }

        const existingTeams = await Promise.all(teams.map(teamId => Team.findById(teamId)));
        if (existingTeams.includes(null)) {
            return res.status(400).json({ message: 'One or more teams do not exist' });
        }

        // Найти пользователя и обновить его команды
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.teams = teams;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;


