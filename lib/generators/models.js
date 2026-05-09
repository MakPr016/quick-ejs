export function generateUserModel(useAuth) {
  if (!useAuth) {
    return `import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', UserSchema);`;
  }

  return `import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);`;
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
