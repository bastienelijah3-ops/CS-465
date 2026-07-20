const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

/* Define the route matching the travel page path */
router.get('/', controller.travel);

module.exports = router;