const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.execute(
      'INSERT INTO users (username, email) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM users)',
      ['ci-test-user', 'ci-test-user@example.com']
    );
  } finally {
    await connection.end();
  }
}

setupDatabase().catch((error) => {
  console.error('Failed to initialize the test database:', error.message);
  process.exitCode = 1;
});