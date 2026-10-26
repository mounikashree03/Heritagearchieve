import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';
import { initAuthDb } from './config/initAuthDb.js';
import stateRoutes from './routes/states.js';
import districtRoutes from './routes/districts.js';
import categoryRoutes from './routes/categories.js';
import artifactRoutes from './routes/artifacts.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '..', 'dist');

// Load environment variables from .env
dotenv.config();

// Ensure DB auth tables are initialized
initAuthDb();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for frontend Vite dev server and configurable origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

if (process.env.CLIENT_ORIGIN) {
  allowedOrigins.push(process.env.CLIENT_ORIGIN);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow tools, mobile apps, postman, and requests without Origin header
    if (!origin) return callback(null, true);
    // Allow any localhost/127.0.0.1 port or specified origins
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Permissive fallback during local development
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Serve frontend static build if dist exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// API Directory Information endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'HeritageArchive REST API is active',
    documentation: '/api/health',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me',
        favorites: 'GET /api/auth/favorites',
        adminStats: 'GET /api/auth/admin/stats'
      },
      states: '/api/states',
      districts: '/api/districts',
      categories: '/api/categories',
      artifacts: '/api/artifacts',
      search: '/api/artifacts/search?q=coin',
      filter: '/api/artifacts/filter?stateId=1&category=Ancient%20Coins'
    }
  });
});

/**
 * GET /api/health
 * Verifies server runtime and actively tests the live MySQL database connection
 */
app.get('/api/health', async (req, res) => {
  const dbHealth = await testDbConnection();
  const isHealthy = dbHealth.connected === true;
  const statusCode = isHealthy ? 200 : 503;

  res.status(statusCode).json({
    success: isHealthy,
    server: 'HeritageArchive Express REST API',
    status: isHealthy ? 'HEALTHY' : 'UNHEALTHY',
    message: isHealthy
      ? 'Backend server and MySQL database are connected and operational'
      : 'Backend server is running but MySQL connection failed',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      connected: isHealthy,
      databaseName: dbHealth.databaseName || process.env.DB_NAME || 'historical_artifact_db',
      message: dbHealth.message,
      ...(dbHealth.error && { error: dbHealth.error, code: dbHealth.code })
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
    }
  });
});

// Mount Resource Routes
app.use('/api/auth', authRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/artifacts', artifactRoutes);

// Client-side SPA routing fallback (serves React frontend for non-API routes)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

// Fallback 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start HTTP Listener only when executed directly (not when imported in tests)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🏛️   HeritageArchive Express Backend running on port ${PORT}`);
    console.log(`🔗  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔐  Auth APIs:    http://localhost:${PORT}/api/auth/login`);
    console.log(`🔗  States API:   http://localhost:${PORT}/api/states`);
    console.log(`🔗  Artifacts:    http://localhost:${PORT}/api/artifacts`);
    console.log(`====================================================`);
  });
}

export default app;
