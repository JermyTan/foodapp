
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const getCustomers = (req, response) => {
  pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCustomerById = (req, response) => {
  const id = parseInt(req.params.id);

  pool.query(
    'SELECT * FROM customers WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    });
}

const createCustomer = (req, response) => {
  const { name, cardNum } = req.body
  pool.query(
    'INSERT INTO users (name, cardNum) VALUES ($1, $2, 0)',
    [name, cardNum],
    (error, result) => {
      if (error) {
        throw errorr
      }
      response.status(201).send(`Customer added with ID:${result.insertId}`)
    })
}

const updateCustomer = (req, response) => {
  const id = parseInt(request.params.id)
  const { name, cardNum } = request.body
  pool.query(
    'UPDATE users SET name = $1, cardNum = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Customer modified with ID: ${id}`)
    }
  )
}

const deleteCustomer = (req, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    'DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}