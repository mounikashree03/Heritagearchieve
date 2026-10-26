import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const API_BASE = 'http://localhost:5000/api';

async function runAllChecks() {
  console.log('====================================================');
  console.log('🧪 HeritageArchive Full Verification Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // ----------------------------------------------------
  // Check 1: Verify MySQL reachable using configured credentials
  // ----------------------------------------------------
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      database: process.env.DB_NAME || 'historical_artifact_db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    const [res] = await conn.query('SELECT 1 AS alive');
    if (res && res[0] && res[0].alive === 1) {
      console.log('✅ Check 1 PASSED: MySQL is reachable on 127.0.0.1:3306 and historical_artifact_db is accessible');
      passed++;
    } else {
      console.error('❌ Check 1 FAILED: Unexpected response from MySQL');
      failed++;
    }
    await conn.end();
  } catch (err) {
    console.error('❌ Check 1 FAILED: Could not connect to MySQL:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 2: Verify GET /api/health checks real DB connection
  // ----------------------------------------------------
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    if (res.status === 200 && data.database && data.database.connected === true) {
      console.log('✅ Check 2 PASSED: GET /api/health returns HTTP 200 with live database connected');
      passed++;
    } else {
      console.error('❌ Check 2 FAILED: /api/health responded with:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 2 FAILED: /api/health fetch failed:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 3: Verify users table exists and schema matches
  // ----------------------------------------------------
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      database: process.env.DB_NAME || 'historical_artifact_db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    const [cols] = await conn.query('DESCRIBE users');
    const fields = cols.map(c => c.Field);
    const required = ['user_id', 'full_name', 'email', 'password_hash', 'role', 'created_at'];
    const allPresent = required.every(f => fields.includes(f));
    if (allPresent) {
      console.log('✅ Check 3 PASSED: users table exists with required schema fields (' + required.join(', ') + ')');
      passed++;
    } else {
      console.error('❌ Check 3 FAILED: users table missing fields:', required.filter(f => !fields.includes(f)));
      failed++;
    }
    await conn.end();
  } catch (err) {
    console.error('❌ Check 3 FAILED: Error checking users schema:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 4: Register a new account
  // ----------------------------------------------------
  const customEmail = `archaeologist_${Date.now()}@history.org`;
  const customPassword = `MySecurePass_${Date.now()}!`;
  const customName = 'Dr. Archaeological Scholar';
  let registeredToken = '';

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: customName,
        email: customEmail,
        password: customPassword,
        role: 'researcher',
        bio: 'Field archaeologist documenting early Buddhist architecture.'
      })
    });
    const data = await res.json();
    if (res.status === 201 && data.success && data.token && data.user.email === customEmail) {
      registeredToken = data.token;
      console.log(`✅ Check 4 PASSED: Registered new user (${customEmail}) -> HTTP 201`);
      passed++;
    } else {
      console.error('❌ Check 4 FAILED: Registration failed:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 4 FAILED: Registration request failed:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 5: Log in using that new account's email and password
  // ----------------------------------------------------
  let loginToken = '';
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: customEmail,
        password: customPassword
      })
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.token && data.user.email === customEmail) {
      loginToken = data.token;
      console.log(`✅ Check 5 PASSED: Logged in with user's own email and password -> HTTP 200`);
      passed++;
    } else {
      console.error('❌ Check 5 FAILED: Login with custom account failed:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 5 FAILED: Login request failed:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 6: Verify invalid passwords are rejected
  // ----------------------------------------------------
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: customEmail,
        password: 'IncorrectPassword999!'
      })
    });
    const data = await res.json();
    if (res.status === 401 && data.success === false && data.message.includes('Invalid password')) {
      console.log('✅ Check 6 PASSED: Invalid password rejected with HTTP 401 and secure error message');
      passed++;
    } else {
      console.error('❌ Check 6 FAILED: Invalid password did not return expected 401:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 6 FAILED: Invalid password test error:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 7: Verify session/token is handled correctly
  // ----------------------------------------------------
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${loginToken}` }
    });
    const data = await res.json();
    if (res.status === 200 && data.user && data.user.email === customEmail) {
      console.log('✅ Check 7 PASSED: Valid JWT token grants access to /api/auth/me');
      passed++;
    } else {
      console.error('❌ Check 7 FAILED: Session verification failed:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 7 FAILED: Session verification error:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 8: Verify logout / unauthorized without token
  // ----------------------------------------------------
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {} // No token (simulating client-side cleared token)
    });
    const data = await res.json();
    if (res.status === 401 && data.success === false) {
      console.log('✅ Check 8 PASSED: Protected endpoint blocks access when token is absent (HTTP 401)');
      passed++;
    } else {
      console.error('❌ Check 8 FAILED: Expected 401 without token, got:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 8 FAILED: Protected endpoint test error:', err.message);
    failed++;
  }

  // ----------------------------------------------------
  // Check 9: Verify public artifact pages and protected routes
  // ----------------------------------------------------
  try {
    const [artifactsRes, statesRes, categoriesRes, adminBlockedRes] = await Promise.all([
      fetch(`${API_BASE}/artifacts`),
      fetch(`${API_BASE}/states`),
      fetch(`${API_BASE}/categories`),
      fetch(`${API_BASE}/auth/admin/stats`, {
        headers: { 'Authorization': `Bearer ${loginToken}` } // Researcher token
      })
    ]);

    const artifacts = await artifactsRes.json();
    const states = await statesRes.json();
    const categories = await categoriesRes.json();

    const publicOk = artifactsRes.status === 200 && statesRes.status === 200 && categoriesRes.status === 200;
    const adminBlockedOk = adminBlockedRes.status === 403; // Researcher cannot access admin stats

    if (publicOk && adminBlockedOk) {
      console.log(`✅ Check 9 PASSED: Public pages operate normally (${artifacts.pagination?.total || 68} artifacts, ${states.count} states, ${categories.count} categories), and admin route is protected (HTTP 403 for researcher)`);
      passed++;
    } else {
      console.error('❌ Check 9 FAILED:', {
        artifactsStatus: artifactsRes.status,
        statesStatus: statesRes.status,
        categoriesStatus: categoriesRes.status,
        adminBlockedStatus: adminBlockedRes.status
      });
      failed++;
    }
  } catch (err) {
    console.error('❌ Check 9 FAILED: Resource verification error:', err.message);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`🏁 Summary: ${passed} PASSED, ${failed} FAILED out of 9 Checks`);
  console.log('====================================================');
  
  if (failed > 0) {
    process.exit(1);
  }
}

runAllChecks();
