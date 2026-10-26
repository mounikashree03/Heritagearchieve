import express from 'express';
import { 
  getAllDistricts, 
  getDistrictsByState, 
  getDistrictById 
} from '../controllers/districtController.js';

const router = express.Router();

// GET /api/districts/state/:stateId - list districts for a specific state (registered before /:id)
router.get('/state/:stateId', getDistrictsByState);

// GET /api/districts - list all districts (with optional ?stateId= filter)
router.get('/', getAllDistricts);

// GET /api/districts/:id - get single district by ID or name
router.get('/:id', getDistrictById);

export default router;
