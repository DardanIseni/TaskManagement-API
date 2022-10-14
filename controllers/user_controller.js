const UserService = require('../services/user_service');
const express = require('express');
const router = express.Router();

router.post('/register', UserService.register);
router.post('/login', UserService.login);

module.exports = router;
