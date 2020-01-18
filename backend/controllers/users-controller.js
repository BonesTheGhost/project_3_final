const uuid = require('uuid/v4')
const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');
const User = require('../models/user');
const mongoose = require('mongoose');

/*
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'PoochoGrande',
        email: 'test@test.com',
        password: 'YippeKaiYay'
    },

];
*/


const getUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching user failed, please try again later.', 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true }))})
};


//THIS NEEDS TO BE VALIDATED!! SO; 'validationResult' here, 'check' in the routes file!
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError('Invalid inputs passed. Please check your data!', 422);
        return next(error);

    };

    const { name, email, password, } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signing up failed. Please wait a bit and then try again.', 500);
        return next(error);
    };

    if (existingUser) {
        const error = new HttpError('User exists already!', 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: "https://homepages.cae.wisc.edu/~ece533/images/tulips.png",
        password
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not sign up.',
            500
        );
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid email/password combination',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};



// EXPORTS::
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;