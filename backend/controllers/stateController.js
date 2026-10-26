import pool from '../config/db.js';

/**
 * GET /api/states
 * Returns all states with associated district and artifact counts using LEFT JOINs
 */
export const getAllStates = async (req, res, next) => {
  try {
    const query = `
      SELECT 
        s.state_id,
        s.state_name,
        s.description,
        COUNT(DISTINCT d.district_id) AS district_count,
        COUNT(DISTINCT a.artifact_id) AS artifact_count
      FROM states s
      LEFT JOIN districts d ON s.state_id = d.state_id
      LEFT JOIN artifacts a ON d.district_id = a.district_id
      GROUP BY s.state_id, s.state_name, s.description
      ORDER BY s.state_name ASC
    `;
    const [rows] = await pool.query(query);

    const formatted = rows.map(r => ({
      id: r.state_id,
      state_id: r.state_id,
      name: r.state_name,
      state_name: r.state_name,
      description: r.description,
      district_count: Number(r.district_count),
      artifact_count: Number(r.artifact_count),
      districtCount: Number(r.district_count),
      artifactCount: Number(r.artifact_count)
    }));

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
 * GET /api/states/:id
 * Retrieve a single state by numeric state_id or state_name / slug
 */
export const getStateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid state identifier provided'
      });
    }

    let query;
    let params;

    if (!isNaN(Number(id))) {
      query = `
        SELECT 
          s.state_id,
          s.state_name,
          s.description,
          COUNT(DISTINCT d.district_id) AS district_count,
          COUNT(DISTINCT a.artifact_id) AS artifact_count
        FROM states s
        LEFT JOIN districts d ON s.state_id = d.state_id
        LEFT JOIN artifacts a ON d.district_id = a.district_id
        WHERE s.state_id = ?
        GROUP BY s.state_id, s.state_name, s.description
      `;
      params = [Number(id)];
    } else {
      const normalizedName = id.replace(/-/g, ' ');
      query = `
        SELECT 
          s.state_id,
          s.state_name,
          s.description,
          COUNT(DISTINCT d.district_id) AS district_count,
          COUNT(DISTINCT a.artifact_id) AS artifact_count
        FROM states s
        LEFT JOIN districts d ON s.state_id = d.state_id
        LEFT JOIN artifacts a ON d.district_id = a.district_id
        WHERE LOWER(s.state_name) = LOWER(?) OR LOWER(s.state_name) = LOWER(?)
        GROUP BY s.state_id, s.state_name, s.description
      `;
      params = [id.trim(), normalizedName.trim()];
    }

    const [rows] = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `State with identifier '${id}' not found in database`
      });
    }

    const r = rows[0];
    res.json({
      success: true,
      data: {
        id: r.state_id,
        state_id: r.state_id,
        name: r.state_name,
        state_name: r.state_name,
        description: r.description,
        district_count: Number(r.district_count),
        artifact_count: Number(r.artifact_count),
        districtCount: Number(r.district_count),
        artifactCount: Number(r.artifact_count)
      }
    });
  } catch (error) {
    next(error);
  }
};
