const express = require('express');
const router = express.Router();
const task_service = require('../services/task_service');
const authenticateToken = require('../middleware/auth');

router.get('/', task_service.getAllTasks);

router.get('/:id', task_service.getTaskById);

router.post('/',authenticateToken, task_service.addTask);

router.patch('/:id',authenticateToken, task_service.updateTask);

router.delete('/:id',authenticateToken, task_service.deleteTask);

module.exports = router;