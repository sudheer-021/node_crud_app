const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');

// Validation Rules
const userValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email adress'),
]

const updateUserValidationRules = [
    body('name').optional().notEmpty().withMessage('Name is required if provided'),
    body('email').optional().isEmail().withMessage('Invalid email address if provided'),
]

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// CRUD Routes, Apply Authentication and validations to routes
router.get('/user', userController.getAllUsers);
router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/users', authMiddleware, userValidationRules, userController.createUser);
router.put('/users/:id', authMiddleware, updateUserValidationRules, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;