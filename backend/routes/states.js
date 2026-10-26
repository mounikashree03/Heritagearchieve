import express from 'express';
import { getAllStates, getStateById } from '../controllers/stateController.js';

const router = express.Router();

// GET /api/states - list all states with district and artifact counts
router.get('/', getAllStates);

// GET /api/states/:id - get single state by numeric ID or slug/name
router.get('/:id', getStateById);

export default router;
