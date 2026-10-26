import pool from '../config/db.js';

/**
 * Base SELECT query fragment joining state, district, and category
 */
const BASE_ARTIFACT_SELECT = `
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
    a.approximate_age,
    a.material,
    a.place_of_origin,
    a.description,
    a.historical_significance,
    a.cultural_importance,
    a.created_at,
    a.updated_at
  FROM artifacts a
  JOIN districts d ON a.district_id = d.district_id
  JOIN states s ON d.state_id = s.state_id
  JOIN categories c ON a.category_id = c.category_id
`;

/**
 * Normalizes an artifact DB row into an object matching frontend expectations
 */
const formatArtifactRow = (r) => ({
  id: r.artifact_id,
  artifact_id: r.artifact_id,
  name: r.artifact_name,
  artifact_name: r.artifact_name,
  districtId: r.district_id,
  district_id: r.district_id,
  district: r.district_name,
  district_name: r.district_name,
  stateId: r.state_id,
  state_id: r.state_id,
  state: r.state_name,
  state_name: r.state_name,
  categoryId: r.category_id,
  category_id: r.category_id,
  category: r.category_name,
  category_name: r.category_name,
  historicalPeriod: r.historical_period,
  historical_period: r.historical_period,
  dynasty: r.dynasty_or_civilization,
  dynasty_or_civilization: r.dynasty_or_civilization,
  approximateAge: r.approximate_age,
  approximate_age: r.approximate_age,
  material: r.material,
  placeOfOrigin: r.place_of_origin,
  place_of_origin: r.place_of_origin,
  description: r.description,
  shortDescription: r.description ? r.description.slice(0, 160) + '...' : '',
  historicalDescription: r.description,
  historicalSignificance: r.historical_significance,
  historical_significance: r.historical_significance,
  culturalImportance: r.cultural_importance,
  cultural_importance: r.cultural_importance,
  created_at: r.created_at,
  updated_at: r.updated_at
});

/**
 * Parse & sanitize pagination parameters
 */
