const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route definitions for /trips
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

// Route definitions for /trips/:tripCode
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;