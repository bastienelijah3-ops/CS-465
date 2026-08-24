# CS-465

Architecture

The Angular administration frontend operates within the user's browser as a Single Page Application (SPA), managing state and dynamic user interface components like triplisting, add-trip, and edit-trip. It relies on injectable services like TripDataService to send asynchronous HTTP requests and handle JSON data exchanges. In contrast express runs on the Node.js server runtime, serving as the API backend that handles routing, enforces server-side business rules, and communicates directly with MongoDB through Mongoose models.

Functionality

JS is a full, object oriented programming language executed by browser engines or Node.js runtime environments. JSON text based data interchange format derived from JS object syntax.

// middleware/auth.js
const { expressjwt: jwt } = require('express-jwt');

// Memory-only validation: No DB call needed to verify identity
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  algorithms: ['HS256']
});

module.exports = auth;


Testing

Testing was done by testing the integration between an Angular SPA, an Express API, and a MongoDB database. This begins by isolating backend endpoints using tools like Postman to verify that GET and PUT HTTP requests return valid JSON responses and update database records. Then the Angular TripDataService was inspected to ensure HttpClient methods are properly configured to target the correct API URL routes. End-to-end testing is then performed directly within the browser application to confirm that existing trip data loads smoothly into the UI and that edited form fields trigger database updates upon submission. During these user actions, Chrome Developer Tools' Network tab is monitored to audit outgoing requests, verifying 200 OK HTTP status codes, headers, and request body payloads. Finally, refreshing the application or checking MongoDB directly confirms that the modified data permanently persists in the database. Some errors I ran into where improper method configuration and the data not loading smoothly into the UI.

Reflection

This course has honed my skills working with angular and express architectures which I definitely needed more practice with it. In terms of my career field in cybersecurity it can help me create split architectures where cybersecurity responsibilities are divided between the client browser and the server.
