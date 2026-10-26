import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  getAdminStats
} from '../controllers/authController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Authentication Routes
router.post('/register', register);
router.post('/login', login);

// Protected User Routes (Require JWT)
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);

// User Favorites / Bookmarks
router.get('/favorites', verifyToken, getFavorites);
router.post('/favorites/:artifactId', verifyToken, addFavorite);
router.delete('/favorites/:artifactId', verifyToken, removeFavorite);

// Admin-only Routes
router.get('/admin/stats', verifyToken, requireAdmin, getAdminStats);

export default router;
