import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { ensureAuthDbInitialized } from '../config/initAuthDb.js';

const JWT_SECRET = process.env.JWT_SECRET || 'heritage_archive_super_secret_jwt_key_2026_xyz!';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a signed JWT token
 */
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * POST /api/auth/register
 * Register a new user account
 */
export const register = async (req, res, next) => {
  try {
    await ensureAuthDbInitialized().catch(() => {});

    const rawFullName = req.body.fullName || req.body.full_name || req.body.name || req.body.username || '';
    const rawEmail = req.body.email || '';
    const password = req.body.password;
    const role = req.body.role === 'curator' ? 'curator' : 'researcher';
    const bio = req.body.bio ? String(req.body.bio).trim() : '';

    const fullName = String(rawFullName).trim();
    const email = String(rawEmail).trim().toLowerCase();

    // 1. Validation
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required'
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // 2. Check if email already registered
    const [existing] = await pool.query('SELECT user_id FROM users WHERE LOWER(email) = LOWER(?)', [email]);
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.'
      });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Insert new user
    const [result] = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, bio) 
       VALUES (?, ?, ?, ?, ?)`,
      [fullName, email, passwordHash, role, bio]
    );

    const newUserId = result.insertId;
    const token = generateToken(newUserId, role);

    const userObj = {
      id: newUserId,
      userId: newUserId,
      user_id: newUserId,
      fullName,
      full_name: fullName,
      email,
      role,
      bio
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: userObj
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Authenticate existing user with email (or username) and password
 */
export const login = async (req, res, next) => {
  try {
    await ensureAuthDbInitialized().catch(() => {});

    const identifier = (req.body.email || req.body.username || req.body.identifier || '').trim();
    const password = req.body.password;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email (or username) and password are required'
      });
    }

    // Find user by email or full_name
    const [rows] = await pool.query(
      `SELECT user_id, full_name, email, password_hash, role, bio, created_at 
       FROM users 
       WHERE LOWER(email) = LOWER(?) OR LOWER(full_name) = LOWER(?)`,
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. No account found matching this email or username.'
      });
    }

    const user = rows[0];

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your credentials.'
      });
    }

    const token = generateToken(user.user_id, user.role);

    const userObj = {
      id: user.user_id,
      userId: user.user_id,
      user_id: user.user_id,
      fullName: user.full_name,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      createdAt: user.created_at,
      created_at: user.created_at
    };

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: userObj
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Return current logged in user profile
 */
export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: {
        ...req.user,
        id: req.user.userId || req.user.id || req.user.user_id,
        userId: req.user.userId || req.user.id || req.user.user_id,
        user_id: req.user.userId || req.user.id || req.user.user_id,
        fullName: req.user.fullName || req.user.full_name,
        full_name: req.user.full_name || req.user.fullName
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/profile
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const rawFullName = req.body.fullName || req.body.full_name;
    const bio = req.body.bio !== undefined ? String(req.body.bio).trim() : '';
    const userId = req.user.userId || req.user.id || req.user.user_id;
    const { current_password, currentPassword, new_password, newPassword } = req.body;

    const fullName = rawFullName ? String(rawFullName).trim() : '';
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: 'Full name cannot be empty'
      });
    }

    // Optional password update
    const newPass = new_password || newPassword;
    const currPass = current_password || currentPassword;

    if (newPass) {
      if (!currPass) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to change your password'
        });
      }
      if (newPass.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long'
        });
      }

      const [userRows] = await pool.query('SELECT password_hash FROM users WHERE user_id = ?', [userId]);
      if (userRows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(currPass, userRows[0].password_hash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(newPass, salt);
      await pool.query('UPDATE users SET password_hash = ? WHERE user_id = ?', [newHash, userId]);
    }

    await pool.query(
      'UPDATE users SET full_name = ?, bio = ? WHERE user_id = ?',
      [fullName, bio, userId]
    );

    const [updatedRows] = await pool.query(
      'SELECT user_id, full_name, email, role, bio, created_at FROM users WHERE user_id = ?',
      [userId]
    );

    const updated = updatedRows[0];
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updated.user_id,
        userId: updated.user_id,
        user_id: updated.user_id,
        fullName: updated.full_name,
        full_name: updated.full_name,
        email: updated.email,
        role: updated.role,
        bio: updated.bio,
        createdAt: updated.created_at,
        created_at: updated.created_at
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/favorites
 * Get saved artifacts bookmarked by the user
 */
export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const query = `
      SELECT 
        a.artifact_id,
        a.artifact_name,
        a.district_id,
        d.district_name,
        d.state_id,
        s.state_name,
        a.category_id,
        c.category_name,
        a.historical_period,
        a.dynasty_or_civilization,
        a.material,
        a.place_of_origin,
        a.description,
        uf.created_at AS bookmarked_at
      FROM user_favorites uf
      JOIN artifacts a ON uf.artifact_id = a.artifact_id
      JOIN districts d ON a.district_id = d.district_id
      JOIN states s ON d.state_id = s.state_id
      JOIN categories c ON a.category_id = c.category_id
      WHERE uf.user_id = ?
      ORDER BY uf.created_at DESC
    `;

    const [rows] = await pool.query(query, [userId]);

    res.json({
      success: true,
      count: rows.length,
      data: rows.map(r => ({
        id: r.artifact_id,
        name: r.artifact_name,
        state: r.state_name,
        district: r.district_name,
        category: r.category_name,
        historicalPeriod: r.historical_period,
        dynasty: r.dynasty_or_civilization,
        material: r.material,
        placeOfOrigin: r.place_of_origin,
        description: r.description,
        bookmarkedAt: r.bookmarked_at
      }))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/favorites/:artifactId
 * Add artifact to user favorites
 */
export const addFavorite = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { artifactId } = req.params;

    if (!artifactId || isNaN(Number(artifactId))) {
      return res.status(400).json({
        success: false,
        message: 'Valid artifact ID required'
      });
    }

    // Check artifact exists
    const [artifact] = await pool.query('SELECT artifact_id FROM artifacts WHERE artifact_id = ?', [Number(artifactId)]);
    if (artifact.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Artifact not found'
      });
    }

    await pool.query(
      'INSERT IGNORE INTO user_favorites (user_id, artifact_id) VALUES (?, ?)',
      [userId, Number(artifactId)]
    );

    res.json({
      success: true,
      message: 'Artifact saved to your archival bookmarks'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/auth/favorites/:artifactId
 * Remove artifact from user favorites
 */
export const removeFavorite = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { artifactId } = req.params;

    await pool.query(
      'DELETE FROM user_favorites WHERE user_id = ? AND artifact_id = ?',
      [userId, Number(artifactId)]
    );

    res.json({
      success: true,
      message: 'Artifact removed from bookmarks'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/admin/stats
 * Admin dashboard overview stats
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const [usersCount] = await pool.query('SELECT COUNT(*) AS total FROM users');
    const [artifactsCount] = await pool.query('SELECT COUNT(*) AS total FROM artifacts');
    const [statesCount] = await pool.query('SELECT COUNT(*) AS total FROM states');
    const [districtsCount] = await pool.query('SELECT COUNT(*) AS total FROM districts');
    const [categoriesCount] = await pool.query('SELECT COUNT(*) AS total FROM categories');
    const [favoritesCount] = await pool.query('SELECT COUNT(*) AS total FROM user_favorites');

    const [recentUsers] = await pool.query(
      'SELECT user_id, full_name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5'
    );

    const [curatorCount] = await pool.query("SELECT COUNT(*) AS total FROM users WHERE role = 'admin' OR role = 'curator'");
    const [researcherCount] = await pool.query("SELECT COUNT(*) AS total FROM users WHERE role = 'researcher'");

    const totalUsers = usersCount[0]?.total || 0;
    const totalArtifacts = artifactsCount[0]?.total || 0;
    const totalStates = statesCount[0]?.total || 0;
    const totalDistricts = districtsCount[0]?.total || 0;
    const totalCategories = categoriesCount[0]?.total || 0;
    const totalBookmarks = favoritesCount[0]?.total || 0;
    const totalAdmins = curatorCount[0]?.total || 0;
    const totalResearchers = researcherCount[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        total_users: totalUsers,
        totalArtifacts,
        total_artifacts: totalArtifacts,
        totalStates,
        total_states: totalStates,
        totalDistricts,
        total_districts: totalDistricts,
        totalCategories,
        total_categories: totalCategories,
        totalBookmarks,
        total_bookmarks: totalBookmarks,
        totalAdmins,
        total_admins: totalAdmins,
        totalResearchers,
        total_researchers: totalResearchers
      },
      recentUsers: recentUsers.map(u => ({
        id: u.user_id,
        user_id: u.user_id,
        fullName: u.full_name,
        full_name: u.full_name,
        email: u.email,
        role: u.role,
        createdAt: u.created_at,
        created_at: u.created_at
      }))
    });
  } catch (error) {
    next(error);
  }
};
