const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET || 'MY_SECRET_KEY',
  algorithms: ['HS256'],
  userProperty: 'req.auth'
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Public routes
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes (JWT required)
router.post('/trips', auth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', auth, tripsController.tripsUpdateTrip);

module.exports = router;