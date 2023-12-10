const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Team = require('../models/teamModel.js');
const Manager = require('../models/managerModel.js');
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


        req.user = decoded.id;
        req.role = decoded.role;
        next();
    });
}

router.use(checkToken);

router.post('/add', async (req, res) => {
    const { userlist, manager } = req.body;

    try {
        // Find users by login
        const users = await User.find({ login: { $in: userlist } });
        if (users.length !== userlist.length) {
            return res.status(400).json({ isValid: false, message: 'Some users do not exist.' });
        }

        //поиск пользователей и менеджеров по id
        const usersmanager = await User.find({ login: { $in: manager } });
        if (usersmanager.length !== manager.length) {
            return res.status(400).json({ isValid: false, message: 'Some users manager not exist.' });
        }



        // Find managers with userId equal to User.id
        const userIds = usersmanager.map(user => user.id);
        const managers = await Manager.find({ userId: { $in: userIds } });
        if (managers.length !== userIds.length) {
            return res.status(400).json({ isValid: false, message: 'Some users are not managers.' });
        }

        // Create a new team
        req.body.manager = userIds;
        const newTeam = new Team(req.body);

        // Save the team
        await newTeam.save();

        res.json({ isValid: true, message: 'Team added successfully.' });
    } catch (error) {
        throw new Error(error.message);
        // Error handling
    }
});

router.get('/my', async (req, res) => {
    try {
        const teams = await Team.find({ manager: req.user });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/all', async (req, res) => {
    try {
        if (req.role.includes('admin')) {
            const teams = await Team.find();
            res.json(teams);
        } else {
            res.status(403).json({ isValid: false, message: 'Access denied.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Сделать команду unavailable
router.post('/unavailable', async (req, res) => {
    const { teamId } = req.body;

    if (!req.role.includes('admin')) {
        return res.status(403).json({ isValid: false, message: 'Access denied.' });
    }
    try {
        // Проверьте, существует ли команда
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ isValid: false, message: 'Team not found.' });
        }

        // Сделайте команду недоступной
        team.status = 'unavailable';
        await team.save();

        res.json({ isValid: true, message: 'Team is unavailable.' });
    } catch (error) {
        // Обработка ошибок
    }
});

// Сделать команду available
router.post('/available', async (req, res) => {
    const { teamId } = req.body;

    if (!req.role.includes('admin')) {
        return res.status(403).json({ isValid: false, message: 'Access denied.' });
    }
    try {
        // Проверьте, существует ли команда
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ isValid: false, message: 'Team not found.' });
        }

        // Сделайте команду доступной
        team.status = 'active';
        await team.save();

        res.json({ isValid: true, message: 'Team is available.' });
    } catch (error) {
        // Обработка ошибок
    }
});

// Обновить команду
router.put('/update/:id', async (req, res) => {
    const teamId  = req.params.id;
    let { userlist = [], manager = [] } = req.body;

    try {
        // Проверьте, существует ли команда
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ isValid: false, message: 'Team not found.' });
        }

        if (userlist.length !== 0) {

            // Найти пользователей по логину
            const users = await User.find({ login: { $in: userlist } } );
            if (users.length !== userlist.length) {
                return res.status(400).json({ isValid: false, message: 'Some users do not exist.' });
            }
            let userli = users.map(user => user.id);
            req.body.userlist = userli;
        }
        else {
            req.body.userlist = [];
        }
        
        if(!manager.length !== 0) {
            // Найти менеджеров по логину
            const usersmanager = await User.find({ login: { $in: manager } });
            if (usersmanager.length !== manager.length) {
                return res.status(400).json({ isValid: false, message: 'Some users manager not exist.' });
            }

            // Найти менеджеров с userId равным User.id
            const userIds = usersmanager.map(user => user.id);
            const managers = await Manager.find({ userId: { $in: userIds } });
            if (managers.length !== userIds.length) {
                return res.status(400).json({ isValid: false, message: 'Some users are not managers.' });
            }
            req.body.manager = userIds;
        }else {
            req.body.manager = [];
        }
        // Обновить команду
        
        await Team.findByIdAndUpdate(teamId, req.body);

        res.json({ isValid: true, message: 'Team updated successfully.' });
    } catch (error) {
        // Обработка ошибок
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;