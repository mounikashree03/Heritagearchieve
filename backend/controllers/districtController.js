import pool from '../config/db.js';

/**
 * Format helper for district rows
 */
const formatDistrictRow = (r) => ({
  id: r.district_id,
  district_id: r.district_id,
  name: r.district_name,
  district_name: r.district_name,
  state_id: r.state_id,
  stateId: r.state_id,
  state_name: r.state_name,
  stateName: r.state_name,
  description: r.description,
  artifact_count: Number(r.artifact_count),
  artifactCount: Number(r.artifact_count)
});

/**
 * GET /api/districts
 * Returns all districts or filtered by state query param (?stateId=), with artifact count
 */
export const getAllDistricts = async (req, res, next) => {
  try {
    const { stateId } = req.query;
    let query = `
      SELECT 
        d.district_id,
        d.district_name,
        d.state_id,
        s.state_name,
        d.description,
        COUNT(a.artifact_id) AS artifact_count
      FROM districts d
      JOIN states s ON d.state_id = s.state_id
      LEFT JOIN artifacts a ON d.district_id = a.district_id
    `;
    const params = [];

    if (stateId && stateId !== 'all') {
      if (!isNaN(Number(stateId))) {
        query += ` WHERE d.state_id = ? `;
        params.push(Number(stateId));
      } else {
        const normalized = stateId.replace(/-/g, ' ');
        query += ` WHERE LOWER(s.state_name) = LOWER(?) OR LOWER(s.state_name) = LOWER(?) `;
        params.push(stateId.trim(), normalized.trim());
      }
    }

    query += `
      GROUP BY d.district_id, d.district_name, d.state_id, s.state_name, d.description
      ORDER BY s.state_name ASC, d.district_name ASC
    `;

    const [rows] = await pool.query(query, params);
    const formatted = rows.map(formatDistrictRow);

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/districts/state/:stateId
 * List all districts belonging to a given state (numeric ID or slug)
 */
export const getDistrictsByState = async (req, res, next) => {
  try {
    const { stateId } = req.params;

    if (!stateId || !stateId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'State identifier parameter is required'
      });
    }

    // First verify state exists
    let stateQuery;
    let stateParams;
    if (!isNaN(Number(stateId))) {
      stateQuery = 'SELECT state_id, state_name FROM states WHERE state_id = ?';
      stateParams = [Number(stateId)];
    } else {
      const normalized = stateId.replace(/-/g, ' ');
      stateQuery = 'SELECT state_id, state_name FROM states WHERE LOWER(state_name) = LOWER(?) OR LOWER(state_name) = LOWER(?)';
      stateParams = [stateId.trim(), normalized.trim()];
    }

    const [stateRows] = await pool.query(stateQuery, stateParams);
    if (stateRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `State '${stateId}' not found in database`
      });
    }

    const foundState = stateRows[0];

    const districtsQuery = `
      SELECT 
        d.district_id,
        d.district_name,
        d.state_id,
        s.state_name,
        d.description,
        COUNT(a.artifact_id) AS artifact_count
      FROM districts d
      JOIN states s ON d.state_id = s.state_id
      LEFT JOIN artifacts a ON d.district_id = a.district_id
      WHERE d.state_id = ?
      GROUP BY d.district_id, d.district_name, d.state_id, s.state_name, d.description
      ORDER BY d.district_name ASC
    `;

    const [rows] = await pool.query(districtsQuery, [foundState.state_id]);
    const formatted = rows.map(formatDistrictRow);

    res.json({
      success: true,
      state: {
        id: foundState.state_id,
        name: foundState.state_name
      },
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/districts/:id
 * Retrieve a single district by numeric district_id or district_name
 */
export const getDistrictById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: 'District identifier parameter is required'
      });
    }

    let query;
    let params;

    if (!isNaN(Number(id))) {
      query = `
        SELECT 
          d.district_id,
          d.district_name,
          d.state_id,
          s.state_name,
          d.description,
          COUNT(a.artifact_id) AS artifact_count
        FROM districts d
        JOIN states s ON d.state_id = s.state_id
        LEFT JOIN artifacts a ON d.district_id = a.district_id
        WHERE d.district_id = ?
        GROUP BY d.district_id, d.district_name, d.state_id, s.state_name, d.description
      `;
      params = [Number(id)];
    } else {
      const normalized = id.replace(/-/g, ' ');
      query = `
        SELECT 
          d.district_id,
          d.district_name,
          d.state_id,
          s.state_name,
          d.description,
          COUNT(a.artifact_id) AS artifact_count
        FROM districts d
        JOIN states s ON d.state_id = s.state_id
        LEFT JOIN artifacts a ON d.district_id = a.district_id
        WHERE LOWER(d.district_name) = LOWER(?) OR LOWER(d.district_name) = LOWER(?)
        GROUP BY d.district_id, d.district_name, d.state_id, s.state_name, d.description
      `;
      params = [id.trim(), normalized.trim()];
    }

    const [rows] = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `District with identifier '${id}' not found in database`
      });
    }

    res.json({
      success: true,
      data: formatDistrictRow(rows[0])
    });
  } catch (error) {
    next(error);
  }
};
