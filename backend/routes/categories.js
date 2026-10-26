import express from 'express';
import { getAllCategories, getCategoryById } from '../controllers/categoryController.js';

const router = express.Router();

// GET /api/categories - list all artifact categories with counts
router.get('/', getAllCategories);

// GET /api/categories/:id - get single category by ID or name
router.get('/:id', getCategoryById);

export default router;
