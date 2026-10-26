import pool from './db.js';
import bcrypt from 'bcryptjs';

/**
 * Initializes the users and user_favorites tables in historical_artifact_db
 * and seeds a default administrator account if none exists.
 */
export const initAuthDb = async () => {
  try {
    // 1. Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'curator', 'researcher') NOT NULL DEFAULT 'researcher',
        avatar VARCHAR(255) NULL,
        bio TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Create user_favorites table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_favorites (
        favorite_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        artifact_id INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT uq_user_artifact UNIQUE (user_id, artifact_id),
        CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
        CONSTRAINT fk_fav_artifact FOREIGN KEY (artifact_id) REFERENCES artifacts (artifact_id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Seed default admin if missing
    const [adminCheck] = await pool.query('SELECT user_id FROM users WHERE LOWER(email) = LOWER(?)', ['curator@heritagearchive.org']);
    if (adminCheck.length === 0) {
      const defaultPassword = 'adminPassword123!';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      await pool.query(
        `INSERT INTO users (full_name, email, password_hash, role, bio) 
         VALUES (?, ?, ?, 'admin', ?)`,
        [
          'Chief Archival Curator',
          'curator@heritagearchive.org',
          hashedPassword,
          'Senior curator and epigraphy specialist for HeritageArchive National Digital Repository.'
        ]
      );
      console.log('🏛️  Auth DB: Initialized and seeded default curator user (curator@heritagearchive.org)');
    }

    // 4. Seed default researcher scholar if missing
    const [scholarCheck] = await pool.query('SELECT user_id FROM users WHERE LOWER(email) = LOWER(?)', ['scholar@heritagearchive.org']);
    if (scholarCheck.length === 0) {
      const scholarPassword = 'scholarPass123!';
      const scholarSalt = await bcrypt.genSalt(10);
      const scholarHash = await bcrypt.hash(scholarPassword, scholarSalt);

      await pool.query(
        `INSERT INTO users (full_name, email, password_hash, role, bio) 
         VALUES (?, ?, ?, 'researcher', ?)`,
        [
          'Archival Scholar',
          'scholar@heritagearchive.org',
          scholarHash,
          'Academic researcher specializing in ancient Indian artifacts and inscriptions.'
        ]
      );
      console.log('🏛️  Auth DB: Initialized and seeded default scholar user (scholar@heritagearchive.org)');
    }

    return true;
  } catch (error) {
    console.error('❌ Failed to initialize auth tables:', error.message);
    return false;
  }
};

let isAuthDbInitialized = false;

export const ensureAuthDbInitialized = async () => {
  if (isAuthDbInitialized) return true;
  const success = await initAuthDb();
  if (success) {
    isAuthDbInitialized = true;
  }
  return success;
};

export default initAuthDb;

