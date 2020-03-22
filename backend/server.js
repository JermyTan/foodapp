const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const morgan = require('morgan');

// TODO: Require route files
const apiRoutes = require('./routes/api-routes');

// load env vars
dotenv.config({ path : './config/config.env' });

const app = express();

app.use(bodyParser.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// TODO: Mount routers
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Route to frontend homepage
app.get("/", (req, res) => res.end("Welcome to foodapp!"));
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
