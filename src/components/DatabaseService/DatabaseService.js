import mysql from 'mysql'; // Assuming you're using MySQL

// Database configuration
const dbConfig = {
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(query, params, (err, results) => {
        connection.release(); // Release the connection

        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
};

// Example function to fetch user data from the database
const getUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const params = [userId];

  try {
    const results = await executeQuery(query, params);
    return results[0]; // Assuming there's only one user with the given ID
  } catch (error) {
    throw error;
  }
};

export {
  executeQuery,
  getUserById
};