const parsePagination = (query, defaultLimit = 12) => {
  const pageRaw = parseInt(query.page || '1', 10);
  const page = isNaN(pageRaw) || pageRaw < 1 ? 1 : pageRaw;

  const limitRaw = parseInt(query.limit || query.pageSize || String(defaultLimit), 10);
  const limit = isNaN(limitRaw) || limitRaw < 1 ? defaultLimit : Math.min(100, limitRaw);

  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

/**
 * GET /api/artifacts
 * List all artifacts with pagination and sorting
 */
export const getAllArtifacts = async (req, res, next) => {
  try {
    const { page, limit, offset } = parsePagination(req.query, 12);
    const sortBy = req.query.sortBy || 'id-asc';

    // Count total records
    const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM artifacts');
    const totalCount = countRows[0].total;

    // Sorting clause
    let orderClause = 'ORDER BY a.artifact_id ASC';
    if (sortBy === 'name-asc') orderClause = 'ORDER BY a.artifact_name ASC';
    if (sortBy === 'name-desc') orderClause = 'ORDER BY a.artifact_name DESC';
    if (sortBy === 'id-desc') orderClause = 'ORDER BY a.artifact_id DESC';

    const query = `
      ${BASE_ARTIFACT_SELECT}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query(query, [limit, offset]);
    const items = rows.map(formatArtifactRow);

    res.json({
      success: true,
      items,
      data: items,
      totalCount,
      page,
      pageSize: limit,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
      hasMore: offset + limit < totalCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/search?q=coin
 * Search artifacts by name, description, historical period, dynasty, material, or place of origin
 */
export const searchArtifacts = async (req, res, next) => {
  try {
    const q = req.query.q || req.query.search;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query parameter 'q' is required (e.g., /api/artifacts/search?q=coin)"
      });
    }

    const { page, limit, offset } = parsePagination(req.query, 12);
    const searchTerm = `%${q.trim()}%`;

    const whereCondition = `
      WHERE (
        a.artifact_name LIKE ? OR
        a.description LIKE ? OR
        a.historical_period LIKE ? OR
        a.dynasty_or_civilization LIKE ? OR
        a.material LIKE ? OR
        a.place_of_origin LIKE ? OR
        s.state_name LIKE ? OR
        d.district_name LIKE ? OR
        c.category_name LIKE ?
      )
    `;
    const searchParams = Array(9).fill(searchTerm);

    // Count matching rows
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM artifacts a
      JOIN districts d ON a.district_id = d.district_id
      JOIN states s ON d.state_id = s.state_id
      JOIN categories c ON a.category_id = c.category_id
      ${whereCondition}
    `;
    const [countRows] = await pool.query(countQuery, searchParams);
    const totalCount = countRows[0].total;

    const dataQuery = `
      ${BASE_ARTIFACT_SELECT}
      ${whereCondition}
      ORDER BY a.artifact_name ASC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query(dataQuery, [...searchParams, limit, offset]);
    const items = rows.map(formatArtifactRow);

    res.json({
      success: true,
      query: q.trim(),
      items,
      data: items,
      totalCount,
      page,
      pageSize: limit,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
      hasMore: offset + limit < totalCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/filter
 * Multi-criteria parameterized filtering by state, district, category, historical period, material, dynasty, search
 */
export const filterArtifacts = async (req, res, next) => {
  try {
    const {
      state,
      stateId,
      district,
      districtId,
      category,
      categoryId,
      period,
      historicalPeriod,
      historical_period,
      material,
      dynasty,
      dynasty_or_civilization,
      q,
      search,
      sortBy = 'name-asc'
    } = req.query;

    const { page, limit, offset } = parsePagination(req.query, 12);

    const conditions = [];
    const params = [];

    // State filter (numeric ID or state name)
    const activeState = stateId || state;
    if (activeState && activeState !== 'all') {
      if (!isNaN(Number(activeState))) {
        conditions.push('d.state_id = ?');
        params.push(Number(activeState));
      } else {
        const norm = activeState.replace(/-/g, ' ');
        conditions.push('(LOWER(s.state_name) = LOWER(?) OR LOWER(s.state_name) = LOWER(?))');
        params.push(activeState.trim(), norm.trim());
      }
    }

    // District filter (numeric ID or district name)
    const activeDistrict = districtId || district;
    if (activeDistrict && activeDistrict !== 'all') {
      if (!isNaN(Number(activeDistrict))) {
        conditions.push('a.district_id = ?');
        params.push(Number(activeDistrict));
      } else {
        const norm = activeDistrict.replace(/-/g, ' ');
        conditions.push('(LOWER(d.district_name) = LOWER(?) OR LOWER(d.district_name) = LOWER(?))');
        params.push(activeDistrict.trim(), norm.trim());
      }
    }

    // Category filter (numeric ID or category name)
    const activeCategory = categoryId || category;
    if (activeCategory && activeCategory !== 'all') {
      if (!isNaN(Number(activeCategory))) {
        conditions.push('a.category_id = ?');
        params.push(Number(activeCategory));
      } else {
        conditions.push('(LOWER(c.category_name) = LOWER(?) OR LOWER(c.category_name) LIKE LOWER(?))');
        params.push(activeCategory.trim(), `%${activeCategory.trim()}%`);
      }
    }

    // Historical Period filter
    const activePeriod = period || historicalPeriod || historical_period;
    if (activePeriod && activePeriod !== 'all') {
      conditions.push('a.historical_period LIKE ?');
      params.push(`%${activePeriod.trim()}%`);
    }

    // Material filter
    if (material && material !== 'all') {
      conditions.push('a.material LIKE ?');
      params.push(`%${material.trim()}%`);
    }

    // Dynasty filter
    const activeDynasty = dynasty || dynasty_or_civilization;
    if (activeDynasty && activeDynasty !== 'all') {
      conditions.push('a.dynasty_or_civilization LIKE ?');
      params.push(`%${activeDynasty.trim()}%`);
    }

    // Keyword Search
    const activeSearch = q || search;
    if (activeSearch && activeSearch.trim() !== '') {
      const term = `%${activeSearch.trim()}%`;
      conditions.push(`(
        a.artifact_name LIKE ? OR 
        a.material LIKE ? OR 
        a.description LIKE ? OR 
        a.historical_period LIKE ? OR 
        a.dynasty_or_civilization LIKE ? OR 
        a.place_of_origin LIKE ?
      )`);
      params.push(term, term, term, term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Count matching rows
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM artifacts a
      JOIN districts d ON a.district_id = d.district_id
      JOIN states s ON d.state_id = s.state_id
      JOIN categories c ON a.category_id = c.category_id
      ${whereClause}
    `;
    const [countRows] = await pool.query(countQuery, params);
    const totalCount = countRows[0].total;

    // Sorting
    let orderClause = 'ORDER BY a.artifact_name ASC';
    if (sortBy === 'name-desc') orderClause = 'ORDER BY a.artifact_name DESC';
    if (sortBy === 'id-asc') orderClause = 'ORDER BY a.artifact_id ASC';
    if (sortBy === 'id-desc') orderClause = 'ORDER BY a.artifact_id DESC';

    const dataQuery = `
      ${BASE_ARTIFACT_SELECT}
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query(dataQuery, [...params, limit, offset]);
    const items = rows.map(formatArtifactRow);

    res.json({
      success: true,
      items,
      data: items,
      totalCount,
      page,
      pageSize: limit,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
      hasMore: offset + limit < totalCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/district/:districtId
 * Retrieve all artifacts located in a specific district
 */
export const getArtifactsByDistrict = async (req, res, next) => {
  try {
    const { districtId } = req.params;

    if (!districtId || !districtId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'District identifier parameter is required'
      });
    }

    // Check if district exists
    let checkQuery;
    let checkParams;
    if (!isNaN(Number(districtId))) {
      checkQuery = 'SELECT district_id, district_name FROM districts WHERE district_id = ?';
      checkParams = [Number(districtId)];
    } else {
      const norm = districtId.replace(/-/g, ' ');
      checkQuery = 'SELECT district_id, district_name FROM districts WHERE LOWER(district_name) = LOWER(?) OR LOWER(district_name) = LOWER(?)';
      checkParams = [districtId.trim(), norm.trim()];
    }

    const [districtRows] = await pool.query(checkQuery, checkParams);
    if (districtRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `District '${districtId}' not found in database`
      });
    }

    const targetDistrict = districtRows[0];

    const query = `
      ${BASE_ARTIFACT_SELECT}
      WHERE a.district_id = ?
      ORDER BY a.artifact_name ASC
    `;

    const [rows] = await pool.query(query, [targetDistrict.district_id]);
    const items = rows.map(formatArtifactRow);

    res.json({
      success: true,
      district: {
        id: targetDistrict.district_id,
        name: targetDistrict.district_name
      },
      count: items.length,
      items,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/category/:categoryId
 * Retrieve all artifacts in a specific category
 */
export const getArtifactsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || !categoryId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category identifier parameter is required'
      });
    }

    // Check if category exists
    let checkQuery;
    let checkParams;
    if (!isNaN(Number(categoryId))) {
      checkQuery = 'SELECT category_id, category_name FROM categories WHERE category_id = ?';
      checkParams = [Number(categoryId)];
    } else {
      checkQuery = 'SELECT category_id, category_name FROM categories WHERE LOWER(category_name) = LOWER(?) OR LOWER(category_name) LIKE LOWER(?)';
      checkParams = [categoryId.trim(), `%${categoryId.trim()}%`];
    }

    const [catRows] = await pool.query(checkQuery, checkParams);
    if (catRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Category '${categoryId}' not found in database`
      });
    }

    const targetCategory = catRows[0];

    const query = `
      ${BASE_ARTIFACT_SELECT}
      WHERE a.category_id = ?
      ORDER BY a.artifact_name ASC
    `;

    const [rows] = await pool.query(query, [targetCategory.category_id]);
    const items = rows.map(formatArtifactRow);

    res.json({
      success: true,
      category: {
        id: targetCategory.category_id,
        name: targetCategory.category_name
      },
      count: items.length,
      items,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/statistics
 * Aggregate statistics (total artifacts, states, districts, categories)
 */
export const getStatistics = async (req, res, next) => {
  try {
    const [artifactsCount] = await pool.query('SELECT COUNT(*) AS count FROM artifacts');
    const [statesCount] = await pool.query('SELECT COUNT(*) AS count FROM states');
    const [districtsCount] = await pool.query('SELECT COUNT(*) AS count FROM districts');
    const [categoriesCount] = await pool.query('SELECT COUNT(*) AS count FROM categories');

    res.json({
      success: true,
      data: {
        artifactsCount: artifactsCount[0].count,
        statesCount: statesCount[0].count,
        districtsCount: districtsCount[0].count,
        categoriesCount: categoriesCount[0].count
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/featured
 * Returns featured artifacts for homepage showcase
 */
export const getFeaturedArtifacts = async (req, res, next) => {
  try {
    const limit = Math.min(10, Math.max(1, parseInt(req.query.limit || '4', 10)));
    const query = `
      ${BASE_ARTIFACT_SELECT}
      ORDER BY a.artifact_id ASC
      LIMIT ?
    `;
    const [rows] = await pool.query(query, [limit]);
    const items = rows.map(formatArtifactRow);

    res.json({
      success: true,
      count: items.length,
      items,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/:id
 * Retrieve single artifact with complete joined relationships
 */
export const getArtifactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Artifact ID parameter is required'
      });
    }

    let query;
    let params;

    // Check if numeric ID
    if (!isNaN(Number(id))) {
      const numId = Number(id);
      if (numId <= 0 || !Number.isInteger(numId)) {
        return res.status(404).json({
          success: false,
          message: `Artifact with ID '${id}' not found`
        });
      }
      query = `
        ${BASE_ARTIFACT_SELECT}
        WHERE a.artifact_id = ?
      `;
      params = [numId];
    } else {
      // Check if accession ID pattern (e.g., HA-TN-001 -> 1)
      const accessionMatch = id.match(/^HA-[A-Z]{2}-(\d+)$/i);
      if (accessionMatch) {
        const extractedId = parseInt(accessionMatch[1], 10);
        query = `
          ${BASE_ARTIFACT_SELECT}
          WHERE a.artifact_id = ?
        `;
        params = [extractedId];
      } else {
        // Query by exact artifact name
        query = `
          ${BASE_ARTIFACT_SELECT}
          WHERE LOWER(a.artifact_name) = LOWER(?)
        `;
        params = [id.trim()];
      }
    }

    const [rows] = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Artifact with identifier '${id}' not found in database`
      });
    }

    res.json({
      success: true,
      data: formatArtifactRow(rows[0])
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artifacts/:id/related
 * Retrieve related artifacts from same category, dynasty, or district
 */
export const getRelatedArtifacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const limit = Math.min(10, Math.max(1, parseInt(req.query.limit || '4', 10)));

    let targetId = Number(id);
    if (isNaN(targetId)) {
      const accessionMatch = String(id).match(/^HA-[A-Z]{2}-(\d+)$/i);
      if (accessionMatch) {
        targetId = parseInt(accessionMatch[1], 10);
      }
    }

    if (!targetId) {
      return res.json({ success: true, count: 0, items: [] });
    }

    const [targetRows] = await pool.query('SELECT category_id, district_id FROM artifacts WHERE artifact_id = ?', [targetId]);
    if (targetRows.length === 0) {
      return res.json({ success: true, count: 0, items: [] });
    }

    const target = targetRows[0];
    const query = `
      ${BASE_ARTIFACT_SELECT}
      WHERE (a.category_id = ? OR a.district_id = ?)
        AND a.artifact_id != ?
      ORDER BY (a.category_id = ?) DESC, a.artifact_id ASC
      LIMIT ?
    `;

    const [rows] = await pool.query(query, [
      target.category_id,
      target.district_id,
      targetId,
      target.category_id,
      limit
    ]);

    const items = rows.map(formatArtifactRow);
    res.json({
      success: true,
      count: items.length,
      items,
      data: items
    });
  } catch (error) {
    next(error);
  }
};
