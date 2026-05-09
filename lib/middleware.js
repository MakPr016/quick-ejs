export function generateDBConfig() {
  return `import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quickejs_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('Database had a fatal error.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_DESTROY') {
    console.error('Database connection was destroyed.');
  }
});

pool.on('connection', (connection) => {
  connection.on('error', (err) => {
    console.error('Connection error:', err);
  });
});

async function initializeDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    await connection.query(\`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_is_active (is_active),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    \`);
    
    console.log('✓ Database tables initialized');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

export async function connectDB() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✓ Connected to MySQL database');
    
    await initializeDatabase();
  } catch (err) {
    console.error('✗ Failed to connect to database:', err.message);
    process.exit(1);
  }
}

export async function closeDB() {
  try {
    await pool.end();
    console.log('✓ Database connection closed');
  } catch (err) {
    console.error('Error closing database:', err);
  }
}

export default pool;`;
}

export function generateAuthMiddleware() {
  return `import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided, please login' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      res.clearCookie('token');
      return res.status(401).json({ error: 'Token expired, please login again' });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    res.status(403).json({ error: 'Token verification failed' });
  }
}

export function authRequired(req, res, next) {
  verifyToken(req, res, next);
}

export function optional(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
    next();
  } catch (err) {
    console.error('Optional token verification failed:', err.message);
    next();
  }
}

export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
}

export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.name === 'JsonWebTokenError') {
    return res.status(403).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  res.status(500).json({ error: err.message || 'Internal server error' });
}`;
}