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

