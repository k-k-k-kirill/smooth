// Express router.
const router = require('express').Router();

// Controllers.
const UsersRouter = require('../controllers/Users')

// Routes.
router.use('/user/', UsersRouter)

module.exports = router;