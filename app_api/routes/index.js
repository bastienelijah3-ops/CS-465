const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route for getting all trips
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// Route for getting a single trip by code parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;