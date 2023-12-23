const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Manager = require('../models/managerModel.js');
const jwt = require('jsonwebtoken');
const Task = require('../models/taskModel.js');
const Team = require('../models/teamModel.js');
const Project = require('../models/projectModel.js');
const taskModel = require('../models/taskModel.js');

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
        const projects = await Project.find({ _id: { $in: manager.projects } });
        let tasks = await Task.find({ projectId: { $in: projects } });
        if (!tasks) return;
        tasks = tasks.map(task => {
            const project = projects.find(project => project.id === task.projectId);
            return {
                ...task._doc,
                projectTitle: project.title,
                projectDescription: project.description
            };
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message });
    }

});

router.get("/byproject", async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const team = await Team.find({ userlist: user.login });
        const projects = await Project.find({ teamslist: team._id });
        let tasks = await Task.find({projectId: { $in: projects } });
        tasks = tasks.map(task => {
            const project = projects.find(project => project.id === task.projectId);
            return {
                ...task._doc,
                projectTitle: project.title,
                projectDescription: project.description
            };
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);

router.post('/upload/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.body.projectId);
        if (!project) throw new Error('Проект не найден');

        //Проверка является ли пользователь менеджером этого проекта
        const user = await User.findById(req.user);
        const manager = await Manager.findOne({ userId: user.id, projects: { $in: [req.body.projectId] } });
        if (!manager) throw new Error('Вы не являетесь менеджером этого проекта');
        
        // Save the task to the database

        let task = await Task.findById(req.params.id);
        if (!task) throw new Error('Задача не найдена');
        task.title = req.body.title;
        task.description = req.body.description;
        task.projectId = req.body.projectId;
        await task.save();
        res.status(201).json({ success: true });
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
//set task taken
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


//set task taken
router.put('/unset/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
      
        if (!task) {
            throw new Error('Task not found');
        }
        
        task.status = 'awaiting';
        task.assignedTo = null;
        
        await task.save();
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.put('/finish/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
      
        if (!task) {
            throw new Error('Task not found');
        }
        
        task.status = 'finished';
 
        
        await task.save();
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;