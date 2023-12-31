const express = require('express');
const router = express.Router();
const User   = require('../models/userModel.js');
const Team = require("../models/teamModel.js").default;
const jwt = require('jsonwebtoken');
const Project = require('../models/projectModel.js');
const Event   = require('../models/eventModel.js');

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
    try{
        const { projectid = "", teamid = "" } = req.body;

        const user = await User.findById(req.user);
        if (!user) throw new Error("Нет такого пользователя!");
        
        if (projectid !== "") {
            const project = await Project.findById(projectid)
            if (!project) throw new Error("Нет такого проекта!");
        }

        if (teamid !== "") {
            const team = await Team.findById(teamid);
            if (!team) throw new Error("Нет такой команды!");
            const isUserInTeam = team.project.includes(user.login);
            if (!isUserInTeam) throw new Error("Пользователь не является членом команды!");
        }
        req.body.userId = req.user;
        const event = new Event(req.body);
        await event.save();
        res.status(200).json("Успешно создан!")

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get("/my", async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user });
        if (!events) res.status(200);
        else {
            res.status(200).json(events);
        }
    } catch (error) {
        res.status(500).json({error: error.message });
    }

});

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { projectid = "", teamid = "" } = req.body;

        const user = await User.findById(req.user);
        if (!user) throw new Error("Нет такого пользователя!");

        if (projectid !== "") {
            const project = await Project.findById(projectid);
            if (!project) throw new Error("Нет такого проекта!");
        }

        if (teamid !== "") {
            const team = await Team.findById(teamid);
            if (!team) throw new Error("Нет такой команды!");
            const isUserInTeam = team.project.includes(user.login);
            if (!isUserInTeam) throw new Error("Пользователь не является членом команды!");
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) throw new Error("Нет такого события!");

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/archive/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) throw new Error("Нет такого события!");
        event.status = "archive";
        await event.save();
        res.status(200).json("Событие успешно архивировано!");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/active/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) throw new Error("Нет такого события!");
        event.status = "active";
        await event.save();
        res.status(200).json("Событие успешно перенесено в актульное!");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;