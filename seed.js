const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Connect to Database
require('./app_api/models/db');

// Explicitly register the Trips model schema
require('./app_api/models/trips');

const Trip = mongoose.model('trips');

const tripsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'app_server/data/trips.json'), 'utf8')
);

const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(tripsData);
        console.log('Database populated successfully with trip data!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();