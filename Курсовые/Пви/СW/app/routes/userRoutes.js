const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Manager = require('../models/managerModel.js');   
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    const token = jwt.sign({ id: user._id, role: user.roles }, 'your-secret-key', { expiresIn: '1h' });
    return token;
}

// Create a new user
router.post('/user', async (req, res) => {
    const allowedRoles = ['user', 'manager']; // Укажите разрешенные роли

    const userRoles = req.body.roles || ['user']; // Получение ролей из запроса

    if (userRoles.length > 0 ) {
        const isValidRole = userRoles.every(role => allowedRoles.includes(role)); // Проверка на доступные роли

        if (!isValidRole) {
            return res.status(400).send('Недопустимая роль');
        }
    }

    const user = new User({...req.body, roles: userRoles });

    try {
        const savedUser = await user.save();
        if (userRoles.includes('manager')) {
            const manager = new Manager({ userId: savedUser._id });
            await manager.save();
        }
        
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.get('/check-token', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ isValid: false, message: 'No token provided.' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(500).json({ isValid: false, message: 'Failed to authenticate token.' });
        }

        // Get the roles from the decoded token
        const roles = decoded.role;

        // Return the list of token roles
        res.json({ isValid: true, roles });
    });
});


router.post('/admin/login', async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login });
        if (!user) return res.status(400).send('Invalid Username');
        if (!req.body.password) return res.status(400).send('Password is required');
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) return res.status(400).send('Invalid Password');
        const token = generateAccessToken(user._id, user.admin);
        res.send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// User login
router.post('/login', async (req, res) => {
    try { 
        const user = await User.findOne({ login: req.body.login });
        if (!user) return res.status(400).send('Имя обязательно');
        if (!req.body.password) return res.status(400).send('Пароль обязателен');
        if (user.status !== 'active') return res.status(400).send('Пользователь не активирован!');
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) return res.status(400).send('Пароль не тот ;(');
        const token = generateAccessToken(user);
        res.send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Get all users
router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});




// Get a user by id
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a user by id
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: req.body }
        );
        res.send(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a user by id
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.send(removedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;