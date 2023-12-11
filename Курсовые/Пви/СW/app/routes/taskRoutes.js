const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Team = require('../models/teamModel.js');
const Manager = require('../models/managerModel.js');
const jwt = require('jsonwebtoken');
const Task = require('../models/taskModel.js');
const Project = require('../models/projectModel.js');

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
});


router.post('/create', async (req, res) => {
    try {
        //проверка на существование проекта
        
        const project = await Project.findById(req.body.projectId);
        if(!project) throw new Error('Проект не найден');

        //Проверка является ли пользователь менеджером этого проекта
        const user = await User.findById(req.user);
        const manager = await Manager.findOne({userId: user.id, projects: { $in: [req.body.projectId] } });
        if(!manager) throw new Error('Вы не являетесь менеджером этого проекта');
        
        // Save the task to the database

        const task = new Task(req.body);
        await task.save();

        res.status(201).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.get("/my", async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const manager = await Manager.findOne({userId: user.id});
        const tasks = await Task.find({projectId: { $in: manager.projects } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message });
    }

});


router.put('/update/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        const user = await User.findById(req.user);
        if (!task) {
            throw new Error('Task not found');
        }
        
        task.status = 'taken';
        task.assignedTo = user.login;
        
        await task.save();
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;