const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Manager = require('../models/managerModel.js');
const Project = require('../models/projectModel.js');
const Team = require('../models/teamModel.js');
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
        req.role = decoded.role;
        req.user = decoded.id;
        next();
    });
}
router.use(checkToken);

router.get('/all', async (req, res) => {
    if (req.role.includes('admin')) {
        try {
            const projects = await Project.find();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        res.status(403).json({ isValid: false, message: 'Access denied.' });
    }
});
    
router.post('/add', async (req, res) => {
    const { teamslist, userId } = req.body;

    try {
        // Check if team exists
        teamslist.forEach(async (team) => {
            const existingTeam = await Team.findOne({ name: team });
            if (!existingTeam) {
                return res.status(400).json({ message: 'Team does not exist.' });
            }});
            
        // Create new project
        const newProject = new Project(req.body);

        // Add project to project manager
        const Manager = await Manager.findOne({ userId: userId });
        if (Manager) {
            Manager.projects.push(newProject._id);
            await Manager.save();
        }

        res.status(200).json({ message: 'Project added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();



        // Add project to project manager
        const manager = await Manager.findOne({ userId: req.user });
        if (manager) {
            manager.projects.push(project._id);
            await manager.save();
        } if (!manager) {
            const newManager = new Manager({
                userId: req.user,
                projects: [project._id]
            });
            await newManager.save();
        }

        res.status(201).json({ message: 'Project created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});


//update project
router.put('/update/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
           throw new Error('Project not found.');
        }

        let { teamlist } = req.body;
        
        if (teamlist[0] === '') {
            teamlist = [];
        } else {
            for (const team of teamlist) {
                const existingTeam = await Team.findById(team);
                if (!existingTeam) {
                    throw new Error('Team does not exist.');
                }
            }
        }
        
        req.body.teamlist = teamlist;
        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Project updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get project by manager userId
router.get('/manager', async (req, res) => {
    try {
        const manager = await Manager.findOne({ userId: req.user });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found.' });
        }
        const projects = await Project.find({ _id: { $in: manager.projects } });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        const { teamslist } = req.body;

        for (const team of teamslist) {
            const existingTeam = await Team.findOne({ id: team });
            if (!existingTeam) {
                return res.status(400).json({ message: 'Team does not exist.' });
            }
        }

        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Project updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//сделать проект завершенным
router.put('/complete/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        project.status = "complete";
        await project.save();
        res.status(200).json({ message: 'Project updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;