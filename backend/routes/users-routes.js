//'places' route
const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();



// ===== ===== ROUTES ===== =====
//DON'T FORGET THAT ROUTE ORDER MATTERS!!
router.get('/', usersController.getUsers);

//This needs validation to make sure that a password and email are not empty.
router.post('/signup', [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min:6})],usersController.signup);

//We don't need to validate this route with an error because the whole purpose is to search for a user, thus, if the email and pass cannot be matched it will fail anyyways.
router.post('/login', usersController.login);
// ===== ===== ====== ===== =====


module.exports = router; 