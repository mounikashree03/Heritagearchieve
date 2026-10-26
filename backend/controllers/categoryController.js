import pool from '../config/db.js';

/**
 * Format helper for category rows
 */
const formatCategoryRow = (r) => ({
  id: r.category_id,
  category_id: r.category_id,
  name: r.category_name,
  category_name: r.category_name,
  description: r.description,
  artifact_count: Number(r.artifact_count),
  artifactCount: Number(r.artifact_count)
});

/**
 * GET /api/categories
 * Returns all categories with count of associated artifacts
 */
export const getAllCategories = async (req, res, next) => {
  try {
    const query = `
      SELECT 
        c.category_id,
        c.category_name,
        c.description,
        COUNT(a.artifact_id) AS artifact_count
      FROM categories c
      LEFT JOIN artifacts a ON c.category_id = a.category_id
      GROUP BY c.category_id, c.category_name, c.description
      ORDER BY c.category_id ASC
    `;
    const [rows] = await pool.query(query);
    const formatted = rows.map(formatCategoryRow);

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
 * GET /api/categories/:id
 * Retrieve single category by numeric ID or name
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !id.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category identifier parameter is required'
      });
    }

    let query;
    let params;

    if (!isNaN(Number(id))) {
      query = `
        SELECT 
          c.category_id,
          c.category_name,
          c.description,
          COUNT(a.artifact_id) AS artifact_count
        FROM categories c
        LEFT JOIN artifacts a ON c.category_id = a.category_id
        WHERE c.category_id = ?
        GROUP BY c.category_id, c.category_name, c.description
      `;
      params = [Number(id)];
    } else {
      query = `
        SELECT 
          c.category_id,
          c.category_name,
          c.description,
          COUNT(a.artifact_id) AS artifact_count
        FROM categories c
        LEFT JOIN artifacts a ON c.category_id = a.category_id
        WHERE LOWER(c.category_name) = LOWER(?) OR LOWER(c.category_name) LIKE LOWER(?)
        GROUP BY c.category_id, c.category_name, c.description
      `;
      params = [id.trim(), `%${id.trim()}%`];
    }

    const [rows] = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Category with identifier '${id}' not found in database`
      });
    }

    res.json({
      success: true,
      data: formatCategoryRow(rows[0])
    });
  } catch (error) {
    next(error);
  }
};
