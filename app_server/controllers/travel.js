const fs = require('fs');
const path = require('path');

// Read and parse the trips JSON file
const tripsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/trips.json'), 'utf8')
);

/* GET Travel View */
exports.travel = (req, res) => {
    res.render('travel', { 
        title: 'Travlr Getaways - Travel',
        trips: tripsData 
    });
};