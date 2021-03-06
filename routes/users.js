const express = require('express');

const router = express.Router();
const { body, check } = require('express-validator');
const HttpError = require('../models/http-error');

const usersControllers = require('../controllers/users-controllers');

router.get('/', usersControllers.getUsers);

router.post(
  '/sign-up',
  [
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new HttpError("Passwords don't match", 422);
      }
      return true;
    }),
  ],
  usersControllers.signUp
);

router.post('/login', usersControllers.login);

module.exports = router;
