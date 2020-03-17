<<<<<<< HEAD
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
  res.end("Welcome to foodapp!");
}
);

app.listen(port, () => console.log(`server listening on port ${port}`));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const db = require('./queries');

app.get('/customers', db.getCustomers)
app.get('/customers/:id', db.getCustomerById)
app.post('/customers', db.createCustomer)
app.put('/customers/:id', db.updateCustomer)
app.delete('/customers/:id', db.deleteCustomer)

=======
const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');

// TODO: Require route files
const apiRoutes = require('./routes/api-routes');

// load env vars
dotenv.config({ path : './config/config.env' });

const app = express();

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
>>>>>>> f18aa4f63c7d78510eba122dae4430379b1e8d68
