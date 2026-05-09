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

export async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ MySQL Database connected successfully');
    connection.release();
    return pool;
  } catch (error) {
    console.error('✗ MySQL Database connection failed:', error.message);
    process.exit(1);
  }
}

export async function query(sql, values) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } finally {
    connection.release();
  }
}

export default pool;`;
}

export function generateMySQLUserModel() {
  return `import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
  // Create users table
  async createTable() {
    const sql = \`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )\`;
    
    try {
      await pool.query(sql);
      console.log('✓ Users table created or already exists');
    } catch (error) {
      console.error('Error creating users table:', error);
    }
  },

  // Create new user
  async create(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      const [result] = await pool.query(sql, [
        userData.name,
        userData.email,
        hashedPassword
      ]);
      return { id: result.insertId, ...userData };
    } catch (error) {
      throw error;
    }
  },

  // Find user by email
  async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.query(sql, [email]);
    return rows[0] || null;
  },

  // Find user by ID
  async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
  },

  // Get all users
  async findAll() {
    const sql = 'SELECT id, name, email, created_at FROM users';
    const [rows] = await pool.query(sql);
    return rows;
  },

  // Update user
  async update(id, userData) {
    try {
      let sql = 'UPDATE users SET ';
      const values = [];
      const fields = [];

      if (userData.name) {
        fields.push('name = ?');
        values.push(userData.name);
      }
      if (userData.email) {
        fields.push('email = ?');
        values.push(userData.email);
      }
      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        fields.push('password = ?');
        values.push(hashedPassword);
      }

      sql += fields.join(', ') + ' WHERE id = ?';
      values.push(id);

      await pool.query(sql, values);
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  async delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  },

  // Verify password
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};

export default User;`;
}

export function generateAuthMiddleware() {
  return `import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function optionalAuth(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.userId = decoded.id;
      req.user = decoded;
    }
  } catch (error) {
    // Token is invalid or not present, continue anyway
  }
  next();
}

export default authMiddleware;`;
}