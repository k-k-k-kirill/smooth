// Express router.
const router = require('express').Router();

// Controllers.
const UsersRouter = require('../controllers/Users')

// Routes.
router.use('/users/', UsersRouter)

module.exports = router;