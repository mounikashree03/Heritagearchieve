import express from 'express';
import {
  getAllArtifacts,
  searchArtifacts,
  filterArtifacts,
  getStatistics,
  getFeaturedArtifacts,
  getArtifactsByDistrict,
  getArtifactsByCategory,
  getArtifactById,
  getRelatedArtifacts
} from '../controllers/artifactController.js';

const router = express.Router();

/**
 * Specific subroutes MUST be registered before parameterized route /:id
 * to prevent route pattern collisions.
 */
router.get('/statistics', getStatistics);
router.get('/search', searchArtifacts);
router.get('/filter', filterArtifacts);
router.get('/featured', getFeaturedArtifacts);
router.get('/district/:districtId', getArtifactsByDistrict);
router.get('/category/:categoryId', getArtifactsByCategory);
router.get('/:id/related', getRelatedArtifacts);

// Paginated general list
router.get('/', getAllArtifacts);

// Single artifact detail by numeric ID or slug/accession
router.get('/:id', getArtifactById);

export default router;
