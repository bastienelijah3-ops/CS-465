// app_server/controllers/travel.js

/* GET travel view */
const travel = async function(req, res, next) {
    // Or whatever your Handlebars rendering logic is
    res.render('travel', { title: 'Travlr Getaways' });
};

module.exports = {
    travel
};