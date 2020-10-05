const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  dialect: 'postgres',
  port: 10532,
})

pool.connect((err, client, release) => { 
    if (err) { 
        return console.error( 
            'Error acquiring client', err.stack) 
    } 
    client.query('SELECT NOW()', (err, result) => { 
        release() 
        if (err) { 
            return console.error( 
                'Error executing query', err.stack) 
        } 
        console.log("Successfully connected to the database - Postgres") 
    }) 
}) 

const getUsers = (request, response) => {
    pool.query('SELECT * FROM usere', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getByUserId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM seen_movies WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getByMovieId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM seen_movies WHERE movie_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM usere WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByIdPwd = (request, response) => {
    const { user_name, password } = request.body
    
    pool.query('SELECT * FROM usere WHERE user_name = $1 AND password = $2', [user_name, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
  const { user_name, birthdate, email, password, role, gender } = request.body

  pool.query('INSERT INTO usere (user_name, birthdate, email, password, role, gender) VALUES ($1, $2, $3, $4, $5, $6)', [user_name, birthdate, email, password, role, gender], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send('success')
  })
}

const createSeenMovie = (request, response) => {
  const { user_id, movie_id } = request.body

  pool.query('INSERT INTO seen_movies (user_id, movie_id) VALUES ($1, $2)', [user_id, movie_id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send('success')
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByIdPwd,

  getByUserId,
  getByMovieId,
  createSeenMovie,
}