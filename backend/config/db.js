import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MySQL Connection Pool Configuration
 * Connects to the 'historical_artifact_db' database in XAMPP / MariaDB / MySQL.
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME || 'historical_artifact_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

/**
 * Health check utility to test the live MySQL database connection
 * Returns success: true only when SELECT 1 executes successfully.
 */
export const testDbConnection = async () => {
  try {
    const checkPromise = (async () => {
      const connection = await pool.getConnection();
      await connection.query('SELECT 1');
      connection.release();
      return true;
    })();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out (MySQL server is offline or unreachable on specified port)')), 3000)
    );

    await Promise.race([checkPromise, timeoutPromise]);
    return {
      connected: true,
      message: 'Database connected successfully',
      databaseName: process.env.DB_NAME || 'historical_artifact_db'
    };
  } catch (error) {
    return {
      connected: false,
      message: 'Failed to connect to MySQL database. Ensure MySQL is started in XAMPP.',
      error: error.message,
      code: error.code || 'ECONNREFUSED'
    };
  }
};

export default pool;
