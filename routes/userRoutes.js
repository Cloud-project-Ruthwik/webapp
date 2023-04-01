const userController = require('../controllers/userController.js');
const dbConfig = require('../config/db.Config');

const router = require('express').Router()
const SDC = require('statsd-client');
const sdc = new SDC({host: dbConfig.METRICS_HOSTNAME, port: dbConfig.METRICS_PORT});
var start = new Date();

router.post("/", userController.addUsers);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUsers)

module.exports = router