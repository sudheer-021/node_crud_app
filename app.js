const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/sequelize');
const apiRoutes = require('./routes/api');


const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, //Limit each IP to 100 requests per windows
    message: 'Too many requests from this IP, please try again after 15 minutes',
})
app.use(limiter);

// Synchronize all models
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use('/api', apiRoutes);

//Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})