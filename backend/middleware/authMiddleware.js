import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'heritage_archive_super_secret_jwt_key_2026_xyz!';

/**
 * Middleware to verify JWT token from Authorization header (Bearer <token>)
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Access token missing or invalid format.'
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Session expired or invalid token. Please log in again.'
      });
    }

    // Verify user still exists in database
    const [rows] = await pool.query(
      'SELECT user_id, full_name, email, role, avatar, bio, created_at FROM users WHERE user_id = ?',
      [decoded.userId]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User account no longer exists.'
      });
    }

    req.user = {
      userId: rows[0].user_id,
      id: rows[0].user_id,
      user_id: rows[0].user_id,
      fullName: rows[0].full_name,
      full_name: rows[0].full_name,
      email: rows[0].email,
      role: rows[0].role,
      avatar: rows[0].avatar,
      bio: rows[0].bio,
      createdAt: rows[0].created_at,
      created_at: rows[0].created_at
    };

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to enforce Admin role privileges
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access forbidden. Administrator role required for this action.'
    });
  }
  next();
};

/**
 * Optional token verification: attaches req.user if token is present, does not reject if missing
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const [rows] = await pool.query(
          'SELECT user_id, full_name, email, role, avatar, bio FROM users WHERE user_id = ?',
          [decoded.userId]
        );
        if (rows.length > 0) {
          req.user = {
            userId: rows[0].user_id,
            id: rows[0].user_id,
            fullName: rows[0].full_name,
            email: rows[0].email,
            role: rows[0].role,
            avatar: rows[0].avatar,
            bio: rows[0].bio
          };
        }
      } catch {
        // Ignore invalid token in optional auth
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
