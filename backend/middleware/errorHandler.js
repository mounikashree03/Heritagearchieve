/**
 * Global Error Handling Middleware
 * Intercepts errors and formats clear, secure, and actionable API responses.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[HeritageArchive Error] [${req.method} ${req.url}]:`, err.message || err);

  // 1. Detect MySQL Connection and Database Failures
  const isConnRefused = err.code === 'ECONNREFUSED' || 
                        (typeof err.message === 'string' && err.message.includes('ECONNREFUSED'));
  const isAccessDenied = err.code === 'ER_ACCESS_DENIED_ERROR';
  const isBadDb = err.code === 'ER_BAD_DB_ERROR';
  const isTimeout = err.code === 'ETIMEDOUT' || err.code === 'PROTOCOL_CONNECTION_LOST';

  if (isConnRefused) {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed: MySQL service is offline or unreachable on port 3306. Please start the MySQL module in your XAMPP Control Panel.',
      code: 'DB_CONNECTION_REFUSED',
      hint: 'Open XAMPP Control Panel and click "Start" next to MySQL.'
    });
  }

  if (isAccessDenied) {
    return res.status(500).json({
      success: false,
      message: 'Database access denied for configured MySQL user. Please verify DB_USER and DB_PASSWORD credentials in backend/.env.',
      code: 'DB_ACCESS_DENIED'
    });
  }

  if (isBadDb) {
    return res.status(500).json({
      success: false,
      message: "Database 'historical_artifact_db' was not found in MySQL. Please verify the database exists in phpMyAdmin.",
      code: 'DB_NOT_FOUND'
    });
  }

  if (isTimeout) {
    return res.status(503).json({
      success: false,
      message: 'Database connection timed out. Please check MySQL server responsiveness.',
      code: 'DB_TIMEOUT'
    });
  }

  // 2. Standard Application / Server Errors
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error occurred while processing request',
    code: err.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
};

