const axios = require('axios');

const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET Travel View */
const travel = async (req, res) => {
    const path = '/api/trips';
    const requestUrl = `${apiOptions.server}${path}`;

    try {
        const response = await axios.get(requestUrl);
        let message = null;
        
        if (!(response.data instanceof Array)) {
            message = 'API lookup error';
            response.data = [];
        } else if (!response.data.length) {
            message = 'No trips found in database!';
        }

        res.render('travel', {
            title: 'Travlr Getaways - Travel',
            trips: response.data,
            message: message
        });
    } catch (err) {
        res.render('travel', {
            title: 'Travlr Getaways - Travel',
            trips: [],
            message: 'API error fetching trip data.'
        });
    }
};

module.exports = {
    travel
};